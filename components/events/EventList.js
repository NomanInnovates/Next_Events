import EventItem from "./EventItem";
import classes from "./eventList.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items?.map((event) => (
        <EventItem
          id={event.id}
          key={event.id}
          date={event.date}
          image={event.image}
          title={event.title}
          location={event.location}
        />
      ))}
    </ul>
  );
}

export default EventList;
