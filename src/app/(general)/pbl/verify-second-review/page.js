import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifySecondReview from '@/components/pbl/VerifySecondReview';

const VerifySecondReviewPage = () => {
  return (
    <>
      <PageHeader title="Verify Second Review Submissions" />
      <div className="main-content">
        <div className="row">
          <VerifySecondReview />
        </div>
      </div>
    </>
  );
};

export default VerifySecondReviewPage;
