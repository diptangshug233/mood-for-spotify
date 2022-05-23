import { useState, useEffect } from "react";
import { CatchErrors, GetYear, PitchClass, FormatDuration } from "../utils";
import { useParams, Link } from "react-router-dom";
import { TrackAnalysis, AudioInfo, Loader, HeaderMini } from "../components";
import { getCurrentUserProfile, getTrackInfo } from "../Spotify";
import { Spotify } from "react-bootstrap-icons";

import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes } = theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  max-height: 250px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;
const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;
const Info = styled.div`
  flex-grow: 1;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;
const PlayTrackButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 12px 20px;
  margin: 20px 0 50px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;
const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;
const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: 20px;
  `};
  ${media.phablet`
    text-align: center !important;
  `};
`;
const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;
const AudioFeatures = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  ${media.tablet`
    margin-top: 200px;
  `};
`;
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  border-top: 1px solid ${colors.grey};
  border-left: 1px solid ${colors.grey};
  ${media.thone`
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  `};
`;
const Feature = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
`;
const FeatureText = styled.h4`
  color: ${colors.lightestGrey};
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0;
  ${media.tablet`
    font-size: 24px;
  `};
`;
const SmallScreen = styled.div`
  ${media.tablet`
    display:none`};
`;
const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.xs};
  margin-bottom: 0;
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
const Track = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [audioInfo, setAudioInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const data = await getTrackInfo(id);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    CatchErrors(fetchData());
  }, [id]);
  const toggleAudioInfo = () => {
    setAudioInfo((prev) => !prev);
  };

  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          {track ? (
            <Main>
              <TrackContainer>
                <Artwork>
                  <img src={track.album.images[0].url} alt="Album Artwork" />
                </Artwork>
                <Info>
                  <Title>{track.name}</Title>
                  <ArtistName>
                    {track.artists &&
                      track.artists.map(({ name, id }, i) => (
                        <span key={i}>
                          <Link to={`/artist/${id}`}>{name}</Link>
                          {track.artists.length > 0 &&
                          i === track.artists.length - 1
                            ? ""
                            : ","}
                          &nbsp;
                        </span>
                      ))}
                  </ArtistName>
                  <Album>
                    <Link to={`/album/${track.album.id}`}>
                      {track.album.name}
                    </Link>{" "}
                    &middot; {GetYear(track.album.release_date)}
                  </Album>
                  <PlayTrackButton
                    href={track.external_urls.spotify}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {`Open with `}
                    <Spotify size={20} style={{ verticalAlign: "bottom" }} />
                  </PlayTrackButton>
                </Info>
              </TrackContainer>

              {audioFeatures && audioAnalysis && (
                <AudioFeatures>
                  <Features>
                    <Feature>
                      <FeatureText>
                        {FormatDuration(audioFeatures.duration_ms)}
                      </FeatureText>
                      <FeatureLabel>Duration</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{PitchClass(audioFeatures.key)}</FeatureText>
                      <FeatureLabel>Key</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>
                        {audioFeatures.mode === 1 ? "Major" : "Minor"}
                      </FeatureText>
                      <FeatureLabel>Modality</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{audioFeatures.time_signature}</FeatureText>
                      <FeatureLabel>Time Signature</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>
                        {Math.round(audioFeatures.tempo)}
                      </FeatureText>
                      <FeatureLabel>Tempo (BPM)</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{track.popularity}%</FeatureText>
                      <FeatureLabel>Popularity</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{audioAnalysis.bars.length}</FeatureText>
                      <FeatureLabel>Bars</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                      <FeatureLabel>Beats</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{audioAnalysis.sections.length}</FeatureText>
                      <FeatureLabel>Sections</FeatureLabel>
                    </Feature>
                    <Feature>
                      <FeatureText>{audioAnalysis.segments.length}</FeatureText>
                      <FeatureLabel>Segments</FeatureLabel>
                    </Feature>
                  </Features>
                </AudioFeatures>
              )}
              <SmallScreen>
                <SectionHeadingContainer>
                  <SectionHeading>Audio Features</SectionHeading>
                  <InfoButton onClick={toggleAudioInfo}>
                    <span>Learn More</span>
                  </InfoButton>
                </SectionHeadingContainer>
                <div style={{ width: "95%", margin: "0 auto 50px auto" }}>
                  {audioInfo && <AudioInfo />}
                </div>
                <TrackAnalysis audioFeatures={audioFeatures} />
              </SmallScreen>
            </Main>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Track;
