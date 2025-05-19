import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyIdeaDevelopment from '@/components/pbl/VerifyIdeaDevelopment'; // adjust path as needed

const VerifyIdeaDevelopmentPage = () => {
  return (
    <>
      <PageHeader title="Verify Idea Development" />
      <div className="main-content">
        <div className="row">
          <VerifyIdeaDevelopment />
        </div>
      </div>
    </>
  );
};

export default VerifyIdeaDevelopmentPage;
