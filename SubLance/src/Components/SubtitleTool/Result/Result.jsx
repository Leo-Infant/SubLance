import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./Result.module.css";

const convertToSeconds = (timeString) => {
  if (!timeString) return 0;
  const parts = timeString.split(":").map(Number);
  return parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : parts[0] * 60 + parts[1];
};

export default function Result({ captionData }) {
  const Data = captionData;
  const [currentCaption, setCurrentCaption] = useState("");
  const [videoStarted, setVideoStarted] = useState(false);
  const [player, setPlayer] = useState(null);

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([\w-]{11})/);
    return match ? match[1] : "";
  };

  const onReady = (event) => {
    console.log("✅ Player Ready");
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log("▶️ Playing...");
      setVideoStarted(true);
      updateCaption();
    } else {
      console.log("⏸️ Paused/Ended");
    }
  };

  const updateCaption = () => {
    if (!player || typeof player.getCurrentTime !== "function") return;

    let currentTime = Math.floor(player.getCurrentTime());
    console.log("⏱ Video Time:", currentTime, "s");

    const activeCaption = Data.caption.find((cap) => {
      const start = convertToSeconds(cap.startTime);
      const end = convertToSeconds(cap.endTime);
      return currentTime >= start && currentTime <= end;
    });

    setCurrentCaption(activeCaption ? activeCaption.text : "");
    console.log("🆕 Caption:", activeCaption ? activeCaption.text : "None");
  };

  useEffect(() => {
    if (videoStarted) {
      const intervalId = setInterval(updateCaption, 1000);
      return () => clearInterval(intervalId);
    }
  }, [videoStarted]);

  const opts = {
    height: "500px",
    width: "1200px",
    playerVars: {
      enablejsapi: 1,
    },
  };

  return (
    <div className={styles.resultContainer}>
      {Data.url && (
        <div className={styles.resultVideoContainer}>
          <div className={styles.videoFrame}>
          <YouTube videoId={extractVideoId(Data.url)} opts={opts} onReady={onReady} onStateChange={onStateChange} />
          </div>
          {currentCaption && <div className={styles.resultCaption}>{currentCaption}</div>}
        </div>
      )}
    </div>
  );
}
