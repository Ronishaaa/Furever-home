import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, TextField } from "../../components";
import styles from "./index.module.scss";
import { useSignup } from "./queries";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof signupSchema>;

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
  const { mutate: signupUser } = useSignup();

  const onSubmit = (values: SignupForm) => {
    signupUser(values, {
      onSuccess: () => {
        toast.success("Registration successful! Please verify your email");
        navigate("/verify");
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;

          if (error.response.status === 400) {
            setError("email", { message: "Email already exist" });
          } else {
            setError("root", {
              message: errorMessage || "Registration failed",
            });
          }
        }
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-primaryDarkRosewood mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <TextField
              label="Full Name"
              placeholder="John Doe"
              icon={<FiUser />}
              {...register("name")}
              error={errors.name?.message}
            />

            <TextField
              label="Email Address"
              placeholder="your@email.com"
              icon={<FiMail />}
              {...register("email")}
              error={errors.email?.message}
            />

            <TextField
              label="Password"
              placeholder="••••••••"
              isPassword
              icon={<FiLock />}
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            label="Register"
            size="lg"
            variant="filled"
            className="w-full"
          />
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primaryBlue hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
