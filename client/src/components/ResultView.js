import TrackStyle from "./TrackStyle";
const ResultView = ({ recommendations }) => {
  //TODO: add image
  return (
    <>
      <TrackStyle tracks={recommendations} />
    </>
  );
};

export default ResultView;
