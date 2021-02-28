import React from "react";
import "./CardItem.css";

const CardItem = ({ title, snippet }) => {
  return (
    <div className="cart-item">
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: snippet }}></p>
    </div>
  );
};

export default CardItem;
