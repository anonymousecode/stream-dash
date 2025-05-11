import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import SecondReview from '@/components/pbl/SecondReview';

const page = () => {
  return (
    <>
      <PageHeader title="Second Review Submission" />
      <div className='main-content'>
        <div className='row'>
          <SecondReview />
        </div>
      </div>
    </>
  );
};

export default page;
