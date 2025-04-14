import React from 'react'
import SiteOverviewStatistics from '@/components/widgetsStatistics/SiteOverviewStatistics'
import PaymentRecordChart from '@/components/widgetsCharts/PaymentRecordChart'
import LeadsOverviewChart from '@/components/widgetsCharts/LeadsOverviewChart'
import { getDashBoard } from '@/api/methods'

export default async function Home() {


    const res = await getDashBoard()
    // console.log("res", res)
    const generalDetails = Object.entries(res.cards).map(([key, value]) => ({
        title: key,
        value: value
    }));
    // console.log("converted", converted)




    return (
        <div>
            <div className='main-content'>
                <div className='row'>
                    <SiteOverviewStatistics generalDetails={generalDetails} />
                    <PaymentRecordChart />
                    {/* <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} /> */}
                    {/* <TasksOverviewChart /> */}
                    <LeadsOverviewChart chartHeight={315} />
                    {/* <LatestLeads title={"Latest Leads"} /> */}
                    {/* <Schedule title={"Upcoming Schedule"} /> */}
                    {/* <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" /> */}
                    {/* <TeamProgress title={"Team Progress"} footerShow={true} /> */}
                </div>
            </div>

            {/* </DuplicateLayout> */}
        </div>
    )
}

