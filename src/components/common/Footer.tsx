import {
  FbIcon,
  LinkedInIcon,
  NavIcon,
  TwiterIcon,
} from "@/utils/Icons";

const Footer = () => {
  return (
    <footer className="bg-footer pt-10 sm:pt-[96px]">
      <div className="container px-4 mx-auto sm:pt-9 pb-8 border-b border-footer_border sm:pb-12 z-[1] relative">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex flex-col">
            <NavIcon />
            <div className="flex items-center gap-7 mt-[30px] mb-10 sm:my-[30px]">
              <span className="duration-300 hover:scale-125 cursor-pointer">
                <TwiterIcon />
              </span>
              <span className="duration-300 hover:scale-125 cursor-pointer">
                <FbIcon />
              </span>
              <span className="duration-300 hover:scale-125 cursor-pointer">
                <LinkedInIcon />
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 sm:gap-10 lg:gap-[96px] gap-8">
            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Company</li>
              <li className="footer-link">About us</li>
              <li className="footer-link">Blog</li>
              <li className="footer-link">Media Kit</li>
              <li className="footer-link">Careers</li>
            </ul>

            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Products</li>
              <li className="footer-link">Vaults</li>
              <li className="footer-link">Markets</li>
              <li className="footer-link">Trading Bot</li>
              <li className="footer-link">API</li>
            </ul>
            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Legal</li>
              <li className="footer-link">Privacy Policy</li>
              <li className="footer-link">Terms & Conditions</li>
              <li className="footer-link">Disclaimer</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto pt-4 sm:pb-4 pb-6">
        <p className="text-base sm:text-sm font-medium text-missioncontrol">
          Arcana Labs LLC © All Rights Reserved 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
