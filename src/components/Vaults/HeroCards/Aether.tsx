import Image from "next/image";
import Link from "next/link";

const Aether = () => {
  return (
    <Link href="/vaults/aether" className="px-4 block relative">
    <div className="px-4 block relative pt-10 pb-4 sm:py-10">
    <div className="py-[2px] z-[11] px-[6px] rounded-lg gap-[10px] bg-darkblue300 flex items-center absolute top-[28px] left-1/2 -translate-x-1/2">
    <p className="text-yellow text-sm font-medium ">Devnet ONLY</p>
        <div className="p-2 rounded-full animate-wiggle">
            <div className="h-2 w-2 rounded-full bg-[#06D6A0]"></div>
        </div>
    </div>      
    <div className="rounded-3xl relative z-10 group bg-darkblue duration-500 hover:shadow-light-red sm:px-6 sm:pb-4 sm:pt-8 p-4 overflow-hidden">
        <Image
          className="absolute group-hover:opacity-0 duration-500 top-0 left-0 w-full h-full object-cover -z-10"
          width={364}
          height={468}
          src="/img/png/Aether-vector.png"
          alt="icon"
        />
        <Image
          className="absolute opacity-0 group-hover:opacity-100 duration-500 top-0 left-0 w-full h-full object-cover -z-10"
          width={364}
          height={468}
          src="/img/png/Aether-hover.png"
          alt="icon"
        />
        <div className="max-sm:flex justify-between max-sm:mb-4">
          <h3 className="text-center font-poppins !leading-[unset] group-hover:text-white bg-clip-text text-transparent bg-aether font-bold text-[28px] sm:text-3xl md:text-[40px] text-">
            Aether
          </h3>
          <div className="flex justify-center items-center gap-2 sm:gap-4 sm:pt-4 sm:mb-8">
            <div className="flex items-center gap-4 z-10">
              <p className="text-foxflowerviola text-sm font-bold">JTO</p>
              <Image
                width={32}
                height={32}
                src="/tokens/JTO.png"
                alt="JTO icon"
              />
            </div>
            {/* Apply negative margin to bring the second token closer to the first one */}
            <div className="flex items-center gap-4 -ml-6"> {/* Adjusted negative margin */}
              <Image
                width={28}
                height={28}
                src="/tokens/wUSDC.png"
                alt="USDC icon"
              />
              <p className="text-foxflowerviola text-sm font-bold">USDC</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg py-4 px-3 sm:p-6 bg-[#242a3880] backdrop-blur-[50px]">
          <div className="max-sm:flex items-center gap-6 max-sm:mb-3">
            <div>
              <p className="text-foxflowerviola text-sm font-semibold mb-[6px]">
                APY
              </p>
              <div className="flex items-center gap-6">
                <p className="text-xl sm:text-[28px] font-poppins font-semibold text-markergreen">
                  0%
                </p>
                <div className="hidden sm:flex items-center rounded-md bg-[#2C3648] overflow-hidden">
                  <span className="text-foxflowerviola text-sm font-bold bg-[#272E3B] py-1 px-[6px]">
                    7D
                  </span>
                  <span className="font-semibold text-sm text-markergreen px-2">
                    0%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-foxflowerviola text-sm font-semibold mb-[6px] sm:mt-4">
                TVL
              </p>
              <p className="text-xl sm:text-[28px] font-poppins font-semibold text-white sm:mb-4">
                $0
              </p>
            </div>
          </div>
          <div className="flex flex-row max-sm:gap-4 max-sm:items-center sm:flex-col">
            <p className="text-foxflowerviola text-sm font-semibold sm:mb-[6px]">
              Capacity
            </p>
            <div className="bg-[#181E27] rounded h-[10px] sm:h-[14px] w-full">
              <div className={`relative bg-[#7f324a] h-full rounded w-[10%]`}>
                <span
                  className={`text-white p-[6px] bg-[#EF476F] font-bold text-[11px] sm:text-xs rounded absolute right-[-10px] top-1.5 -translate-y-1/2`}
                >
                  0%
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="card-btn">
          Open Vault
        </button>
      </div>
    </div>
    </Link>
  );
};

export default Aether;
