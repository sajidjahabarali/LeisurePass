import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductTable() {
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-data")
      .then((response) => setRowData(response.data));
  }, []);
  console.log(rowData);
  const classes = useStyles();
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData}>
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
