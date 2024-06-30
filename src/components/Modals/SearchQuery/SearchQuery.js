import React, { useEffect, useState } from "react";

const SearchQuery = ({
  hasSearched,
  setHasSearched,
  filteredData,
  setFilteredData,
  data,
  setData,
}) => {
  useEffect(() => {
    fetch(`http://localhost:5001/allData`)
      .then((res) => res.json())
      .then((data) => setData(data?.data))
      .finally(() => {});
  }, []);

  console.log(filteredData);

  return <div></div>;
};

export default SearchQuery;
