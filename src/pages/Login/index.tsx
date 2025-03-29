import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./index.module.scss";
import { useLogin } from "./queries";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate: loginUser } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.token) {
            login(data.token, data.user);
            setEmail("");
            setPassword("");
            navigate("/");
          } else {
            toast.error(data.error || "Login failed");
          }
        },
        onError: () => {
          toast.error("Login failed");
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-primaryDarkRosewood mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-primaryDarkRosewood">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-primaryGreen rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-primaryDarkRosewood">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-primaryGreen rounded-md focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primaryGreen text-primaryIvory font-semibold rounded-md hover:bg-primaryGreen/80 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-primaryDarkRosewood">
          Don't have an account?{" "}
          <Link to="/register" className="text-primaryBlue hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
