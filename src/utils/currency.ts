
import { Currency, CurrencyCode } from '@/types/payment';

export const formatCurrency = (
  value: number,
  currency: string = "BRL",
  locale: string = "pt-BR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const formatBRL = (value: number): string => {
  return formatCurrency(value, "BRL");
};

export const formatUSD = (value: number): string => {
  return formatCurrency(value, "USD", "en-US");
};

export const formatEUR = (value: number): string => {
  return formatCurrency(value, "EUR", "de-DE");
};

export const getCurrencySymbol = (currency: string): string => {
  switch (currency.toUpperCase()) {
    case "BRL":
      return "R$";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "CAD":
      return "C$";
    case "AUD":
      return "A$";
    default:
      return currency;
  }
};

export const convertCurrency = (
  value: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number> = { BRL: 1, USD: 0.2, EUR: 0.18 }
): number => {
  // Converter para BRL primeiro (usado como moeda base)
  const valueInBRL = fromCurrency.toUpperCase() === "BRL" 
    ? value 
    : value / rates[fromCurrency.toUpperCase()] || 1;
  
  // Então converter de BRL para a moeda alvo
  return toCurrency.toUpperCase() === "BRL" 
    ? valueInBRL 
    : valueInBRL * (rates[toCurrency.toUpperCase()] || 1);
};
