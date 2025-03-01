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
  const{token} = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts" ,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPosts(data.map(post => ({
          ...post,
          fileUrl: post.fileUrl || `https://example.com/file${post.id}.pd`,
          status: post.fileUrl ? "file_uploaded" : "in_progress" 
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
                  <h3 className={styles.cardTitle}>POST NAME</h3>
                  <p className={styles.cardRow}>
                    <strong>Name: </strong> <span>{post.name}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong> Ratings: </strong><span>{post.ratings}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong>Bidding Amount:</strong> <span>{post.biddingAmount}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <strong>Total Work Completed: </strong><span>{post.totalWork}</span>
                  </p>
                  <p className={styles.cardRow}>
                    <span className={styles.statusLabel}>
                      {post.fileUrl ? (
                        <>
                          <strong>File Uploaded</strong>
                          <button
                            className={styles.viewDetailsButton}
                            onClick={() => setSelectedPost(post)}
                          >
                            View Details
                          </button>
                        </>
                      ) : (
                        <strong>In Progress</strong>
                      )}
                    </span>
                  </p>

                  {selectedPost && selectedPost.id === post.id && (
                    <div className={styles.modalContainer}>
                      <div className={styles.detailsContainer} onClick={() => setIsEllipsisMenuOpen(false)}>
                        <h3>Post Details</h3>
                        <p>{"sublance"}</p>
                        <p>{"sublance"}</p>
                        <p>{"sublance"}</p>
                        <p>{"sublance"}</p>
                        <p>{"sublance"}</p>
                        {/* <p>{selectedPost.postName}</p> */}
                        {/* <p>{selectedPost.name}</p> */}
                        {/* <p>{selectedPost.ratings}</p>
                        <p>{selectedPost.biddingAmount}</p>
                        <p>{selectedPost.totalWork}</p> */}
                        
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
                              <button className={styles.redoButton}>
                                Redo
                              </button>
                              <button className={styles.cancelButton}>
                                Cancel Task
                              </button>
                              <button className={styles.acceptButton} >
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
