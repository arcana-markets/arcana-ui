import { formatNumericValue, numberCompacter } from './numbers'

export const abbreviateAddress = (address: string | null | undefined, hasIdentity: boolean): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  // Check if identities are available, if yes, return the full address
  if (hasIdentity) {
    return address;
  }

  // Otherwise, abbreviate the address with ellipsis
  return length > 14 ? `${address.substring(0, 8)}...${address.substring(length - 5)}` : address;
};


export const abbreviateAddressLonger = (address: string | null | undefined): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  return length > 10 ? `${address.substring(0, 14)}...${address.substring(length - 8)}` : address;
};

export const abbreviateAddressSmaller = (address: string | null | undefined): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  return length > 10 ? `${address.substring(0, 5)}...${address.substring(length - 3)}` : address;
};

export const abbreviateAddressSmallest = (address: string | null | undefined): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  return length > 10 ? `${address.substring(0, 6)}${address.substring(length - 0)}` : address;
};

export const formatYAxis = (value: number) => {
  // Check if the value is exactly zero
  if (value === 0) {
    return '0';
  }
  // Format for values greater than 1 or less than -1
  if (Math.abs(value) > 1) {
    return numberCompacter.format(value);
  }
  // Format for values between -1 and 1 (excluding zero)
  return formatNumericValue(value, 4);
};

export const tryParse = (val: string) => {
  try {
    const json = JSON.parse(val)
    return json
  } catch (e) {
    return val
  }
}
