import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, FormControl, FormGroup, FormControlLabel, Button, Container, Grid, Box, TextField, Paper, Typography } from '@mui/material';
import { fetchDoctorTypes, updateDoctorTypes, createDoctorType } from '../_services/doctorTypes.service';
import { useSelector } from 'react-redux';
import { RootState } from '../_reducers';
import { userService } from '../_services/user.service';
import { ToastContext } from '../context/ToastContext';

const DoctorTypesComponent = () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [newDoctorType, setNewDoctorType] = useState('');
    const setToast = useContext(ToastContext);
    const username = useSelector((state: RootState) => state.authentication.user.username);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDoctorTypes();
            setSpecialties(data);

            const userDetails = await userService.get(username);
            const userSpecialties = userDetails.doctorTypes
                .reduce((acc, curr) => ({ ...acc, [curr.doctorType]: true }), {});
            setSelectedSpecialties(userSpecialties);
        };

        fetchData();
    }, [username]);

    const handleChange = (event) => {
        setSelectedSpecialties({ ...selectedSpecialties, [event.target.name]: event.target.checked });
    };

    const handleSubmit = async () => {
        const selectedIds = Object.keys(selectedSpecialties)
            .filter(key => selectedSpecialties[key])
            .map(key => specialties.find(specialty => specialty.doctorType === key).id);
        try {
            await updateDoctorTypes({ doctorTypeIds: selectedIds });
            setToast({ open: true, message: 'Doctor types updated successfully!', type: 'success' });
        } catch (error) {
            setToast({ open: true, message: 'Failed to update doctor types!', type: 'error' });
        }
    };

    const handleCreate = async () => {
        try {
            await createDoctorType({ doctorType: newDoctorType });
            setNewDoctorType('');
            const updatedSpecialties = await fetchDoctorTypes();
            setSpecialties(updatedSpecialties);
            setToast({ open: true, message: 'Doctor type created successfully!', type: 'success' });
        } catch (error) {
            setToast({ open: true, message: 'Failed to create doctor type!', type: 'error' });
        }
    };

    return (
        <Container>
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
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update My Specialties
                    </Button>
                </FormControl>
            </Box>
            <Box mt={6} p={2} component={Paper} elevation={3} bgcolor="grey.100">
                <Typography variant="h6" align="center" gutterBottom>
                    Can't find your specialty? Add it!
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                    <TextField value={newDoctorType} onChange={(e) => setNewDoctorType(e.target.value)} label="New Doctor Type" />
                    <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginLeft: '10px' }}>
                        Add Doctor Type
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DoctorTypesComponent;
