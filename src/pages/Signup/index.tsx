import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("register Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite shadow-lg p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-primaryBlack mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="name" className="block text-primaryBlack">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full p-3 border border-primaryBrown rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-primaryBlack">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full p-3 border border-primaryBrown rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-primaryBlack">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full p-3 border border-primaryBrown rounded-md focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primaryBrown text-secondaryWhite font-semibold rounded-md focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-primaryBlack">
          Already have an account?{" "}
          <Link to="/login" className="text-primaryBlue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
