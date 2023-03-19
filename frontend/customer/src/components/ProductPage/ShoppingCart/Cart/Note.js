import React from "react";
import styles from "./Note.module.css";
import { ReactComponent as NoteIcon } from "../../../../assets/svg/productPage/noteIcon.svg";

function Note() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <NoteIcon className={styles["note-icon"]} />
        <span className={styles["note-title"]}>GHI CHÚ</span>
      </div>
      <div className={styles.message}>
        <textarea placeholder="Ghi chú......."></textarea>
      </div>
    </div>
  );
}

export default Note;
