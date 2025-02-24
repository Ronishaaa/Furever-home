import { FloatingOverlay } from "@floating-ui/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Button, TextField } from "..";
import { TextArea } from "../TextArea";
import styles from "./index.module.scss";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const AdoptionApplication = ({ open, handleClose }: Props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    householdMembers: "",
    homeOwnership: "",
    petAllowed: "",
    outdoorArea: "",
    aloneHours: "",
    otherPets: "",
    neuteredPets: "",
    previousPets: "",
    convictions: "",
    upcomingEvents: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Application Submitted:", form);
  };

  const closeModal = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      householdMembers: "",
      homeOwnership: "",
      petAllowed: "",
      outdoorArea: "",
      aloneHours: "",
      otherPets: "",
      neuteredPets: "",
      previousPets: "",
      convictions: "",
      upcomingEvents: "",
    });
    handleClose();
  };

  return (
    <FloatingOverlay
      className={twMerge(
        open ? "pointer-events-auto" : "pointer-events-none opacity-0",
        " h-screen w-screen z-20  bg-primaryIvory"
      )}
      lockScroll={open}
    >
      <div className="fh-container my-8">
        <div className="mt-8 flex justify-between">
          <h2 className={styles.title}>Adoption Application</h2>
          <button
            className="flex size-10 items-center justify-center"
            onClick={closeModal}
          >
            <MdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="flex gap-4">
            <TextField
              label="First Name"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <TextField
            label="Address"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Who lives in the home, and what are their ages?"
            id="householdMembers"
            name="householdMembers"
            value={form.householdMembers}
            onChange={handleChange}
            required
          />
          <TextField
            label="Do you own or rent your home?"
            id="homeOwnership"
            name="homeOwnership"
            value={form.homeOwnership}
            onChange={handleChange}
            required
          />
          <div className="flex gap-4">
            <TextField
              label="If renting, are pets allowed in your lease agreement?"
              id="petAllowed"
              name="petAllowed"
              value={form.petAllowed}
              onChange={handleChange}
              required
            />
            <TextField
              label="Do you have a secure outdoor area (e.g., fenced yard, balcony,
              garden)"
              id="outdoorArea"
              name="outdoorArea"
              value={form.outdoorArea}
              onChange={handleChange}
              required
            />{" "}
          </div>
          <TextField
            label="How long will the pet be left alone during the day?"
            id="aloneHours"
            name="aloneHours"
            value={form.aloneHours}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Do you currently have other pets in the household? If yes, provide details."
            id="otherPets"
            name="otherPets"
            value={form.otherPets}
            onChange={handleChange}
            required
            rows={2}
          />{" "}
          <TextArea
            label="Are all current pets neutered?"
            id="neuteredPets"
            name="neuteredPets"
            value={form.neuteredPets}
            onChange={handleChange}
            required
          />
          <TextArea
            label="Do you have any upcoming vacations or life events that may impact adopting an animal?"
            id="upcomingEvents"
            name="upcomingEvents"
            value={form.upcomingEvents}
            onChange={handleChange}
            required
            rows={4}
          />
          <Button
            size="md"
            variant="filled"
            type="submit"
            className="w-full"
            label="Submit Application"
          />
        </form>
      </div>
    </FloatingOverlay>
  );
};
