import React, { useState, useEffect , useContext } from "react";
import Styles from "./CreatorHomePage.module.css";
import Logo from "../../assets/Logo.png";
import { AuthContext } from '../context/AuthContext';

const CreatorHomePage = () => {
  const postsPerPage = 10;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [modalData, setModalData] = useState({});
  const [linkError, setLinkError] = useState("");
  const [proposals, setProposals] = useState([]);
  const [showProposals, setShowProposals] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Track post for which proposals are fetched
  const { token } = useContext(AuthContext);

  // http://localhost:8080/api/creator/unassignedpost
  // GET
  
  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/creator/unassignedpost", {
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

  const fetchProposals = async (postId) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts" , {
        method : "GET" , 
        headers : {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
        },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch proposals");
      const data = await response.json();
      setProposals(data);
      setShowProposals(true);
    } catch (err) {
      alert("Failed to fetch proposals: " + err.message);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditPost = (post) => {
    setEditingPost(post); // Show modal for the selected post
    setModalData({ ...post }); // Pre-fill modal data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
    if (name === "youtubeLink") {
      if (!urlRegex.test(value)) {
        setLinkError("Please enter a valid YouTube URL.");
      } else {
        setLinkError(""); // Clear error if the URL is valid.
      }
    }
  };

  const handleConfirmEdit = async () => {
    if (!urlRegex.test(modalData.youtubeLink)) {
      alert("Please enter a valid YouTube URL.");
      return;
    }
    try {
      const updatedPost = { ...modalData }; // Updated post data
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json" ,
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!response.ok) throw new Error("Failed to update the post");

      setPosts(
        posts.map((post) => (post.id === editingPost.id ? updatedPost : post))
      );
      setModalData({});
      setEditingPost(null); // Close modal
    } catch (err) {
      alert("Failed to update post:" + err.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((post) => post.id !== editingPost.id));
      setModalData({});
      setEditingPost(null); // Close modal
    } catch (err) {
      alert("Failed to delete post:" + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setModalData({}); // Close modal without saving changes
  };

  const handleProposalsClick = (postId) => {
    setSelectedPost(postId); // Track which post proposals are loaded for
    fetchProposals(postId); // Fetch proposals from the backend
  };
  const handleAcceptProposal = async (proposalId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/proposals/${proposalId}/accept`,
        { 
          method: "POST" ,
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
         }
      ); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to accept proposal");
      alert("Proposal accepted!");
      setProposals(proposals.filter((proposal) => proposal.id !== proposalId)); // Remove the accepted proposal from the UI
    } catch (err) {
      alert("Failed to accept proposal: " + err.message);
    }
  };
  const handleRejectProposal = async (proposalId) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts" ,
        { 
          method: "POST" ,
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        }
      ); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to reject proposal");
      alert("Proposal rejected!");
      setProposals(proposals.filter((proposal) => proposal.id !== proposalId)); // Remove the rejected proposal from the UI
    } catch (err) {
      alert("Failed to reject proposal: " + err.message);
    }
  };
  const handleCloseProposals = () => {
    setShowProposals(false);
    setProposals([]); // Clear proposals
    setSelectedPost(null);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const urlRegex = /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/; // Only matches YouTube URLs.
  return (
    <div className={Styles.homepage}>
      <div className={Styles.header}>
        <div className={Styles.logo}>
          <img src={Logo} alt="logo" />
          SubLance
        </div>
        <div className={Styles.navLinks}>
          <a href="/createPost" className={Styles.navLink}>
            CREATE POST
          </a>
          <a href="/creatorAssigned" className={Styles.navLink}>
            ASSIGNED
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
      ) : posts.length === 0 ? (
        <div className={Styles.noPosts}>You haven't posted anything.</div>
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
                    onClick={() => handleEditPost(post)}
                  >
                    EDIT
                  </button>
                  <button
                    className={Styles.proposalsButton}
                    onClick={() => handleProposalsClick(post.id)}
                  >
                    PROPOSALS
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

      {editingPost && (
        <div className={Styles.modalOverlay}>
          <div className={Styles.modal}>
            <h2>Edit Post</h2>
            <label>
              Post Name:
              <input
                type="text"
                name="name"
                value={modalData.name || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Transcript Language:
              <input
                type="text"
                name="transcriptLanguage"
                value={modalData.transcriptLanguage || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Audio Language:
              <input
                type="text"
                name="audioLanguage"
                value={modalData.audioLanguage || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Deadline:
              <input
                type="date"
                name="deadline"
                value={modalData.deadline || ""}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
            <label>
              YouTube Link:
              <input
                type="url"
                name="youtubeLink"
                value={modalData.youtubeLink || ""}
                onChange={handleInputChange}
              />
              {linkError && <p className={Styles.errorText}>{linkError}</p>}
            </label>
            <div className={Styles.modalButtons}>
              <button
                onClick={handleConfirmEdit}
                className={Styles.confirmButton}
              >
                Confirm
              </button>
              <button
                onClick={handleCancelEdit}
                className={Styles.cancelButton}
              >
                Cancel
              </button>
              <button
                className={Styles.deleteButton}
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showProposals && (
        <div className={Styles.ProposalOverlay}>
          <div className={Styles.proposalModal}>
            <h2>Proposals for {selectedPost}</h2>
            {proposals.length === 0 ? (
              <p>No Proposals Received</p>
            ) : (
              <div className={Styles.proposalsContainer}>
                {proposals.map((proposal) => (
                  <div key={proposal.id} className={Styles.proposalCard}>
                    <p>
                      <strong>Name:</strong> {proposal.userName}
                    </p>
                    <p>
                      <strong>Ratings:</strong> {proposal.ratings}
                    </p>
                    <p>
                      <strong>Bidding Amount:</strong> {proposal.biddingAmount}
                    </p>
                    <p>
                      <strong>Total Work Completed:</strong>{" "}
                      {proposal.totalWorkCompleted}
                    </p>
                    <div className={Styles.proposalButtons}>
                      <button
                        className={Styles.acceptButton}
                        onClick={() => handleAcceptProposal(proposal.id)}
                      >
                        ACCEPT
                      </button>
                      <button
                        className={Styles.rejectButton}
                        onClick={() => handleRejectProposal(proposal.id)}
                      >
                        REJECT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className={Styles.closeButton}
              onClick={handleCloseProposals}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorHomePage;
