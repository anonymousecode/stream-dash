import React from 'react';
import PageHeader from '@/components/shared/pageHeader/PageHeader';
import { get_data } from '@/api/methods';
import MyProjectDetails from '@/components/pbl/MyProjectDetails';

const page = async ({ params }) => {
    const { id } = params
    // const project = await get_data("Project", ["name", "title", "description", "attach_image", "starting_date", "completed_date", "brc_name", "district_name", "project_category_name", "current_phase"], [["name", "=", id]])
    // console.log(project[0])

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
