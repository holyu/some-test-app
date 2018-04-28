import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
//import expenses from "../fixtures/expenses";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt date correctly", () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { value: altFilters.text } });
  expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test("should sort by date", () => {
  wrapper.setProps({ filters: altFilters });
  wrapper
    .find("select")
    .simulate("change", { target: { value: filters.sortBy } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  wrapper
    .find("select")
    .simulate("change", { target: { value: altFilters.sortBy } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  wrapper.setProps({ filters: altFilters });
  const startDate = altFilters.startDate;
  const endDate = altFilters.endDate;
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate,
    endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus change", () => {
  const calendarFocused = "startDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(
    calendarFocused
  );
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
