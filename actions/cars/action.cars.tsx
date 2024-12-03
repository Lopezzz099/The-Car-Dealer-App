'use server';

export const getCarsList = async () => {
  try {
    const res = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong in getCarsList');
    }

    return {
      ok: true,
      data: data.Results,
      message: data.Message || 'Data fetched successfully',
    };
  } catch (error) {
    console.log('Error getting list of cars in getCarsList: ', error);

    return {
      ok: false,
      data: [],
      message:
        error instanceof Error
          ? error.message
          : 'Error getting list of cars in getCarsList',
    };
  }
};

export const getCarsByMakeYear = async (makeId: string, year: string) => {
  console.log('makeId: ', makeId, 'year: ', year);
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || 'Something went wrong in getCarsByMakeYear'
      );
    }

    return {
      ok: true,
      data: data.Results,
      message: data.Message || 'Data fetched successfully',
    };
  } catch (error) {
    console.log('Error getting list of cars in getCarsByMakeYear: ', error);

    return {
      ok: false,
      data: [],
      message:
        error instanceof Error
          ? error.message
          : 'Error getting list of cars in getCarsByMakeYear',
    };
  }
};
