import { Link } from "react-router-dom";

const OPTIONS = [
  {
    title: "Quick Links",
    sections: [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Browse Pets",
        link: "/browse-pets",
      },
      {
        title: "Adoption Process",
        link: "/adoption-process",
      },
      {
        title: "Why Adopt?",
        link: "/why-adopt",
      },
      {
        title: "Contact Us",
        link: "/contact-usr",
      },
    ],
  },
  {
    title: "Get Involved",
    sections: [
      {
        title: "Donate",
        link: "/donate",
      },
    ],
  },
  {
    title: "Contact",
    sections: [
      {
        title: "Location: kathmandu,Nepal",
        link: "/",
      },
      {
        title: "Call Us: 9877777777",
        link: "/y",
      },
      {
        title: "Email: petsdoptionnepal.com",
        link: "/",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-primaryPurple text-secondaryWhite">
      <div className="fh-container">
        <div className="mx-auto w-full pt-6 lg:max-w-[1440px] lg:pt-[100px]">
          <div className="fh-grid order-last mx-auto border-b-secondaryWhite pb-4 lg:border-b lg:py-8">
            <div className="order-last col-span-4 pt-4 lg:order-none lg:pt-0">
              <img
                src="/logoLight.png"
                alt="fureverhome logo"
                className="h-[70px]"
              />
              <div className="mb-4 mt-2 text-secondaryWhite lg:mb-7">
                Giving stray pets a second chance at a loving home.
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-8 border-b border-b-secondaryWhite pb-4 lg:col-span-7 lg:col-start-6 lg:grid-cols-3 lg:border-none lg:pb-0">
              {OPTIONS.map((item, index) => (
                <div key={index}>
                  <div className="text-xl mb-4">{item.title}</div>

                  <ul>
                    {item.sections.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm mb-4 last:mb-0 hover:underline"
                      >
                        <Link to={item.link}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="justify-between lg:flex lg:py-8">
            <div>© 2025 Pet Adoption Nepal. All rights reserved.</div>

            <div className="mt-[10px] flex gap-1 lg:gap-4">
              <a href="" className="hover:underline">
                Privacy Policy
              </a>
              |
              <a href="" className="hover:underline">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
