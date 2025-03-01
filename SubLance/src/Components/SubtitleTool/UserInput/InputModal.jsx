import styles from "./InputModal.module.css";

export default function InfoModal({ isModal, handleIsModal }) {
  if (!isModal) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleIsModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Editor Info</h2>
        </div>
        <div className={styles.modalBody}>
          <p>Steps to add Caption :</p>
          <ul>
            <li>⌁ Pause the video</li>
            <li>⌁ Write the Caption</li>
            <li>⌁ Hit Send Button to add</li>
          </ul>
          <p>The timestamp can be set automatically or manually</p>
        </div>
        <button className={styles.closeButton} onClick={handleIsModal}>
          ✖
        </button>
      </div>
    </div>
  );
}
