import { useRef, useState , useEffect} from "react";
import InfoModal from "./InputModal";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import styles from "./InputForm.module.css"; // Import module CSS
import ReactPlayer from "react-player";

export default function InputForm({ handleIsOpen, captionData, setCaptionData }) {
  const Data = captionData;
  const [isModal, setIsModal] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const [pausedTime, setPausedTime] = useState(null);
  const [endTime, setEndTime] = useState("00:00:00");
  const videoRef = useRef(null);


  
  useEffect(() => {
    if (Data.url && !Data.url.startsWith("https://www.youtube.com")) {
      console.error("Invalid video URL:", Data.url);
    }
  }, [Data.url]);

  const parseTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const addCaption = () => {
    if (!captionText.trim()) {
      toast.warn("Caption cannot be empty!");
      return;
    }
    if (!pausedTime) {
      toast.warn("Start Time is not set! Please pause the video.");
      return;
    }
    if (!endTime.trim() || endTime === "00:00:00") {
      toast.warn("End Time cannot be empty or default value!");
      return;
    }
    setCaptionData((prev) => ({
      ...prev,
      caption: [
        ...prev.caption,
        {
          text: captionText,
          startTime: pausedTime,
          endTime: endTime.trim(),
        },
      ],
    }));

    setCaptionText("");
    setPausedTime(null);
    setEndTime("00:00:00");
    toast.success("Caption added successfully!");
  };

  const handleVideoPause = () => {
    if (videoRef.current) {
      const time = Math.floor(videoRef.current.getCurrentTime());
      const duration = Math.floor(videoRef.current.getDuration());
      const startTime = parseTime(time);
      const autoEndTime =
        time + 1 <= duration ? parseTime(time + 1) : parseTime(duration);

      setPausedTime(startTime);
      setEndTime(autoEndTime);
    }
  };

  const handleIsModal = () => {
    setIsModal(prev => !prev);
  };

  return (
    <div className={styles.inputFormContainer}>
      <InfoModal isModal={isModal} handleIsModal={handleIsModal} />
      {Data.url && (
        <div className={styles.videoContainer}>
            <ReactPlayer
          ref={videoRef}
          url={Data.url}
          controls
          playing={false}
          onPause={handleVideoPause}
          className={styles.videoElement}
          width="100%"
          height="330px"        
          />
        </div>
      )}
      <div className={styles.captionContainer}>
        <p className={styles.captionTitle}>Add Captions</p>
        <div className={styles.timeInputs}>
          <div className={styles.timeButton}>
          <p>Start Time</p>
          <input className={styles.startEnd}
           readOnly 
           value={pausedTime || "Pause video to capture time"} />
          </div>
          
          <div className={styles.timeButton}>
          <p>End Time</p>
          <input className={styles.startEnd}
            placeholder="Enter end time (hh:mm:ss)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}/>
          </div>
          
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <button onClick={handleIsModal} className={styles.iconButton}>
              <img
                src="/info.png"
                className={`${styles.iconImage} ${isModal ? styles.rotate : ""}`}
              />
            </button>
            <input
              className={styles.inputField}
              type="text"
              placeholder="Enter caption here"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
            />
            <button
              onClick={addCaption}
              className={`${styles.sendButton} ${
                captionText.length > 0 && endTime.length > 0 && pausedTime
                  ? styles.sendButtonActive
                  : ""
              }`}
            >
              <img
                src="/send-blue.png"
                className={`${styles.iconImage} ${
                  captionText.length > 0 && endTime.length > 0 && pausedTime
                    ? styles.rotateSend
                    : ""
                }`}
              />
            </button>
          </div>
        </div>

        <Button
          className={styles.showCaptionsButton}
          color="primary"
          onPress={handleIsOpen}
        >
          Show Captions
        </Button>
       
      </div>
    </div>
  );
}
