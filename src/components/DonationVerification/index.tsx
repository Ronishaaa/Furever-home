import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { Button } from "../Button";

export const DonationVerification = () => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = searchParams.get("pidx");
      const amount = searchParams.get("amount");

      if (!pidx || !amount) {
        setStatus("failed");
        return;
      }

      try {
        const res = await axios.post("/api/donation/verify", {
          pidx,
          amount,
        });

        console.log("Verification response:", res.data);

        if (res.data.status === "success") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
        console.log(err);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return <p>Verifying your donation...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-50 rounded-lg p-8 shadow-sm">
      {status === "success" ? (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center bg-primaryGreen size-28 bg-green-100 rounded-full mb-4">
            <FaCheck size={60} className="text-secondaryWhite" />
          </div>
          <h1 className="text-3xl font-bold text-primaryGreen">
            Donation Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your generous support!
          </p>
          <a href="/">
            <Button
              label="Return Home"
              size="lg"
              variant="filled"
              className="mx-auto mt-4"
            />
          </a>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center size-20 bg-red-100 rounded-full mb-4"></div>
          <div className="inline-flex items-center justify-center bg-warningRed size-28 bg-green-100 rounded-full mb-4">
            <FaX size={60} className="text-warningRed" />
          </div>
          <h1 className="text-3xl font-bold text-warningRed">
            Verification Failed
          </h1>
          <p className="text-lg text-gray-600">
            Please contact our support team for assistance.
          </p>
          <button className="mt-6 px-6 py-2 bg-warningRed/80 text-secondaryWhite hover:bg-warningRed text-white font-medium rounded-md transition-colors">
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
};
