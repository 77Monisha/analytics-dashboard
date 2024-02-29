import { analytics } from "@/utils/analytics";

const Page = async () => {
  // const pageview = await analytics.retrieve('pageview')

  return <p className="text-white">Hello World!!</p>;
};

export default Page;
