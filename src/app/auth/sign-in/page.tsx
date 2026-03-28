import SignInClient from "./SignInClient";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/dashboard";

  return <SignInClient callbackUrl={callbackUrl} />;
}
