import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group.jsx';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40K', '41-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    // console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((item, index) => (
          <div key={index} className="my-3">
            <h1 className="text-lg font-bold">{item.filterType}</h1>
            {item.array.map((data, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={index}>
                  <RadioGroupItem value={data} id={itemId} />
                  <Label htmlFor={itemId}>{data}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
