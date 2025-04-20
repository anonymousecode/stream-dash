import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import EventsView from '@/components/events/EventsView'
import { get_data } from '@/api/methods'
import { eventCategoryOptions } from '@/components/calender/AddEventForm'





export default async function name(params) {


  // const eventsData = await get_data(
  //   "Events",
  //   [
  //     "name",
  //     "place",
  //     "date",
  //     "title",
  //     "short_description",
  //     "event_image",
  //     "state",
  //     "district",
  //     "brc",
  //     "lab_type",
  //     "location",
  //     "level"
  //   ],
  //   ""
  // )
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className='main-content container-lg'>
        <div className='row'>
          <EventsView />
        </div>
      </div>
    </>
  )
}

