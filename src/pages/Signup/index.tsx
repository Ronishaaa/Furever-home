import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button, TextField } from "../../components";
import styles from "./index.module.scss";
import { useSignup } from "./queries";

const signupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
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
        toast("Registration successful!", {
          description: "Please verify your email to continue.",
          duration: 4000,
          className: "bg-green-50 border border-green-200 text-green-800",
          icon: <FiMail className="text-green-500" />,
        });
        navigate("/verify", { state: { email: values.email } });
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
              label="Username"
              placeholder="Ram Kumar"
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
