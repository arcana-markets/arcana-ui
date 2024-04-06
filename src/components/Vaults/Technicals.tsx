import { LinkExternal } from "@/components/Shared/Icons";
import Faqs from "./Faqs";

const Technicals = () => {
  return (
    <div className="sm:bg-rest_page_bg">
      <div className="container xl:max-w-[944px] px-3 min-[390px]:px-6 mx-auto pt-[72px] pb-[120px]">
        <div className="flex justify-between flex-col lg:flex-row max-w-[460px] mx-auto lg:max-w-full">
          <div className="lg:w-[47%] xl:w-[52%]">
            <h2 className="text-base font-medium text-white mb-6 text-start">
              Technicals
            </h2>
            <div className="inline-flex flex-col gap-3">
              <div className="bg-daintree inline-flex items-center rounded-lg">
                <div className=" bg-green_dark rounded-s-lg w-[104px] flex items-center justify-center">
                  <p className="text-[13px] font-medium text-white py-[7px] px-2">
                    Vault Address
                  </p>
                </div>
                <a
                  href="#"
                  target="_blank"
                  className="text-xs font-medium text-foxflowerviola ps-1.5 pe-3 inline-flex items-center justify-between gap-1"
                >
                  <span className="max-sm:w-[200px] overflow-hidden text-ellipsis text-nowrap">
                    dUiKdURhXWvsRvDFHpqy1gNfnnYuTsWexQvDpP9711id
                  </span>
                  <LinkExternal />
                </a>
              </div>
              <div className="bg-daintree inline-flex items-center rounded-lg">
                <div className=" bg-green_dark rounded-s-lg w-[104px] flex items-center justify-center">
                  <p className="text-[13px] font-medium text-white py-[7px] px-2">
                    Pool Address
                  </p>
                </div>
                <a
                  href="#"
                  target="_blank"
                  className="text-xs font-medium text-foxflowerviola ps-1.5 pe-3  inline-flex items-center justify-between gap-1"
                >
                  <span className="max-sm:w-[200px] overflow-hidden text-ellipsis text-nowrap">
                    Gi8KdURhXWvsRvDFHpqy1gNfnnYuTsWexQvDpP9711id
                  </span>
                  <LinkExternal />
                </a>
              </div>
            </div>
            <div className="border border-[#384156] my-5 md:my-6"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-foxflowerviola">
                  Current capacity
                </p>
                <h2 className="text-sm font-bold text-white">45.2%</h2>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-foxflowerviola">
                  Deposit per tx capacity
                </p>
                <h2 className="text-sm font-bold text-white">$250,000.00</h2>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-foxflowerviola">
                  PYTH withdrawal limit
                </p>
                <h2 className="text-sm font-bold text-white">300,000 JUP/h</h2>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-foxflowerviola">
                  USDC withdrawal limit
                </p>
                <h2 className="text-sm font-bold text-white">200,000 USDC/h</h2>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-normal text-foxflowerviola">
                  Epoch resets in
                </p>
                <h2 className="text-sm font-bold text-white">1h 28m 31s</h2>
              </div>
            </div>
          </div>
          <div className="lg:w-[42%] xl:w-[40%]">
            <Faqs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technicals;
