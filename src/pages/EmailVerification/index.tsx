import axios from "axios";
import { useState } from "react";
import { FiAlertCircle, FiMail } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components";
import { useResendVerification } from "../Login/queries";
import styles from "./index.module.scss";
import { useVerifyOtp } from "./queries";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string | undefined;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: resendVerification } = useResendVerification();
  const { mutate: verifyOtp } = useVerifyOtp();

  const handleResendVerification = () => {
    resendVerification(
      { email: email! },
      {
        onSuccess: () => {
          toast.success("Verification email sent!", {
            description: `We've sent a new verification link to ${email!}. Please check your inbox.`,
            duration: 5000,
            className: "bg-green-50 border border-green-200 text-green-800",
            icon: <FiMail className="text-green-500" />,
          });
        },
      }
    );
  };

  const handleOtpSubmit = () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    verifyOtp(
      { email: email!, otp },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/login");
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            const msg =
              err.response?.data?.message ?? "OTP verification failed.";
            setError(msg);
          } else {
            setError("Something went wrong. Please try again.");
          }
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className="bg-secondaryWhite rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-primaryDarkRosewood mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            Enter the OTP sent to your email address
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={otp[i] || ""}
                onChange={(e) => {
                  const newOtp = otp.split("");
                  newOtp[i] = e.target.value;
                  setOtp(newOtp.join(""));
                  if (e.target.value && i < 5) {
                    const nextInput = (e.target as HTMLInputElement)
                      .nextElementSibling as HTMLInputElement;
                    nextInput?.focus();
                  }
                }}
                className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    const prevInput = (e.target as HTMLInputElement)
                      .previousElementSibling as HTMLInputElement;
                    prevInput?.focus();
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasteData = e.clipboardData.getData("text").slice(0, 6);
                  if (/^[0-9]{6}$/.test(pasteData)) {
                    setOtp(pasteData);
                    handleOtpSubmit();
                  }
                }}
              />
            ))}
          </div>

          {error && (
            <div className="py-2 px-7 bg-red-50 text-warningRed text-sm rounded-lg flex items-center gap-2">
              <FiAlertCircle className="flex-shrink-0" />
              {error}
            </div>
          )}

          <Button
            onClick={handleOtpSubmit}
            label="Verify Account"
            size="lg"
            variant="filled"
            className="w-full"
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Didn't receive the code? Check your spam folder or{" "}
          <button
            className="text-primaryBlue font-medium"
            onClick={handleResendVerification}
          >
            resend
          </button>
        </div>
      </div>
    </div>
  );
};
