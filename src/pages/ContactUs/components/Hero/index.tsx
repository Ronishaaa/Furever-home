import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";
import { Button, TextArea, TextField } from "../../../../components";

export const Hero = () => {
  return (
    <section className="py-12">
      <div className="fh-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryDarkRosewood mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about adoption, our dogs, or how you can help? We're
            here for you. Reach out to our team and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-primaryDarkRosewood mb-6 flex items-center gap-2">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField label="First Name" />
                <TextField label="Last Name" />
              </div>

              <TextField label="Email Address" type="email" />

              <TextField label="Phone Number" type="tel" />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select className="w-full p-3 border border-[#e2e8f0] rounded-lg focus:border-primaryBlack">
                  <option>Please select</option>
                  <option>Adoption Inquiry</option>
                  <option>Donation</option>
                  <option>Volunteering</option>
                  <option>Other</option>
                </select>
              </div>

              <TextArea label="Message" rows={5} />

              <Button
                size="lg"
                variant="filled"
                type="submit"
                className="w-full mt-4 bg-primaryOrange hover:bg-primaryOrange/90"
                label="Send Message"
              />
            </form>
          </div>

          <div className="bg-primaryDarkRosewood text-secondaryWhite p-8 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primaryOrange/20 p-3 rounded-full flex-shrink-0">
                  <MdLocationOn size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Address</h3>
                  <p className="text-gray-300 mb-2">Kathmandu, Nepal</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-primaryOrange font-medium hover:text-primaryOrange/80 transition-colors"
                  >
                    Get Directions <span className="ml-1">↗</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primaryOrange/20 p-3 rounded-full flex-shrink-0">
                  <MdPhone size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-gray-300 mb-1">+977 9822222222</p>
                  <p className="text-sm text-gray-400">
                    Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primaryOrange/20 p-3 rounded-full flex-shrink-0">
                  <MdMail size={20} className="text-primaryOrange" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-300 mb-1">info@fureverhome.org</p>
                  <p className="text-sm text-gray-400">
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
