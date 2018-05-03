import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "109",
    description: "Laptop",
    amount: 29500,
    note: "",
    createdAt: 20000
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

const editedExpense = {
  id: expenses[1].id,
  description: "Coffe",
  amount: 500,
  note: "",
  createdAt: 900
};

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: editedExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], editedExpense, expenses[2]]);
});

test("should not edit expense if id not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: -1,
    updates: editedExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});


test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});