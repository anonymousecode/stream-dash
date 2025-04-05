// import React from 'react'
// import PageHeader from '@/components/shared/pageHeader/PageHeader'
// import PageHeaderDate from '@/components/shared/pageHeader/PageHeaderDate'
// import EmailOverview from '@/components/EmailOverview'
// import Browser from '@/components/widgetsList/Browser'
// import Remainders from '@/components/widgetsTables/Remainders'
// import GoalMiscellaneous from '@/components/widgetsMiscellaneous/GoalMiscellaneous'
// import SiteOverviewChart from '@/components/widgetsCharts/SiteOverviewChart'
// import VisitorsOverviewChart from '@/components/widgetsCharts/VisitorsOverviewChart'
// import SocialMediaStatisticsChart from '@/components/widgetsCharts/SocialMediaStatisticsChart'
// import MarketingChart from '@/components/widgetsCharts/MarketingChart'
// import Footer from '@/components/shared/Footer'


// const page = () => {
//     return (
//         <>
//             <PageHeader >
//                 <PageHeaderDate />
//             </PageHeader>
//             <div className='main-content'>
//                 <div className='row'>
//                     <EmailOverview />
//                     <VisitorsOverviewChart />
//                     <Browser title={"Browser States"} />
//                     <SiteOverviewChart />
//                     <GoalMiscellaneous />
//                     <MarketingChart />
//                     <Remainders title={"Project Remainders"} />
//                     <SocialMediaStatisticsChart />
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default page


import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PageHeaderDate from '@/components/shared/pageHeader/PageHeaderDate'
import SiteOverviewStatistics from '@/components/widgetsStatistics/SiteOverviewStatistics'
import PaymentRecordChart from '@/components/widgetsCharts/PaymentRecordChart'
import LeadsOverviewChart from '@/components/widgetsCharts/LeadsOverviewChart'
import TasksOverviewChart from '@/components/widgetsCharts/TasksOverviewChart'
import Project from '@/components/widgetsList/Project'
import Schedule from '@/components/widgetsList/Schedule'
import SalesMiscellaneous from '@/components/widgetsMiscellaneous/SalesMiscellaneous'
import LatestLeads from '@/components/widgetsTables/LatestLeads'
import TeamProgress from '@/components/widgetsList/Progress'
import { projectsDataTwo } from '@/utils/fackData/projectsDataTwo'
// import DuplicateLayout from './duplicateLayout'
import DuplicateLayout from '@/app/duplicateLayout'

const Home = () => {
    return (
        <div>
            {/* // <DuplicateLayout> */}
            <PageHeader >
                <PageHeaderDate />
            </PageHeader>
            <div className='main-content'>
                <div className='row'>
                    <SiteOverviewStatistics />
                    <PaymentRecordChart />
                    <SalesMiscellaneous isFooterShow={true} dataList={projectsDataTwo} />
                    <TasksOverviewChart />
                    <LeadsOverviewChart chartHeight={315} />
                    <LatestLeads title={"Latest Leads"} />
                    <Schedule title={"Upcoming Schedule"} />
                    <Project cardYSpaceClass="hrozintioal-card" borderShow={true} title="Project Status" />
                    <TeamProgress title={"Team Progress"} footerShow={true} />
                </div>
            </div>

            {/* </DuplicateLayout> */}
        </div>
    )
}

export default Home