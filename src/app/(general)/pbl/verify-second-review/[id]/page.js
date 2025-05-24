import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifySecondReview from '@/components/pbl/VerifySecondReview';

const VerifySecondReviewPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Second Review Submissions" />
      <div className="main-content">
        <div className="row">
          <VerifySecondReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifySecondReviewPage;
