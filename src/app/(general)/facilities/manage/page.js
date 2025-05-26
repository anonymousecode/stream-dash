'use client';

import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import FacilitiesManage from '@/components/facilities/FacilitiesManage';

export default function ManageFacilitiesPage() {
  return (
    <>
      <PageHeader>
        {/* Optionally add a header component */}
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <FacilitiesManage />
        </div>
      </div>
    </>
  );
}
