import { vaultsData } from "@/components/common/Helper";
import VaultMobileListCard from "./VaultMobileListCard";

const ValutGridDataEnd = () => {
  return (
    <div className="grid sm:grid-cols-2 mb-12">
      {vaultsData.slice(6, 11).map((obj, index) => (
        <VaultMobileListCard obj={obj} key={index} id={index} />
      ))}
    </div>
  );
};

export default ValutGridDataEnd;
