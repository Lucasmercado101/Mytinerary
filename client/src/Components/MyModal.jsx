import React from "react";
import Modal from "react-modal";

function MyModal(props) {
  return (
    <Modal
      style={{
        overlay: {
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(1, 1, 1,.65)",
        },
        content: {
          inset: "auto",
        },
      }}
      {...props}
    >
      <p
        style={{ float: "right", cursor: "pointer" }}
        onClick={props.onRequestClose || ""}
      >
        X
      </p>
      {props.children}
    </Modal>
  );
}

export default MyModal;
