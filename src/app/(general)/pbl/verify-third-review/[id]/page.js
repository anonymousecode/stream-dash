import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyThirdReview from '@/components/pbl/VerifyThirdReview';

const VerifyThirdReviewPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Second Review Submissions" />
      <div className="main-content">
        <div className="row">
          <VerifyThirdReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifyThirdReviewPage;
