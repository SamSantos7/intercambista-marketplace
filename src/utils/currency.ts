
import { Currency, CurrencyCode } from "@/types/payment";

export const currencies: Record<CurrencyCode, Currency> = {
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Real Brasileiro'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar Americano'
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Dólar Canadense'
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Dólar Australiano'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'Dirham dos Emirados'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'Libra Esterlina'
  }
};

export const countryToCurrency: Record<string, CurrencyCode> = {
  'Brasil': 'BRL',
  'Irlanda': 'EUR',
  'Espanha': 'EUR',
  'Malta': 'EUR',
  'Austrália': 'AUD',
  'Canadá': 'CAD',
  'Dubai': 'AED',
  'Reino Unido': 'GBP',
  'Estados Unidos': 'USD'
};

export const getDefaultCurrency = (): Currency => {
  return currencies.BRL;
};

export const getUserCurrency = (location?: string): Currency => {
  if (!location) return getDefaultCurrency();
  
  for (const [country, code] of Object.entries(countryToCurrency)) {
    if (location.includes(country)) {
      return currencies[code];
    }
  }
  
  return getDefaultCurrency();
};

export const formatCurrency = (amount: number, currency: CurrencyCode): string => {
  return `${currencies[currency].symbol} ${amount.toFixed(2)}`;
};

export const convertCurrency = async (amount: number, from: CurrencyCode, to: CurrencyCode): Promise<number> => {
  // In a real application, this would call an exchange rate API
  // For now, we'll use static conversion rates for demonstration
  const rates: Record<CurrencyCode, number> = {
    BRL: 1,
    EUR: 0.18,
    USD: 0.2,
    CAD: 0.27,
    AUD: 0.3,
    AED: 0.73,
    GBP: 0.16
  };
  
  // Convert to BRL first (our base currency) if not already
  const amountInBRL = from === 'BRL' ? amount : amount / rates[from];
  
  // Then convert to target currency
  return to === 'BRL' ? amountInBRL : amountInBRL * rates[to];
};
