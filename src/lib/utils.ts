
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number, isMobile = false) => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (isMobile) {
    if (Math.abs(amount) >= 1_00_00_000) { // Crore
      return `₹${(amount / 1_00_00_000).toFixed(2)}Cr`;
    }
    if (Math.abs(amount) >= 1_00_000) { // Lakh
      return `₹${(amount / 1_00_000).toFixed(2)}L`;
    }
    if (Math.abs(amount) >= 1_000) {
       return `₹${(amount / 1_000).toFixed(0)}k`;
    }
    return `₹${amount.toFixed(0)}`;
  }

  return new Intl.NumberFormat('en-IN', options).format(amount);
};
