import React from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense
        ? (props.expense.amount / 100).toString().replace(".", ",")
        : "",
      createdAt: props.expense ? new Date(props.expense.createdAt) : new Date(),
      error: undefined
    };
  }
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onAmountChange = e => {
    let amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\,\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount.replace(",", "."), 10) * 100,
        createdAt: this.state.createdAt.getTime(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <DatePicker
          className="datepicker no-clear"
          onChange={this.onDateChange}
          value={this.state.createdAt}
          returnValue="start"
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          {this.props.expense ? (
            <button className="button">Save Expense</button>
          ) : (
            <button className="button">Add Expense</button>
          )}
        </div>
      </form>
    );
  }
}
