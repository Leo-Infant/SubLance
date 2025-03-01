import { useState, useEffect } from "react";
import Editor from "./Editor/Editor";
import Result from "./Result/Result";
import Styles from "./SubtitlePage.module.css";
import { useLocation } from "react-router-dom";

function SubtitlePage() {
  const [key, setKey] = useState("videoedit");
  const location = useLocation();
  const youtubeLink = location.state?.youtubeLink || "";

  const [data, setData] = useState({
    url: "",
    caption: [],
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, url: youtubeLink }));
  }, [youtubeLink]);
  
  function renderTabBody(value) {
    if (value === "videoedit") {
      return <Editor setKey={setKey} key={key} captionData={data} setCaptionData={setData} />;
    } else {
      return <Result setKey={setKey} key={key} captionData={data} setCaptionData={setData} />;
    }
  }

  return (
    <div className={Styles.appContainer}>
      <div>
        <h2 className={Styles.appTitle}>Video Editor</h2>
      </div>
      <div className={Styles.tabsContainer}>
        <button
          className={`${Styles.tabButton} ${key === "videoedit" ? "active" : ""}`}
          onClick={() => setKey("videoedit")}
        >
          Edit
        </button>
        <button
          className={`${Styles.tabButton} ${key === "videoresult" ? "active" : ""}`}
          onClick={() => setKey("videoresult")}
        >
          Result
        </button>
      </div>
      <div className={Styles.tabContent}>{renderTabBody(key)}</div>
    </div>
  );
}

export default SubtitlePage;
