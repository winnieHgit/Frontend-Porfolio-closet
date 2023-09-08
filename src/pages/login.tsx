import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button"
import { UserSquare2 } from 'lucide-react';
import { KeySquare } from 'lucide-react';

const LoginFormValidator = z
  .object({
    username: z
      .string()
      .nonempty()
      .email({ message: "Username cannot be empty." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
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
    // console.log("proceed to log in", data);
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
    <>
    <NavBar />
    <div className="flex border justify-center px-4 py-4" >
      {/* <h2 className="">Login to manage your closet </h2> */}
      <div>
        <form className="border rounded-lg border-double bg-yellow-400  "onSubmit={handleSubmit(handleLoginSubmit)}>
          <div>
            <label className="flex justify-center py-4" htmlFor="username">
            <UserSquare2 /> Username</label>
            <input className="border mx-8" id="username" type="text" {...register("username")}></input>
            {errors.username && (
              <p className="error-msg">{errors.username.message} </p>
            )}
            
            <label className="flex justify-center py-4" htmlFor="password">
            <KeySquare /> Password</label>
            <input className="border mx-8" 
              id="password"
              type="password"
              {...register("password")}
            ></input>
            {errors.password && (
              <p className="error-msg">{errors.password.message} </p>
            )}
            <div className="flex justify-center py-4">
            <Button className="bg-yellow-500  p-4 rounded-lg border border-emerald-100" type="submit">Log in</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
export default LoginPage;
