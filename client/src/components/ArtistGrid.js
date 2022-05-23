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
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;

const ArtistName = styled(Link)`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ArtistGrid = ({ artists }) => {
  return (
    <>
      <ArtistsContainer>
        {artists.map((artist, i) => {
          return (
            <>
              <Artist key={i}>
                <ArtistArtwork to={`/artist/${artist.id}`}>
                  {artist.images.length && (
                    <img src={artist.images[1].url} alt={artist.name} />
                  )}
                  <Mask>
                    <InfoCircleFill />
                  </Mask>
                </ArtistArtwork>
                <ArtistName to={`/artist/${artist.id}`}>
                  {artist.name}
                </ArtistName>
              </Artist>
            </>
          );
        })}
      </ArtistsContainer>
    </>
  );
};

export default ArtistGrid;
