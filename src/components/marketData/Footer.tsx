import React from 'react';
import ComponentWrapper from './ComponentWrapper';
import Image from 'next/image';
import Link from 'next/link';
import * as Icons from '@/app/data/svg/Icons';

export default function Footer() {
  return (
    <ComponentWrapper style='bg-[#012A36] text-white py-[70px]'>
      <footer className='flex flex-col gap-[3rem] pt-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[2rem]'>
          <div className='flex flex-col gap-[1.5rem]'>
          <Link href="https://arcana.markets" 
                 rel="noopener noreferrer"
                 >
            <Image src='/assets/logo.svg' width={140} height={37} alt='logo' />
            </Link>
            <div className='flex items-center gap-[2rem] ml-[10px]'>
            <Link href="https://x.com/arcanamarkets" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 >
              <Icons.xSocialIcon ClassName='text-white w-[20px] h-[20px]' />
              </Link>
              <Link href="https://github.com/arcana-markets"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Icons.githubIcon ClassName='text-white' />
              </Link>
              <Link href="https://discord.gg/7BGB2mZvYW"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Icons.discordIcon ClassName='text-white' />
              </Link>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row justify-between gap-[1rem]'>
          {footer.map((item, index) => {
          return (
            <div key={index}>
              <h3 className='text-[16px] font-[500] leading-[28px] text-white mb-[1rem] opacity-50'>
                {item.category}
              </h3>
              <div className='flex flex-col gap-[8px]'>
                {item.list?.map((ls, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={ls.path} // Use the path from your list item here
                      className='text-[16px] font-[500] leading-[28px] text-white hover:opacity-80'
                    >
                      {ls.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
        </div>
        <div className='flex flex-col gap-[1rem] pb-2'>
          <div className='w-full h-[2px] bg-white opacity-20'></div>
          <p className='text-[14px] text-white font-[500] leading-[24px] opacity-50'>
            Arcana Labs LLC © All Rights Reserved {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </ComponentWrapper>
  );
}

const footer = [
  {
    category: 'Products',
    list: [
      { name: 'Market Data', path: '/data' },
      { name: 'Swap App', path: '/swap' }, 
      { name: 'Trading Bot', path: 'https://github.com/arcana-markets' }, 
      { name: 'Vaults (Demo)', path: 'https://demo.arcana.markets' }, 
    ],
  },
];
