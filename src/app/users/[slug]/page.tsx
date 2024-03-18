import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

import BasicTabs from "@/components/Tabs/Tabs";

async function getCommunitiesBy(jwt: string, userId: string) {
  let res;

  try {
    res = await axios.get(`http://localhost:8000/users/${userId}/communities`, {
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });
  } catch (error) {
    throw new Error("Cannot get communities");
  }

  return res?.data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  if (!userId) return <p>No user id</p>;

  const communities = await getCommunitiesBy(jwt, userId);

  return <BasicTabs communities={communities} />;
}
