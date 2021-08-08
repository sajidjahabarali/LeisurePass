import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./ProductTable.css";
import "ag-grid-enterprise";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductTable() {
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [pageSize, setPageSize] = useState(5);

  //change numerical values into strings
  const cleanData = (data) => {
    for (var key in data) {
      data[key].ID = Number(data[key].ID);
      switch (data[key].CATEGORY_ID) {
        case "1":
          data[key].CATEGORY_ID = "Kitchen";
          break;
        case "2":
          data[key].CATEGORY_ID = "Power Tools";
          break;
        case "3":
          data[key].CATEGORY_ID = "Furniture";
          break;
        case "4":
          data[key].CATEGORY_ID = "Electric";
          break;
        case "5":
          data[key].CATEGORY_ID = "Washroom";
          break;
        case "6":
          data[key].CATEGORY_ID = "Textiles";
          break;
        case "7":
          data[key].CATEGORY_ID = "Misc";
          break;
      }
    }

    return data;
  };

  useEffect(() => {
    axios.get("http://localhost:5000/get-data").then((response) => {
      var data = response.data;
      data = cleanData(data);
      setRowData(data);
    });
  }, []);

  useEffect(() => {
    if (pageSize && gridApi) {
      gridApi.paginationSetPageSize(pageSize);
    }
  }, [pageSize]);

  const onDeleteSelectedRows = () => {
    // get array of all selected rows
    const selectedRows = gridApi.getSelectedRows();

    // remove the selected rows, if they exist
    if (selectedRows.length > 0) {
      gridApi.applyTransaction({ remove: selectedRows });
    }
  };

  //handler for adding new product.
  const onAddNewProduct = () => {
    const name = document.querySelector("#input_name").value;
    const desc = document.querySelector("#input_desc").value;
    const cat = document.querySelector("#input_cat").value;
    const create = document.querySelector("#input_create").value;
    const update = document.querySelector("#input_update").value;
    const purchased = document.querySelector("#input_purchased").value;

    if (name && desc && cat && create && update && purchased) {
      // calculate id for new row
      let currentId = 0;
      gridApi.forEachNode((node) => currentId++);

      // add new row via api
      const dataItem = {
        ID: currentId + 1,
        NAME: name,
        DESCRIPTION: desc,
        CATEGORY_ID: cat,
        CREATION_DATE: create,
        UPDATE_DATE: update,
        LAST_PURCHASED_DATE: purchased,
      };
      gridApi.applyTransaction({ add: [dataItem] });
    }
  };

  //executes as grid is initiated
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  //pagination
  const onPageSizeChanged = (event) => {
    setPageSize(event.target.value);
  };

  const classes = useStyles();

  return (
    <div>
      <div>
        <div className="add-product-form">
          <TextField required id="input_name" label="Enter name"></TextField>
          <br />
          <TextField
            required
            id="input_desc"
            label="Enter description"
          ></TextField>
          <br />
          <TextField required id="input_cat" label="Enter category"></TextField>
          <br />
          <TextField
            required
            id="input_create"
            label="Enter created date"
          ></TextField>{" "}
          <br />
          <TextField
            required
            id="input_update"
            label="Enter update date"
          ></TextField>
          <br />
          <TextField
            required
            id="input_purchased"
            label="Enter last purchased date"
          ></TextField>
          <br />
          <Button variant="outlined" color="primary" onClick={onAddNewProduct}>
            Add Product
          </Button>
        </div>

        <Button
          id="delete-button"
          variant="outlined"
          color="primary"
          onClick={onDeleteSelectedRows}
        >
          Delete Selected Products
        </Button>
      </div>
      <div className="ag-theme-alpine grid">
        <div className="header">
          <FormControl className={classes.formControl}>
            Page Size:
            <Select
              value={pageSize}
              onChange={onPageSizeChanged}
              id="page-size"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </div>
        <AgGridReact
          rowData={rowData}
          pagination={true}
          rowSelection="multiple"
          defaultColDef={{ flex: 1, minWidth: 150 }}
          paginationPageSize={5}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        >
          <AgGridColumn
            field="ID"
            maxWidth={90}
            checkboxSelection={true}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="NAME"
            sortable={true}
            filter={true}
          ></AgGridColumn>
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
    </div>
  );
}
