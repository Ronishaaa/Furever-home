import { FloatingOverlay } from "@floating-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdClose, MdPets } from "react-icons/md";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { Button, RadioButton, TextField } from "..";
import { TextArea } from "../TextArea";
import styles from "./index.module.scss";
import { useAddApplication } from "./queries";

export const ApplicationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  address: z.string().min(1, { message: "Address is required." }),
  householdMembers: z
    .string()
    .min(1, { message: "Please specify household members." }),

  homeOwnership: z.coerce.boolean({
    invalid_type_error: "Home ownership must be selected.",
  }),
  petAllowed: z.coerce.boolean({
    invalid_type_error: "Pet allowance must be selected.",
  }),
  outdoorArea: z.coerce.boolean({
    invalid_type_error: "Outdoor area must be selected.",
  }),
  neuteredPets: z.coerce.boolean({
    invalid_type_error: "Neutered status must be selected.",
  }),

  aloneHours: z.union([
    z
      .number()
      .min(0, { message: "Hours cannot be negative." })
      .max(24, { message: "Hours cannot exceed 24." }),
    z.nan().refine(() => false, { message: "Hours are required." }),
  ]),
  otherPetsInfo: z
    .string()
    .min(1, { message: "Please specify if you have other pets." }),

  upcomingEvents: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;

interface Props {
  open: boolean;
  handleClose: () => void;
  petId: number;
  userId: number;
  onSuccess: () => void;
}

export const AdoptionApplication = ({
  open,
  handleClose,
  petId,
  userId,
  onSuccess,
}: Props) => {
  const { mutate, isSuccess, isError } = useAddApplication();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      homeOwnership: false,
      petAllowed: false,
      outdoorArea: false,
      neuteredPets: false,
    },
  });

  const homeOwnership = watch("homeOwnership");

  useEffect(() => {
    if (homeOwnership) {
      setValue("petAllowed", true);
    }
  }, [homeOwnership, setValue]);

  const onSubmit = (info: ApplicationInput) => {
    const applicationData = {
      ...info,
      applicationStatus: "Pending",
      userId,
      petId,
    };

    mutate(applicationData, {
      onSuccess: () => {
        reset();
        handleClose();
        toast(`Application successfully sent!`, {
          description: `Your adoption application has been sent successfully.`,
          duration: 3000,
          className: "my-classname",
          icon: <MdPets />,
        });
        onSuccess();
      },
      onError: () => console.log("error"),
    });
  };

  const handleFormClose = () => {
    reset();
    handleClose();
  };

  return (
    <FloatingOverlay
      className={twMerge(
        open ? "pointer-events-auto" : "pointer-events-none opacity-0",
        "h-screen w-screen z-50 bg-primaryIvory overflow-y-auto"
      )}
      lockScroll={open}
    >
      <div className="fh-container my-8">
        <div className="mt-8 flex justify-between">
          <h2 className={styles.title}>Adoption Application</h2>
          <button
            className="flex size-10 items-center justify-center"
            onClick={handleFormClose}
            aria-label="Close application form"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-secondaryWhite flex flex-col gap-4 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="First Name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <TextField
                label="Last Name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <TextField
              label="Phone"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />

            <TextField
              label="Address"
              {...register("address")}
              error={errors.address?.message}
            />
          </div>

          <div className="bg-secondaryWhite flex flex-col gap-4 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">Housing Information</h2>

            <TextArea
              label="Who lives in the home? Specify the oldest and youngest members with their ages (e.g., Oldest: 72, Youngest: 5)."
              {...register("householdMembers")}
              error={errors.householdMembers?.message}
              rows={4}
            />

            <Controller
              name="homeOwnership"
              control={control}
              render={({ field }) => (
                <RadioButton.Group
                  label="Do you own or rent your home?"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  error={errors.homeOwnership?.message}
                  name={field.name}
                >
                  <RadioButton value="true">Own</RadioButton>
                  <RadioButton value="false">Rent</RadioButton>
                </RadioButton.Group>
              )}
            />

            {!watch("homeOwnership") && (
              <Controller
                name="petAllowed"
                control={control}
                render={({ field }) => (
                  <RadioButton.Group
                    label="If renting, are pets allowed in your lease agreement?"
                    value={field.value?.toString()}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    error={errors.petAllowed?.message}
                    name={field.name}
                  >
                    <RadioButton value="true">Yes</RadioButton>
                    <RadioButton value="false">No</RadioButton>
                  </RadioButton.Group>
                )}
              />
            )}

            <Controller
              name="outdoorArea"
              control={control}
              render={({ field }) => (
                <RadioButton.Group
                  label="Do you have a secure outdoor area?"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  error={errors.outdoorArea?.message}
                  name={field.name}
                >
                  <RadioButton value="true">Yes</RadioButton>
                  <RadioButton value="false">No</RadioButton>
                </RadioButton.Group>
              )}
            />

            <TextField
              label="Daily alone hours for pet"
              type="number"
              {...register("aloneHours", { valueAsNumber: true })}
              error={errors.aloneHours?.message}
            />

            <TextArea
              label="Other pets in household"
              {...register("otherPetsInfo")}
              error={errors.otherPetsInfo?.message}
              rows={4}
            />

            <Controller
              name="neuteredPets"
              control={control}
              render={({ field }) => (
                <RadioButton.Group
                  label="Are current pets neutered?"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  error={errors.neuteredPets?.message}
                  name={field.name}
                >
                  <RadioButton value="true">Yes</RadioButton>
                  <RadioButton value="false">No</RadioButton>
                </RadioButton.Group>
              )}
            />

            <TextArea
              label="Upcoming events affecting adoption"
              {...register("upcomingEvents")}
              error={errors.upcomingEvents?.message}
              rows={4}
            />
          </div>

          <Button
            size="md"
            variant="filled"
            type="submit"
            className="w-full"
            label={"Submit Application"}
          />

          {isSuccess && (
            <p className="text-green-600">
              Application submitted successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600">Submission failed. Try again later.</p>
          )}
        </form>
      </div>
    </FloatingOverlay>
  );
};
