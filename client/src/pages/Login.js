import styled from "styled-components";
import { theme, mixins, Main } from "../styles";
import { Spotify, Github } from "react-bootstrap-icons";

const { colors, fontSizes } = theme;

const LoginScreen = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
`;
const LoginButton = styled.a`
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
const Plug = styled.a`
  &:hover,
  &:focus,
  &.active {
    color: ${colors.blue};
  }
`;
const Fancy = styled.span`
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff4000,
    #ff9000,
    #ffc000,
    #ffe000,
    #fff000,
    #ffe0a3,
    #ffa0a3,
    #ff50f3,
    #ff00f3,
    #af00ff,
    #6000ff,
    #2000ff,
    #1033ff,
    #0033ff,
    #4033ff,
    #9f00c4,
    #bf00c4,
    #ff00c4,
    #ff00a0,
    #ff0040,
    #ff0000
  );
  background-size: 400%;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: animate 10s ease infinite;
  animation-direction: alternate;
  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
`;
const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 130px;
  }
  .shape-fill {
    fill: #1db954;
  }
`;

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://mood-for-spotify.herokuapp.com/login";

const Login = () => {
  return (
    <>
      <LoginScreen>
        <h1>MOOD for Spotify</h1>
        <h1>
          Discover music that matches your <Fancy>MOOD</Fancy>
        </h1>
        <LoginButton href={LOGIN_URI}>
          {`Log in with `}
          <Spotify size={25} style={{ verticalAlign: "bottom" }} />
        </LoginButton>
        <footer>
          {"Made by "}
          <Plug
            href="https://github.com/diptangshug233"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github size={20} style={{ verticalAlign: "bottom" }} /> Diptangshu
          </Plug>
        </footer>
      </LoginScreen>
      <Divider>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </Divider>
    </>
  );
};

export default Login;
