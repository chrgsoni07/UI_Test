import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const content = JSON.stringify(session?.user || {});
  return <div>main page {content}</div>;
}
