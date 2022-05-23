import { useState, useEffect } from "react";
import { CatchErrors, GetYear } from "../utils";
import { useParams, Link } from "react-router-dom";
import { AlbumTracks, HeaderMini, Loader } from "../components";
import { getAlbum, getCurrentUserProfile } from "../Spotify";
import { Spotify } from "react-bootstrap-icons";

import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { colors } = theme;
const AlbumContainer = styled.div`
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
const AlbumSpan = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
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
  ${media.tablet`
    margin-top: 200px;
  `};
`;
const AlbumTracksContainer = styled.div`
  ${media.tablet`
    margin-bottom: 50px;
  `};
`;
const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const { data } = await getAlbum(id);
      setAlbum(data);
      setAlbumTracks(data.tracks.items);
    };
    CatchErrors(fetchData());
  }, [id]);

  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          {album ? (
            <Main>
              <AlbumContainer>
                <Artwork>
                  <img src={album.images[0].url} alt="Album Artwork" />
                </Artwork>
                <Info>
                  <Title>{album.name}</Title>
                  <ArtistName>
                    {album.artists &&
                      album.artists.map(({ name, id }, i) => (
                        <span key={i}>
                          <Link to={`/artist/${id}`}>{name}</Link>
                          {album.artists.length > 0 &&
                          i === album.artists.length - 1
                            ? ""
                            : ","}
                          &nbsp;
                        </span>
                      ))}
                  </ArtistName>
                  <AlbumSpan>
                    {album.total_tracks}
                    {album.total_tracks === 1
                      ? ` song`
                      : ` songs`} &middot; {GetYear(album.release_date)}
                  </AlbumSpan>
                  <PlayTrackButton
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {`Open with `}
                    <Spotify size={20} style={{ verticalAlign: "bottom" }} />
                  </PlayTrackButton>
                </Info>
              </AlbumContainer>
              <SectionHeadingContainer>
                <SectionHeading>Tracks</SectionHeading>
              </SectionHeadingContainer>
              <AlbumTracksContainer>
                {albumTracks && (
                  <>
                    <AlbumTracks tracks={albumTracks} />
                  </>
                )}
              </AlbumTracksContainer>
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

export default Album;
