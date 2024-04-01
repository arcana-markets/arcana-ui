"use client";

import { NavIcon, NavMenu } from "@/components/common/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ModalCustom from "./ModalCustom";

const Navbar = () => {
  const [modal, setmodal] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <nav className={`w-full py-6 sm:py-10 z-[11] relative`}>
      <div className="flex container  px-4 mx-auto justify-between items-center">
        <div className=" flex gap-12">
          <Link href="/" className="mr-4">
            <NavIcon />
          </Link>
          <div
            className={`transition-all duration-300 ${show ? "!left-0" : ""
              } max-[1024px]:flex-col justify-center items-center gap-5 max-[1024px]:fixed max-[1024px]:w-full max-[1024px]:h-screen h-screen min-[1024px]:h-auto top-0 left-[-100%] max-[1024px]:bg-primary backdrop-blur-3xl max-lg:z-50 flex min-[1024px]:flex min-[1024px]:static`}
          >
            <ul className="flex items-center gap-6 sm:gap-10 min-[1024px]:flex-row flex-col">
              <Link href="/">
                <li className="nav-link">
                  Vaults
                </li>
              </Link>
              <Link href="/">
                <li className="nav-link ">
                  Markets
                </li>
              </Link>
              <Link href="/">
                <li className=" nav-link">
                  Swap
                </li>
              </Link>
              <Link href="/">
                <li className=" nav-link">
                  Tools
                </li>
              </Link>
              <Link href="/">
                <li className=" nav-link">
                  Docs
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex gap-5">

          <div className="text-white z-30 cursor-pointer" onClick={() => setmodal(!modal)}>
            {modal === true ? <MdClose size={24} /> : <button className="text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear">
              Connect <span className="max-sm:hidden">Wallet</span>
            </button>}
          </div>

          <button
            className={`${modal === true ? "hidden" : "block"} z-50 relative min-[1024px]:hidden bg-[#013746] rounded-lg text-white h-12 w-12 flex items-center justify-center`}
            onClick={toggleMenu}
          >
            {show ? <MdClose size={24} /> : <NavMenu />}
          </button>

        </div>
      </div>
      <div className={` ${modal === true ? "block" : "hidden"} fixed w-full left-0 top-0`}>
        <ModalCustom />
      </div>
    </nav>
  );
};

export default Navbar;
