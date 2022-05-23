import { useEffect, useState, useLayoutEffect } from "react";
import { accessToken, getCurrentUserProfile } from "./Spotify";
import { CatchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  Login,
  Filler,
  Main,
  RecentMood,
  Favourites,
  AdvancedSelection,
  Artist,
  Track,
  Album,
  TopTracks,
  TopArtists,
  NotFound,
} from "./pages";
import { GlobalStyle } from "./styles";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchProfile = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    CatchErrors(fetchProfile());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <Router>
              <Wrapper>
                <Routes>
                  <Route path="/main" element={<Main />} />
                  <Route path="/recentmood" element={<RecentMood />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route
                    path="/advancedselection"
                    element={<AdvancedSelection />}
                  />
                  <Route path="/topartists" element={<TopArtists />} />
                  <Route path="/toptracks" element={<TopTracks />} />
                  <Route path="/artist/:id" element={<Artist />} />
                  <Route path="/track/:id" element={<Track />} />
                  <Route path="/album/:id" element={<Album />} />
                  <Route path="/" element={<Filler />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Wrapper>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
