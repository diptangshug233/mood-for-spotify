import { useState, useEffect } from "react";
import { CatchErrors } from "../utils";
import {
  getCurrentUserProfile,
  getRecommendationsSmall,
  createPlaylist,
  addTracksToPlaylist,
} from "../Spotify";
import {
  MoodSelector,
  GenreSelector,
  Header,
  TrackStyle,
  Loader,
} from "../components";
import { Spotify, MusicNoteList } from "react-bootstrap-icons";

import styled from "styled-components";
import addDatabase from "../firebase";
import { theme, mixins, media } from "../styles";
const { fontSizes } = theme;

const MainContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 80px;
  ${media.desktop`
    padding: 60px 50px;
  `};
  ${media.tablet`
    padding: 50px 40px;
  `};
  ${media.phablet`
    padding: 30px 25px;
  `};
  h2 {
    ${media.tablet`
      text-align: center;
    `};
  }
`;
const DiscoverSection = styled.div`
  ${mixins.flexCenter}
  padding-top: 50px;
  flex-direction: column;
  ${media.tablet`
  padding-bottom: 70px;
  `};
`;
const Reset = styled.a`
  ${mixins.button};
  text-align: center;
  white-space: nowrap;
  ${media.tablet`
  display:none
  `};
`;
const GreenButton = styled.button`
  ${mixins.greenButton}
  padding: 17px 35px;
  margin: 0;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
`;
const GreenButtonRoute = styled.a`
  ${mixins.greenButton}
  padding: 17px 35px;
  margin: 0;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
`;
const PlaylistSection = styled.div`
  ${mixins.flexBetween}
  padding-top: 50px;
  ${media.tablet`
  justify-content:center;
  padding-bottom: 70px;
  `};
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Fancy = styled.span`
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff4000,
    #ff9000,
    #ffc000,
    #ffe000,
    #fff000,
    #ffe0a3,
    #ffa0a3,
    #ff50f3,
    #ff00f3,
    #af00ff,
    #6000ff,
    #2000ff,
    #1033ff,
    #0033ff,
    #4033ff,
    #9f00c4,
    #bf00c4,
    #ff00c4,
    #ff00a0,
    #ff0040,
    #ff0000
  );
  background-size: 400%;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: animate 10s ease infinite;
  animation-direction: alternate;
  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
`;
const getPropertyInterval = (value, attempt) => {
  const diff = attempt * 0.05;
  const min = Number(Math.max(0, value - diff).toFixed(2));
  const max = Number(Math.min(1, value + diff).toFixed(2));
  return [min, max];
};

const shuffleArray = (data) => {
  return data.sort(() => Math.random() - 0.5);
};

const Main = () => {
  const [profile, setProfile] = useState(null);
  const [audioProperties, setAudioProperties] = useState({
    valence: 0.5,
    energy: 0.5,
  });
  const [seedGenre, setSeedGenre] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
    };
    CatchErrors(fetchData());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recommendations]);

  useEffect(() => {
    if (newPlaylist) {
      addTracks();
    }
  }, [newPlaylist]);
  useEffect(() => {
    if (success) {
      addDatabase(profile, newPlaylist);
    }
  }, [success]);

  const findRecommendations = () => {
    const attempt = 1;
    const energy = audioProperties.energy;
    const valence = audioProperties.valence;
    const [minEnergy, maxEnergy] = getPropertyInterval(energy, attempt);
    const [minValence, maxValence] = getPropertyInterval(valence, attempt);
    const genreSum = seedGenre.join(",").toLowerCase();

    const fetchData = async () => {
      const { data } = await getRecommendationsSmall(
        genreSum,
        minEnergy,
        maxEnergy,
        minValence,
        maxValence
      );
      setRecommendations(shuffleArray(data.tracks).slice(0, 30));
    };
    CatchErrors(fetchData());
  };

  const createSpotifyPlaylist = () => {
    const fetchData = async () => {
      const { data } = await createPlaylist(profile.id);
      setNewPlaylist(data);
    };
    CatchErrors(fetchData());
    if (newPlaylist) {
      addTracks();
    }
  };

  const addTracks = () => {
    const fetchData = async () => {
      const { data } = await addTracksToPlaylist(
        newPlaylist.id,
        recommendations.map(({ uri }) => uri).join(",")
      );
      setSuccess(data);
    };
    CatchErrors(fetchData());
  };

  return (
    <>
      {profile ? (
        <>
          <Header profile={profile} />

          <MainContainer>
            {!success ? (
              recommendations.length === 0 ? (
                <>
                  <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
                    How's your <Fancy>MOOD</Fancy> today...
                  </h1>
                  <Wrapper>
                    <MoodSelector setProperties={setAudioProperties} />
                  </Wrapper>
                  <h3 style={{ marginTop: "30px" }}>Choose up to 5 genres:</h3>
                  <GenreSelector setProperties={setSeedGenre} />
                  <DiscoverSection>
                    {seedGenre.length !== 0 ? (
                      <GreenButton onClick={findRecommendations}>
                        Discover
                      </GreenButton>
                    ) : (
                      <span>Select at least one genre.</span>
                    )}
                  </DiscoverSection>
                </>
              ) : (
                <>
                  <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
                    Here are some tracks you might enjoy...
                  </h1>
                  <TrackStyle tracks={recommendations} />
                  <PlaylistSection>
                    <GreenButton onClick={createSpotifyPlaylist}>
                      {`Create Playlist on `}
                      <Spotify size={20} style={{ verticalAlign: "bottom" }} />
                    </GreenButton>
                    <Reset
                      onClick={() => {
                        setAudioProperties({
                          valence: 0.5,
                          energy: 0.5,
                        });
                        setSeedGenre([]);
                        setRecommendations([]);
                        setNewPlaylist(null);
                        setSuccess(null);
                      }}
                    >
                      Go Again
                    </Reset>
                  </PlaylistSection>
                </>
              )
            ) : (
              <>
                <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
                  <MusicNoteList
                    size={50}
                    style={{ verticalAlign: "text-bottom" }}
                  />
                  {` Playlist created...`}
                </h1>
                <PlaylistSection style={{ paddingTop: 0 }}>
                  <GreenButtonRoute
                    href={newPlaylist.external_urls.spotify}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {`Open with `}
                    <Spotify size={20} style={{ verticalAlign: "bottom" }} />
                  </GreenButtonRoute>
                  <Reset
                    onClick={() => {
                      setAudioProperties({
                        valence: 0.5,
                        energy: 0.5,
                      });
                      setSeedGenre([]);
                      setRecommendations([]);
                      setNewPlaylist(null);
                      setSuccess(null);
                    }}
                  >
                    Go Again
                  </Reset>
                </PlaylistSection>
              </>
            )}
          </MainContainer>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Main;
