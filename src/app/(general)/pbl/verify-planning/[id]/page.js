import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyPlanning from '@/components/pbl/VerifyPlanning';

const VerifyPlanningPage = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Verify Planning Submissions" />
      <div className="main-content">
        <div className="row">
          <VerifyPlanning projectId={id} />
        </div>
      </div>
    </>
  );
};

export default VerifyPlanningPage;
