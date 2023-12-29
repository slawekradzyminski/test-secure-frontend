import { apiUrl, getRequestOptions, postRequestOptions, putRequestOptions } from "./apiCommons";
import { handleResponse } from "./responseHandler";

export const fetchDoctorTypes = async () => {
    const response = await fetch(`${apiUrl}/doctortypes`, getRequestOptions());
    return handleResponse(response);
};

export const setDoctorTypes = async (doctorTypeUpdateDto: { doctorTypeIds: number[] }) => {
    const response = await fetch(`${apiUrl}/users/doctortypes`, putRequestOptions(doctorTypeUpdateDto));
    return handleResponse(response);
};

export const createDoctorType = async (createDoctorTypeDto: { doctorType: string }) => {
    const response = await fetch(`${apiUrl}/doctortypes`, postRequestOptions(createDoctorTypeDto));
    return handleResponse(response);
};