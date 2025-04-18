// src/api/reportsApi.js
import axios from "axios";

// Base URL cho API (sửa lại đúng địa chỉ backend khi có)
const API_BASE_URL = "https://localhost:5001/api";

export const getEmployeeGenderRatio = async () => {
    const res = await axios.get(`${API_BASE_URL}/reports/gender`);
    return res.data;
};

export const getEmployeesByDepartment = async () => {
    const res = await axios.get(`${API_BASE_URL}/reports/employees-by-department`);
    return res.data;
};

export const getMonthlyStaffGrowth = async () => {
    const res = await axios.get(`${API_BASE_URL}/reports/staff-growth`);
    return res.data;
};
