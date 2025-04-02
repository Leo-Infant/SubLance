import React, { useContext, useState } from 'react';
import Styles from './CreatePost.module.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const CreatePost = () => {

  const navigate = useNavigate();
  const{token} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    transcriptionLang: '',
    audioLang: '',
    deadline: '',
    videoUrl: '',
  });
const [linkError, setLinkError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "videoUrl") {
      if (!urlRegex.test(value)) {
        setLinkError("Please enter a valid YouTube URL.");
      } else {
        setLinkError(""); // Clear error if the URL is valid.
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, transcriptionLang, audioLang, deadline, videoUrl } = formData;
  
    if (!name || !transcriptionLang || !audioLang || !deadline || !videoUrl) {
      alert("All fields are required.");
      return;
    }
    if (!urlRegex.test(videoUrl)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
  
    const postData = {
      name,
      transcriptionLang,
      audioLang,
      deadline,
      videoUrl
    };
  
    try {
      
      const response = await fetch('http://localhost:8080/api/creator/createpost', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        
        alert('Post Created Successfully');
        setFormData({
          name: '',
          transcriptionLang: '',
          audioLang: '',
          deadline: '',
          videoUrl: '',
        });
      } else {
        alert('Failed to create post. Please try again.');
        setFormData({
          name: '',
          transcriptionLang: '',
          audioLang: '',
          deadline: '',
          videoUrl: '',
        });
      
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
      setFormData({
        name: '',
        transcriptionLang: '',
        audioLang: '',
        deadline: '',
        videoUrl: '',
      });

    }finally{
      navigate('/creatorHome');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const urlRegex =
  /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/; // Only matches YouTube URLs.

  return (
    <div className={Styles.container}>
      <div className={Styles.back}>
        <div className={Styles.arrowIcon} onClick={handleBackClick}>
          <FaArrowLeft size={30} />
        </div>
        <h1 className={Styles.title}>Create Post</h1>
      </div>
      <form className={Styles.postForm} onSubmit={handleSubmit}>
        <div className={Styles.formLeft}>
          <div className={Styles.formSection}>
            <label>
              Post Name:
              <input
                type="text"
                name="name"
                className={Styles.inputBox}
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Transcript Language:
              <input
                type="text"
                name="transcriptionLang"
                className={Styles.inputBox}
                value={formData.transcriptionLang}
                onChange={handleChange}
              />
            </label>
            <label>
              Audio Language:
              <input
                type="text"
                name="audioLang"
                className={Styles.inputBox}
                value={formData.audioLang}
                onChange={handleChange}
              />
            </label>
            <label>
              Deadline:
              <input
                type="date"
                name="deadline"
                className={Styles.inputBox}
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
            <label>
              YouTube Link:
              <input
                type="test"
                name="videoUrl"
                className={Styles.inputBox}
                value={formData.compensation}
                onChange={handleChange}
              />
              {linkError && <p className={Styles.errorText}>{linkError}</p>}
            </label>
            <button type="submit" className={Styles.submitButton}>
              Submit
            </button>
          </div>
        </div>

        <div className={Styles.formRight}>
          <div className={Styles.formSection}>
            <p><strong>Post Name:</strong> {formData.name}</p>
            <p><strong>Transcript Language:</strong> {formData.transcriptionLang}</p>
            <p><strong>Audio Language:</strong> {formData.audioLang}</p>
            <p><strong>Deadline:</strong> {formData.deadline}</p>
            <p><strong>YouTube Link:</strong> {formData.videoUrl}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
