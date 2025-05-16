"use client";
import React from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import EventsHeader from "@/components/events/EventsHeader";
import EventEdit from "@/components/events/EventEdit";

const EventEditPage = () => {
  const { id } = useParams(); // ✅ Extract dynamic event ID from the URL

  return (
    <>
      <PageHeader>
        <EventsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <EventEdit eventId={id} /> {/* ✅ Pass the event ID to EventEdit */}
        </div>
      </div>
    </>
  );
};

export default EventEditPage;
