import { Fragment, Suspense } from "react";
import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <Fragment>
      <Suspense fallback={<p>Loading event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading events list...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </Fragment>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(
    `https://react-hooks-summary-b1acb-default-rtdb.firebaseio.com/events/${id}.json`
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function loadEvents() {
  const response = await fetch(
    "https://react-hooks-summary-b1acb-default-rtdb.firebaseio.com/events.json"
  );
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch(
    `https://react-hooks-summary-b1acb-default-rtdb.firebaseio.com/events/${id}.json`,
    {
      method: request.method,
    }
  );
  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
}
