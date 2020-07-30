import React from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

function MyModal(props) {
  return (
    <Modal
      style={{
        overlay: {
          zIndex: 9999,
          display: "flex",
          alignItems: "safe center",
          backgroundColor: "rgba(1, 1, 1,.65)",
          overflowX: "auto",
        },
        content: {
          inset: "auto",
          width: "100%",
        },
      }}
      {...props}
    >
      <div style={{ display: "flex", justifyContent: "right" }}>
        <p style={{ cursor: "pointer" }} onClick={props.onRequestClose || ""}>
          X
        </p>
      </div>
      {props.children}
    </Modal>
  );
}

export default MyModal;
