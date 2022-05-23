import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
  h1 {
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    font-weight: 900;
    margin: 0;
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0;
    padding-bottom: 2rem;
  }

  span {
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 1rem 0;
    letter-spacing: 0.2em;
    cursor: pointer;
    &:hover {
      color: #616467;
    }
  }
  ${media.tablet`
  display:none
  `};
`;
const SmallScreen = styled.div`
  display: none;
  ${media.tablet`
  display:flex;
  flex-direction: column;
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-top: 100px;
    padding-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
    padding-bottom: 2rem;
  }

  span {
    font-size: 1.2rem;
    font-weight: 300;
    text-transform: uppercase;
    padding: 0.8rem 0;
    width:50%;
    margin: 100px auto;
    letter-spacing: 0.2em;
    border: 1px solid white;
    border-radius:25px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #616467;
    }
  }
  `};
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <Container>
        <h1>404s and heartbreaks</h1>
        <p>We couldn’t find the page you were looking for.</p>
        <span onClick={() => navigate(-1)}>Go Back</span>
      </Container>
      <SmallScreen>
        <h1>404s and heartbreaks</h1>
        <p>We couldn’t find the page you were looking for.</p>
        <span onClick={() => navigate(-1)}>Go Back</span>
      </SmallScreen>
    </Main>
  );
};

export default NotFound;
