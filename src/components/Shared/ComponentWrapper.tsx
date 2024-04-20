import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  style?: string;
  [x: string]: any; // For any additional props
}

const ComponentWrapper: React.FC<Props> = ({ children, style, className = '', ...props }: Props) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      <div className='w-full h-full max-w-[1350px] m-auto md:px-8 px-4'>
        {children}
      </div>
    </div>
  );
};

export default ComponentWrapper;