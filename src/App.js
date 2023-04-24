import "./App.css";
import styles from "./utils/styles/App.module.css";
import purple from "./assets/purpleBk.png";
import { useEffect, useRef, useState } from "react";
import FetchMixtape from "./utils/api/fetchMixtape";

function App() {
  const [play, setPlay] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audio = useRef(null);

  const playAudio = () => {
    audio.current = new Audio(playlist[currentSongIndex]?.track.preview_url);
    audio.current.play();
    if (isFinite(currentTime)) {
      audio.current.currentTime = currentTime;
    }
    setPlay(true);
  };

  // Function to pause audio
  const pauseAudio = () => {
    audio.current.pause();
    setCurrentTime(audio.current.currentTime);
    setPlay(false);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex(currentSongIndex - 1);
    if (currentSongIndex === 0) {
      setCurrentSongIndex(0);
    }
  };

  const forwardSongHandler = () => {
    setCurrentSongIndex(currentSongIndex + 1);
    if (currentSongIndex >= 49) {
      setCurrentSongIndex(0);
    }
  };

  useEffect(() => {
    if (audio.current) {
      audio?.current?.pause();
      audio.current = new Audio(playlist[currentSongIndex]?.track.preview_url);
      audio.current.load();
      audio.current.play();
      setPlay(true);
    }
  }, [currentSongIndex, playlist]);

  useEffect(() => {
    const track = audio?.current;
    const handleEnd = () => {
      setPlay(false);
      setCurrentTime(0);
    };

    track?.addEventListener("ended", handleEnd);

    return () => {
      track?.removeEventListener("ended", handleEnd);
    };
  }, [play]);

  useEffect(() => {
    const fetchPlaylistFunction = async () => {
      try {
        const fetchPlaylist = await FetchMixtape.fetchPlaylist();
        setPlaylist(fetchPlaylist.data.tracks.items);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchPlaylistFunction();
  }, []);

  const divStyle = {
    backgroundImage: `url(${purple})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={divStyle} className={styles.app}>
      <div className="comet"></div>
      <div className={styles.cassette}>
        <div className={styles.nail1}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7.5" fill="#0D0D0D" stroke="#251248" />
            <circle cx="8" cy="8" r="6" fill="url(#paint0_linear_1_496)" />
            <path
              d="M8.74924 7.00037V7.25037H8.99924H10.9992C11.1981 7.25037 11.3889 7.32938 11.5296 7.47004C11.6702 7.61069 11.7492 7.80145 11.7492 8.00037C11.7492 8.19928 11.6702 8.39004 11.5296 8.5307C11.3894 8.67087 11.1995 8.74982 11.0013 8.75036L9.00367 8.71491L8.74924 8.71039V8.96487V11.0004C8.74924 11.1993 8.67022 11.39 8.52957 11.5307C8.38891 11.6713 8.19815 11.7504 7.99924 11.7504C7.80032 11.7504 7.60956 11.6713 7.46891 11.5307C7.32873 11.3905 7.24977 11.2006 7.24924 11.0024L7.2847 8.96923L7.28921 8.71039L7.03038 8.7149L4.99722 8.75036C4.79904 8.74983 4.60908 8.67087 4.46891 8.5307C4.32825 8.39004 4.24924 8.19928 4.24924 8.00037C4.24924 7.80145 4.32825 7.61069 4.46891 7.47004C4.60956 7.32938 4.80032 7.25037 4.99924 7.25037H7.03474H7.28921L7.2847 6.99593L7.24924 4.99831C7.24978 4.80014 7.32874 4.6102 7.46891 4.47004C7.60956 4.32938 7.80032 4.25037 7.99924 4.25037C8.19815 4.25037 8.38891 4.32938 8.52957 4.47004C8.67022 4.61069 8.74924 4.80145 8.74924 5.00037V7.00037Z"
              fill="#0D0D0D"
              stroke="#251248"
              stroke-width="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_496"
                x1="8"
                y1="2"
                x2="8"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#321344" />
                <stop offset="1" stop-color="#D97FFF" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            width="26"
            height="26"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7.5" fill="#0D0D0D" stroke="#251248" />
            <circle cx="8" cy="8" r="6" fill="url(#paint0_linear_1_496)" />
            <path
              d="M8.74924 7.00037V7.25037H8.99924H10.9992C11.1981 7.25037 11.3889 7.32938 11.5296 7.47004C11.6702 7.61069 11.7492 7.80145 11.7492 8.00037C11.7492 8.19928 11.6702 8.39004 11.5296 8.5307C11.3894 8.67087 11.1995 8.74982 11.0013 8.75036L9.00367 8.71491L8.74924 8.71039V8.96487V11.0004C8.74924 11.1993 8.67022 11.39 8.52957 11.5307C8.38891 11.6713 8.19815 11.7504 7.99924 11.7504C7.80032 11.7504 7.60956 11.6713 7.46891 11.5307C7.32873 11.3905 7.24977 11.2006 7.24924 11.0024L7.2847 8.96923L7.28921 8.71039L7.03038 8.7149L4.99722 8.75036C4.79904 8.74983 4.60908 8.67087 4.46891 8.5307C4.32825 8.39004 4.24924 8.19928 4.24924 8.00037C4.24924 7.80145 4.32825 7.61069 4.46891 7.47004C4.60956 7.32938 4.80032 7.25037 4.99924 7.25037H7.03474H7.28921L7.2847 6.99593L7.24924 4.99831C7.24978 4.80014 7.32874 4.6102 7.46891 4.47004C7.60956 4.32938 7.80032 4.25037 7.99924 4.25037C8.19815 4.25037 8.38891 4.32938 8.52957 4.47004C8.67022 4.61069 8.74924 4.80145 8.74924 5.00037V7.00037Z"
              fill="#0D0D0D"
              stroke="#251248"
              stroke-width="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_496"
                x1="8"
                y1="2"
                x2="8"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#321344" />
                <stop offset="1" stop-color="#D97FFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={styles.nail2}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7.5" fill="#0D0D0D" stroke="#251248" />
            <circle cx="8" cy="8" r="6" fill="url(#paint0_linear_1_496)" />
            <path
              d="M8.74924 7.00037V7.25037H8.99924H10.9992C11.1981 7.25037 11.3889 7.32938 11.5296 7.47004C11.6702 7.61069 11.7492 7.80145 11.7492 8.00037C11.7492 8.19928 11.6702 8.39004 11.5296 8.5307C11.3894 8.67087 11.1995 8.74982 11.0013 8.75036L9.00367 8.71491L8.74924 8.71039V8.96487V11.0004C8.74924 11.1993 8.67022 11.39 8.52957 11.5307C8.38891 11.6713 8.19815 11.7504 7.99924 11.7504C7.80032 11.7504 7.60956 11.6713 7.46891 11.5307C7.32873 11.3905 7.24977 11.2006 7.24924 11.0024L7.2847 8.96923L7.28921 8.71039L7.03038 8.7149L4.99722 8.75036C4.79904 8.74983 4.60908 8.67087 4.46891 8.5307C4.32825 8.39004 4.24924 8.19928 4.24924 8.00037C4.24924 7.80145 4.32825 7.61069 4.46891 7.47004C4.60956 7.32938 4.80032 7.25037 4.99924 7.25037H7.03474H7.28921L7.2847 6.99593L7.24924 4.99831C7.24978 4.80014 7.32874 4.6102 7.46891 4.47004C7.60956 4.32938 7.80032 4.25037 7.99924 4.25037C8.19815 4.25037 8.38891 4.32938 8.52957 4.47004C8.67022 4.61069 8.74924 4.80145 8.74924 5.00037V7.00037Z"
              fill="#0D0D0D"
              stroke="#251248"
              stroke-width="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_496"
                x1="8"
                y1="2"
                x2="8"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#321344" />
                <stop offset="1" stop-color="#D97FFF" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            width="26"
            height="26"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7.5" fill="#0D0D0D" stroke="#251248" />
            <circle cx="8" cy="8" r="6" fill="url(#paint0_linear_1_496)" />
            <path
              d="M8.74924 7.00037V7.25037H8.99924H10.9992C11.1981 7.25037 11.3889 7.32938 11.5296 7.47004C11.6702 7.61069 11.7492 7.80145 11.7492 8.00037C11.7492 8.19928 11.6702 8.39004 11.5296 8.5307C11.3894 8.67087 11.1995 8.74982 11.0013 8.75036L9.00367 8.71491L8.74924 8.71039V8.96487V11.0004C8.74924 11.1993 8.67022 11.39 8.52957 11.5307C8.38891 11.6713 8.19815 11.7504 7.99924 11.7504C7.80032 11.7504 7.60956 11.6713 7.46891 11.5307C7.32873 11.3905 7.24977 11.2006 7.24924 11.0024L7.2847 8.96923L7.28921 8.71039L7.03038 8.7149L4.99722 8.75036C4.79904 8.74983 4.60908 8.67087 4.46891 8.5307C4.32825 8.39004 4.24924 8.19928 4.24924 8.00037C4.24924 7.80145 4.32825 7.61069 4.46891 7.47004C4.60956 7.32938 4.80032 7.25037 4.99924 7.25037H7.03474H7.28921L7.2847 6.99593L7.24924 4.99831C7.24978 4.80014 7.32874 4.6102 7.46891 4.47004C7.60956 4.32938 7.80032 4.25037 7.99924 4.25037C8.19815 4.25037 8.38891 4.32938 8.52957 4.47004C8.67022 4.61069 8.74924 4.80145 8.74924 5.00037V7.00037Z"
              fill="#0D0D0D"
              stroke="#251248"
              stroke-width="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_496"
                x1="8"
                y1="2"
                x2="8"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#321344" />
                <stop offset="1" stop-color="#D97FFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Inner card */}

        <div className={styles.inner_card}>
          <div className={styles.header}>
            <h1>TODAY’S MIXTAPE</h1>
          </div>
          <div className={styles.controls}>
            <div className={play ? styles.active : styles.inactive}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  fill="#F9D4FF"
                  stroke="#251248"
                />
                <ellipse
                  cx="16"
                  cy="15.9375"
                  rx="12"
                  ry="11.9375"
                  fill="#0D041D"
                />
                <rect
                  x="14.5"
                  y="4"
                  width="3"
                  height="4.47657"
                  fill="#F9D4FF"
                />
                <rect
                  width="3"
                  height="4.47657"
                  transform="matrix(1 0 0 -1 14.5 28)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(0.70895 0.705259 -0.70895 0.705259 24.03 7.05566)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(0.70895 -0.705259 -0.70895 -0.705259 24.03 24.9443)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(-0.70895 0.705259 0.70895 0.705259 7.59485 7.05566)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(-0.70895 -0.705259 0.70895 -0.705259 7.59485 24.9443)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.98438"
                  height="4.5"
                  transform="matrix(-0.00464132 0.999989 -0.999989 -0.00459312 28 14.4434)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.98438"
                  height="4.5"
                  transform="matrix(0.00461716 0.999989 0.999989 -0.00461716 4 14.4431)"
                  fill="#F9D4FF"
                />
              </svg>
            </div>

            <svg
              onClick={prevSongHandler}
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                opacity={currentSongIndex === 0 ? 0.2 : 1}
                clip-path="url(#clip0_1_472)"
              >
                <path d="M18 18L9.5 12L18 6V18ZM8 6V18H6V6H8Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_1_472">
                  <rect
                    width="34"
                    height="34"
                    fill="white"
                    transform="matrix(-1 0 0 1 24 0)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div onClick={play ? pauseAudio : playAudio}>
              {play ? (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5C7.46957 5 6.96086 5.21071 6.58579 5.58579C6.21071 5.96086 6 6.46957 6 7V17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17V7C10 6.46957 9.78929 5.96086 9.41421 5.58579C9.03914 5.21071 8.53043 5 8 5ZM16 5C15.4696 5 14.9609 5.21071 14.5858 5.58579C14.2107 5.96086 14 6.46957 14 7V17C14 17.5304 14.2107 18.0391 14.5858 18.4142C14.9609 18.7893 15.4696 19 16 19C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V7C18 6.46957 17.7893 5.96086 17.4142 5.58579C17.0391 5.21071 16.5304 5 16 5Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6.82001V17.18C8 17.97 8.87 18.45 9.54 18.02L17.68 12.84C18.3 12.45 18.3 11.55 17.68 11.15L9.54 5.98001C8.87 5.55001 8 6.03001 8 6.82001Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>

            <svg
              onClick={forwardSongHandler}
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_477)">
                <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_1_477">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className={play ? styles.active : styles.inactive}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  fill="#F9D4FF"
                  stroke="#251248"
                />
                <ellipse
                  cx="16"
                  cy="15.9375"
                  rx="12"
                  ry="11.9375"
                  fill="#0D041D"
                />
                <rect
                  x="14.5"
                  y="4"
                  width="3"
                  height="4.47657"
                  fill="#F9D4FF"
                />
                <rect
                  width="3"
                  height="4.47657"
                  transform="matrix(1 0 0 -1 14.5 28)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(0.70895 0.705259 -0.70895 0.705259 24.03 7.05566)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(0.70895 -0.705259 -0.70895 -0.705259 24.03 24.9443)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(-0.70895 0.705259 0.70895 0.705259 7.59485 7.05566)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.9922"
                  height="4.4883"
                  transform="matrix(-0.70895 -0.705259 0.70895 -0.705259 7.59485 24.9443)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.98438"
                  height="4.5"
                  transform="matrix(-0.00464132 0.999989 -0.999989 -0.00459312 28 14.4434)"
                  fill="#F9D4FF"
                />
                <rect
                  width="2.98438"
                  height="4.5"
                  transform="matrix(0.00461716 0.999989 0.999989 -0.00461716 4 14.4431)"
                  fill="#F9D4FF"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* song title */}

        <div className={styles.song_title}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.77879 10.9C7.80159 10.9 8.63319 11.7412 8.63319 12.7752C8.63319 13.8092 7.80159 14.6504 6.77879 14.6504C5.88119 14.6504 5.13159 14.002 4.96159 13.144C4.93771 13.0926 4.92516 13.0367 4.92479 12.98V4.25001C4.92484 4.19041 4.93821 4.13158 4.96392 4.07782C4.98963 4.02406 5.02702 3.97672 5.07337 3.93926C5.11972 3.9018 5.17386 3.87518 5.23182 3.86133C5.28978 3.84747 5.35011 3.84675 5.40839 3.85921L12.9 5.45921C12.9895 5.47834 13.0698 5.52763 13.1274 5.59883C13.185 5.67003 13.2164 5.75883 13.2164 5.85041V13.236C13.5248 13.0179 13.8931 12.9007 14.2708 12.9004C15.2932 12.9004 16.1248 13.7416 16.1248 14.7756C16.1248 15.8096 15.2932 16.6508 14.2708 16.6508C13.248 16.6508 12.4164 15.8096 12.4164 14.7756C12.4164 14.7308 12.4264 14.6888 12.4296 14.6452C12.426 14.6232 12.4164 14.6036 12.4164 14.5804V8.57361L5.72479 7.14441V11.236C6.03294 11.0177 6.40117 10.9004 6.77879 10.9ZM6.77879 13.85C7.35999 13.85 7.83319 13.3676 7.83319 12.7748C7.83319 12.182 7.35999 11.6996 6.77879 11.6996C6.19759 11.6996 5.72479 12.182 5.72479 12.7748C5.72479 13.3676 6.19759 13.85 6.77879 13.85ZM14.2712 15.85C14.8524 15.85 15.3252 15.3676 15.3252 14.7748C15.3252 14.182 14.8524 13.6996 14.2712 13.6996C13.69 13.6996 13.2168 14.182 13.2168 14.7748C13.2168 15.3676 13.69 15.85 14.2712 15.85ZM12.4168 7.75561V6.17321L5.72519 4.74441V6.32641L12.4168 7.75561Z"
              fill="white"
            />
          </svg>
          <div>
            <p className={play ? styles.title : styles.default}>
              {!play
                ? "Serenity Vol.1"
                : `${playlist[currentSongIndex].track.name} - ${playlist[currentSongIndex].track.artists[0].name}`}
            </p>
          </div>

          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2212 10.9C12.1984 10.9 11.3668 11.7412 11.3668 12.7752C11.3668 13.8092 12.1984 14.6504 13.2212 14.6504C14.1188 14.6504 14.8684 14.002 15.0384 13.144C15.0623 13.0926 15.0748 13.0367 15.0752 12.98V4.25001C15.0751 4.19041 15.0618 4.13158 15.0361 4.07782C15.0104 4.02406 14.973 3.97672 14.9266 3.93926C14.8803 3.9018 14.8261 3.87518 14.7682 3.86133C14.7102 3.84747 14.6499 3.84675 14.5916 3.85921L7.1 5.45921C7.01045 5.47834 6.93018 5.52763 6.87259 5.59883C6.815 5.67003 6.78359 5.75883 6.7836 5.85041V13.236C6.47523 13.0179 6.10689 12.9007 5.7292 12.9004C4.7068 12.9004 3.8752 13.7416 3.8752 14.7756C3.8752 15.8096 4.7068 16.6508 5.7292 16.6508C6.752 16.6508 7.5836 15.8096 7.5836 14.7756C7.5836 14.7308 7.5736 14.6888 7.5704 14.6452C7.574 14.6232 7.5836 14.6036 7.5836 14.5804V8.57361L14.2752 7.14441V11.236C13.967 11.0177 13.5988 10.9004 13.2212 10.9ZM13.2212 13.85C12.64 13.85 12.1668 13.3676 12.1668 12.7748C12.1668 12.182 12.64 11.6996 13.2212 11.6996C13.8024 11.6996 14.2752 12.182 14.2752 12.7748C14.2752 13.3676 13.8024 13.85 13.2212 13.85ZM5.7288 15.85C5.1476 15.85 4.6748 15.3676 4.6748 14.7748C4.6748 14.182 5.1476 13.6996 5.7288 13.6996C6.31 13.6996 6.7832 14.182 6.7832 14.7748C6.7832 15.3676 6.31 15.85 5.7288 15.85ZM7.5832 7.75561V6.17321L14.2748 4.74441V6.32641L7.5832 7.75561Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className={styles.color_toggle}>
        <p>COLOR</p>
        <div className={styles.inner_color}>
          <p>Purple</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7.5"
              fill="url(#pattern0)"
              stroke="url(#paint0_linear_1_431)"
            />
            <circle cx="8" cy="5" r="1" fill="white" />
            <circle cx="5.5" cy="10.5" r="0.5" fill="white" />
            <circle cx="11.75" cy="8.75" r="0.75" fill="white" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              ></pattern>
              <linearGradient
                id="paint0_linear_1_431"
                x1="-6.25882"
                y1="-10.12"
                x2="24.2989"
                y2="2.00843"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D97FFF" />
                <stop offset="1" stop-color="#5D177A" />
              </linearGradient>
              <image id="image0_1_431" width="560" height="560" />
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
