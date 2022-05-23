import { useState, useEffect } from "react";
import { getCurrentUserProfile, getTopArtists } from "../Spotify";
import { CatchErrors } from "../utils";
import { Loader, ArtistGrid, HeaderMini } from "../components";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";

const { colors, fontSizes } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h1 {
    font-size: 50px;
    margin: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
  margin-right: -11px;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid
      ${(props) => (props.isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;

const TopArtists = () => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopArtists("long", 50),
    medium: getTopArtists("medium", 50),
    short: getTopArtists("short", 50),
  };
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const { data } = await getTopArtists("long", 50);
      setTopArtists(data);
    };
    CatchErrors(fetchData());
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
    setActiveRange(range);
  };

  const setRangeData = (range) => CatchErrors(changeRange(range));
  return (
    <>
      {profile ? (
        <>
          <HeaderMini profile={profile} />
          <Main>
            <Header>
              <h1>Top Artists...</h1>
              <Ranges>
                <RangeButton
                  isActive={activeRange === "long"}
                  onClick={() => setRangeData("long")}
                >
                  <span>All Time</span>
                </RangeButton>
                <RangeButton
                  isActive={activeRange === "medium"}
                  onClick={() => setRangeData("medium")}
                >
                  <span>Last 6 Months</span>
                </RangeButton>
                <RangeButton
                  isActive={activeRange === "short"}
                  onClick={() => setRangeData("short")}
                >
                  <span>Last 4 Weeks</span>
                </RangeButton>
              </Ranges>
            </Header>
            {topArtists ? (
              <>
                <ArtistGrid artists={topArtists.items} />
              </>
            ) : (
              <Loader />
            )}
          </Main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TopArtists;
