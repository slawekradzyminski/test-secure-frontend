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

    const handleChange = async (event) => {
        const updatedSelectedSpecialties = { ...selectedSpecialties, [event.target.name]: event.target.checked };
        setSelectedSpecialties(updatedSelectedSpecialties);

        const selectedIds = Object.keys(updatedSelectedSpecialties)
            .filter(key => updatedSelectedSpecialties[key])
            .map(key => specialties.find(specialty => specialty.doctorType === key)?.id)
            .filter(id => id !== undefined);
        await dispatch(updateDoctorTypes({ selectedIds, setToast }));
    };

    const handleCreate = async () => {
        try {
            const response = await createDoctorType({ doctorType: newDoctorType });
            setNewDoctorType('');

            if (!specialties.some(specialty => specialty.doctorType === newDoctorType)) {
                const newSpecialty = { id: response.id, doctorType: newDoctorType };
                const updatedSpecialties = [...specialties, newSpecialty];
                setSpecialties(updatedSpecialties);

                const updatedSelectedSpecialties = {
                    ...selectedSpecialties,
                    [newSpecialty.doctorType]: true
                };
                setSelectedSpecialties(updatedSelectedSpecialties);
                const selectedIds = Object.keys(updatedSelectedSpecialties)
                    .filter(key => updatedSelectedSpecialties[key])
                    .map(key => updatedSpecialties.find(specialty => specialty.doctorType === key)?.id)
                    .filter(id => id !== undefined);
                await dispatch(updateDoctorTypes({ selectedIds, setToast }));

                setToast({ open: true, message: 'Doctor type created and applied successfully!', type: 'success' });
            } else {
                setToast({ open: true, message: 'Doctor type already exists!', type: 'info' });
            }
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
