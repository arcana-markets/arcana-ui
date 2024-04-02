import SwapWidget from "@/components/swapwidget/SwapWidget";
import Image from "next/image";

const SwapCard = () => {
  return (
    <div className="px-4 relative pt-10 pb-4 sm:py-10">
      <div className="rounded-3xl relative z-10 group bg-darkblue duration-500 hover:shadow-light-blue sm:px-6 sm:pb-4 sm:pt-8 p-4 overflow-hidden">
        <Image
          className="absolute group-hover:opacity-0 duration-500 top-0 left-0 w-full h-full object-cover -z-10"
          width={364}
          height={468}
          src="/img/png/Augury-vector.png"
          alt="icon"
        />
        <div className="max-sm:flex justify-between max-sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-4 justify-center sm:pt-4 sm:mb-8">
          </div>
        </div>
          <div className="max-sm:flex items-center gap-6 max-sm:mb-3">
          <SwapWidget />
          </div>
          <div className="flex flex-row max-sm:gap-4 max-sm:items-center sm:flex-col">
              <div className={`relative bg-[#847445] h-full rounded w-[14%]`}>
              </div>
            </div>
          </div>
        </div>
  );
};

export default SwapCard;
