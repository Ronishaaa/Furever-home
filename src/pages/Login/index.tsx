import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock, FiMail, FiRefreshCw } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../../components";
import { useAuth } from "../../context/AuthContext";
import styles from "./index.module.scss";
import { useLogin, useResendVerification } from "./queries";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginUser } = useLogin();
  const { mutate: resendVerification } = useResendVerification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    loginUser(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.token) {
            login(data.token, data.user);
            toast.success("Login successful!");
            navigate("/");
          } else {
            toast.error(data.message || "Login failed");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Login failed");
          setUnverifiedEmail(email);
        },
      }
    );
  };

  const handleResendVerification = () => {
    resendVerification(
      { email: unverifiedEmail },
      {
        onSuccess: () => {
          toast.success("Verification email resent!");
          setUnverifiedEmail("");
          navigate("/verify");
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
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <p className="text-yellow-800">
                Please verify your email address
              </p>
              <button
                onClick={handleResendVerification}
                className="flex items-center text-primaryBlue hover:underline"
              >
                <FiRefreshCw className="mr-1" />
                Resend Verification
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <TextField
              label="Email Address"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FiMail />}
            />

            <TextField
              label="Password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FiLock />}
              isPassword
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primaryBlue hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
