import { ModalIcon1, ModalIcon2, TickIcon } from "@/common/Icons";
import React, { useState } from "react";
import { DownArrow } from "./Icons"; 

const ModalCustom = () => {
  const [IsChecked, setIsChecked] = useState(false);
  return (
    <div className="h-[100vh] bg-[#080f14] relative z-20  flex  w-full text-center flex-col">
      <div className="container mx-auto w-full flex  grow  justify-center">
        <div className="  flex items-center justify-center">
          <div className=" max-w-[364px] mx-5 w-full rounded-[24px] bg-darkpurple sm:h-[646px] px-6 sm:p-[0px_32px_32px_32px] ">
            <h3 className=" ff_inter text-center mt-[24px]  font-bold text-[18px] leading-[28px] text-[white] ">
              Connect a Solana wallet
            </h3>
            {/* three_boxes_here */}
            <div className=" flex items-center justify-center gap-[15px] mt-[16px]">
              {/* box_1 */}
              <div className=" cursor-pointer max-w-[90px] w-full h-[88px] rounded-[16px] bg-modal_small_box  flex   items-center justify-center ">
                {/* small_box_inside */}
                <div className=" max-w-[40px] w-full h-[40px] rounded-[12px] bg-purple flex items-center justify-center ">
                  <ModalIcon1 />
                </div>
              </div>
              {/* box_2 */}
              <div className=" cursor-pointer max-w-[90px] w-full h-[88px] rounded-[16px] bg-modal_small_box  flex   items-center justify-center ">
                <ModalIcon2 />
              </div>
              {/* box_3 */}
              <div className=" cursor-pointer max-w-[90px] w-full h-[88px] rounded-[16px] bg-modal_small_box  flex   items-center justify-center ">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_30_59)">
                    <path
                      d="M20.1366 38.3283C20.5566 38.3283 20.8972 38.6651 20.8972 39.0806C20.8972 39.496 20.5566 39.8327 20.1366 39.8327C19.7166 39.8327 19.3761 39.496 19.3761 39.0806C19.3761 38.6651 19.7166 38.3283 20.1366 38.3283ZM19.3104 2.3958C19.6821 2.42649 19.9822 2.70812 20.0326 3.07325L20.9371 9.64584C21.241 11.8173 23.8599 12.7582 25.4766 11.2826L34.5398 3.0333C34.7585 2.83431 35.099 2.8481 35.3004 3.0641C35.4851 3.26228 35.4907 3.56568 35.3133 3.77032L27.41 12.887C25.955 14.5623 27.0286 17.1784 29.2465 17.3652L36.2199 18.0374C36.5672 18.0709 36.8213 18.3762 36.7874 18.7194C36.7594 19.0023 36.5414 19.231 36.2571 19.2753L28.9296 20.4194C26.8022 20.7094 25.8387 23.2288 27.2225 24.8655L29.7985 27.9024C30.006 28.147 29.9735 28.5116 29.7258 28.7166C29.5161 28.8904 29.2123 28.8971 28.9948 28.7329L25.8193 26.3346C24.1056 25.0459 21.6355 26.1413 21.4544 28.2741L20.7546 36.5922C20.7257 36.9358 20.4204 37.1911 20.0726 37.1626C19.7774 37.1383 19.539 36.9148 19.499 36.6249L18.3893 28.5899C18.0919 26.4184 15.473 25.4776 13.8498 26.9532L4.20828 35.7324C4.0087 35.9141 3.69781 35.9015 3.51388 35.7044C3.34513 35.5234 3.34 35.2465 3.50194 35.0596L11.9165 25.3488C13.3714 23.6734 12.3044 21.0573 10.0864 20.8706L3.11142 20.1982C2.76412 20.1647 2.51005 19.8594 2.54394 19.5162C2.57188 19.2333 2.78985 19.0047 3.0741 18.9602L10.3968 17.8163C12.5243 17.5263 13.4942 15.007 12.1105 13.3702L10.3569 11.303C10.0995 10.9996 10.1398 10.5475 10.447 10.2933C10.7072 10.0778 11.084 10.0695 11.3537 10.2734L13.5071 11.9011C15.2208 13.1898 17.6909 12.0945 17.872 9.96168L18.4513 3.1137C18.4878 2.68106 18.8725 2.35964 19.3104 2.3958ZM0.760536 18.7475C1.18057 18.7475 1.52107 19.0843 1.52107 19.4998C1.52107 19.9152 1.18057 20.252 0.760536 20.252C0.340503 20.252 0 19.9152 0 19.4998C0 19.0843 0.340503 18.7475 0.760536 18.7475ZM38.9043 17.9838C39.3243 17.9838 39.6649 18.3206 39.6649 18.736C39.6649 19.1514 39.3243 19.4882 38.9043 19.4882C38.4843 19.4882 38.1438 19.1514 38.1438 18.736C38.1438 18.3206 38.4843 17.9838 38.9043 17.9838ZM19.2006 0C19.6206 0 19.9611 0.336778 19.9611 0.752216C19.9611 1.16766 19.6206 1.50443 19.2006 1.50443C18.7806 1.50443 18.4401 1.16766 18.4401 0.752216C18.4401 0.336778 18.7806 0 19.2006 0Z"
                      fill="url(#paint0_linear_30_59)"
                    />
                    <path
                      d="M19.6568 26.2234C23.6245 26.2234 26.841 23.0422 26.841 19.1178C26.841 15.1936 23.6245 12.0123 19.6568 12.0123C15.6891 12.0123 12.4727 15.1936 12.4727 19.1178C12.4727 23.0422 15.6891 26.2234 19.6568 26.2234Z"
                      fill="url(#paint1_radial_30_59)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_30_59"
                      x1="5.18268"
                      y1="6.336"
                      x2="27.9286"
                      y2="26.9274"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFC10B" />
                      <stop offset="1" stopColor="#FB3F2E" />
                    </linearGradient>
                    <radialGradient
                      id="paint1_radial_30_59"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(18.0162 16.4946) rotate(67.5196) scale(10.4448 10.5463)"
                    >
                      <stop stopColor="#FFC10B" />
                      <stop offset="1" stopColor="#FB3F2E" />
                    </radialGradient>
                    <clipPath id="clip0_30_59">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {/* more_wallet */}
            <div className=" flex   items-center mt-[12px] gap-[9px]">
              <h6 className=" cursor-pointer  ff_inter  font-medium text-[14px] leading-[28px] text-[#A1ADC4] ">
                More wallets
              </h6>
              <DownArrow />
            </div>
            {/* line */}
            <div className="  max-w-[300px]  w-full h-[1px] bg-[linear-gradient(90deg,#202731_0%,#3C465D_50%,#202731_100%)]  my-[8px]"></div>
            <p className="  ff_inter  font-normal text-[13px] leading-[22px] text-[#A1ADC4]  ">
              By connecting a wallet, you agree to{" "}
              <span className=" text-[#5099CC]">
                Arcana’s Terms and Conditions,
              </span>{" "}
              and confirm that you’ve read and understand the{" "}
              <span className=" text-[#5099CC]">Risk Statement.</span>
            </p>
            {/* overflow_scroll_para */}
            <div className=" max-w-[300px] w-full no-scrollbar h-[180px]  sm:h-[230px] overflow-y-scroll no-scrollbar mt-[16px]  rounded-[16px] bg-[#242B38] px-[26px] ">
              <p className=" ff_inter fw-normal  text-[13px] leading-[21px] text-[#D3D5D7] ">
                Lorem ipsum dolor sit amet consectetur. Sed metus congue
                interdum venenatis consequat tincidunt viverra mauris. Praesent
                lectus amet ornare facilisis nisl semper facilisis lectus.
                Venenatis nunc suspendisse massa vivamus ut leo pretium
                quisque ornare auctor pulvinar commodo leo.
              </p>
            </div>
            {/* check_box_here */}
            <div className=" flex  items-center gap-[8px] mt-[16px]">
              <input
                type="checkbox"
                id="modal-check"
                className=" hidden max-w-[24px] cursor-pointer w-full h-[24px] rounded-[8px]  border-[2px] border-[#3B4049] bg-[transparent] "
              />
              <div
                onClick={() => setIsChecked(!IsChecked)}
                className={`${
                  IsChecked
                    ? "border-bluelguana bg-bluelguana"
                    : "border-colonyblue"
                } cursor-pointer w-6 h-6 border-[2px] rounded-lg  flex justify-center items-center`}
              >
                <span className={`${IsChecked ? "" : "opacity-0"}`}>
                  <TickIcon />
                </span>
              </div>
              <label
                onClick={() => setIsChecked(!IsChecked)}
                htmlFor="modal-check"
                className=" cursor-pointer ff_inter font-normal text-[12px]  leading-[21px] text-[#D2D3D5]   "
              >
                I’ve read & accept the Terms and Conditions.
              </label>
            </div>
            {/* wallet_btn */}
            <button
              className={`${
                IsChecked ? " bg-bluelguana text-white" : ""
              } ff_inter max-w-[300px] w-full rounded-[12px] mt-[10px] py-[8px]  font-medium text-[14px] leading-[24px] text-[#72767C]    bg-[#30363F] `}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;
