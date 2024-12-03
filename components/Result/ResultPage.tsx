import { getCarsByMakeYear } from '@/actions/cars/action.cars';
import { Params } from '@/types/data';
import Container from '../Ui/Container/Container';
import { Suspense } from 'react';
import Loading from '../Ui/Loading/Loading';

const makes = [
  { id: 440, name: 'ASTON MARTIN' },
  { id: 474, name: 'HONDA' },
];

const years = [
  { id: 2015, year: '2015' },
  { id: 2016, year: '2016' },
  { id: 2017, year: '2017' },
  { id: 2018, year: '2018' },
  { id: 2019, year: '2019' },
];

export async function generateStaticParams() {
  const paths = makes.flatMap((make) => {
    return years.map((year) => ({
      params: {
        makeId: make.id.toString(),
        year: year.year,
      },
    }));
  });

  return paths;
}

const ResultPage = async ({ params }: { params: Params }) => {
  const { makeId, year } = params;

  const cars = await getCarsByMakeYear(makeId, year);

  const make = makes.find((m) => m.id.toString() === makeId)?.name;
  const yearOption = years.find((y) => y.id.toString() === year)?.year;

  return (
    <Container>
      <h1 className="text-4xl font-bold text-white">
        Results for {make} {yearOption}
      </h1>
      <div className="flex flex-col gap-5 w-full items-center">
        <Suspense fallback={<Loading />}>
          <ul>
            {cars.data.map((car: any) => (
              <li key={car.Model_ID} className="text-white">
                {car.Make_Name} {car.Model_Name} ({car.Model_ID})
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </Container>
  );
};

export default ResultPage;
