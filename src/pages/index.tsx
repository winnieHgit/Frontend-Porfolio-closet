// import Weather from "@/components/weather";
// import LoginPage from "./login";
// import SignupPage from "./signup";
import CalendarV2 from "@/components/date-weather-outfit-v2";
import NavBar from "@/components/NavBar";
// import ImgUpload from "@/components/Fileupload";

export default function Home() {
  return (
    <>
    <NavBar />
      <h1>Home page</h1>
      {/* <Weather /> */}
      {/* <LoginPage /> */}
      {/* <SignupPage /> */}
      <CalendarV2 city={"Amsterdam"} country={"Netherlands"} />
      {/* <ImgUpload /> */}
    </>
  );
}
