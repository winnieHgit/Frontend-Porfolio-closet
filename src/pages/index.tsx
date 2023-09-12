// import Weather from "@/components/weather";
// import LoginPage from "./login";
// import SignupPage from "./signup";
//import CalendarV2 from "@/components/date-weather-outfit-v2";
import NavBar from "@/components/NavBar";
import OutfitPage from "../components/outfits";
// import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/loginForm";
import Footer from "@/components/footer";

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
    console.log("TOKEN", tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  console.log("token", token);
  return (
    <>
      <div className="overflow-y-auto ">
        <NavBar />
        {token ? (
          <OutfitPage city="Amsterdam" country="Netherlands" />
        ) : (
          <LoginForm />
        )}
      </div>
      <Footer />
    </>
  );
}
