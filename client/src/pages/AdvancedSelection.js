import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  AdvGenreSelector,
  HeaderMini,
  Loader,
  Slider,
  TrackStyle,
} from "../components";
import { Spotify, MusicNoteList } from "react-bootstrap-icons";

import {
  getCurrentUserProfile,
  getRecommendationsLarge,
  createPlaylist,
  addTracksToPlaylist,
} from "../Spotify";
import { theme, mixins, media, Main } from "../styles";
import { CatchErrors } from "../utils";
import addDatabase from "../firebase";

const { fontSizes } = theme;
const shuffleArray = (data) => {
  return data.sort(() => Math.random() - 0.5);
};
const SectionHeading = styled.h3``;
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
const SliderSection = styled.div`
  ${mixins.flexBetween}
  margin-bottom: 30px;
`;
const DiscoverSection = styled.div`
  ${mixins.flexCenter}
  padding-top: 50px;
  flex-direction: column;
  ${media.tablet`
  padding-bottom: 70px;
  `};
`;
const PlaylistSection = styled.div`
  ${mixins.flexBetween}
  padding-top: 50px;
  ${media.tablet`
  justify-content:center;
  padding-bottom: 70px;
  `};
`;
const AdvancedSelection = () => {
  const [profile, setProfile] = useState(null);
  const [popularity, setPopularity] = useState([0, 100]);
  const [valence, setValence] = useState([0, 1]);
  const [energy, setEnergy] = useState([0, 1]);
  const [acousticness, setAcousticness] = useState([0, 1]);
  const [danceability, setDanceability] = useState([0, 1]);
  const [instrumentalness, setInstrumentalness] = useState([0, 1]);
  const [liveness, setLiveness] = useState([0, 1]);
  const [speechiness, setSpeechiness] = useState([0, 1]);
  const [advSeedGenre, setAdvSeedGenre] = useState([]);
  const [url, setUrl] = useState(null);
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
  const recommendationParams = () => {
    const genreSum = advSeedGenre.join(",").toLowerCase();
    let url = "";
    if (popularity[0] !== 0) {
      url += `&min_popularity=${popularity[0]}`;
    }
    if (valence[0] !== 0) {
      url += `&min_valence=${valence[0]}`;
    }
    if (energy[0] !== 0) {
      url += `&min_energy=${energy[0]}`;
    }
    if (acousticness[0] !== 0) {
      url += `&min_acousticness=${acousticness[0]}`;
    }
    if (danceability[0] !== 0) {
      url += `&min_danceability=${danceability[0]}`;
    }
    if (instrumentalness[0] !== 0) {
      url += `&min_instrumentalness=${instrumentalness[0]}`;
    }
    if (liveness[0] !== 0) {
      url += `&min_liveness=${liveness[0]}`;
    }
    if (speechiness[0] !== 0) {
      url += `&min_speechiness=${speechiness[0]}`;
    }
    if (popularity[1] !== 100) {
      url += `&max_popularity=${popularity[1]}`;
    }
    if (valence[1] !== 1) {
      url += `&max_valence=${valence[1]}`;
    }
    if (energy[1] !== 1) {
      url += `&max_energy=${energy[1]}`;
    }
    if (acousticness[1] !== 1) {
      url += `&max_acousticness=${acousticness[1]}`;
    }
    if (danceability[1] !== 1) {
      url += `&max_danceability=${danceability[1]}`;
    }
    if (instrumentalness[1] !== 1) {
      url += `&max_instrumentalness=${instrumentalness[1]}`;
    }
    if (liveness[1] !== 1) {
      url += `&max_liveness=${liveness[1]}`;
    }
    if (speechiness[1] !== 1) {
      url += `&max_speechiness=${speechiness[1]}`;
    }
    setUrl("&seed_genres=" + genreSum + url);
  };
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
  useEffect(() => {
    if (!url) {
      return;
    }
    const fetchData = async () => {
      const { data } = await getRecommendationsLarge(url);
      setRecommendations(shuffleArray(data.tracks).slice(0, 50));
    };
    CatchErrors(fetchData());
  }, [url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recommendations]);

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
          <HeaderMini profile={profile} />
          <Main>
            {profile ? (
              <>
                {!success ? (
                  recommendations.length === 0 ? (
                    <>
                      <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
                        Advanced Selection...
                      </h1>
                      <>
                        <SectionHeading>Popularity</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${popularity[0]}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) => setPopularity(value)}
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${popularity[1]}%`}</span>
                        </SliderSection>

                        <SectionHeading>Valence</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(valence[0] * 100)}%`}</span>

                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setValence(value.map((item) => item / 100))
                            }
                          />

                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(valence[1] * 100)}%`}</span>
                        </SliderSection>

                        <SectionHeading>Energy</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(energy[0] * 100)}%`}</span>

                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setEnergy(value.map((item) => item / 100))
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(energy[1] * 100)}%`}</span>
                        </SliderSection>
                        <SectionHeading>Acousticness</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(acousticness[0] * 100)}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setAcousticness(value.map((item) => item / 100))
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(acousticness[1] * 100)}%`}</span>
                        </SliderSection>
                        <SectionHeading>Danceability</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(danceability[0] * 100)}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setDanceability(value.map((item) => item / 100))
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(danceability[1] * 100)}%`}</span>
                        </SliderSection>
                        <SectionHeading>Instrumentalness</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(instrumentalness[0] * 100)}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setInstrumentalness(
                                value.map((item) => item / 100)
                              )
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(instrumentalness[1] * 100)}%`}</span>
                        </SliderSection>
                        <SectionHeading>Liveness</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(liveness[0] * 100)}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setLiveness(value.map((item) => item / 100))
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(liveness[1] * 100)}%`}</span>
                        </SliderSection>
                        <SectionHeading>Speechiness</SectionHeading>
                        <SliderSection>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >{`${Math.round(speechiness[0] * 100)}%`}</span>
                          <Slider
                            minDistance={5}
                            min={0}
                            max={100}
                            onChange={(value) =>
                              setSpeechiness(value.map((item) => item / 100))
                            }
                          />
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "10px",
                            }}
                          >{`${Math.round(speechiness[1] * 100)}%`}</span>
                        </SliderSection>
                      </>
                      <SectionHeading>Choose up to 5 genres:</SectionHeading>

                      <AdvGenreSelector setProperties={setAdvSeedGenre} />
                      <DiscoverSection>
                        {advSeedGenre.length !== 0 ? (
                          <>
                            <GreenButton onClick={recommendationParams}>
                              Discover
                            </GreenButton>
                          </>
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
                          <Spotify
                            size={20}
                            style={{ verticalAlign: "bottom" }}
                          />
                        </GreenButton>
                        <Reset
                          onClick={() => {
                            setPopularity([0, 100]);
                            setValence([0, 1]);
                            setEnergy([0, 1]);
                            setAcousticness([0, 1]);
                            setDanceability([0, 1]);
                            setInstrumentalness([0, 1]);
                            setLiveness([0, 1]);
                            setSpeechiness([0, 1]);
                            setAdvSeedGenre([]);
                            setUrl(null);
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
                        <Spotify
                          size={20}
                          style={{ verticalAlign: "bottom" }}
                        />
                      </GreenButtonRoute>
                      <Reset
                        onClick={() => {
                          setPopularity([0, 100]);
                          setValence([0, 1]);
                          setEnergy([0, 1]);
                          setAcousticness([0, 1]);
                          setDanceability([0, 1]);
                          setInstrumentalness([0, 1]);
                          setLiveness([0, 1]);
                          setSpeechiness([0, 1]);
                          setAdvSeedGenre([]);
                          setUrl(null);
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
              </>
            ) : (
              <Loader />
            )}
          </Main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdvancedSelection;
