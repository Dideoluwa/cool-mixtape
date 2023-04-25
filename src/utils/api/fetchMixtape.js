import axios from "axios";

const baseUrl = process.env.REACT_APP__BASE_URL;
const FetchMixtape = {
  fetchPlaylist: () => {
    const response = axios({
      url: `${baseUrl}/mixtape`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
export default FetchMixtape;
