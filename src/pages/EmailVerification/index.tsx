import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOtpSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/verify-otp", { email, otp });
      toast.success(response.data.message);
      navigate("/login");
    } catch {
      setError("Invalid OTP or OTP expired");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Email OTP Verification
      </h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        className="w-72 p-3 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-72 p-3 mb-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <button
        onClick={handleOtpSubmit}
        disabled={loading}
        className="w-full py-3 bg-primaryGreen text-secondaryWhite font-semibold rounded-md hover:bg-primaryGreen/80 focus:outline-none"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default EmailVerification;
