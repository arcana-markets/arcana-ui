import { FunctionComponent, ReactNode } from 'react';

interface AllButtonProps {
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  secondary?: boolean;
  children?: ReactNode;
  hideBg?: boolean;
}

interface ButtonProps {
  size?: 'large' | 'medium' | 'small';
  type?: 'button' | 'submit';
  loading?: boolean;
  fullWidth?: boolean;
}

type IconButtonCombinedProps = AllButtonProps & ButtonProps;

type ButtonCombinedProps = AllButtonProps & ButtonProps;

const Button: FunctionComponent<ButtonCombinedProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  secondary,
  size = 'medium',
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md ${
        secondary ? 'text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear'
         : 'text-foxflowerviola sm:text-white text-sm sm:text-base font-medium sm:py-[10px] p-3 sm:px-4 rounded-xl bg-[#013746] sm:bg-[#252B32] Connect_btn transition-all duration-300 ease-linear'
      } ${size === 'medium' ? 'h-10 px-4' : size === 'large' ? 'h-12 px-6' : 'h-8 px-3'} default-transition font-display ${
        !secondary ? 'text-gray-800' : 'text-gray-800'
      } disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export const IconButton: FunctionComponent<IconButtonCombinedProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  hideBg,
  size,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-shrink-0 ${
        size === 'large' ? 'h-12 w-12' : size === 'small' ? 'h-8 w-8' : 'h-10 w-10'
      } default-transition items-center justify-center rounded-full ${
        hideBg ? 'hover:text-blue-500' : 'border border-gray-300 hover:border-gray-400'
      } text-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-200 hover:text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton: FunctionComponent<ButtonCombinedProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  secondary,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`default-transition flex items-center border-0 font-bold ${
        secondary ? 'text-blue-500' : 'text-gray-600'
      } underline focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:no-underline ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
