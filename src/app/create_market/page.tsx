import { useEffect, useState } from "react";
// import { useOpenbookClient } from "../hooks/useOpenbookClient";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { OpenBookClientOptions, OracleConfigParams } from "@openbook-dex/openbook-v2";
import { useOpenbook } from "@/hooks/useOpenbookClient";
import { useWallet } from "@solana/wallet-adapter-react";
// import toast from "react-hot-toast";
import { IconInfoCircle } from '@tabler/icons-react';
import Button from "@/components/Shared/Button";
import Tooltip from "@/components/Shared/Tooltip";
// import Input from "../components/forms/Input";
// import ButtonGroup from "../components/forms/ButtonGroup";
// import Select from "../components/forms/Select";
// import MultiSelectDropdown from "../components/forms/MultiSelectDropdown";

const Page = () => {
  const { publicKey } = useWallet();

  // State for each form field
  const [name, setName] = useState("");
  const [quoteMint, setQuoteMint] = useState(PublicKey.default);
  const [baseMint, setBaseMint] = useState(PublicKey.default);
  const [quoteLotSize, setQuoteLotSize] = useState("");
  const [baseLotSize, setBaseLotSize] = useState("");
  const [makerFee, setMakerFee] = useState("0");
  const [takerFee, setTakerFee] = useState("0");
  const [timeExpiry, setTimeExpiry] = useState("0");
  const [oracleA, setOracleA] = useState(null);
  const [oracleB, setOracleB] = useState(null);
  const [openOrdersAdmin, setOpenOrdersAdmin] = useState(PublicKey.default);
  const [consumeEventsAdmin, setConsumeEventsAdmin] = useState(PublicKey.default);
  const [closeMarketAdmin, setCloseMarketAdmin] = useState(PublicKey.default);
  const [confFilter, setConfFilter] = useState("0.1");
  const [maxStalenessSlots, setMaxStalenessSlots] = useState("100");
  const openbookClient = useOpenbook();
   // Optional: If you need a specific action on button click

   useEffect(() => {
    document.title = `Arcana | Swap `;
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

  // Construct oracleConfigParams from state
  const oracleConfigParams: OracleConfigParams = {
    confFilter: parseFloat(confFilter),
    maxStalenessSlots: parseInt(maxStalenessSlots, 10),
  };
  // Construct oracleConfigParams from state
  const oracleConfigParams: OracleConfigParams = {
    confFilter: parseFloat(confFilter),
    maxStalenessSlots: parseInt(maxStalenessSlots, 10),
  };

  try {
    // Convert state to appropriate types
    const quoteLotSizeBN = new BN(quoteLotSize);
    const baseLotSizeBN = new BN(baseLotSize);
    const makerFeeBN = new BN(makerFee);
    const takerFeeBN = new BN(takerFee);
    const timeExpiryBN = new BN(timeExpiry);

    const oracleAPublicKey = oracleA ? new PublicKey(oracleA) : null;
    const oracleBPublicKey = oracleB ? new PublicKey(oracleB) : null;

    // Assuming openbookClient is correctly instantiated
    const [transactionInstructions, signers] = await openbookClient.createMarketIx(
      publicKey, // This needs to be the payer's public key
      name,
      quoteMint,
      baseMint,
      quoteLotSizeBN,
      baseLotSizeBN,
      makerFeeBN,
      takerFeeBN,
      timeExpiryBN,
      oracleAPublicKey,
      oracleBPublicKey,
      openOrdersAdmin,
      consumeEventsAdmin,
      closeMarketAdmin,
      oracleConfigParams,
    );

    } catch (error) {
      console.log("Error on the form", error);
      // Handle errors
    }
  };

  function handleButtonClick(): void {
    throw new Error("Function not implemented.");
  }
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-black rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white text-center">Create a Market</h2>
          <p className="mt-1 text-sm text-gray-300 text-center">Create a permissioned or permissionless market. At least 3 SOL required.</p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Name" onChange={(e) => setName(e.target.value)} tooltip="Market name" />
            <InputField label="Quote Mint" onChange={(e) => setQuoteMint(e.target.value)} tooltip="Address of the quote currency mint" />
            <InputField label="Base Mint" onChange={(e) => setBaseMint(e.target.value)} tooltip="Address of the base currency mint" />
            <InputField label="Quote Lot Size" onChange={(e) => setQuoteLotSize(e.target.value)} tooltip="Size of a single lot in quote currency units" />
            <InputField label="Base Lot Size" onChange={(e) => setBaseLotSize(e.target.value)} tooltip="Size of a single lot in base currency units" />
            <InputField label="Maker Fee" onChange={(e) => setMakerFee(e.target.value)} tooltip="Fee for market makers" />
            <InputField label="Taker Fee" onChange={(e) => setTakerFee(e.target.value)} tooltip="Fee for market takers" />
            <InputField label="Time Expiry" onChange={(e) => setTimeExpiry(e.target.value)} tooltip="Expiration time for the market (optional)" />
            <InputField label="Oracle A" onChange={(e) => setOracleA(e.target.value)} tooltip="First oracle address (optional)" />
            <InputField label="Oracle B" onChange={(e) => setOracleB(e.target.value)} tooltip="Second oracle address (optional)" />
            <InputField label="Open Orders Admin" onChange={(e) => setOpenOrdersAdmin(e.target.value)} tooltip="Admin for open orders in permissioned markets" />
            <InputField label="Consume Events Admin" onChange={(e) => setConsumeEventsAdmin(e.target.value)} tooltip="Admin for consuming events in permissioned markets" />
            <InputField label="Close Market Admin" onChange={(e) => setCloseMarketAdmin(e.target.value)} tooltip="Admin for closing the market in permissioned markets" />
            <InputField label="Max Staleness Slots" onChange={(e) => setMaxStalenessSlots(e.target.value)} tooltip="Maximum number of slots for staleness" />
            <InputField label="Configuration Filter" onChange={(e) => setConfFilter(e.target.value)} tooltip="Configuration filter value (optional)" />
          </div>
  
          <div className="flex justify-center mt-8">
            <Button
              state="initial"
              onClick={handleButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Create Market
            </Button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  const InputField = ({ label, onChange, tooltip }) => (
    <div className="flex flex-col mb-4">
      <div className="flex items-center">
        <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">{label}</label>
        {tooltip && (
          <Tooltip content={tooltip}>
            <IconInfoCircle className="h-5 w-5 text-gray-300 cursor-help" />
          </Tooltip>
        )}
      </div>
      <input 
        type="text" 
        onChange={onChange} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
    </div>
  );
  
  export default Page;
  