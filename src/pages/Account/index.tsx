import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdPets } from "react-icons/md";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { Button, TextField } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useGetUser, useUpdateUser } from "./queries";

export const UserProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(30, { message: "Username cannot exceed 30 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be exactly 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Must be 10 digits (no symbols or spaces)" })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, { message: "Address cannot exceed 200 characters" })
    .optional()
    .or(z.literal("")),
});

export type UserProfileInput = z.infer<typeof UserProfileSchema>;
export const Account = () => {
  const { user: authUser } = useAuth();
  const userId = authUser?.id;

  const { data: userData, refetch } = useGetUser(userId as number);
  const { mutate: updateUserMutation } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileInput>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
      address: userData?.address || "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username || "",
        email: userData.email,
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
      });
    }
  }, [userData, reset]);

  const handleSave = (data: UserProfileInput) => {
    if (!userId) return;

    updateUserMutation(
      { userId, userData: data },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!", {
            description: "Your user details have been saved.",
            duration: 3000,
            icon: <MdPets />,
          });
          refetch();
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="fh-container mt-4">
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold text-primaryDarkRosewood">
            Personal Information
          </h1>
          <p className="text-primaryDarkRosewood/80 text-lg">
            Manage your profile details and account preferences
          </p>
        </header>

        <div className="bg-secondaryWhite rounded-xl shadow-sm border border-primaryDarkRosewood/25 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-primaryDarkRosewood/25">
            <h2 className="text-xl font-semibold text-primaryDarkRosewood">
              Profile Details
            </h2>
            {!isEditing && (
              <Button
                size="md"
                variant="filled"
                onClick={() => setIsEditing(true)}
                label="Edit Profile"
              />
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(handleSave)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  label="Username"
                  {...register("username")}
                  error={errors.username?.message}
                />

                <TextField
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                  disabled
                />

                <TextField
                  label="Phone Number"
                  type="tel"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                  placeholder="10 digits without spaces"
                />

                <TextField
                  label="Address"
                  {...register("address")}
                  error={errors.address?.message}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  size="md"
                  variant="outlined-dark"
                  onClick={() => setIsEditing(false)}
                  label="Cancel"
                />
                <Button
                  size="md"
                  variant="filled"
                  type="submit"
                  label="Save Changes"
                />
              </div>
            </form>
          ) : (
            <div className="p-6">
              <div className="flex items-start py-3">
                <span className="w-48 text-sm font-medium text-primaryDarkRosewood">
                  Username
                </span>
                <span className="text-primaryDarkRosewood font-medium">
                  {userData?.username}
                </span>
              </div>
              <div className="flex items-start py-3">
                <span className="w-48 text-sm font-medium text-primaryDarkRosewood">
                  Email Address
                </span>
                <span className="text-primaryDarkRosewood font-medium">
                  {userData?.email}
                </span>
              </div>
              <div className="flex items-start py-3">
                <span className="w-48 text-sm font-medium text-primaryDarkRosewood">
                  Phone Number
                </span>
                <span className="text-primaryDarkRosewood font-medium">
                  {userData?.phoneNumber || (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </span>
              </div>
              <div className="flex items-start py-3">
                <span className="w-48 text-sm font-medium text-primaryDarkRosewood">
                  Address
                </span>
                <span className="text-primaryDarkRosewood font-medium">
                  {userData?.address || (
                    <span className="text-gray-400">Not provided</span>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="my-6">
        <h1 className="text-5xl font-bold mb-1 text-primaryDarkRosewood">
          My Adoption Applications
        </h1>
        <p className="text-primaryDarkRosewood/80 text-lg mb-4">
          Track and manage your dog adoption applications
        </p>

        {userData?.application && userData?.application?.length > 0 ? (
          <div>
            {userData.application.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-primaryDarkRosewood/25 mb-4"
              >
                <div className="flex flex-col md:flex-row p-5 gap-5">
                  <div className="flex-shrink-0">
                    <div className="relative aspect-square w-24 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={app.pet.images[0]}
                        alt={app.pet.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-primaryDarkRosewood">
                          {app.pet.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className="text-sm text-gray-600">
                            {app.pet.breed}
                          </span>
                          <span className="text-sm text-gray-600">
                            {app.pet.age} years
                          </span>
                          <span className="text-sm text-gray-600">
                            {app.pet.gender}
                          </span>
                        </div>
                      </div>
                      <span
                        className={twMerge(
                          "self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                          app.applicationStatus === "Approved"
                            ? "bg-primaryGreen/25 text-primaryGreen"
                            : app.applicationStatus === "Pending"
                            ? "bg-primaryBlue/25 text-primaryBlue"
                            : "bg-warningRed/25 text-warningRed"
                        )}
                      >
                        {app.applicationStatus}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span className="font-medium text-gray-600 mr-2">
                        Submitted:
                      </span>
                      <time dateTime={app.createdAt}>
                        {dayjs(app.createdAt).format("MMMM D, YYYY")}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-primaryDarkRosewood/25 p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-gray-500">
                You haven't submitted any adoption applications yet.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
