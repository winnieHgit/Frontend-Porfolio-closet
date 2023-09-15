// import Weather from "@/components/weather";
// import LoginPage from "./login";
// import SignupPage from "./signup";
//import CalendarV2 from "@/components/date-weather-outfit-v2";
import NavBar from "@/components/NavBar";
import OutfitPage from "../components/outfits";
// import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LoginForm from "@/components/loginForm";
import Footer from "@/components/footer";
import Location from "@/components/setLocation";

// const MyMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [token, setToken] = useState<null | string>(null);

  // const router = useRouter();

  // const handleClick = () => {
  //   console.log("check here");
  //   localStorage.removeItem("token");
  //   setToken(null);

  // };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    // console.log("TOKEN", tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <>
      <div className="overflow-y-auto ">
        <NavBar />

        {token ? (
          <div>
            <OutfitPage />
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}
