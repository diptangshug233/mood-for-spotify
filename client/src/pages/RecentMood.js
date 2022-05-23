import { useState, useEffect } from "react";
import {
  MoodChart,
  TrackStyle,
  AudioInfo,
  Loader,
  HeaderMini,
} from "../components";
import {
  getRecentlyPlayed,
  getAudioFeaturesForTracks,
  getCurrentUserProfile,
} from "../Spotify";
import { CatchErrors } from "../utils";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { fontSizes, colors } = theme;

const InfoButton = styled.button`
  background-color: transparent;
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    color: ${colors.blue};
    line-height: 1.5;
    white-space: nowrap;
    &:hover,
    &:focus {
      text-decoration: underline;
      text-decoration-color: ${colors.blue};
    }
  }
`;

const SectionHeading = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;
const SectionHeadingContainer = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 20px;
  h1 {
    display: inline-block;
    margin: 0;
  }
`;
const SmallScreen = styled.div`
  ${media.tablet`
    display:none`};
`;
const SectionContent = styled.section`
  width: 100%;
  margin-bottom: 70px;
  ${media.tablet`
    margin-top: 70px;
  `};
`;
const RecentMood = () => {
  const [profile, setProfile] = useState(null);
  const [recentShort, setRecentShort] = useState(null);
  const [recentLong, setRecentLong] = useState(null);
  const [audioFeaturesSmall, setAudioFeaturesSmall] = useState(null);
  const [audioFeaturesLong, setAudioFeaturesLong] = useState(null);
  const [audioInfo, setAudioInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const { data } = await getRecentlyPlayed(25);
      setRecentShort(data.items.slice(0, 5));
      setRecentLong(data.items.slice(5, 25));
    };
    CatchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!recentShort || !recentLong) {
      return;
    }
    const fetchAudioFeatures = async () => {
      const idsShort = recentShort.map(({ track }) => track.id).join(",");
      const dataShort = await getAudioFeaturesForTracks(idsShort);
      setAudioFeaturesSmall(dataShort.data["audio_features"]);

      const idsLong = recentLong.map(({ track }) => track.id).join(",");
      const dataLong = await getAudioFeaturesForTracks(idsLong);
      setAudioFeaturesLong(dataLong.data["audio_features"]);
    };
    CatchErrors(fetchAudioFeatures());
  }, [recentLong, recentShort]);

  const toggleAudioInfo = () => {
    setAudioInfo((prev) => !prev);
  };
  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          <Main>
            <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
              How your music style is changing currently...
            </h1>
            <SmallScreen>
              <SectionHeadingContainer>
                <SectionHeading>
                  Audio Features of Your Recent Tracks
                </SectionHeading>
                <InfoButton onClick={toggleAudioInfo}>
                  <span>Learn More</span>
                </InfoButton>
              </SectionHeadingContainer>
              <div style={{ width: "95%", margin: "0 auto 50px auto" }}>
                {audioInfo && <AudioInfo />}
              </div>
              <SectionContent>
                {audioFeaturesSmall && audioFeaturesLong ? (
                  <>
                    <MoodChart
                      featuresShort={audioFeaturesSmall}
                      featuresLong={audioFeaturesLong}
                    />
                  </>
                ) : (
                  <Loader />
                )}
              </SectionContent>
            </SmallScreen>
            <SectionHeadingContainer>
              <SectionHeading>Recent Tracks</SectionHeading>
            </SectionHeadingContainer>
            <SectionContent>
              {audioFeaturesLong ? (
                <>
                  <TrackStyle tracks={recentShort} />
                </>
              ) : (
                <Loader />
              )}
            </SectionContent>
          </Main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RecentMood;
