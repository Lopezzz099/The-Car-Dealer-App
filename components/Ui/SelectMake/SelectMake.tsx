'use client';
import { getCarsList } from '@/actions/cars/action.cars';
import { CarData, FieldError, SelectOptions, SelectProps } from '@/types/data';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SelectMake: React.FC<SelectProps> = ({
  selectedOption,
  setSelectedOption,
  errors,
}) => {
  const fieldName = 'make';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]
    ?.message;
  const [cars, setCars] = useState<{
    ok: boolean;
    data?: CarData[];
    message?: string;
  }>();
  const [makesCars, setMakesCars] = useState<SelectOptions[]>([]);
  useEffect(() => {
    const getCars = async () => {
      const res = await getCarsList();
      setCars(res);

      if (res.ok) {
        const options: SelectOptions[] = res.data?.map((car: CarData) => {
          return {
            value: car.MakeId,
            label: car.MakeName,
          };
        });
        setMakesCars(options);
      }
    };
    getCars();
  }, []);
  console.log(cars);
  return (
    <>
      <Select
        options={makesCars}
        value={
          makesCars.find((option) => option.value === selectedOption?.value) ||
          null
        }
        isSearchable
        onChange={(option) => setSelectedOption(option as SelectOptions)}
        classNamePrefix="custom-select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'rgba(59, 130, 246, 0.1)',
            primary: 'rgb(59, 130, 246)',
            neutral0: 'rgb(255, 255, 255)',
            neutral20: 'rgb(209, 213, 219)',
            neutral30: 'rgba(209, 213, 219, 0.5)',
            neutral50: 'rgba(255, 255, 255, 0.5)',
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            // border: 'none',
            // boxShadow: 'none',
            backgroundColor: 'transparent',
            borderRadius: 12,
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(209, 213, 219)',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? 'rgb(59, 130, 246)'
              : state.isFocused
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgb(209, 213, 219)',
            color: state.isSelected ? 'white' : 'rgb(59, 130, 246)',
            padding: '5px 10px',
            cursor: 'pointer',
            userSelect: 'text',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'text-gray-900 dark:text-white',
            userSelect: 'text',
          }),
          input: (provided) => ({
            ...provided,
            color: 'inherit',
            background: 'none',
            // boxShadow: 'none',
            '& input': {
              font: 'inherit',
              color: 'inherit',
              userSelect: 'text',
              // border: 'none',
              // boxShadow: 'none',
            },
          }),
          clearIndicator: () => ({
            display: 'none',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0 8px',
            color: '#111827',
            cursor: 'pointer',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: 'gray',
            opacity: 0.7,
          }),
        }}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default SelectMake;
