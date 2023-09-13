import React, { useState } from 'react';
import {
  Button,
  Typography,
  Container,
  makeStyles,
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Paper from '@mui/material/Paper';


import InformationsStep from './step1';
import CodificationStep from './step2';

const steps = [{label:'Informations'}, {label:'Codification'}];

function AddProjet() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: '',
    codeProjet: '',
    champsCodification: [],
  });
  const [nouveauChamp, setNouveauChamp] = useState({
    titre: '',
    nbCaracteres: '',
    typeChamp: 'numerique',
  });

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {
      // Handle step 2 logic here, if needed
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChampChange = (index, field, value) => {
    const nouveauxChamps = [...formData.champsCodification];
    nouveauxChamps[index][field] = value;
    setFormData({
      ...formData,
      champsCodification: nouveauxChamps,
    });
  };

  const handleAdd = () => {
    const nouveauChampCodification = {
      titre: nouveauChamp.titre,
      nbCaracteres: nouveauChamp.nbCaracteres,
      typeChamp: nouveauChamp.typeChamp,
    };
    setFormData({
      ...formData,
      champsCodification: [...formData.champsCodification, nouveauChampCodification],
    });

    setNouveauChamp({
      titre: '',
      nbCaracteres: '',
      typeChamp: 'numerique',
    });
  };

  const handleChampDelete = (index) => {
    const nouveauxChamps = [...formData.champsCodification];
    nouveauxChamps.splice(index, 1);
    setFormData({
      ...formData,
      champsCodification: nouveauxChamps,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add your form submission logic here
    console.log(formData); // For demonstration, display form data in the console
    // You may want to send the data to a server or perform other actions here
  };
  
const useStyles = makeStyles((theme) => ({
  stepper: {
    top: 0,
    marginLeft: theme.spacing(20),
  },
  labelStep:{
    fontFamily: "poppins Light",
    fontSize: "20px",
  },
  buttonCont:{
    backgroundColor: "#3A85F4",
    borderRadius: "30px",
    textTransform: "capitalize",
    fontFamily: "Poppins",
  },
  buttonRet:{
    borderRadius: "30px",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    color: "#A1A1A1",
  },
  buttonGroup:{
    marginLeft: theme.spacing(20),
  },
  mainStack:{
    display: "flex",
  },
  circle:{
    color: "#3A85F4",
  },
  activeStep:{
    color: "#3A85F4",
  },
  
  }));
  const classe1 = useStyles();
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Stack sx={{marginTop: 0}}className={classe1.mainStack} spacing={2} direction="row" alignItems="center">
<Box>
        <Stepper activeStep={activeStep} orientation="vertical" className={classe1.stepper}>
          {steps.map((step,index) => (
            <Step key={index}>
              <StepLabel             StepIconProps={{
                sx:{

                }
              }} >{step.label}</StepLabel>
 <StepContent>

 <div> {index === 0 ? (           <InformationsStep formData={formData} handleChange={handleChange} />
):(  <CodificationStep
  formData={formData}
  nouveauChamp={nouveauChamp}
  handleAdd={handleAdd}
  handleChampChange={handleChampChange}
  handleChampDelete={handleChampDelete}
/> )}</div>
              <Box sx={{ mb: 0 }}>
                <Stack direction="row" spacing={1.5} className={classe1.buttonGroup}>
                <div> {index === 1 ? ( 
                  <Button
                  variant="contained"
                   color = "primary"
                   className={classe1.buttonCont}
                   onClick={handleNext}
                     >
                       Valider
                 </Button>
                ): (
                  <Button
                  variant="contained"
                   color = "primary"
                   className={classe1.buttonCont}
                   onClick={handleNext}
                     >
                       Continuer
                 </Button>
                )}</div>
                  <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        className={classe1.buttonRet}
                     >
                       Retour
                  </Button>
                  <div>{index===1 ? (<Button
                        onClick={handleReset}
                        className={classe1.buttonRet}
                     >
                       Reinitialiser
                  </Button>): null}</div>
                </Stack>
              </Box>

 </StepContent>


            </Step>
          ))}
        </Stepper>

      
        {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3,borderRadius: '13px',margin:15}}>
          <Typography >Projet ajouté avec succés</Typography>
        </Paper>
      )}
    </Box>
      </Stack>
  );
}

export default AddProjet;