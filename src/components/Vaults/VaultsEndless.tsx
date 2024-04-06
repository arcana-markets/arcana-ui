import Disclaimer from "./Disclaimer";
import VaultEndData from "./VaultEndData";

const VaultsEndless = () => {
  return (
    <div className="max-md:hidden">
      <div className="container px-4 mx-auto">
        <div className="relative overflow-auto">
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-black-trans pointer-events-none"></div>
          <VaultEndData />
        </div>
        <Disclaimer />
      </div>
    </div>
  );
};

export default VaultsEndless;
