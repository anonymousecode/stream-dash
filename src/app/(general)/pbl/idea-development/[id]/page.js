import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';

import IdeaDevelopment from '@/components/pbl/IdeaDevelopment';

const page = ({ params }) => {
  const { id } = params;
  console.log("ID from params:", id);
  return (
    <>
      <PageHeader title="Problem Identification" />
      <div className='main-content'>
        <div className='row'>
          <IdeaDevelopment projectId={id} />
        </div>
      </div>
    </>
  );
};

export default page;
