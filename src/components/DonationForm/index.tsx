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
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primaryDarkRosewood mb-4">
          Support Our Mission
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your generous contribution helps us rescue, rehabilitate, and rehome
          dogs in need. Every dollar makes a difference.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div className="bg-secondaryWhite p-6 rounded-xl border border-neutralDarkGray">
            <h3 className="text-2xl font-semibold text-primaryDarkRosewood mb-4">
              Donation Amount
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  className={twMerge(
                    "py-3 px-4 rounded-lg border-2 transition-all duration-200 font-semibold text-lg mb-1",
                    watch("amount") === amount
                      ? "bg-primaryOrange text-secondaryWhite border-primaryOrange"
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

          <div className="bg-secondaryWhite p-6 flex flex-col gap-4 rounded-xl border border-neutralDarkGray">
            <h3 className="text-2xl font-semibold text-neutralDarkGray mb-4">
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

        <div className="bg-black text-secondaryWhite p-8 rounded-xl shadow-lg h-fit">
          <h3 className="text-2xl font-semibold text-primaryOrange mb-4">
            Your Donation Helps
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/20 shrink-0 flex items-center justify-center">
                <FaHandHoldingMedical
                  className="text-primaryOrange"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Medical Care</h4>
                <p className="text-gray-700 text-sm">
                  Vaccinations, spay/neuter surgeries, and emergency medical
                  treatments
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/20 shrink-0 flex items-center justify-center">
                <IoMdCart className="text-primaryOrange" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Food & Supplies</h4>
                <p className="text-gray-700 text-sm">
                  Quality nutrition, bedding, toys, and essential care items
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/20 shrink-0 flex items-center justify-center">
                <MdOutlinePersonAddAlt
                  className="text-primaryOrange"
                  size={20}
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">
                  Behavioral Training
                </h4>
                <p className="text-gray-700 text-sm">
                  Professional training to prepare dogs for successful adoptions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="size-10 rounded-full bg-primaryOrange/20 shrink-0 flex items-center justify-center">
                <CgNotes className="text-primaryOrange" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">
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
      </div>
    </div>
  );
};
