import { logout } from "../Spotify";
import { theme, mixins, media } from "../styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  BoxArrowRight,
  StarFill,
  ClockHistory,
  Sliders,
  HouseFill,
} from "react-bootstrap-icons";
const { colors } = theme;

const LogoutButton = styled.a`
  display: inline-block;
  color: ${colors.white};
  padding-left: 10px;
  color: ${colors.lightGrey};
  text-align: center;
  &:hover,
  &:focus,
  &.active {
    color: ${colors.white};
  }
`;
const Nav = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  height: 50px;
  width: 100vw;
  background-color: ${colors.navBlack};
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
    justify-content: space-around;
  `};
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
const Logo = styled.div`
  margin-left: 140px;
  margin-right: 30px;
  transition: ${theme.transition};
  cursor: pointer;
  ${media.tablet`
    display: none;
  `};
  &:hover,
  &:focus {
    color: ${colors.white};
  }
`;
const Menu = styled.div`
  justify-self: center;
  display: flex;
  height: 100%;
`;
const MenuItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 15px 0 15px;
  flex-direction: column;
  color: ${colors.lightGrey};
  ${media.tablet`
    display: none;
  `};
  &:hover,
  &:focus {
    border-bottom: 2px solid ${colors.green};
    color: ${colors.white};
  }
`;
const Navlink = styled(Link)`
  height: 100%;
`;
const Left = styled.div`
  ${mixins.flexCenter}
`;
const SmallScreen = styled.div`
  display: none;
  ${media.tablet`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 15px 0 15px;
  flex-direction: column;
  color: ${colors.lightGrey};
  `};
  &:hover,
  &:focus {
    border-bottom: 2px solid ${colors.green};
    color: ${colors.white};
  }
`;
const Profile = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 140px;
  transition: ${theme.transition};
  ${media.tablet`
    display: none;
  `};
`;
const ProfileLink = styled.a`
  color: ${colors.green};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const Header = ({ profile }) => {
  return (
    <>
      <Nav>
        <Left>
          <Logo onClick={() => window.location.reload()}>
            <h1 style={{ marginBottom: 0 }}>
              <Fancy>MOOD</Fancy> for Spotify
            </h1>
          </Logo>
          <Menu>
            <Navlink to="/main">
              <SmallScreen>
                <HouseFill size={20} />
              </SmallScreen>
            </Navlink>
            <Navlink to="/favourites">
              <MenuItem>Favourites</MenuItem>
              <SmallScreen>
                <StarFill size={20} />
              </SmallScreen>
            </Navlink>
            <Navlink to="/recentmood">
              <MenuItem>Recent MOOD</MenuItem>
              <SmallScreen>
                <ClockHistory size={20} />
              </SmallScreen>
            </Navlink>
            <Navlink to="/advancedselection">
              <MenuItem>Advanced Selection</MenuItem>
              <SmallScreen>
                <Sliders size={20} />
              </SmallScreen>
            </Navlink>
            <SmallScreen>
              <LogoutButton onClick={logout}>
                <BoxArrowRight size={18} style={{ verticalAlign: "bottom" }} />
              </LogoutButton>
            </SmallScreen>
          </Menu>
        </Left>
        <Profile>
          <p style={{ marginBottom: "0" }}>
            Logged in as{" "}
            <ProfileLink
              href={profile.external_urls.spotify}
              rel="noopener noreferrer"
              target="_blank"
            >
              {profile.display_name}
            </ProfileLink>
          </p>

          <LogoutButton onClick={logout}>
            <BoxArrowRight size={18} style={{ verticalAlign: "bottom" }} />
          </LogoutButton>
        </Profile>
      </Nav>
    </>
  );
};

export default Header;
