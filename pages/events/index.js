import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/apiUtil";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

function AllEventPage({ events }) {
  const router = useRouter();
  function findEventsHandler(month, year) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to envolve"
        />
      </Head>
      <h2 style={{ textAlign: "center" }}>All Events Page</h2>
      <EventsSearch onSearch={findEventsHandler} />

      <EventList items={events} />
    </div>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 30,
  };
}

export default AllEventPage;
