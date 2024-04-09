import { EmptyIcon } from "./Icons";

type vaultsData = {
  coinImg: string;
  Vault1: string;
  Vault2: string;
  Liquidity: string | JSX.Element;
  APY: string;
  TVL: string;
  Volume: string;
  VenueImg: string;
  btnText: string;
};
export const vaultsData: vaultsData[] = [
  {
    coinImg: "/img/svg/Arcanum-icon.svg",
    Vault1: "PYTH",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/phoenix-dex.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jto-usdc.svg",
    Vault1: "SOL",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/openbook-dex.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jtousdc.svg",
    Vault1: "JTO",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/openbook-dex.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jup.svg",
    Vault1: "JUP",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/orca-dex.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/seth.svg",
    Vault1: "USDT",
    Vault2: "sETH",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/meteora-dex.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jlp.svg",
    Vault1: "BTC",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/raydium-dex.svg",
    btnText: "Deposit",
  },

];

type ArcanaCard = {
  title: string;
  currOne: string;
  currTwo: string;
  coinImg: string;
  bgImg: string;
  bgImgHover: string;
  subTitleOne: string;
  subTitleTwo: string;
  subTitleThree: string;
  buttonText: string;
  capacityValue: string;
  price: string;
  time: string;
  apyValue: string;
  apyValueChange: string;
  capacityClr: string;
  capacityClrTwo: string;
  ellipseClr?: string;
  shadow: string;
  changeValClr: string;
};

export const arcanaCardsData: ArcanaCard[] = [
  {
    title: "Arcanum",
    currOne: "PYTH",
    currTwo: "USDC",
    coinImg: "/img/svg/Arcanum-icon.svg",
    bgImg: "/img/png/Arcanum-vector.png",
    bgImgHover: "/img/png/Arcanum-hover-img.png",
    subTitleOne: "APY",
    subTitleTwo: "TVL",
    subTitleThree: "Capacity",
    buttonText: "Open Vault",
    capacityValue: "0%",
    price: "$0",
    time: "7D",
    apyValue: "0%",
    apyValueChange: "0%",
    capacityClr: "#40779e",
    capacityClrTwo: "#5099CC",
    ellipseClr: "ellipse",
    shadow: "shadow-light-blue",
    changeValClr: "#06D6A0",
  },
  {
    title: "Augury",
    currOne: "SOL",
    currTwo: "USDC",
    coinImg: "/img/svg/Augury-icon.svg",
    bgImg: "/img/png/Augury-vector.png",
    bgImgHover: "/img/png/Augury-hover.png",
    subTitleOne: "APY",
    subTitleTwo: "TVL",
    subTitleThree: "Capacity",
    buttonText: "Open Vault",
    capacityValue: "0%",
    price: "$0M",
    time: "7D",
    apyValue: "0%",
    apyValueChange: "0%",
    capacityClr: "#877445",
    capacityClrTwo: "#FFD166",
    shadow: "shadow-light-orange",
    changeValClr: "#EF476F",
  },
  {
    title: "Aether",
    currOne: "JUP",
    currTwo: "USDC",
    coinImg: "/img/svg/Aether-icon.svg",
    bgImg: "/img/png/Aether-vector.png",
    bgImgHover: "/img/png/Aether-hover.png",
    subTitleOne: "APY",
    subTitleTwo: "TVL",
    subTitleThree: "Capacity",
    buttonText: "Open Vault",
    capacityValue: "0%",
    price: "$0",
    time: "7D",
    apyValue: "0%",
    apyValueChange: "0%",
    capacityClr: "#877445",
    capacityClrTwo: "#FFD166",
    shadow: "shadow-light-orange",
    changeValClr: "#EF476F",
  },
];

export const faqlist = [
  {
    question: "What does this vault do?",
    answer: "This vault securely stores digital assets and manages transactions efficiently. It combines advanced security protocols with user-friendly access, ensuring your assets are both safe and readily available for trading or investment purposes."
  },
  {
    question: "Where does the yield (APY) come from?",
    answer: "The yield (APY) originates from a combination of strategies, including staking, lending, and providing liquidity to decentralized finance (DeFi) protocols. By allocating assets across various platforms and optimizing for the best returns, the vault generates yield."
  },
  {
    question: "When is this vault profitable?",
    answer: "This vault becomes profitable under conditions of favorable market dynamics and effective asset management strategies. Profitability is influenced by the performance of the underlying assets, the efficiency of the yield-generating strategies."
  },
  {
    question: "How is the APY calculated?",
    answer: "The APY (Annual Percentage Yield) is calculated based on the interest earned on an investment over a one-year period, taking into account the effect of compounding interest. This involves reinvesting the earnings to generate additional earnings."
  },
  {
    question: "What should I do after depositing?",
    answer: "After depositing into the vault, monitor your investment through the platform's dashboard to see real-time updates on your yield. Consider reinvesting your earnings to compound your returns."
  },
  {
    question: "Do I have to deposit both tokens?",
    answer: "For our token vaults, you're not required to deposit both tokens. We offer weighted single-asset deposits, allowing you to invest in the vault with just one type of token."
  },
  {
    question: "What are the risks?",
    answer: "Investing in token vaults, like any financial venture, carries inherent risks. These include market volatility, which can lead to fluctuating yields and potential loss of principal. Smart contract vulnerabilities, despite rigorous audits, could also pose a risk of hacks or funds being locked."
  },
];
