import { Box, FormControl, FormGroup, Grid, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import React from "react";

const SpecialtyList = ({ specialties, selectedSpecialties, handleChange }) => (
    <>
        <Typography variant="h4" align="center" gutterBottom mb={4}>
            Please select your specialties
        </Typography>
        <Box display="flex" justifyContent="center">
            <FormControl component="fieldset">
                <FormGroup>
                    <Grid container spacing={3}>
                        {specialties.map((specialty, index) => (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel
                                    control={<Checkbox checked={selectedSpecialties[specialty.doctorType] || false} onChange={handleChange} name={specialty.doctorType} />}
                                    label={specialty.doctorType}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormGroup>
            </FormControl>
        </Box>
    </>
);

export default SpecialtyList