import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import ThirdReview from '@/components/pbl/ThirdReview';

const page = ({ params }) => {
  const { id } = params
  return (
    <>
      <PageHeader title="Third Review Submission" />
      <div className='main-content'>
        <div className='row'>
          <ThirdReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
