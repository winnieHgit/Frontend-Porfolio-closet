import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import LoginForm from "./loginForm";
import logo2 from "../../image/ClosetUp.png";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);

  const router = useRouter();

  const handleClick = () => {
    console.log("check here");
    localStorage.removeItem("token");
    setToken(null);
    router.push("login/");
  };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    // console.log("TOKEN", tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center pb-4 pt-4 border-dotted">
        <Image
          className=" bg-yellow-900  p-1 rounded-full border-dotted"
          src={logo2}
          alt="logo"
          width={200}
          height={200}
        />
      </div>

      {
        token && (
          <>
            <nav className="flex justify-evenly pb-4 pt-4  bg-yellow-300 text-yellow-900">
              <div>
                <Link className=" flex justify-start" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-home"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>{" "}
                  <span className="pl-2">Home</span>
                </Link>
              </div>
              <p>
                <Link className=" flex justify-start" href="/mycloset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shirt"
                  >
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                  </svg>
                  <span>My Closet</span>
                </Link>
              </p>
              <button className=" flex justify-start" onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span className="pl-2">Logout</span>
              </button>
            </nav>
          </>
        )
        //: (
        // <>
        //   <p>
        //     <Link className=" flex justify-start" href="/login">
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         width="24"
        //         height="24"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //         strokeWidth="2"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         className="lucide lucide-log-in"
        //       >
        //         <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        //         <polyline points="10 17 15 12 10 7" />
        //         <line x1="15" x2="3" y1="12" y2="12" />
        //       </svg>
        //       <span className="pl-2">Log In</span>
        //     </Link>
        //   </p>
        //   <p>
        //     <Link className=" flex justify-start" href="/signup">
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         width="24"
        //         height="24"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //         strokeWidth="2"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         className="lucide lucide-user-plus"
        //       >
        //         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        //         <circle cx="9" cy="7" r="4" />
        //         <line x1="19" x2="19" y1="8" y2="14" />
        //         <line x1="22" x2="16" y1="11" y2="11" />
        //       </svg>
        //       <span className="pl-2">Sign Up</span>
        //     </Link>
        //   </p>
        // </>
        //<LoginForm />
        //)
      }
    </div>
  );
};

export default NavBar;
