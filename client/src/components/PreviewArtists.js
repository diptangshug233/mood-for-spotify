import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, mixins, media } from "../styles";
import { InfoCircleFill } from "react-bootstrap-icons";

const { colors, spacing } = theme;

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
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;

const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin-right: ${spacing.base};
    border-radius: 100%;
  }
`;

const ArtistsContainer = styled.ul``;

const ArtistName = styled(Link)`
  flex-grow: 1;
  span {
    border-bottom: 1px solid transparent;
  }
`;

const Artist = styled.li`
  display: flex;
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
const PreviewArtists = ({ artists }) => {
  return (
    <>
      <ArtistsContainer>
        {artists.map((artist, i) => {
          return (
            <>
              <Artist key={i}>
                <ArtistArtwork to={`/artist/${artist.id}`}>
                  {artist.images.length && (
                    <img src={artist.images[0].url} alt={artist.name} />
                  )}
                  <Mask>
                    <InfoCircleFill />
                  </Mask>
                </ArtistArtwork>
                <ArtistName to={`/artist/${artist.id}`}>
                  <span>{artist.name}</span>
                </ArtistName>
              </Artist>
            </>
          );
        })}
      </ArtistsContainer>
    </>
  );
};

export default PreviewArtists;
