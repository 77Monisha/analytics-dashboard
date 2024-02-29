import { format, subDays } from "date-fns";

export const getDate = (sub: number = 0) => {
  const dateXdaysAgo = subDays(new Date(), sub);

  return format(dateXdaysAgo, "dd/MM/yyyy");
};
