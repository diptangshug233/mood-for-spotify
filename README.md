# Mood for Spotify

Mood for Spotify is a single-page application built using React and Styled-Components. It allows users to visualize personalized Spotify data. Users can also create new playlists using their own custom filters.

## Setup

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8888/callback` as a Redirect URI in the app settings
1. Create an `.env` file in the root of the project.
1. Install dependencies in both `client` and `server` directories using `npm install`. 
1. From the `client` directory: `npm start`.
1. From the `server` directory: `npm run server`.
1. Visit `http://localhost:3000/`

## Deploying to Heroku

1. Create new heroku app

   ```bash
   heroku create app-name
   ```

2. Set Heroku environment variables

   ```bash
   heroku config:set CLIENT_ID=XXXXX
   heroku config:set CLIENT_SECRET=XXXXX
   heroku config:set REDIRECT_URI=https://app-name.herokuapp.com/callback
   heroku config:set FRONTEND_URI=https://app-name.herokuapp.com
   ```

3. Push to Heroku

   ```bash
   git push heroku master
   ```

4. Add `http://app-name.herokuapp.com/callback` as a Redirect URI in the spotify application settings

5. Once the app is live on Heroku, hitting http://app-name.herokuapp.com/login should be the same as hitting http://localhost:8888/login

## Tech Stack

- React
- Styled-Components
- Node.JS
- Express

## Dependencies

- axios
- cors
- dotenv
- express
- concurrently
- nodemon
- styled-components
- react-slider
- react-router-dom
- react-chartjs-2
- react-bootstrap-icons
- react-chartjs-2
- firebase
- react-dom
- chart.js
- react-fontawesome
- react-scripts

## Final Product

### Landing Page
![login](https://user-images.githubusercontent.com/79837402/170193514-986341fb-a74b-4636-b065-811b807357ca.png)

### Main Page On Login
![main](https://user-images.githubusercontent.com/79837402/170193952-7044e83e-76f1-4d5c-8e06-cf39232ae6bf.png)

### Drag Icon and Select Genres to Get Recommendation
![recommendation filter](https://user-images.githubusercontent.com/79837402/170196936-3f682b91-e60b-4fcf-911e-ed584cd028b2.png)

### Get Recommendations Based on the Filters
![recommendations](https://user-images.githubusercontent.com/79837402/170197154-46a65171-7d54-42e1-8f61-fc622dc81b47.png)

### Save Recommended Songs as a New Playlist
![playlist](https://user-images.githubusercontent.com/79837402/170197467-72626a61-ad0f-4f95-aacc-756a28aae2fa.png)

### Fine Tune Your Recommendations with Advanced Configuration
![advanced configuration](https://user-images.githubusercontent.com/79837402/170198064-ce7cc499-ffbb-4ebc-8fbb-dc610fabcf21.png)

### Favourites Page
![favourites](https://user-images.githubusercontent.com/79837402/170194296-48548e0b-4736-4a78-b5ac-84feed36a987.png)

### Top Artists Page with Filters
![top artists)](https://user-images.githubusercontent.com/79837402/170194962-072a7712-7387-41d6-a6f0-e841d50685ba.png)

### Top Tracks Page with Filters
![top tracks](https://user-images.githubusercontent.com/79837402/170195113-987fda72-f740-4a73-8c53-e61f2c6a4d77.png)

### Recents Page
![recents](https://user-images.githubusercontent.com/79837402/170195224-38860ad1-98c1-4ce9-8766-2426a6cea86e.png)

### Artist Page
![artist](https://user-images.githubusercontent.com/79837402/170195497-092f9474-a998-4cc6-a1c4-2ed5a3da86ab.png)

### Track Page
![track](https://user-images.githubusercontent.com/79837402/170195694-5e867e7c-0e75-4306-ba25-fe678db947ae.png)

### Album Page
![album](https://user-images.githubusercontent.com/79837402/170195843-fc7b33d5-c3a1-4b3d-91c7-0aa3edfdba56.png)

## Thank you for visiting.
