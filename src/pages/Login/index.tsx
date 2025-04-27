import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertCircle, FiLock, FiMail, FiRefreshCw } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button, TextField } from "../../components";
import { useAuth } from "../../context/AuthContext";
import styles from "./index.module.scss";
import { useLogin, useResendVerification } from "./queries";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginUser } = useLogin();
  const { mutate: resendVerification } = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const onSubmit = (values: LoginForm) => {
    loginUser(values, {
      onSuccess: (data) => {
        if (data.token) {
          login(data.token, data.user);
          toast.success("Login successful!");
          navigate("/");
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;

          if (error.response.status === 401) {
            setError("email", { message: " " });
            setError("password", { message: "Invalid email or password" });
          } else if (
            error.response.status === 403 &&
            errorMessage === "User not verified"
          ) {
            setUnverifiedEmail(values.email);
          } else {
            setError("root", {
              message: errorMessage || "Login failed. Please try again.",
            });
          }
        }
      },
    });
  };

  const handleResendVerification = () => {
    resendVerification(
      { email: unverifiedEmail },
      {
        onSuccess: () => {
          toast.success("Verification email sent!", {
            description: `We've sent a new verification link to ${unverifiedEmail}. Please check your inbox.`,
            duration: 5000,
            className: "bg-green-50 border border-green-200 text-green-800",
            icon: <FiMail className="text-green-500" />,
          });
          setUnverifiedEmail("");
          navigate("/verify", { state: { unverifiedEmail } });
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-primaryDarkRosewood mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {unverifiedEmail && (
          <div className="mb-6 p-4 bg-secondaryYellow/20 rounded-lg border border-secondaryYellow shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <FiAlertCircle className="h-5 w-5 text-primaryOrange flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-primaryOrange">
                  Please verify your email address to login
                </p>
              </div>
              <button
                onClick={handleResendVerification}
                className="flex items-center text-sm font-medium text-primaryBlue hover:text-primaryBlue/80 transition-colors duration-200"
              >
                <FiRefreshCw className="mr-1.5 h-4 w-4 flex-shrink-0" />
                Resend
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <TextField
              label="Email Address"
              id="email"
              placeholder="your@email.com"
              icon={<FiMail />}
              {...register("email")}
              error={errors.email?.message}
            />

            <TextField
              label="Password"
              id="password"
              placeholder="••••••••"
              icon={<FiLock />}
              isPassword
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            label="Sign In"
            size="lg"
            variant="filled"
            className="w-full"
          />
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primaryBlue hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
