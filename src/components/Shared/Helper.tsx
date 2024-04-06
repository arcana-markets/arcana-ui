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
    VenueImg: "/img/svg/r-logo.svg",
    btnText: "Manage",
  },
  {
    coinImg: "/img/svg/sol.svg",
    Vault1: "SOL",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/fish.svg",
    btnText: "Manage",
  },
  {
    coinImg: "/img/svg/jto.svg",
    Vault1: "JTO",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/fish.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jto-usdc.svg",
    Vault1: "JUP",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/fish.svg",
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
    VenueImg: "/img/svg/fish.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jlp.svg",
    Vault1: "BONK",
    Vault2: "USDC",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/r-logo.svg",
    btnText: "Deposit",
  },
  {
    coinImg: "/img/svg/jto-bonk.svg",
    Vault1: "JTO",
    Vault2: "BONK",
    Liquidity: <EmptyIcon />,
    APY: "0%",
    TVL: "$0",
    Volume: "$0",
    VenueImg: "/img/svg/fish.svg",
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
    capacityValue: "59%",
    price: "$184.84M",
    time: "7D",
    apyValue: "221.57%",
    apyValueChange: "+22.7%",
    capacityClr: "#40779e",
    capacityClrTwo: "#5099CC",
    ellipseClr: "ellipse",
    shadow: "shadow-light-blue",
    changeValClr: "#06D6A0",
  },
  {
    title: "Augury",
    currOne: "BTC",
    currTwo: "BONK",
    coinImg: "/img/svg/Augury-icon.svg",
    bgImg: "/img/png/Augury-vector.png",
    bgImgHover: "/img/png/Augury-hover.png",
    subTitleOne: "APY",
    subTitleTwo: "TVL",
    subTitleThree: "Capacity",
    buttonText: "Open Vault",
    capacityValue: "14%",
    price: "$184.84M",
    time: "7D",
    apyValue: "85.12%",
    apyValueChange: "-8.3%",
    capacityClr: "#877445",
    capacityClrTwo: "#FFD166",
    shadow: "shadow-light-orange",
    changeValClr: "#EF476F",
  },
  {
    title: "Aether",
    currOne: "JTO",
    currTwo: "USDT",
    coinImg: "/img/svg/Aether-icon.svg",
    bgImg: "/img/png/Aether-vector.png",
    bgImgHover: "/img/png/Aether-hover.png",
    subTitleOne: "APY",
    subTitleTwo: "TVL",
    subTitleThree: "Capacity",
    buttonText: "Open Vault",
    capacityValue: "98%",
    price: "$184.84M",
    time: "7D",
    apyValue: "44.56%",
    apyValueChange: "+5.1%",
    capacityClr: "#877445",
    capacityClrTwo: "#FFD166",
    shadow: "shadow-light-orange",
    changeValClr: "#EF476F",
  },
];

export const faqlist = [
  {
    question: "What does this vault do?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "Where does the yield (APY) come from?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "When is this vault profitable?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "How is the APY calculated?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "What should I do after depositing?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "Do I have to deposit both tokens?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
  {
    question: "What are the risks?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quam vitae facilis debitis at fugit earum, nostrum ab amet optio porro! Sed explicabo magni accusamus voluptatum itaque. Consequuntur, omnis cum!`,
  },
];
