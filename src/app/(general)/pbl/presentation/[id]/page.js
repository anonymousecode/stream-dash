import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import FinalPresentation from '@/components/pbl/FinalPresentation';

const page = ({ params }) => {
  const { id } = params
  return (
    <>
      <PageHeader title="Final Presentation Submission" />
      <div className='main-content'>
        <div className='row'>
          <FinalPresentation projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
