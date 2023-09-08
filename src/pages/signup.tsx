import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { UserSquare2 } from "lucide-react";
import { KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import formbackground from "../../image/signup-bg.webp";

const SignupFormValidator = z
  .object({
    username: z.string().nonempty(),
    password: z.string().min(8),
  })
  .strict();

type Signup = z.infer<typeof SignupFormValidator>;

const SignupPage = () => {
  const router = useRouter();

  const handleSignupForm = async (data: Signup) => {
    const response = await axios.post(
      `${process.env["NEXT_PUBLIC_API_URL"]}/signup`,
      data
    );
    console.log(data.username);
    router.push("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupFormValidator),
  });

  return (
    <>
      <NavBar />
      <div>
        {/* <h2 className="">Sign up </h2> */}
        <p>
          {/* sleep one more minute in the morning really matters,try out the ready
        matching ourfit for upcoming days with someone already thought about the
        weather for you. */}
        </p>
        <div className="flex border justify-center px-4 py-4 my-8">
          <form
            className="border rounded-lg border-double bg-yellow-400 "
            onSubmit={handleSubmit(handleSignupForm)}
          >
            <label className="flex justify-center py-4" htmlFor="username">
              <UserSquare2 /> Username
            </label>
            <input
              className="border mx-8 "
              id="username"
              type="text"
              {...register("username")}
            ></input>
            {errors.username && (
              <p className="error-msg">{errors.username.message} </p>
            )}
            <label className="flex justify-center py-4" htmlFor="password">
              <KeySquare /> Password
            </label>
            <input
              className="border mx-8"
              id="password"
              type="password"
              {...register("password")}
            ></input>
            {errors.password && (
              <p className="error-msg">{errors.password.message} </p>
            )}
            <div className="flex justify-center py-4">
              <Button
                className="bg-yellow-500  p-4 rounded-lg border border-emerald-100"
                type="submit"
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignupPage;
