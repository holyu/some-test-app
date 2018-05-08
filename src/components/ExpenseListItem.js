import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">
        {new Intl.DateTimeFormat("pl-PL", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }).format(createdAt)}
      </span>
    </div>
    <h3 className="list-item__data">
      {new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN"
      }).format(amount / 100)}
    </h3>
  </Link>
);

export default ExpenseListItem;
