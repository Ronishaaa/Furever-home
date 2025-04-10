import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgNotes } from "react-icons/cg";
import { FaHandHoldingMedical } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";
import { TextArea } from "../TextArea";
import { TextField } from "../TextField";
import { useMakeDonation } from "./queries";

export const DonationSchema = z.object({
  amount: z.number().min(10, { message: "Minimum donation is Rs. 10" }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  message: z.string().optional(),
  userId: z.number().optional(),
});

export type DonationInput = z.infer<typeof DonationSchema>;

export const DonationForm = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { mutate, isSuccess, isError } = useMakeDonation();

  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      amount: 500,
      userId,
    },
  });

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const onSubmit = async (data: DonationInput) => {
    setIsProcessing(true);

    const payload = {
      ...data,
      userId: user?.id ?? undefined,
    };

    mutate(payload, {
      onSuccess: (paymentUrl) => {
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      },
      onError: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <div className="fh-container my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Support Our Mission
        </h2>
        <p className="text-lg text-gray-600">
          Your generous contribution helps us rescue, rehabilitate, and rehome
          dogs in need. Every dollar makes a difference.
        </p>
      </div>

      <div className="fh-grid">
        <div className="bg-primaryBlack text-secondaryWhite p-6 col-span-4 h-fit rounded-xl shadow-md border border-neutralDarkGray">
          <h3 className="text-xl font-semibold text-primaryOrange mb-4">
            Your Donation Helps
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/50 shrink-0 flex items-center justify-center">
                <FaHandHoldingMedical
                  className="text-secondaryWhite"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-medium text-primaryOrange">Medical Care</h4>
                <p className="text-gray-700 text-sm">
                  Vaccinations, spay/neuter surgeries, and emergency medical
                  treatments
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/50 shrink-0 flex items-center justify-center">
                <IoMdCart className="text-secondaryWhite" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-primaryOrange">
                  Food & Supplies
                </h4>
                <p className="text-gray-700 text-sm">
                  Quality nutrition, bedding, toys, and essential care items
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/50 shrink-0 flex items-center justify-center">
                <MdOutlinePersonAddAlt
                  className="text-secondaryWhite"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-medium text-primaryOrange">
                  Behavioral Training
                </h4>
                <p className="text-gray-700 text-sm">
                  Professional training to prepare dogs for successful adoptions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/50 shrink-0 flex items-center justify-center">
                <CgNotes className="text-secondaryWhite" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-primaryOrange">
                  Administrative Costs
                </h4>
                <p className="text-gray-700 text-sm">
                  Website maintenance, adoption applications, and outreach
                  programs
                </p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 col-span-8 col-start-5"
        >
          <div className="bg-secondaryWhite p-6 rounded-xl shadow-md border border-neutralDarkGray">
            <h3 className="text-xl font-semibold text-primaryDarkRosewood mb-4">
              Donation Amount
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  className={twMerge(
                    "py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium",
                    watch("amount") === amount
                      ? "bg-primaryOrange text-secondaryWhite border-primaryOrange shadow-md"
                      : "bg-secondaryWhite border-primaryBlack/40 hover:border-primaryBlack hover:shadow-sm"
                  )}
                  onClick={() => setValue("amount", amount)}
                >
                  Rs. {amount}
                </button>
              ))}
            </div>

            <TextField
              label="Custom Amount (Rs.)"
              type="number"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount?.message}
            />
          </div>

          <div className="bg-secondaryWhite p-6 rounded-xl shadow-md border border-neutralDarkGray">
            <h3 className="text-xl font-semibold text-neutralDarkGray mb-4">
              Your Information
            </h3>
            <TextField
              label="Full Name"
              {...register("name")}
              error={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <TextField
              label="Phone"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <TextArea
              label="Message (Optional)"
              {...register("message")}
              error={errors.message?.message}
              rows={3}
              placeholder="Any special instructions or reasons for donating"
            />
          </div>

          <Button
            size="lg"
            variant="filled"
            type="submit"
            label="Proceed to Payment"
            className="w-full py-4 text-lg font-semibold"
            disabled={isProcessing}
          />

          {isSuccess && (
            <p className="text-green-600">Redirecting to payment gateway...</p>
          )}
          {isError && (
            <p className="text-red-600">
              Failed to initiate payment. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
