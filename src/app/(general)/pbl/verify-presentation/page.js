import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyPresentation from '@/components/pbl/VerifyPresentation';

const VerifyPresentationPage = () => {
  return (
    <>
      <PageHeader title="Verify Presentation Submission" />
      <div className="main-content">
        <div className="row">
          <VerifyPresentation />
        </div>
      </div>
    </>
  );
};

export default VerifyPresentationPage;
