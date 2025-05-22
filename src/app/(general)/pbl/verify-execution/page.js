import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import VerifyExecution from '@/components/pbl/VerifyExecution';

const VerifyExecutionPage = () => {
  return (
    <>
      <PageHeader title="Verify Execution" />
      <div className="main-content">
        <div className="row">
          <VerifyExecution />
        </div>
      </div>
    </>
  );
};

export default VerifyExecutionPage;
