import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./ProductTable.css";

import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductTable() {
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
      // params.api.paginationGoToPage(0);
    };

    fetch("http://localhost:5000/get-data")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-data")
      .then((response) => setRowData(response.data));
  }, []);

  const onPageSizeChanged = (newPageSize) => {
    var value = document.getElementById("page-size").value;
    gridApi.paginationSetPageSize(Number(value));
  };

  const classes = useStyles();

  return (
    <div className="ag-theme-alpine grid">
      <div className="example-header">
        Page Size:
        <select onChange={() => onPageSizeChanged()} id="page-size">
          <option value="5" selected={true}>
            5
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <AgGridReact
        rowData={rowData}
        pagination={true}
        paginationPageSize={5}
        paginationNumberFormatter={function (params) {
          return "[" + params.value.toLocaleString() + "]";
        }}
        onGridReady={onGridReady}
      >
        <AgGridColumn field="ID" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="NAME" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn
          field="DESCRIPTION"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="CATEGORY_ID"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="CREATION_DATE"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="UPDATE_DATE"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="LAST_PURCHASED_DATE"
          sortable={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
}
