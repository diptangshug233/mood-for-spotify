import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme, mixins, Main } from "../styles";

const { colors, fontSizes } = theme;

const FillerScreen = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
`;
const Start = styled(Link)`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 200px;
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

const Filler = () => {
  return (
    <>
      <FillerScreen>
        <h1>Let's discover some good music!!</h1>
        <Start to="/main">Get Started</Start>
      </FillerScreen>
    </>
  );
};

export default Filler;
