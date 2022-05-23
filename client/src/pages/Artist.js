import { useState, useEffect } from "react";
import { CatchErrors, FormatWithCommas } from "../utils";
import { getArtistInfo, getCurrentUserProfile } from "../Spotify";
import { Loader, TrackStyle, ArtistGrid, HeaderMini } from "../components";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
import { Spotify } from "react-bootstrap-icons";
const { colors, fontSizes, spacing } = theme;

const ArtistContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;

const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};
  ${media.tablet`
    font-size: 7vw;
  `};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;

const Stat = styled.div``;

const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;
const SpotifyButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
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
const Genre = styled.div`
  font-size: ${fontSizes.md};
`;

const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
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
const SectionContent = styled.section`
  width: 100%;
  margin-bottom: 70px;
  ${media.tablet`
    margin-top: 70px;
  `};
`;

const Artist = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const data = await getArtistInfo(id);
      setArtist(data.artist);
      setTopTracks(data.topTracks.tracks.slice(0, 5));
      setRelatedArtists(data.relatedArtists.artists.slice(0, 5));
    };
    CatchErrors(fetchData());
  }, [id]);

  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          {artist ? (
            <Main>
              {artist && (
                <ArtistContainer>
                  <Artwork>
                    <img src={artist.images[0].url} alt="Artist Artwork" />
                  </Artwork>
                  <div>
                    <ArtistName>{artist.name}</ArtistName>
                    <Stats>
                      <Stat>
                        <Number>
                          {FormatWithCommas(artist.followers.total)}
                        </Number>
                        <NumLabel>Followers</NumLabel>
                      </Stat>
                      {artist.genres && (
                        <Stat>
                          <Number>
                            {artist.genres.map((genre) => (
                              <Genre key={genre}>{genre}</Genre>
                            ))}
                          </Number>
                          <NumLabel>Genres</NumLabel>
                        </Stat>
                      )}
                      {artist.popularity && (
                        <Stat>
                          <Number>{artist.popularity}%</Number>
                          <NumLabel>Popularity</NumLabel>
                        </Stat>
                      )}
                    </Stats>
                    <SpotifyButton href={artist.external_urls.spotify}>
                      {`Open with `}
                      <Spotify size={25} style={{ verticalAlign: "bottom" }} />
                    </SpotifyButton>
                  </div>
                </ArtistContainer>
              )}
              <SectionHeadingContainer>
                <SectionHeading>Top Tracks</SectionHeading>
              </SectionHeadingContainer>
              <SectionContent>
                {topTracks && (
                  <>
                    <TrackStyle tracks={topTracks} />
                  </>
                )}
              </SectionContent>
              <SectionHeadingContainer>
                <SectionHeading>Similar Artists</SectionHeading>
              </SectionHeadingContainer>
              <SectionContent>
                {relatedArtists && (
                  <>
                    <ArtistGrid artists={relatedArtists} />
                  </>
                )}
              </SectionContent>
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

export default Artist;
