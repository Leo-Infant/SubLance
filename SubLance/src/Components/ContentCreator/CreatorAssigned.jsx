import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./CreatorAssigned.module.css";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fetch all posts from API once
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data.map(post => ({
            ...post,
            status: post.id % 2 === 0 ? "completed" : "in_progress", // Assign sample statuses
          })));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Pagination Calculations
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handlers for pagination
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
      {/* Navigation header */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBackButton}>
          <FaArrowLeft size={30} />
        </div>
        <h2 className={styles.headerTitle}>ASSIGNED</h2>
      </div>

      {/* Display current posts */}
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
                    {post.status === "in_progress" && (<strong>In Progress</strong>)}
                    {post.status === "completed" && (
                        <>
                        <strong>Completed</strong>
                        <button
                            className={styles.feedbackButton}
                            onClick={() => console.log("Feedback for:", post.id)}
                        >
                            Feedback
                        </button>
                        </>
                    )}
                    </span>
                </p>
            </div>
          ))
        ) : (
            <p className={styles.noPostsMessage}>No posts to display.</p>
        )}
      </div>

      {/* Pagination controls */}
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
