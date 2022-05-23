import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Electronic",
  "Indie",
  "Metal",
  "Punk",
  "Classical",
  "Alternative",
  "Chill",
  "Country",
  "Techno",
];

const Wrapper = styled.div`
  display: flex;
  width: 95%;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
`;
const GenreButton = styled(Button)`
  color: ${({ selected }) => (selected ? "#181818" : "white")};
  font-weight: ${({ selected }) => selected && "bold"};
  background-color: ${({ selected }) => selected && "white"};
`;

const GenreSelector = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const buttonClickHandler = (genre) => () => {
    const newSelectedGenres = [...selectedGenres];
    if (selectedGenres.includes(genre)) {
      newSelectedGenres.splice(selectedGenres.indexOf(genre), 1);
    } else if (selectedGenres.length < 5) {
      newSelectedGenres.push(genre);
    } else {
      return;
    }
    setSelectedGenres(newSelectedGenres);
    props.setProperties(newSelectedGenres);
  };
  return (
    <>
      <Wrapper>
        {genres.map((genre, i) => (
          <GenreButton
            key={i}
            selected={selectedGenres.includes(genre)}
            onClick={buttonClickHandler(genre)}
          >
            {genre}
          </GenreButton>
        ))}
      </Wrapper>
    </>
  );
};

export default GenreSelector;
