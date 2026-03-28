import InvestPlanPage from "@/components/dashboard/invest/InvestPlanPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <InvestPlanPage slug={slug} />;
}
