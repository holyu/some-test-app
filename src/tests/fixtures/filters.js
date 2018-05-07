const filters = {
  text: "",
  sortBy: "date",
  startDate: null,
  endDate: null
};

const altFilters = {
  text: "bills",
  sortBy: "amount",
  startDate: new Date(0),
  endDate: new Date(70000)
};

export { filters, altFilters };
