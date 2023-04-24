import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
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
