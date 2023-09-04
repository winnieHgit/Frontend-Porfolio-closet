import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import axios from "axios";
import NavBar from "@/components/NavBar";

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
    const response = await axios.post("http://localhost:3007/signup", data);
    console.log(data);
    router.push("myCloset");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(SignupFormValidator),
  });

  return (
    <div>
      <NavBar />
      <h2 className="">Sign up </h2>
      <p>
        {/* sleep one more minute in the morning really matters,try out the ready
        matching ourfit for upcoming days with someone already thought about the
        weather for you. */}
      </p>
      <div>
        <form onSubmit={handleSubmit(handleSignupForm)}>
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
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};
export default SignupPage;
