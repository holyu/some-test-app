import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import databese from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  databese
    .ref("expenses")
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: expenses[0].id });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: expenses[0].id
  });
});

test("should remove the expense from firebase", done => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return databese.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit expense action object", () => {
  const action = editExpense(expenses[0].id, expenses[1]);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: expenses[1]
  });
});

test("should edit expense from firebase", done => {
  const store = createMockStore({});
  const { id, description, amount, note, createdAt } = expenses[0];
  const updates = { description: "Update" };
  const updated = { description: updates.description, amount, note, createdAt };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return databese.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(updated);
      done();
    });
});

test("should setup add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to databese and store", done => {
  const store = createMockStore({});
  const { description, amount, note, createdAt } = expenses[1];
  const expenseData = {
    description,
    amount,
    note,
    createdAt
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      return databese.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to databese and store", done => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
      return databese.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expense from firebase", done => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
