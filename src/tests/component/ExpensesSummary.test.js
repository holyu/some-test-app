import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render ExpensesSummary with 2 expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={9436} expensesCount={2} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with 1 expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={9436} expensesCount={1} />
  );
  expect(wrapper).toMatchSnapshot();
});
