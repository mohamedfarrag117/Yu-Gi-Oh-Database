import React from "react";
import Modal from "react-modal";

const CardModal = ({ isOpen, onRequestClose, card }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {card && (
        <div>
          <h2>{card.name}</h2>
          <img src={card.card_images[0].image_url} alt={card.name} />
          <p>{card.desc}</p>
        </div>
      )}
    </Modal>
  );
};

export default CardModal;
