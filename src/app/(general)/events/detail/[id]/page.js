
"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EventsHeader from "@/components/events/EventsHeader";
import EventDetail from "@/components/events/EventDetail";

const EventDetailPage = () => {
  const { id } = useParams(); // ✅ Extract dynamic event ID from the URL

  return (
    <>
      <PageHeader>
        <EventsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EventDetail eventId={id} /> {/* ✅ Pass the event ID to EventDetail */}
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;


