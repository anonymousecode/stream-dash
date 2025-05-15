import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import TrendingProjects from '@/components/pbl/MyProjects'; 

const page = () => {
  return (
    <>
      <PageHeader title="Trending Educational Projects" />
      <div className='main-content'>
        <div className='row'>
          <TrendingProjects />
        </div>
      </div>
    </>
  );
};

export default page;
