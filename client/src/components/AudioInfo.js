import styled from "styled-components";

const Details = styled.p`
  margin-bottom: 25px;
`;

const InfoModal = () => {
  return (
    <>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "0.5%",
          padding: "3%",
        }}
      >
        <h3>Acousticness</h3>
        <Details>
          A confidence measure from 0.0 to 100.0 of whether the track is
          acoustic. 100.0 represents high confidence the track is acoustic.
        </Details>

        <h3>Danceability</h3>
        <Details>
          Danceability describes how suitable a track is for dancing based on a
          combination of musical elements including tempo, rhythm stability,
          beat strength, and overall regularity. A value of 0.0 is least
          danceable and 100.0 is most danceable.
        </Details>

        <h3>Energy</h3>
        <Details>
          Energy is a measure from 0.0 to 100.0 and represents a perceptual
          measure of intensity and activity. Typically, energetic tracks feel
          fast, loud, and noisy. For example, death metal has high energy, while
          a Bach prelude scores low on the scale. Perceptual features
          contributing to this attribute include dynamic range, perceived
          loudness, timbre, onset rate, and general entropy.
        </Details>

        <h3>Instrumentalness</h3>
        <Details>
          Predicts whether a track contains no vocals. "Ooh" and "aah" sounds
          are treated as instrumental in this context. Rap or spoken word tracks
          are clearly "vocal". The closer the instrumentalness value is to
          100.0, the greater likelihood the track contains no vocal content.
          Values above 50.0 are intended to represent instrumental tracks, but
          confidence is higher as the value approaches 100.0.
        </Details>
        <h3>Liveness</h3>
        <Details>
          Detects the presence of an audience in the recording. Higher liveness
          values represent an increased probability that the track was performed
          live. A value above 80 provides strong likelihood that the track is
          live.
        </Details>
        <h3>Speechiness</h3>
        <Details>
          Speechiness detects the presence of spoken words in a track. The more
          exclusively speech-like the recording (e.g. talk show, audio book,
          poetry), the closer to 100 the attribute value. Values above 66
          describe tracks that are probably made entirely of spoken words.
          Values between 33 and 66 describe tracks that may contain both music
          and speech, either in sections or layered, including such cases as rap
          music. Values below 33 most likely represent music and other
          non-speech-like tracks.
        </Details>
        <h3>Valence</h3>
        <p>
          A measure from 0.0 to 100.0 describing the musical positiveness
          conveyed by a track. Tracks with high valence sound more positive
          (e.g. happy, cheerful, euphoric), while tracks with low valence sound
          more negative (e.g. sad, depressed, angry).
        </p>
      </div>
    </>
  );
};

export default InfoModal;
