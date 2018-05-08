import React from "react";
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";
import DatePicker from "react-date-picker/dist/entry.nostyle";

export class ExpenseListFilters extends React.Component {
  onStartDatesChange = startDate => {
    this.props.setStartDate(startDate);
  };
  onEndDatesChange = endDate => {
    this.props.setEndDate(endDate);
  };
  onTextChange = e => this.props.setTextFilter(e.target.value);
  onSortChange = e => {
    if (e.target.value === "amount") {
      this.props.sortByAmount();
    } else if (e.target.value === "date") {
      this.props.sortByDate();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <DatePicker
              className="datepicker"
              onChange={this.onStartDatesChange}
              value={this.props.filters.startDate}
              returnValue="start"
            />
          </div>
          <div className="input-group__item">
            <DatePicker
              className="datepicker"
              onChange={this.onEndDatesChange}
              value={this.props.filters.endDate}
              returnValue="end"
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
