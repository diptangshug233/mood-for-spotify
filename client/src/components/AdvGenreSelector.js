import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

const genres = [
  "Acoustic",
  "Afrobeat",
  "Alt-Rock",
  "Alternative",
  "Ambient",
  "Anime",
  "Black-Metal",
  "Bluegrass",
  "Blues",
  "Bossanova",
  "Brazil",
  "Breakbeat",
  "British",
  "Cantopop",
  "Chicago-House",
  "Children",
  "Chill",
  "Classical",
  "Club",
  "Comedy",
  "Country",
  "Dance",
  "Dancehall",
  "Death-Metal",
  "Deep-House",
  "Detroit-Techno",
  "Disco",
  "Disney",
  "Drum-and-Bass",
  "Dub",
  "Dubstep",
  "EDM",
  "Electro",
  "Electronic",
  "Emo",
  "Folk",
  "Forro",
  "French",
  "Funk",
  "Garage",
  "German",
  "Gospel",
  "Goth",
  "Grindcore",
  "Groove",
  "Grunge",
  "Guitar",
  "Happy",
  "Hard-Rock",
  "Hardcore",
  "Hardstyle",
  "Heavy-Metal",
  "Hip-Hop",
  "Holidays",
  "Honky-Tonk",
  "House",
  "IDM",
  "Indian",
  "Indie",
  "Indie-Pop",
  "Industrial",
  "Iranian",
  "J-Dance",
  "J-Idol",
  "J-Pop",
  "J-Rock",
  "Jazz",
  "K-Pop",
  "Kids",
  "Latin",
  "Latino",
  "Malay",
  "Mandopop",
  "Metal",
  "Metal-Misc",
  "Metalcore",
  "Minimal-Techno",
  "Movies",
  "MPB",
  "New-Age",
  "New-Release",
  "Opera",
  "Pagode",
  "Party",
  "Philippines-OPM",
  "Piano",
  "Pop",
  "Pop-Film",
  "Post-Dubstep",
  "Power-Pop",
  "Progressive-House",
  "Psych-Rock",
  "Punk",
  "Punk-Rock",
  "R-n-B",
  "Rainy-Day",
  "Reggae",
  "Reggaeton",
  "Road-Trip",
  "Rock",
  "Rock-n-Roll",
  "Rockabilly",
  "Romance",
  "Sad",
  "Salsa",
  "Samba",
  "Sertanejo",
  "Show-Tunes",
  "Singer-Songwriter",
  "Ska",
  "Sleep",
  "Songwriter",
  "Soul",
  "Soundtracks",
  "Spanish",
  "Study",
  "Summer",
  "Swedish",
  "Synth-Pop",
  "Tango",
  "Techno",
  "Trance",
  "Trip-Hop",
  "Turkish",
  "Work-Out",
  "World-Music",
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

const AdvGenreSelector = (props) => {
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

export default AdvGenreSelector;
