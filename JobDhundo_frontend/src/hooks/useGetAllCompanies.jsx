import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setAllJobs } from "@/redux/jobSlice";
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `https://jobdhundo-backend-deploy.onrender.com/api/v1/company/get`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, []);
  return <div></div>;
};

export default useGetAllCompanies;
