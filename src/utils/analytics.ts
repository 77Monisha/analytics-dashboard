import { redis } from "@/lib/redis";
import { getDate } from "@/utils";

type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  presist?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    let key = `analytics::${namespace}`;

    if (!opts?.presist) {
      key += `::${getDate()}`;
    }

    // db to presist this event
    await redis.hincrby(key, JSON.stringify(event), 1);
    if (!opts?.presist) await redis.expire(key, this.retention);
  }
}

export const analytics = new Analytics();
