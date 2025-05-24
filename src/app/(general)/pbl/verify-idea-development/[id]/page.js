import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyIdeaDevelopment from '@/components/pbl/VerifyIdeaDevelopment'; // adjust path as needed

const VerifyIdeaDevelopmentPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Idea Development" />
      <div className="main-content">
        <div className="row">
          <VerifyIdeaDevelopment projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifyIdeaDevelopmentPage;
