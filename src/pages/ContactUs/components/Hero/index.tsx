import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";
import { Button, TextArea, TextField } from "../../../../components";

export const Hero = () => {
  return (
    <section className="mt-5">
      <div className="fh-container">
        <h1 className="text-4xl font-semibold text-center mb-2">Contact Us</h1>
        <p className=" text-center mb-8 mx-auto w-3/4">
          Have questions about adoption, our dogs, or how you can help? We're
          here for you. Reach out to our team and we'll respond as soon as
          possible.
        </p>
        <div className="fh-grid">
          <div className="bg-primaryPurple col-span-8 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField label="First Name" required />
                <TextField label="Last Name" required />
              </div>
              <TextField label="Email Address" required />
              <TextField label="Phone Number" required />

              <label>Subject</label>
              <select className="w-full p-3 border rounded-md">
                <option>Please select</option>
                <option>Adoption Inquiry</option>
                <option>Donation</option>
              </select>

              <TextArea label="Message" required rows={4} />

              <div className="flex items-center">
                <input type="checkbox" id="privacy" className="mr-2" />
                <label htmlFor="privacy">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-600">
                    Privacy Policy*
                  </a>
                </label>
              </div>
              <Button
                size="md"
                variant="filled"
                type="submit"
                className="w-full"
                label="Send Message"
              />
            </form>
          </div>

          <div className="bg-black h-fit text-white col-start-9 col-span-4 p-6 rounded-lg text-secondaryWhite">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primaryOrange/20 size-8 rounded-full flex items-center justify-center">
                  <MdLocationOn size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p>Kathmandu,Nepal</p>
                  <a href="#" className="text-yellow-400">
                    Get Directions ↗
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primaryOrange/20 size-8 rounded-full flex items-center justify-center">
                  <MdPhone size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+977 9822222222</p>
                  <p>Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primaryOrange/20 size-8 rounded-full flex items-center justify-center">
                  <MdMail size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>info@fureverhome.org</p>
                  <p className="text-sm opacity-80">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
