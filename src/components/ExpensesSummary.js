import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expensesTotal, expensesCount }) => {
  const expensedText = expensesCount === 1 ? "expense" : "expenses";
  const formattedTotal = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN"
  }).format(expensesTotal / 100);
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expensedText} totalling{" "}
          <span>{formattedTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const allVisibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesTotal: selectExpensesTotal(allVisibleExpenses),
    expensesCount: allVisibleExpenses.length
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
