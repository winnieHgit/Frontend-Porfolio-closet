import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);

  const router = useRouter();

  const handleClick = () => {
    console.log("check here");
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    console.log("TOKEN", tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <div>
      <ul>
        <li>
          <nav>
            <Link href="/">Home</Link>
            {token ? (
              <>
                <p>
                  <Link href="/mycloset">My Closet</Link>
                </p>
                <button onClick={handleClick}>Logout</button>
              </>
            ) : (
              <>
                <p>
                  <Link href="/login">Log In</Link>
                </p>
                <p>
                  <Link href="/signup">Signup</Link>
                </p>
              </>
            )}
          </nav>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
