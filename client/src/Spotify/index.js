import axios from "axios";

// localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

//localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

//checks if the accesstoken has expired
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

//logout
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

//refresh accesstoken using refreshtoken
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }
    // Use `/refresh_token` endpoint from our server
    const { data } = await axios.get(
      `http://localhost:8888/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

//returns accesstoken
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };

  const hasError = urlParams.get("error");

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params i.e. the user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  return false;
};

export const accessToken = getAccessToken();

//axios setup
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

//current profile
export const getCurrentUserProfile = () => axios.get("/me");

//get album
export const getAlbum = (albumId) => axios.get(`/albums/${albumId}`);

//top artists
export const getTopArtists = (time_range, limit = 5) => {
  return axios.get(
    `/me/top/artists?time_range=${time_range}_term&limit=${limit}`
  );
};

//top tracks
export const getTopTracks = (time_range, limit = 5) => {
  return axios.get(
    `/me/top/tracks?time_range=${time_range}_term&limit=${limit}`
  );
};

//recent tracks
export const getRecentlyPlayed = (limit) => {
  return axios.get(`/me/player/recently-played?limit=${limit}`);
};

//audio features
export const getAudioFeaturesForTracks = (ids) => {
  return axios.get(`/audio-features?ids=${ids}`);
};

//recommendations small
export const getRecommendationsSmall = (
  genreSum,
  minEnergy,
  maxEnergy,
  minValence,
  maxValence
) => {
  return axios.get(
    `/recommendations?limit=100&seed_genres=${genreSum}&min_valence=${minValence}&max_valence=${maxValence}&min_energy=${minEnergy}&max_energy=${maxEnergy}`
  );
};

//recommendations large
export const getRecommendationsLarge = (string) => {
  return axios.get(`/recommendations?limit=100${string}`);
};

//create playlist
export const createPlaylist = (user_id) => {
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
  const name = "MOOD for Spotify";
  const description = "Recommended music based on your MOOD";
  const data = JSON.stringify({ name, description });
  return axios({ method: "post", url, data });
};

//add items to playlist
export const addTracksToPlaylist = (playlist_id, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${uris}`;
  return axios({ method: "post", url });
};

//get artist
export const getArtist = (artistId) => axios.get(`/artists/${artistId}`);

//get artist top tracks
export const getArtistTopTracks = (artistId) =>
  axios.get(`/artists/${artistId}/top-tracks?market=US`);

//get related artists
export const getRelatedArtists = (artistId) =>
  axios.get(`/artists/${artistId}/related-artists`);

export const getArtistInfo = (artistId) =>
  axios
    .all([
      getArtist(artistId),
      getArtistTopTracks(artistId),
      getRelatedArtists(artistId),
    ])
    .then(
      axios.spread((artist, topTracks, relatedArtists) => ({
        artist: artist.data,
        topTracks: topTracks.data,
        relatedArtists: relatedArtists.data,
      }))
    );

//get track
export const getTrack = (trackId) => axios.get(`/tracks/${trackId}`);

//get audio analysis for a single track
export const getTrackAudioAnalysis = (trackId) =>
  axios.get(`/audio-analysis/${trackId}`);

//get audio features for a track
export const getTrackAudioFeatures = (trackId) =>
  axios.get(`/audio-features/${trackId}`);

export const getTrackInfo = (trackId) =>
  axios
    .all([
      getTrack(trackId),
      getTrackAudioAnalysis(trackId),
      getTrackAudioFeatures(trackId),
    ])
    .then(
      axios.spread((track, audioAnalysis, audioFeatures) => ({
        track: track.data,
        audioAnalysis: audioAnalysis.data,
        audioFeatures: audioFeatures.data,
      }))
    );
