import React, { useContext, useState } from 'react';
import Styles from './CreatePost.module.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const CreatePost = () => {

  const navigate = useNavigate();
  const{token} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    postName: '',
    transcriptLanguage: '',
    audioLanguage: '',
    deadline: '',
    youTubeLink: '',
  });
const [linkError, setLinkError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "youTubeLink") {
      if (!urlRegex.test(value)) {
        setLinkError("Please enter a valid YouTube URL.");
      } else {
        setLinkError(""); // Clear error if the URL is valid.
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { postName, transcriptLanguage, audioLanguage, deadline, youTubeLink } = formData;
  
    if (!postName || !transcriptLanguage || !audioLanguage || !deadline || !youTubeLink) {
      alert("All fields are required.");
      return;
    }
    if (!urlRegex.test(youTubeLink)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
  
    const postData = {
      postName,
      transcriptLanguage,
      audioLanguage,
      deadline,
      youTubeLink
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/creator/createPost', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Post created:', result);
        alert('Post Created Successfully');
        setFormData({
          postName: '',
          transcriptLanguage: '',
          audioLanguage: '',
          deadline: '',
          youTubeLink: '',
        });
      } else {
        alert('Failed to create post. Please try again.');
        setFormData({
          postName: '',
          transcriptLanguage: '',
          audioLanguage: '',
          deadline: '',
          youTubeLink: '',
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
      setFormData({
        postName: '',
        transcriptLanguage: '',
        audioLanguage: '',
        deadline: '',
        youTubeLink: '',
      });

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
                name="postName"
                className={Styles.inputBox}
                value={formData.postName}
                onChange={handleChange}
              />
            </label>
            <label>
              Transcript Language:
              <input
                type="text"
                name="transcriptLanguage"
                className={Styles.inputBox}
                value={formData.transcriptLanguage}
                onChange={handleChange}
              />
            </label>
            <label>
              Audio Language:
              <input
                type="text"
                name="audioLanguage"
                className={Styles.inputBox}
                value={formData.audioLanguage}
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
                name="youTubeLink"
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
            <p><strong>Post Name:</strong> {formData.postName}</p>
            <p><strong>Transcript Language:</strong> {formData.transcriptLanguage}</p>
            <p><strong>Audio Language:</strong> {formData.audioLanguage}</p>
            <p><strong>Deadline:</strong> {formData.deadline}</p>
            <p><strong>YouTube Link:</strong> {formData.youTubeLink}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
