"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { get_data } from "@/api/methods";
import Loading from "@/components/shared/Loading";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const EventDetail = () => {
  const router = useRouter();
  const { id: eventId } = useParams(); // ✅ Correct way to extract event ID
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        const res = await get_data(
          "Events",
          [
            //"id",
            "name",
            "place",
            "date",
            "title",
            "short_description",
            "description",
            "event_image",
            "state_name",
            "district_name",
            "brc_name",
            "lab_type",
            "venue",
            "host",
            "time",
            "level",
            "partner_name",
            "credit"
          ],
          [["name", "=", eventId]] // ✅ Query should filter by ID
        );

        if (res && res.length > 0) {
          setEvent(res[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  const handleBack = () => {
    router.push("/events/view"); // ✅ Redirect back to events page instead of using `router.back()`
  };

  if (loading) return <Loading />;

  if (!event) {
    return (
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
          <i className="fas fa-arrow-left me-2"></i>Back to Events
        </button>
        <div className="alert alert-warning">Event not found</div>
      </div>
    );
  }

  const eventDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      const [hours, minutes] = timeString.split(":");
      const timeObj = new Date();
      timeObj.setHours(hours);
      timeObj.setMinutes(minutes);

      return timeObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (err) {
      return timeString;
    }
  };

  return (
    <div className="container py-4 bg-white">
      {/* Back button */}
      <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
        <i className="fas fa-arrow-left me-2"></i>Back to Events
      </button>

      {/* Event Details */}
      <div className="row">
        {/* Event Image */}
        <div className="col-lg-6 mb-4">
          <div className="position-relative">
            <img
              src={`${apiBaseUrl}${event.event_image}`}
              alt={event.title}
              className="img-fluid rounded shadow"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="position-absolute bottom-0 start-0 bg-warning text-white p-2 px-3 rounded-end">
              {eventDate}
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="col-lg-6">
          <h2 className="mb-3">{event.title}</h2>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge bg-warning text-white p-2">
              Level: {event.level}
            </span>
            {event.time && (
              <span className="badge bg-secondary p-2">
                <i className="far fa-clock me-1"></i> {formatTime(event.time)}
              </span>
            )}
          </div>

          <div className="mb-4">
            <h5 className="text-secondary">Short Description</h5>
            <p>{event.short_description}</p>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <h6 className="text-secondary">Venue</h6>
              <p className="mb-0">{event.venue}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-secondary">Place</h6>
              <p className="mb-0">{event.place}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-secondary">State</h6>
              <p className="mb-0">{event.state_name}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-secondary">District</h6>
              <p className="mb-0">{event.district_name}</p>
            </div>
          </div>

          {event.host && (
            <div className="mb-4">
              <h6 className="text-secondary">Host</h6>
              <p>{event.host}</p>
            </div>
          )}

          {event.partner_name && (
            <div className="mb-4">
              <h6 className="text-secondary">Partner</h6>
              <p>{event.partner_name}</p>
            </div>
          )}
        </div>

        {/* Full Description */}
        <div className="col-12 mt-4">
          <h4 className="mb-3">Description</h4>
          <div className="p-4 bg-light rounded">
            <p style={{ whiteSpace: "pre-line" }}>{event.description}</p>
          </div>
        </div>

        {/* Credit Section */}
        {event.credit && (
          <div className="col-12 mt-4">
            <h5 className="text-secondary">Credits</h5>
            <p>{event.credit}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
