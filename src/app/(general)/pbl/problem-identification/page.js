import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import ProblemIdentification from '@/components/pbl/ProblemIdentification';

const page = () => {
  return (
    <>
      <PageHeader title="Problem Identification" />
      <div className='main-content'>
        <div className='row'>
          <ProblemIdentification />
        </div>
      </div>
    </>
  );
};

export default page;
