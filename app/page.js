'use client'

import Login from "./components/mini/Login";


import { useSession } from "next-auth/react";
import MainSection from "./components/MainSection";
import Spinner from "./components/mini/Spinner";

export default function Home() {
  const session = useSession();
  console.log(session['status']);

  return (

    <main className="container min-w-full min-h-screen overflow-auto">

      {
        (session['status'] !== "authenticated") ? (session['status'] === "loading") ? <div className="w-full mt-10 flex justify-center"> <Spinner/> </div> : <Login /> :
          <MainSection data={{ user: session['data']['user'] }} />
      }

      {/* <MainSection data={{user : {name : "Guest", image : undefined}}} /> */}

    </main>

  );
}
