import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyFirstReview from '@/components/pbl/VerifyFirstReview';

const VerifyIdeaDevelopmentPage = () => {
  return (
    <>
      <PageHeader title="Verify Idea Development" />
      <div className="main-content">
        <div className="row">
          <VerifyFirstReview />
        </div>
      </div>
    </>
  );
};

export default VerifyIdeaDevelopmentPage;
