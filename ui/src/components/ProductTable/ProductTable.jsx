import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

// https://www.ag-grid.com/react-grid/data-update-transactions/#example-updating-with-transaction
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ProductTable() {
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-data")
      .then((response) => setRowData(response.data));
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">DESCRIPTION</TableCell>
            <TableCell align="right">CATEGORY_ID</TableCell>
            <TableCell align="right">CREATION_DATE</TableCell>
            <TableCell align="right">UPDATE_DATE</TableCell>
            <TableCell align="right">LAST_PURCHASED_DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData
            ? rowData.map((row) => (
                <TableRow key={row["ID"]}>
                  <TableCell component="th" scope="row">
                    {row["NAME"]}
                  </TableCell>
                  <TableCell align="right">{row["DESCRIPTION"]}</TableCell>
                  <TableCell align="right">{row["CATEGORY_ID"]}</TableCell>
                  <TableCell align="right">
                    {row["LAST_PURCHASED_DATE"]}
                  </TableCell>
                  <TableCell align="right">{row["CREATION_DATE"]}</TableCell>
                  <TableCell align="right">{row["UPDATE_DATE"]}</TableCell>
                  <TableCell align="right">
                    {row["LAST_PURCHASED_DATE"]}
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
