'use client';
import clsx from 'clsx';
import React, { Suspense } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectMake from '../Ui/SelectMake/SelectMake';
import { FormData } from '@/types/data';
import SelectYear from '../Ui/SelectYear/SelectYear';
import Link from 'next/link';
import Container from '../Ui/Container/Container';

const HomePage = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const makeValue = watch('make');
  const yearValue = watch('year');

  const isFormValid = makeValue !== undefined && yearValue !== undefined;
  console.log(
    ' isFormValid: ',
    isFormValid,
    'makeValue: ',
    makeValue?.value,
    'yearValue: ',
    yearValue?.value
  );

  return (
    <Container>
      <section>
        <h1 className="text-4xl font-bold text-white">
          Car Dealer App - Find Your Perfect Car
        </h1>
        <h3 className="text-xl font-bold text-white">
          Filter vehicles by make and model year, and explore results with ease.
        </h3>
      </section>
      <section className="bg-slate-700 rounded-xl max-h-[300px] h-full flex flex-col items-center justify-center gap-10">
        <div className="flex gap-5 justify-center flex-col sm:flex-row">
          <div className="w-64 flex flex-col gap-5">
            <label
              htmlFor="make"
              className={clsx(errors.make ? 'text-red-500' : 'text-white')}
            >
              Vehicle makes
            </label>
            <Suspense fallback={<p className="text-white">Loading makes...</p>}>
              <Controller
                name="make"
                control={control}
                defaultValue={undefined}
                rules={{ required: 'Make is required' }}
                render={({ field, fieldState }) => (
                  <SelectMake
                    selectedOption={field.value}
                    setSelectedOption={(option) => {
                      field.onChange(option);
                    }}
                    errors={
                      fieldState.error ? { [field.name]: fieldState.error } : {}
                    }
                  />
                )}
              />
            </Suspense>
          </div>
          <div className="w-64 flex flex-col gap-5">
            <label
              htmlFor="year"
              className={clsx(errors.year ? 'text-red-500' : 'text-white')}
            >
              Model years ranging from 2015
            </label>
            <Suspense fallback={<p className="text-white">Loading years...</p>}>
              <Controller
                name="year"
                control={control}
                defaultValue={undefined}
                rules={{ required: 'Year is required' }}
                render={({ field, fieldState }) => (
                  <SelectYear
                    selectedOption={field.value}
                    setSelectedOption={(option) => {
                      field.onChange(option);
                    }}
                    errors={
                      fieldState.error ? { [field.name]: fieldState.error } : {}
                    }
                  />
                )}
              />
            </Suspense>
          </div>
        </div>
        <Link
          href={
            isFormValid
              ? `/result/${makeValue?.value ?? ''}/${yearValue?.value ?? ''}`
              : '#'
          }
          className={clsx(
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            !isFormValid && 'bg-gray-500 cursor-not-allowed opacity-50'
          )}
        >
          Next
        </Link>
      </section>
    </Container>
  );
};

export default HomePage;
