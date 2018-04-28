import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("remove", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("edit", () => {
  const action = editExpense("123abc", { smt: "smt1" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { smt: "smt1" }
  });
});

test("add with val", () => {
  const data = {
    description: "retn",
    amount: 109500,
    createdAt: 1000,
    note: "This is note"
  };
  const action = addExpense(data);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...data,
      id: expect.any(String)
    }
  });
});

test("add with def", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      amount: 0,
      createdAt: 0,
      note: "",
      id: expect.any(String)
    }
  });
});
