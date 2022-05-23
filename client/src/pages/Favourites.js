import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUserProfile, getTopArtists, getTopTracks } from "../Spotify";
import { CatchErrors } from "../utils";
import { HeaderMini, Loader, PreviewArtists, TrackStyle } from "../components";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { fontSizes, spacing } = theme;
const PreviewGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  width: 100%;
  margin-bottom: 70px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `};
`;
const PreviewItem = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;
const ItemHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: ${spacing.md};
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
const MoreButton = styled(Link)`
  ${mixins.button};
  text-align: center;
  white-space: nowrap;
  ${media.phablet`
    padding: 11px 20px;
    font-sizes: ${fontSizes.xs};
  `};
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
const Favourites = () => {
  const [profile, setProfile] = useState(null);
  const [topArtistsShort, setTopArtistsShort] = useState(null);
  const [topArtistsMed, setTopArtistsMed] = useState(null);
  const [topArtistsLong, setTopArtistsLong] = useState(null);
  const [topTracksShort, setTopTracksShort] = useState(null);
  const [topTracksMed, setTopTracksMed] = useState(null);
  const [topTracksLong, setTopTracksLong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const shortTimeArtistsData = await getTopArtists("short");
      setTopArtistsShort(shortTimeArtistsData.data);

      const mediumTimeArtistsData = await getTopArtists("medium");
      setTopArtistsMed(mediumTimeArtistsData.data);

      const longTimeArtistsData = await getTopArtists("long");
      setTopArtistsLong(longTimeArtistsData.data);

      const shortTimeTracksData = await getTopTracks("short");
      setTopTracksShort(shortTimeTracksData.data);

      const mediumTimeTracksData = await getTopTracks("medium");
      setTopTracksMed(mediumTimeTracksData.data);

      const longTimeTracksData = await getTopTracks("long");
      setTopTracksLong(longTimeTracksData.data);
    };
    CatchErrors(fetchData());
  }, []);

  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          <Main>
            <h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
              How your favorite music has changed over time...
            </h1>
            <SectionHeadingContainer>
              <SectionHeading>Top Artists</SectionHeading>
              <MoreButton to="/topartists">See More</MoreButton>
            </SectionHeadingContainer>
            {topArtistsShort && topArtistsMed && topArtistsLong ? (
              <>
                <PreviewGrid>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Long time ago</h3>
                    </ItemHeading>
                    <PreviewArtists artists={topArtistsLong.items} />
                  </PreviewItem>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Months earlier</h3>
                    </ItemHeading>
                    <PreviewArtists artists={topArtistsMed.items} />
                  </PreviewItem>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Nowadays</h3>
                    </ItemHeading>
                    <PreviewArtists artists={topArtistsShort.items} />
                  </PreviewItem>
                </PreviewGrid>
              </>
            ) : (
              <Loader />
            )}
            <SectionHeadingContainer>
              <SectionHeading>Top Tracks</SectionHeading>
              <MoreButton to="/toptracks">See More</MoreButton>
            </SectionHeadingContainer>
            {topTracksShort && topTracksMed && topTracksLong ? (
              <>
                <PreviewGrid>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Long time ago</h3>
                    </ItemHeading>
                    <TrackStyle tracks={topTracksLong.items} />
                  </PreviewItem>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Months earlier</h3>
                    </ItemHeading>
                    <TrackStyle tracks={topTracksMed.items} />
                  </PreviewItem>
                  <PreviewItem>
                    <ItemHeading>
                      <h3>Nowadays</h3>
                    </ItemHeading>
                    <TrackStyle tracks={topTracksShort.items} />
                  </PreviewItem>
                </PreviewGrid>
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

export default Favourites;
