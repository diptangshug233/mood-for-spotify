import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, mixins, media } from "../styles";
import { InfoCircleFill } from "react-bootstrap-icons";
import { FormatDuration } from "../utils";

const { colors, fontSizes, spacing } = theme;

const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.sm};
  padding: 5px;

  ${media.tablet`
    margin-bottom: ${spacing.base};
  `};
  border-radius: 4px;

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
    background-color: ${colors.grey};
  }
`;
const TracksContainerMain = styled.ul``;
const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
`;
const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;
const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
`;
const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`;
const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;
const ArtistLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
const AlbumLink = styled(Link)`
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const TrackStyle = ({ tracks }) => {
  return (
    <>
      <TracksContainerMain>
        {tracks.map((track, i) => {
          return (
            <>
              <li key={i}>
                <TrackContainer
                  to={
                    track.id ? `/track/${track.id}` : `/track/${track.track.id}`
                  }
                >
                  <div>
                    <TrackArtwork>
                      {track.album ? (
                        <img src={track.album.images[2].url} alt={track.name} />
                      ) : (
                        <img
                          src={track.track.album.images[2].url}
                          alt={track.track.name}
                        />
                      )}
                      <Mask>
                        <InfoCircleFill />
                      </Mask>
                    </TrackArtwork>
                  </div>
                  <TrackMeta>
                    <TrackLeft>
                      <TrackName>
                        {track.name ? track.name : track.track.name}
                      </TrackName>
                      <TrackAlbum>
                        {track.artists
                          ? track.artists.map(({ name, id }, i) => (
                              <span key={i}>
                                <ArtistLink to={`/artist/${id}`}>
                                  {name}
                                </ArtistLink>
                                {track.artists.length > 0 &&
                                i === track.artists.length - 1
                                  ? ""
                                  : ","}
                                &nbsp;
                              </span>
                            ))
                          : track.track.artists.map(({ name, id }, i) => (
                              <span key={i}>
                                <ArtistLink to={`/artist/${id}`}>
                                  {name}
                                </ArtistLink>
                                {track.track.artists.length > 0 &&
                                i === track.track.artists.length - 1
                                  ? ""
                                  : ","}
                                &nbsp;
                              </span>
                            ))}
                        &nbsp;&middot;&nbsp;&nbsp;
                        <AlbumLink to={track.album ? `/album/${track.album.id}` : `/album/${track.track.album.id}`}>
                          {track.album
                            ? track.album.name
                            : track.track.album.name}
                        </AlbumLink>
                      </TrackAlbum>
                    </TrackLeft>
                    <TrackRight>
                      <TrackDuration>
                        {FormatDuration(
                          track.duration_ms
                            ? track.duration_ms
                            : track.track.duration_ms
                        )}
                      </TrackDuration>
                    </TrackRight>
                  </TrackMeta>
                </TrackContainer>
              </li>
            </>
          );
        })}
      </TracksContainerMain>
    </>
  );
};

export default TrackStyle;
