import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import SecondReview from '@/components/pbl/SecondReview';

const page = ({ params }) => {
  const { id } = params
  return (
    <>
      <PageHeader title="Second Review Submission" />
      <div className='main-content'>
        <div className='row'>
          <SecondReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
