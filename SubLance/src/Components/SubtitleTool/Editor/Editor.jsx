import { Button } from "@nextui-org/react";
import InputForm from "../UserInput/InputForm";
import { toast } from "react-toastify";
import { useState } from "react";
import "./Editor.css"; // Import CSS file
import {
  Modal,
  ModalBody,
  ModalFooter ,
} from "@nextui-org/react";

export default function Editor({ setKey, captionData, setCaptionData }) {
  const CaptionData = captionData;
  const [isOpen, setIsOpen] = useState(false);
  
  const CaptionData1 = captionData.caption;
  const [isModal, setIsModal] = useState(false);
  const [data, setData] = useState(null);

  function handleIsModal(data = null) {
    if (data) {
      setData(data);
      setIsModal(true);
    } else {
      setIsModal(false);
    }
  }

  function handleRemoveCaption(selectedItem) {
    setCaptionData(prev => {
      const updatedCaptions = prev.caption.filter(item => item.startTime !== selectedItem.startTime);
      return { ...prev, caption: updatedCaptions };
    });
  
    toast.success("Caption removed successfully");
  }
  

  function DeleteIcon({ item }) {
  return <img src="/delete.png" onClick={() => handleRemoveCaption(item)} className="icon" />;
}

  function InfoIcon({ item }) {
    return <img src="/info.png" onClick={() => handleIsModal(item)} className="icon" />;
  }


  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  function handleUploadCaptions() {
    console.log("CaptionData", CaptionData);
    
    if (CaptionData.url.length <= 0) {
      toast.warn("Video URL missing!");
      return;
    }
    if (CaptionData.caption.length <= 0) {
      toast.warn("No Captions found");
      return;
    }
    setKey("videoresult");
    toast.success("Captions Uploaded successfully");
  }
  const handleDownloadCaptions = () => {
    if (!CaptionData1 || CaptionData1.length === 0) {
      alert("No captions available to download.");
      return;
    }
  
    let srtContent = CaptionData1.map((item, index) => {
      const startTime = convertToSRTFormat(item.startTime);
      const endTime = convertToSRTFormat(item.endTime);
      return `${index + 1}\n${startTime} --> ${endTime}\n${item.text || ""}\n`;
    }).join("\n");
  
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.srt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
  };
  
  const convertToSRTFormat = (timeString) => {
    if (!timeString || typeof timeString !== "string") {
      return "00:00:00,000"; // Default fallback
    }
  
    const timeParts = timeString.split(":");
    let minutes = parseInt(timeParts[0], 10) || 0;
    let seconds = parseInt(timeParts[1], 10) || 0;
  
    // Ensure values are in correct SRT format
    return `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},000`;
  };


  function DatailsModal() {
    return (
      <Modal backdrop={"blur"} isOpen={isModal} onClose={() => handleIsModal()} className="modal" >
        <div className="modal-container">
          <h1 className="modal-header">Caption Info</h1>
          <ModalBody className="modal-body">
            <div className="time-info">
              <span>Start Time: {data?.startTime}</span>
              <span>End Time: {data?.endTime}</span>
            </div>
            <div className="caption-container">
              <p>Caption:</p>
              <div className="caption-text">{data?.text}</div>
            </div>
          </ModalBody>
          <ModalFooter>
          <button onClick={() => handleIsModal()} className="close-button">✖</button>
          </ModalFooter>
        </div>
    </Modal>
    );
  }
  
  return (
    <div className="editor-container">
      <div id="user-input" className="input-section">
        <InputForm handleIsOpen={handleIsOpen} captionData={captionData} setCaptionData={setCaptionData} />
      </div>
      <div id="captions-sidebar" className="sidebar">
        <div className="sidebar-content">
          <div>
            {CaptionData1.length > 0 ? (
              CaptionData1.map((item, index) => (
                <div key={index} className="card" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <div className="card-footer">
                    <b>{item?.text?.slice(0, 30) + "..." || ""}</b>
                    <span className="icon-container">
                      <InfoIcon item={item} />
                      <DeleteIcon item={item} />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              "No Captions available"
            )}
            {DatailsModal()}
          </div>
          <Button className="upload-button" color="primary" onPress={handleUploadCaptions}>
            Upload Captions
          </Button>
          <Button className="upload-button" color="primary" onPress={handleDownloadCaptions}>
            Download Captions
          </Button>
        </div>
      </div>
    </div>
  );
}