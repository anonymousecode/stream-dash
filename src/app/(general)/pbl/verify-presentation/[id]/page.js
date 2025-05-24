import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyPresentation from '@/components/pbl/VerifyPresentation';

const VerifyPresentationPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Presentation Submission" />
      <div className="main-content">
        <div className="row">
          <VerifyPresentation projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifyPresentationPage;
