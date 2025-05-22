import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyThirdReview from '@/components/pbl/VerifyThirdReview';

const VerifyThirdReviewPage = () => {
  return (
    <>
      <PageHeader title="Verify Second Review Submissions" />
      <div className="main-content">
        <div className="row">
          <VerifyThirdReview />
        </div>
      </div>
    </>
  );
};

export default VerifyThirdReviewPage;
