import React from "react";
import { Grid, TextField } from "@material-ui/core";
function Codification({onNext}){
    return(
        <Grid container alignItems="center">

        <Grid item xs={12} sm={6} md={6} lg={4}>
            <h1>Codification de  projet</h1>
        </Grid>
         <Grid item xs={12} sm={6} md={6} lg={4}>
<TextField label="Nom" variant="filled" color="white"
/>

       </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
      <TextField label="Code" variant="filled" color="white"
/>     </Grid>
         </Grid>
    )
} ;
export default Codification;