import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import { get_data } from '@/api/methods';
import MyProjectDetails from '@/components/pbl/MyProjectDetails';

const page = async ({ params }) => {
    const { id } = params


    return (
        <>
            <PageHeader title="Third Review Submission" />
            <div className='main-content'>
                <div className='row'>
                    <MyProjectDetails projectId={id} />
                </div>
            </div>
        </>
    );
};

export default page;
