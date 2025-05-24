import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyFirstReview from '@/components/pbl/VerifyFirstReview';

const VerifyIdeaDevelopmentPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Idea Development" />
      <div className="main-content">
        <div className="row">
          <VerifyFirstReview projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifyIdeaDevelopmentPage;
