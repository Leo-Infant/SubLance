import React, { useState, useEffect , useContext } from "react";
import { toast } from "react-toastify";
import Styles from "./FreeLancerAssigned.module.css";
import { AuthContext } from '../../context/AuthContext';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FreeLancerAssigned = () => {
  const postsPerPage = 10;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [uploadModal, setUploadModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // http://localhost:8080/api/creator/unassignedpost
  // GET
  
  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleStartWork = (post) => {
    navigate('/subtitleTool', { state: { youtubeLink: "https://www.youtube.com/watch?v=-XLsQwM-QiQ" } });
  };
  const handleUploadClick = (postId) => {
    setUploadModal(postId);
    console.log('ButtonClicked' , postId);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile); 
    formData.append("upload_preset", "noName");
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
        const data = await response.json();
        console.log("Cloudinary Response:", data);

      
        if (data.secure_url) {
          toast.success("File uploaded successfully!");
          console.log("Uploaded file URL:", data.secure_url);
        } else {
          throw new Error("Invalid response from Cloudinary");
        }
      
      setSelectedFile(null);
      setUploadModal(null);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    }
  };

  const handleBackButton = () =>{
    navigate(-1);
  };
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  return (
    <div className={Styles.homepage}>
        <div className={Styles.header}>
             <div className={Styles.backButton} onClick={handleBackButton}>
               <FaArrowLeft size={30} />
             </div>
             <h2 className={Styles.headerTitle}>ASSIGNED</h2>
        </div>

      {loading ? (
        <div className={Styles.loading}>Loading posts...</div>
      ) : error ? (
        <div className={Styles.error}>Error: {error}</div>
      ) : posts.length === 0 ? (
        <div className={Styles.noPosts}>Nothing Assigned.</div>
      ) : (
        <>
          <div className={Styles.postsContainer}>
            {currentPosts.map((post) => (
              <div key={post.id} className={Styles.postCard}>
                <p>
                  <strong>POST NAME:</strong> {post.name}
                </p>
                <p>
                  <strong>TRANSCRIPT LANGUAGE:</strong>{" "}
                  {post.transcriptLanguage}
                </p>
                <p>
                  <strong>AUDIO LANGUAGE:</strong> {post.audioLanguage}
                </p>
                <p>
                  <strong>DEADLINE:</strong> {post.deadline}
                </p>
                <p>
                  <strong>YOUTUBE LINK :</strong> {post.youtubeLink}
                </p>
                <div className={Styles.buttons}>
                  <button
                    className={Styles.editButton}
                    onClick={() => handleStartWork(post)}
                  >
                    START WORKING
                  </button>
                  <button
                    className={Styles.proposalsButton}
                    onClick={() => handleUploadClick(post.id)}
                  >
                    UPLOAD
                  </button>
                </div>
              </div>
            ))}
          </div>

          {posts.length > postsPerPage && (
            <div className={Styles.pagination}>
              <a
                className={`${Styles.paginationButton} ${
                  currentPage === 1 ? Styles.disabled : ""
                }`}
                onClick={currentPage === 1 ? undefined : handlePrevious}
              >
                Previous
              </a>

              <span className={Styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <a
                className={`${Styles.paginationButton} ${
                  currentPage === totalPages ? Styles.disabled : ""
                }`}
                onClick={currentPage === totalPages ? undefined : handleNext}
              >
                Next
              </a>
            </div>
          )}
          {uploadModal && (
        <div className={Styles.modalBackdrop}>
          <div className={Styles.modalContainer}>
            <h3>Upload Subtitle File</h3>
            <input 
                type="file" 
                onChange={(e) => setSelectedFile(e.target.files[0])} 
            />
            <div className={Styles.buttonContainer}>
                <button onClick={handleUpload} className={Styles.uploadButton}>Upload</button>
                <button onClick={() => setUploadModal(null)} className={Styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
            )}
        </>
      )}
    </div>
  );
};
export default FreeLancerAssigned;
