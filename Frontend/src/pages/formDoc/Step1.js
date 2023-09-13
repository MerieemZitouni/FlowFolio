import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
gridBottom: {
  display: 'flex',
  justifyContent: 'center',
},

textInput: {
  fontFamily: 'Poppins',
  caretColor: '#D3D3D3',
  textindent: 10,
  '&::placeholder': {
  fontSize: 15,
  fontFamily: 'Poppins',
  textindent: 10,
  fontStyle: 'italic',
  color:'#3A85F4',
  },  },

  stackInput:{
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(4),
    marginLeft: theme.spacing(20),
  },
  textLabel:{
    fontFamily: 'Poppins',
    color: '#3A85F4',
    fontStyle: 'italic',
    fontSize: 15,
  },
  Select:{
    boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
    
  },
  selectLabel:{
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#000000',
    textIndent: 10,
  },
  selectLabelWithVal:{
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontSize: 15,
    color: '#b7b7b7',
    textIndent: 10,
  },


}));


function CustomizedInputBase({placeholder,width,label}) {
  const classes = useStyles();
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex',borderRadius: '11px', alignItems: 'center', width: width,height: "45px"}}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'Recherche' ,className:classes.textInput }}
      />
    </Paper>
  );
}

const typeDoc = ['pdf', 'word', 'excel', 'powerpoint', 'image png', 'video mp4'];
const statutCase = ['Approuvé', 'En attente', 'Rejeté'];
const revCase = ['A0','A1','A2', 'A3', 'A4', 'A5', 'A6', 'A7',
 'A8', 'A9','B0','B1','B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8', 'B9','D','F'];

function CustomizedSelect({array,typeInput}) {
  const classes = useStyles();
  const [val, setVal] = React.useState('');
 
  const handleChange = (event) => {
    setVal(event.target.value);
  };
  return (
    <Paper component="form"
    sx={{ p: '2px 1px', display: 'flex',justifyContent:'space-between',borderRadius: '11px',
     alignItems: 'center', width: "300px",height: "45px"}}>
      <InputLabel>
       {val ? ( <div className={classes.selectLabel}>{val}</div>) : 
       ( <div className={classes.selectLabelWithVal}>{typeInput}</div>)}
      </InputLabel>

        <Select
          value=''
          label={typeInput}
          onChange={handleChange}
          className={classes.Select}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
              "&.Mui-selected": {
                
              },
          }}

          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#3a85f4',
                '& .MuiMenuItem-root': {
                  padding: 1,
                  fontFamily: 'Poppins',
                  color: '#fff',
                },
                
              },
            },
          }}
        >
          
            {array.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
          

        </Select>
    </Paper>
  );
}



function StepOne() {
  const classe1 = useStyles();
  return (
    

      <Stack spacing={2} direction="row" className={classe1.stackInput}>
      <Stack spacing={5} direction="column">
      <Typography className={classe1.textLabel} variant="label">Code :</Typography>
      <Typography className={classe1.textLabel} variant="label">Titre :</Typography>
      <Typography className={classe1.textLabel} variant="label">Type :</Typography>
      <Typography className={classe1.textLabel} variant="label">Révision :</Typography>
      <Typography className={classe1.textLabel} variant="label">Statut :</Typography>
      </Stack>

      <Stack spacing={2} direction="column" >
      <CustomizedInputBase placeholder="Code" width="300px" label="Code :" />
      <CustomizedInputBase placeholder="Titre" width="300px" label="Titre   :" />
      <CustomizedSelect array={typeDoc} typeInput="Type de document" />
      <CustomizedSelect array={revCase} typeInput="Révision" />
      <CustomizedSelect  array={statutCase} typeInput="Statut" />

      </Stack>
      </Stack>

    
  );
}

export default StepOne;
