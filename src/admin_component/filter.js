import React from "react";
import PropTypes from "prop-types";
import Table from "./Table";

const FilterableTable = ({ data, columns, filterText, onFilter }) => {
  const handleFilterChange = (event) => {
    onFilter(event.target.value);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={filterText}
        onChange={handleFilterChange}
      />
      <Table data={filteredData} columns={columns} />
    </div>
  );
};

FilterableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterText: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

FilterableTable.defaultProps = {
  filterText: "",
};

export default FilterableTable;