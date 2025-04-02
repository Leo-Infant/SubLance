import React, { useState, useEffect, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./CreatorAssigned.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);

  //http://localhost:8080/api/creator/assignedpost
  // GET

  const{token} = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/creator/assignedposts" ,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setPosts(data.map(post => ({
          ...post,
        })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);
  

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleEllipsisClick = (e) => {
    e.stopPropagation();
    setIsEllipsisMenuOpen(!isEllipsisMenuOpen);
  };
  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsEllipsisMenuOpen(false);

  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((page) => page - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((page) => page + 1);
  };
  const handleBackButton = () =>{
    navigate(-1);
  };
  const handleAccept = async(postId,update) =>{
    try {
      const response = await fetch(`http://localhost:8080/api/creator/proposal/${postId}/${update}` ,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("SENT");
    } catch (error) {
      console.error("Error Accepting Post:", error);
    }finally{
      navigate(0);
    }
  };
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBackButton}>
          <FaArrowLeft size={30} />
        </div>
        <h2 className={styles.headerTitle}>ASSIGNED</h2>
      </div>

        <div
            className={`${styles.cardsContainer} ${
                currentPosts.length === 0 ? styles.noPostsContainer : ""
            }`}
        >
        {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div key={post.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>{post.name}</h3>
                  <p className={styles.cardRow}>
                    <strong>Name: </strong> <span>{post.freelancer.name}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong> Transcription Language: </strong><span>{post.transcriptionLang}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong>Audio Language: </strong> <span>{post.audioLang}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong>DEADLINE: </strong><span>{post.deadline}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <span className={styles.statusLabel}>
                        <>
                          <strong>{post.status=="ASSIGNED"?"IN PROGRESS":"FILE UPLOADED"}</strong>
                          {post.status=="COMPLETED"?(<button
                            className={styles.viewDetailsButton}
                            onClick={() => setSelectedPost(post)}
                          >
                            View Details
                          </button>):""}
                          
                        </>
                    </span>
                  </p>

                  {selectedPost && selectedPost.id === post.id && (
                    <div className={styles.modalContainer}>
                      <div className={styles.detailsContainer} onClick={() => setIsEllipsisMenuOpen(false)}>
                        <h3>Post Details</h3>
                        <br/>
                        <p><b>Post Name :</b> {selectedPost.name}</p>
                        <p><b>Freelancer Name:</b> {selectedPost.freelancer.name}</p>
                        <br/>
                        <br/>
                        <br/>
                        
                        <div className={styles.ellipsisMenu}>
                          <span className={styles.ellipsisButton} onClick={handleEllipsisClick}>
                            ⋮
                          </span>
                          {isEllipsisMenuOpen && (
                            <div className={styles.dropdownMenu}>
                              <a
                                href={selectedPost.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download
                              </a>
                              <button className={styles.redoButton} onClick={() => handleAccept(selectedPost.id , "REDO")}>
                                Redo
                              </button>
                              <button className={styles.cancelButton} onClick={() => handleAccept(selectedPost.id , "CANCEL")}>
                                Cancel Task
                              </button>
                              <button className={styles.acceptButton} onClick={() => handleAccept(selectedPost.id , "ACCEPT")}>
                                Accept
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Close Button */}
                        <button className={styles.closeButton} onClick={handleCloseModal}>
                          Close
                        </button>
                      </div>
                    </div>
              )}
                </div>
              ))
            ) : (
              <p className={styles.noPostsMessage}>No posts to display.</p>
            )}
      </div>
      {totalPages > 1 && (   <div className={styles.pagination}>
        <a
          className={`${styles.paginationButton} ${
            currentPage === 1 ? styles.disabled : ""
          }`}
          onClick={currentPage === 1 ?  undefined :handlePrevious}

        >
          Previous
        </a>
        <span className={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </span>
        <a
          className={`${styles.paginationButton} ${
            currentPage === totalPages ? styles.disabled : ""
          }`}
          onClick={currentPage === totalPages ? undefined : handleNext}
        >
          Next
        </a>
      </div>
    )}
   
    </div>
  );
};

export default PostPage;
