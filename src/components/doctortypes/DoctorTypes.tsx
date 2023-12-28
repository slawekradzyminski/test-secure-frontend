import React, { useContext, useEffect, useState } from 'react';
import { fetchDoctorTypes, createDoctorType } from '../../api/doctorTypes.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { ToastContext } from '../../context/ToastContext';
import SpecialtyList from './SpecialtyList';
import AddSpecialty from './AddSpecialty';
import ThemedContainer from '../core/ThemedContainer';
import { useAppDispatch } from '../../_helpers/store';
import { updateDoctorTypes } from '../../_actions/user.actions';

const DoctorTypesComponent = () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [newDoctorType, setNewDoctorType] = useState('');
    const setToast = useContext(ToastContext);
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.authentication.user);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDoctorTypes();
            setSpecialties(data);
            if (user && user.doctorTypes) {
                const userSpecialties = user.doctorTypes
                    .reduce((acc, curr) => ({ ...acc, [curr.doctorType]: true }), {});
                setSelectedSpecialties(userSpecialties);
            }
        };

        fetchData();
    }, [user]);

    const handleChange = (event) => {
        setSelectedSpecialties({ ...selectedSpecialties, [event.target.name]: event.target.checked });
    };

    const handleSubmit = async () => {
        const selectedIds = Object.keys(selectedSpecialties)
            .filter(key => selectedSpecialties[key])
            .map(key => specialties.find(specialty => specialty.doctorType === key).id);
        dispatch(updateDoctorTypes({ selectedIds, setToast }))
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
        <ThemedContainer maxWidth="md">
            <SpecialtyList
                specialties={specialties}
                selectedSpecialties={selectedSpecialties}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <AddSpecialty
                newDoctorType={newDoctorType}
                handleCreate={handleCreate}
                setNewDoctorType={setNewDoctorType}
            />
        </ThemedContainer>
    );
};

export default DoctorTypesComponent;
