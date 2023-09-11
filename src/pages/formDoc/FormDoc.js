import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
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
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
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
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#3A85F4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#3A85F4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#3A85F4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#3A85F4',
    zIndex: 1,
    fontSize: 30,
  },
  '& .QontoStepIcon-circle': {
    width: 13,
    height: 13,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
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
function styleSteps( str) {
  return <div style={{fontFamily:"poppins Light" }}>{str}</div>;
}



function FormDoc() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [{label:'Informations sur le document'}, {label:'Ajoutez des commentateurs'},
   {label:'Insérez le document'}];
  const classe1 = useStyles();
  return (
    
    <Stack sx={{marginTop: 0}}className={classe1.mainStack} spacing={2} direction="row" alignItems="center">


       <Box>
      <Stepper activeStep={activeStep} orientation="vertical" className={classe1.stepper}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel 
            
            StepIconProps={{
                sx:{

                }
              }} >
              <div className={classe1.labelStep}>{step.label}</div>
            </StepLabel>
            <StepContent>
            <div> {index === 0 ? ( <StepOne />): index ===1?(<StepTwo/>) :(<StepThree/> )}</div>
              <Box sx={{ mb: 0 }}>
                <Stack direction="row" spacing={1.5} className={classe1.buttonGroup}>
                <div> {index === 2 ? ( 
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
                  <div>{index===2 ? (<Button
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
          <Typography >Document ajouté avec succés</Typography>
        </Paper>
      )}
    </Box>
      </Stack>
  );
}

export default FormDoc;
