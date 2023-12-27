import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUser(jwt: RequestCookie) {
  const headers = new Headers();

  headers.append("Cookie", `jwt=${jwt.value}`);

  const res = await fetch("http://localhost:8000/users", {
    headers,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}

export default async function HomePage() {
  const cookieStore = cookies();

  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    redirect("/signin");
  }

  const res = await getUser(jwt);

  if (!res) {
    redirect("/signin");
  }

  return <p>Home</p>;
}
