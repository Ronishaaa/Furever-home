import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../../components";
import styles from "./index.module.scss";

export const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const { data: response } = await axios.post("api/sign-up", {
      username: name,
      email,
      password,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      setData({ name: "", email: "", password: "" });
      toast.success("Registration successful! Please verify your email");
      navigate("/verify");
    }
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primaryDarkRosewood mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <TextField
              label="Full Name"
              placeholder="John Doe"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={isLoading}
              icon={<FiUser />}
            />

            <TextField
              label="Email Address"
              placeholder="your@email.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={isLoading}
              icon={<FiMail />}
            />

            <TextField
              label="Password"
              id="password"
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              disabled={isLoading}
              icon={<FiLock />}
              isPassword
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
