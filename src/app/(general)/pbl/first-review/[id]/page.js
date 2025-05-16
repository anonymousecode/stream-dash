import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import FirstReview from '@/components/pbl/FirstReview';

const page = ({ params }) => {
  const { id } = params
  return (
    <>
      <PageHeader title="First Review Submission" />
      <div className='main-content'>
        <div className='row'>
          <FirstReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
