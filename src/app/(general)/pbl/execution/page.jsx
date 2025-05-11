import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import Execution from '@/components/pbl/Execution';

const page = () => {
  return (
    <>
      <PageHeader title="Execution Phase Document Submission" />
      <div className='main-content'>
        <div className='row'>
          <Execution />
        </div>
      </div>
    </>
  );
};

export default page;
