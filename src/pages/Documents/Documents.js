import React ,{useState}from "react";
import { Button, Grid ,Popover, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"; // Import the arrow icon
import { FilterList } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import Stack from '@mui/material/Stack';

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

  function ActionsDropdown({ rowData, handleDelete, handleEdit, handleHistory, handleComments, handleAddRevision }) {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    return (
      <div>
        <IconButton
          aria-label="Actions"
          onClick={handlePopoverOpen}
        >
          <ArrowDropDownIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div>
            <button onClick={() => handleDelete(rowData)}>Supprimer</button>
            <button onClick={() => handleEdit(rowData)}>Modifier</button>
            <button onClick={() => handleHistory(rowData)}>Historique</button>
            <button onClick={() => handleComments(rowData)}>Commentaires</button>
            <button onClick={() => handleAddRevision(rowData)}>Ajouter Nouvelle Révision</button>
          </div>
        </Popover>
      </div>
    );
  }
  
  const columns = [
    // ... (other columns)
    {name: "Titre",
    label: "Titre",
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
    },
  },
  {
    name: "Code",
    label: "Code",
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
    },
  },
  {
    name: "Révision Actuelle",
    label: "Révision Actuelle",
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
    },
  },
  {
    name: "Type",
    label: "Type",
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
    },
  },
  {
    name: "Statut",
    label: "Statut",
    options: {
      filter: true,
      sort: true,
      search: true, // Enable search for this column
    },
  },
     { name: "Actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          return (
            <ActionsDropdown
              rowData={rowData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleHistory={handleHistory}
              handleComments={handleComments}
              handleAddRevision={handleAddRevision}
            />
          );
        },
      },
    },
  ];
  
  const useStyles = makeStyles(theme => ({
    tableOverflow: {
      overflow: 'auto'
    },
    button:{
      backgroundColor: "#3A85F4",
      borderRadius: "30px",
      textTransform: "capitalize",
      fontFamily: "Poppins",
    },
    stackButtons:{
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      justifyContent: 'flex-end',
    }
  }))
  
  const options = {
    download: false, // Remove download option
    print: false, // Remove print option
    selectableRows: "none", // Remove checkbox selection
    filter: false,
    search: true, // Enable global search
    rowsPerPage: [10],
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items per page",
        displayRows: "of",
      },
    },
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    },
  };
  
  function handleDelete(rowData) {
    // Implement delete action here using the rowData
    console.log("Delete clicked for row: ", rowData);
  }
  
  function handleEdit(rowData) {
    // Implement edit action here using the rowData
    console.log("Edit clicked for row: ", rowData);
  }
  
  function handleHistory(rowData) {
    // Implement history action here using the rowData
    console.log("History clicked for row: ", rowData);
  }
  
  function handleComments(rowData) {
    // Implement comments action here using the rowData
    console.log("Comments clicked for row: ", rowData);
  }
  
  function handleAddRevision(rowData) {
    // Implement add revision action here using the rowData
    console.log("Add Revision clicked for row: ", rowData);
  }
  
  export default function Documents() {
    const classes = useStyles();
    return (
      <>
        <Stack spacing={2} direction="row" className={classes.stackButtons}>
      <Button
      variant="contained"
      color = "primary"
      startIcon={<FilterList />}
      className={classes.button}
    >
      Filtrer
    </Button>
    <Button
      variant="contained"
      color = "primary"
      startIcon={<Add />}
      className={classes.button}
    >
      Ajouter
    </Button>
    </Stack>

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