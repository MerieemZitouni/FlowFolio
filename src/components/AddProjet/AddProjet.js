import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Container,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const steps = ['Informations', 'Codification'];

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
    

      setFormData({
        ...formData,
        champsCodification: [...formData.champsCodification],
      });

    
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
const handleAdd=()=> {
    const  nouveauChampCodification = {
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
    
}
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

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}> {/* Use onSubmit to handle form submission */}
        {activeStep === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Étape 1: Informations</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nom"
                label="Nom"
                value={formData.nom}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="codeProjet"
                label="Code du projet"
                value={formData.codeProjet}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <div>
            <Typography variant="h6">Étape 2: Codification</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Titre de Champ"
                  value={nouveauChamp.titre}
                  onChange={(e) => setNouveauChamp({ ...nouveauChamp, titre: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre de Caractères"
                  type="number"
                  value={nouveauChamp.nbCaracteres}
                  onChange={(e) => setNouveauChamp({ ...nouveauChamp, nbCaracteres: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type de Champ</InputLabel>
                  <Select
                    name="typeChamp"
                    value={nouveauChamp.typeChamp}
                    onChange={(e) => setNouveauChamp({ ...nouveauChamp, typeChamp: e.target.value })}
                  >
                    <MenuItem value="numerique">Numérique</MenuItem>
                    <MenuItem value="alphanumerique">Alphanumérique</MenuItem>
                    <MenuItem value="alphabetique">Alphabétique</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAdd}
                  fullWidth
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>
            {formData.champsCodification.map((champ, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Titre de Champ"
                    value={champ.titre}
                    onChange={(e) => handleChampChange(index, 'titre', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre de Caractères"
                    type="number"
                    value={champ.nbCaracteres}
                    onChange={(e) => handleChampChange(index, 'nbCaracteres', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type de Champ</InputLabel>
                    <Select
                      name="typeChamp"
                      value={champ.typeChamp}
                      onChange={(e) => handleChampChange(index, 'typeChamp', e.target.value)}
                    >
                      <MenuItem value="numerique">Numérique</MenuItem>
                      <MenuItem value="alphanumerique">Alphanumérique</MenuItem>
                      <MenuItem value="alphabetique">Alphabétique</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    onClick={() => handleChampDelete(index)}
                    aria-label="Supprimer"
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </div>
        )}
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h6">Toutes les étapes sont terminées.</Typography>
              {/* Display a summary of the submitted data here */}
            </div>
          ) : (
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Retour
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Container>
  );
}

export default AddProjet;
