import ResultPage from '@/components/Result/ResultPage';
import { Params } from '@/types/data';
import React from 'react';

const Result = ({ params }: { params: Params }) => {
  return (
    <main>
      <ResultPage params={params} />
    </main>
  );
};

export default Result;
