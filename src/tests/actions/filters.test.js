import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";

test("setStartDate", () => {
  const action = setStartDate(new Date(5000));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: new Date(5000)
  });
});

test("setEndDate", () => {
  const action = setEndDate(new Date(1000));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: new Date(1000)
  });
});

test("sortByAmount", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});

test("sortByDate", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});

test("setTextFilter with txt", () => {
  const text = "find smt";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text
  });
});

test("setTextFilter no txt", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});
