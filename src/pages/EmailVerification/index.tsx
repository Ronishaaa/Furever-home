import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Dynamic email input
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Email OTP Verification</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleOtpSubmit} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default EmailVerification;
