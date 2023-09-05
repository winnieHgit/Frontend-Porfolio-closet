// import Weather from "@/components/weather";
// import LoginPage from "./login";
// import SignupPage from "./signup";
import CalendarV2 from "@/components/date-weather-outfit-v2";
import NavBar from "@/components/NavBar";
import TokenWrap from "@/components/Tokenwrap";

import dynamic from "next/dynamic";
const MyMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  return (
    <div className="overflow-y-auto ">
      <NavBar />
      <h1>Home page</h1>

      <TokenWrap>
        {/* <Weather /> */}
        {/* <LoginPage /> */}
        {/* <SignupPage /> */}
        <CalendarV2 city={"Amsterdam"} country={"Netherlands"} />
        {/* <ImgUpload /> */}
      </TokenWrap>

      <MyMap />
    </div>
  );
}





