import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/apiUtil";
import EventContent from "../../components/eventDetail/EventContent";
import EventSummary from "../../components/eventDetail/EventSummary";
import EventLogistics from "../../components/eventDetail/EventLogistics";
import Comments from "../../components/input/comments";

function eventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <h2>Loading... </h2>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths(context) {
  const allEvents = await getFeaturedEvents();
  let paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
}
export default eventDetailPage;
