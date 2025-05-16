import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import Planning from '@/components/pbl/Planning';

const page = ({ params }) => {
  const { id } = params;
  return (
    <>
      <PageHeader title="Planning" />
      <div className='main-content'>
        <div className='row'>
          <Planning projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
