import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";

const LoginFormValidator = z
  .object({
    username: z.string().nonempty(),
    password: z.string().min(8),
  })
  .strict();

const TokenFromLoginValidator = z.object({
  token: z.string().nonempty(),
});

type Login = z.infer<typeof LoginFormValidator>;

const LoginPage = () => {
  const router = useRouter();

  const getLoginFromApi = async (data: Login) => {
    const response = await axios.post(`http://localhost:3007/login`, data);

    const validated = TokenFromLoginValidator.safeParse(response.data);
    if (validated.success) {
      localStorage.setItem("token", response.data.token);
      router.push("/mycloset");
    } else {
      console.log("login failed", response);
    }
  };
  const handleLoginSubmit = (data: Login) => {
    console.log("proceed to log in", data);
    getLoginFromApi(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginFormValidator),
  });

  return (
    <div>
      <NavBar />
      <h2>Login to check your upcoming outfit</h2>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div>
          <label htmlFor="username">👤 Username</label>
          <input id="username" type="text" {...register("username")}></input>
          {errors.username && (
            <p className="error-msg">{errors.username.message} </p>
          )}
          <label htmlFor="password">🔐 Password</label>
          <input id="password" type="password" {...register("password")}></input>
          {errors.password && (
            <p className="error-msg">{errors.password.message} </p>
          )}
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
