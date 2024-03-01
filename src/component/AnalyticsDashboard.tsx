"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
  timeseriesPageview: Awaited<ReturnType<typeof analytics.retrieveDays>>;
}

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageview,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Visitor's Today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorsToday}
          </p>
        </Card>

        <Card className="mt-20">
          {timeseriesPageview ? (
            <BarChart
              allowDecimals={false}
              data={timeseriesPageview.map((day) => ({
                name: day.date,
                Visitors: day.events.reduce((acc, curr) => {
                  return acc + Object.values(curr)[0]!;
                }, 0),
              }))}
              categories={["Visitors"]}
              index="name"
            />
          ) : null}
        </Card>

        {/* 1: 03  */}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
