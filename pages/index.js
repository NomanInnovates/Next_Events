import Head from "next/head";
import { getFeaturedEvents } from "../helpers/apiUtil";
import EventList from "../components/events/EventList";
import NewsLeterRegistration from "../components/input/NewsletterRegistration";

function HomePage({ featuredEvents }) {
  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to envolve"
        />
      </Head>
      <NewsLeterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
export default HomePage;
