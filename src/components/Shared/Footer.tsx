import {
  NavIcon,
} from "@/components/Shared/Icons";
import * as Icons from '@/app/data/svg/Icons';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-footer pt-10">
      <div className="container px-4 mx-auto sm:pt-9 pb-8 border-b border-footer_border sm:pb-12 z-[1] relative">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex flex-col">
            <NavIcon />
            <div className="flex items-center gap-7 mt-[30px] mb-10 sm:my-[30px]">
            <div className='flex items-center gap-[2rem] ml-[10px]'>
            <a href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer">
              <Icons.xSocialIcon ClassName='text-white w-[20px] h-[20px]' />
            </a>
            <a href="https://github.com/arcana-markets" target="_blank" rel="noopener noreferrer">
              <Icons.githubIcon ClassName='text-white' />
            </a>
            <a href="https://discord.gg/7BGB2mZvYW" target="_blank" rel="noopener noreferrer">
              <Icons.discordIcon ClassName='text-white' />
            </a>
          </div>
          </div>
          </div>
          <div className="grid sm:grid-cols-3 sm:gap-10 lg:gap-[96px] gap-8">
            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Company</li>
              <a href="https://arcana.markets" target="_blank" rel="noopener noreferrer">
              <div className="footer-link">About us</div>
              </a>
              <a href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer">
              <div className="footer-link">Socials</div>
              </a>              <Link href="/media-kit"><div className="footer-link">Media Kit</div></Link>
              <a href="https://github.com/arcana-markets" target="_blank" rel="noopener noreferrer">
              <div className="footer-link">Developer?</div>
              </a>
            </ul>
            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Products</li>
              <Link href="/"><div className="footer-link">Vaults</div></Link>
              <Link href="/data"><div className="footer-link">Markets</div></Link>
              <Link href="/swap"><div className="footer-link">Swap</div></Link>
              <a href="https://github.com/arcana-markets/arcana-trading-bot" target="_blank" rel="noopener noreferrer">
              <div className="footer-link">Tools </div>
              </a>
            </ul>
            <ul className="flex flex-col gap-3 sm:gap-2">
              <li className="footer-header-title">Legal</li>
              <Link href="/"><div className="footer-link">Privacy Policy</div></Link>
              <Link href="/"><div className="footer-link">Terms & Conditions</div></Link>
              <Link href="/"><div className="footer-link">Disclaimer</div></Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto pt-4 sm:pb-4 pb-6">
        <p className="text-base sm:text-sm font-medium text-missioncontrol">
          Arcana Labs LLC © All Rights Reserved 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;