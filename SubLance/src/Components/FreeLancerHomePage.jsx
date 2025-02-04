import React, { useState, useEffect, useContext } from "react";
import Styles from "./FreeLancerHomePage.module.css";
import Logo from "../assets/Logo.png";
import { AuthContext } from "./context/AuthContext";

const FreeLancerHomePage = () => {
  const postsPerPage = 10;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [bid, setBiddingAmount] = useState("");
  const{token} = useContext(AuthContext);
  // http://localhost:8080/api/freelancer/unassignedpost 
  // GET

  // http://localhost:8080/api/freelancer/propose
  // POST

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/freelancer/unassignedpost", {
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

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleProposeClick = (post) => {
    setSelectedPost(post);
    setShowProposalForm(true);
  };

  const handleApply = async () => {
    try {
      // Send the proposed post to the backend
      const postId = selectedPost.id;
      const response = await fetch("http://localhost:8080/api/freelancer/propose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId,
          bid,
        }),
      });
      if (!response.ok) throw new Error("Failed to send proposal");

      // Remove the proposed post from the homepage
      setPosts(posts.filter((post) => post.id !== selectedPost.id));
      setShowProposalForm(false); // Close the form
      setSelectedPost(null); // Reset selected post
      setBiddingAmount(""); // Clear the bidding amount field
      console.log("DONE")
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleCancel = () => {
    setShowProposalForm(false);
    setSelectedPost(null);
    setBiddingAmount("");
  };
  return (
    <div className={Styles.homepage}>
      <div className={Styles.header}>
        <div className={Styles.logo}>
          <img src={Logo} alt="logo" />
          SubLance
        </div>
        <div className={Styles.navLinks}>
          <a href="/create-post" className={Styles.navLink}>
            ASSIGNED
          </a>
          <a href="/proposals.jsx" className={Styles.navLink}>
            PROPOSAL
          </a>
          <a href="/logout" className={Styles.navLink}>
            LOGOUT
          </a>
        </div>
      </div>
      {loading ? (
        <div className={Styles.loading}>Loading posts...</div>
      ) : error ? (
        <div className={Styles.error}>Error: {error}</div>
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
                  <strong>YOUTUBE LINK:</strong> {post.youtubeLink}
                </p>
                <div className={Styles.buttons}>
                  <button
                    className={Styles.proposalsButton}
                    onClick={() => handleProposeClick(post)}
                  >
                    PROPOSE
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
        </>
      )}

      {showProposalForm && (
        <div className={Styles.proposalForm}>
          <h3>Submit Your Proposal</h3>
          <input
            type="text"
            placeholder="Bidding Amount"
            value={biddingAmount}
            onChange={(e) => setBiddingAmount(e.target.value)}
          />
          <div className={Styles.formButtons}>
            <button onClick={handleApply} className={Styles.applyButton}>
                APPLY
            </button>
            <button onClick={handleCancel} className={Styles.cancelButton}>
                CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeLancerHomePage;
