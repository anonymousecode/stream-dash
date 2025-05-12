import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import Planning from '@/components/pbl/Planning';

const page = () => {
  return (
    <>
      <PageHeader title="Planning" />
      <div className='main-content'>
        <div className='row'>
          <Planning />
        </div>
      </div>
    </>
  );
};

export default page;
