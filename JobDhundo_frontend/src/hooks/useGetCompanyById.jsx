import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setAllJobs } from "@/redux/jobSlice";
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `https://jobdhundo-backend-deploy.onrender.com/api/v1/company/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.company);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
  return <div></div>;
};

export default useGetCompanyById;
