import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "@/component/AnalyticsDashboard";
import { getDate } from "@/utils";

const Page = async () => {
  const TRACKING_DAYS = 7;

  const pageview = await analytics.retrieveDays("pageview", 2);

  const totalviews = pageview.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalviews / TRACKING_DAYS).toFixed(1);

  const amtVisitorsToday = pageview
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeseriesPageview={pageview}
        />
      </div>
    </div>
  );
};

export default Page;
