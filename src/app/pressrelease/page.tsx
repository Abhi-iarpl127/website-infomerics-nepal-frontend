import PressReleaseListUI from "./PressReleaseListUI";

export default async function Page() {
  return <PressReleaseListUI />;
}

export async function generateMetadata() {
  return {
    title: "Press Releases",
    description:
      "Rating rationales and press releases published by Infomerics, newest first.",
  };
}
