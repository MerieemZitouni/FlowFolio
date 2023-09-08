import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
const documents=
{
  "data": [
    {
      "Code": "001",
      "Titre": "Item 1",
      "Révision Actuelle": "1.0",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "002",
      "Titre": "Item 2",
      "Révision Actuelle": "2.1",
      "Type": "Type B",
      "Statut": "Inactive"
    },
    {
      "Code": "003",
      "Titre": "Item 3",
      "Révision Actuelle": "1.5",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "004",
      "Titre": "Item 4",
      "Révision Actuelle": "3.0",
      "Type": "Type C",
      "Statut": "Active"
    },
    {
      "Code": "005",
      "Titre": "Item 5",
      "Révision Actuelle": "1.2",
      "Type": "Type B",
      "Statut": "Inactive"
    },
    {
      "Code": "006",
      "Titre": "Item 6",
      "Révision Actuelle": "2.3",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "007",
      "Titre": "Item 7",
      "Révision Actuelle": "1.1",
      "Type": "Type C",
      "Statut": "Active"
    },
    {
      "Code": "008",
      "Titre": "Item 8",
      "Révision Actuelle": "2.0",
      "Type": "Type B",
      "Statut": "Inactive"
    },
    {
      "Code": "009",
      "Titre": "Item 9",
      "Révision Actuelle": "1.8",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "010",
      "Titre": "Item 10",
      "Révision Actuelle": "3.2",
      "Type": "Type C",
      "Statut": "Active"
    },
    {
      "Code": "011",
      "Titre": "Item 11",
      "Révision Actuelle": "1.9",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "012",
      "Titre": "Item 12",
      "Révision Actuelle": "2.7",
      "Type": "Type B",
      "Statut": "Inactive"
    },
    {
      "Code": "013",
      "Titre": "Item 13",
      "Révision Actuelle": "1.4",
      "Type": "Type C",
      "Statut": "Active"
    },
    {
      "Code": "014",
      "Titre": "Item 14",
      "Révision Actuelle": "3.5",
      "Type": "Type A",
      "Statut": "Active"
    },
    {
      "Code": "015",
      "Titre": "Item 15",
      "Révision Actuelle": "1.3",
      "Type": "Type B",
      "Statut": "Inactive"
    },
   
  ]}

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const options = {
  filter: false,
  rowsPerPage: [10],
  textLabels: {
    pagination: {
      next: "Next >",
      previous: "< Previous",
      rowsPerPage: "Total items Per Page",
      displayRows: "OF",
    },
  },
  onChangePage(currentPage) {
    console.log({ currentPage });
  },
  onChangeRowsPerPage(numberOfRows) {
    console.log({ numberOfRows });
  },
};


export default function Documents() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title=" Documents"
            data={documents.data}
            columns={["Titre", "Code", "Révision Actuelle","Type", "Statut"]}
            options={options}
          />
        </Grid>
       
      </Grid>
    </>
  );
}
