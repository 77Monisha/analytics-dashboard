import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://apn1-helpful-hare-34474.upstash.io",
  token: process.env.REDIS_LEY!,
});
