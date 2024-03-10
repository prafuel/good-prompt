'use client'

import Login from "./components/mini/Login";


import { useSession } from "next-auth/react";
import MainSection from "./components/MainSection";

export default function Home() {
  const session = useSession();
  console.log(session['status']);

  return (

    <main className="container min-w-full min-h-screen overflow-auto">

      {
        (session['status'] !== "authenticated") ? (session['status'] === "loading") ? "Loading..." : <Login /> :
          <MainSection data={{ user: session['data']['user'] }} />
      }

      {/* <MainSection data={{user : {name : "Guest", image : undefined}}} /> */}

    </main>

  );
}
