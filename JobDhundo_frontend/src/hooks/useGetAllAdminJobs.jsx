import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/redux/jobSlice';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `https://jobdhundo-backend-deploy.onrender.com/api/v1/job/getadminjobs`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
  return <div></div>;
};

export default useGetAllAdminJobs;
