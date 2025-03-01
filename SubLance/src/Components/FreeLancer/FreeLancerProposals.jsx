import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./FreeLancerProposals.module.css";
import { useNavigate } from "react-router-dom";

const FreeLancerProposals = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const navigate = useNavigate();

useEffect(() => { 
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          //  "Authorization": `Bearer ${token}`,
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

const handleBackButton = () =>{
  navigate(-1);

const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);
};
  return(
    <div className={styles.pageContainer}>
        <div className={styles.header}>
             <div className={styles.backButton} onClick={handleBackButton}>
               <FaArrowLeft size={30} />
             </div>
             <h2 className={styles.headerTitle}>PROPOSAL</h2>
        </div>
        {loading ? (
                <div className={styles.loading}>Loading posts...</div>
              ) : error ? (
                <div className={styles.error}>Error: {error}</div>
              ) : posts.length === 0 ? (
                <div className={styles.noPosts}>You Haven't Proposed Anything.</div>
              ) : (
                <>
                  <div className={styles.postsContainer}>
                    {currentPosts.map((post) => (
                      <div key={post.id} className={styles.postCard}>
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
                        <div className={styles.buttons}>
                          
                        </div>
                      </div>
                    ))}
                  </div>
        
                  {posts.length > postsPerPage && (
                    <div className={styles.pagination}>
                      <a
                        className={`${styles.paginationButton} ${
                          currentPage === 1 ? styles.disabled : ""
                        }`}
                        onClick={currentPage === 1 ? undefined : handlePrevious}
                      >
                        Previous
                      </a>
        
                      <span className={styles.pageInfo}>
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
                </>
              )}
    </div>
  )
}
export default FreeLancerProposals;