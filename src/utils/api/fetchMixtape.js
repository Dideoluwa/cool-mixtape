import axios from "axios";

const baseUrl = `https://spotify-api-v1.herokuapp.com/mixtape`;
const FetchMixtape = {
  fetchPlaylist: () => {
    const response = axios({
      url: `${baseUrl}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
export default FetchMixtape;
