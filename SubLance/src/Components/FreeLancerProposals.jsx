import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./FreeLancerProposals.module.css";

const FreeLancerProposals = () => {
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
  return(
    <div className={styles.pageContainer}>
        <div className={styles.header}>
            <div className={styles.backButton}>
              <FaArrowLeft size={30} />
            </div>
            <h2 className={styles.headerTitle}>PROPOSALS</h2>
        </div>
    </div>
  )
}
export default FreeLancerProposals;