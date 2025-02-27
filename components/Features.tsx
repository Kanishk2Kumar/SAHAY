import { HoverEffect } from "./ui/card-hover-effect";

export function Features() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-5xl font-bold leading-tight font-cormorant-garamond">
        Our{" "}
        <span className="border-b-4 border-dashed border-blue-500">
          Features
        </span>
      </h1>

      <div className="max-w-6xl mx-auto px-8 max-h-[80vh]">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}

export const projects = [
  {
    title: "All Campaigns",
    description:
      "Explore a variety of campaigns on Sahay, where individuals and organizations can raise funds for causes they care about. Join or contribute to campaigns that inspire you.",
    link: "/teamates/hackathon-groups",
  },
  {
    title: "My Requests",
    description:
      "Create or view donation requests for a cause you care about. Whether you're seeking help for medical expenses or a community project, you can find support through Sahay.",
    link: "/my-requests",
  },
  {
    title: "Create Campaigns",
    description:
      "Start your own campaign to raise funds for important causes. Share your story, gather support, and track your progress as you work towards making a positive impact.",
    link: "/my-requests/create-campaign",
  },
  {
    title: "Impact Score",
    description:
      "Track the impact of your donations and contributions. See how your involvement is making a real difference in the lives of others through transparent reporting and updates.",
    link: "/impact-score",
  },
  {
    title: "Tax Benefits",
    description:
      "Learn about the tax benefits of donating to campaigns on Sahay. Stay informed on how you can maximize your charitable contributions while supporting meaningful causes.",
    link: "/tax-benifits",
  },
  {
    title: "Transparency and Tracking",
    description:
      "Sahay ensures transparency in every campaign. Track donations, see where funds are being used, and rest assured that your contributions are going to the right cause.",
    link: "/",
  },
];
