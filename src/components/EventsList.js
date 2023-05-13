import { Link } from "react-router-dom";

import classes from "./EventsList.module.css";

function EventsList({ events }) {
  const eventsList = [];
  for (const key in events) {
    eventsList.push({
      id: key,
      title: events[key].title,
      image: events[key].image,
      description: events[key].description,
      date: events[key].date,
    });
  }
  return (
    <div className={classes.events}>
      <ul className={classes.list}>
        {eventsList.reverse().map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
