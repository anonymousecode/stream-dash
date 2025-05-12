import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import FinalPresentation from '@/components/pbl/FinalPresentation';

const page = () => {
  return (
    <>
      <PageHeader title="Final Presentation Submission" />
      <div className='main-content'>
        <div className='row'>
          <FinalPresentation />
        </div>
      </div>
    </>
  );
};

export default page;
