import { useState, useEffect } from "react";
import { getCurrentUserProfile, getTopTracks } from "../Spotify";
import { CatchErrors } from "../utils";
import { HeaderMini, Loader, TrackStyle } from "../components";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";

const { colors, fontSizes } = theme;
//TODO: fix album links
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

const TopTracks = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopTracks("long", 50),
    medium: getTopTracks("medium", 50),
    short: getTopTracks("short", 50),
  };
  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getCurrentUserProfile();
      setProfile(profileData.data);
      const { data } = await getTopTracks("long", 50);
      setTopTracks(data);
    };
    CatchErrors(fetchData());
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopTracks(data);
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
              <h1>Top Tracks...</h1>
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
            {topTracks ? (
              <>
                <div style={{ marginTop: "50px" }}>
                  <TrackStyle tracks={topTracks.items} />
                </div>
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

export default TopTracks;
