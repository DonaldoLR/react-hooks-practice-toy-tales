import React from "react";

function ToyCard({ toy: { id, name, image, likes }, donateToy, likeToy }) {
  function handleLikes() {
    likeToy(id);
  }
  function handleDonateToy() {
    donateToy(id);
  }
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikes}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonateToy}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
