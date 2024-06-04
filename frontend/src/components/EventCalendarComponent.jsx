import React from 'react';
import { Eventcalendar, getJson, Toast } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const EventCalendarComponent = () => {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState();

  const myView = useMemo(
    () => ({
      schedule: { type: 'day' },
    }),
    [],
  );

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        eventDelete={true}
        data={myEvents}
        view={myView}
        onEventClick={handleEventClick}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
};

export default EventCalendarComponent;
