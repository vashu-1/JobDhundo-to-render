import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationslice';
import { useSelector } from 'react-redux';

const Applicants = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `https://jobdhundo-backend-deploy.onrender.com/api/v1/application/${jobId}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error('Error fetching applicants:', error);
        toast.error(
          error?.response?.data?.message || 'Failed to fetch applicants'
        );
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
