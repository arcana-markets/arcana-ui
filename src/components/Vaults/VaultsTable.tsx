import { vaultsData } from "@/components/Shared/Helper";
import VaultListItem from "./VaultListItem";

const VaultsTable = () => {
  return (
    <>
      {vaultsData.map((obj, index) => (
        <VaultListItem obj={obj} key={index} />
      ))}
    </>
  );
};

export default VaultsTable;
