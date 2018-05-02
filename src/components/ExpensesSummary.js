import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expensesTotal, expensesCount }) => {
  const expensedText = expensesCount === 1 ? "expense" : "expenses";
  return (
    <div>
      Viewing {expensesCount} {expensedText} totalling{" "}
      {numeral(expensesTotal / 100).format("$0,0.00")}
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
