import Image from "next/image";
import HeroSection from "../homepage/HeroSection";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="bg-primary relative">
      <Image
        width="1234"
        height="834"
        className="absolute top-0 left-1/2 -translate-x-1/2"
        src="/img/png/hero-vector.png"
        alt="hero vector"
      />
      <div className="absolute -top-1/2 left-0 h-full right-0 w-[1234px] rounded-full blur-[500px] bg-header_globe"></div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Header;
