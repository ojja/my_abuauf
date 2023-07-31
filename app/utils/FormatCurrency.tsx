import React from 'react';
import { useCurrency } from '~/CurrencyContext';

type CustomRates = {
  [currency: string]: number;
};

interface FormatCurrencyProps {
  value: number;
  lineThrough?: boolean;
  bigger?: boolean;
  bg?: boolean;
}

const FormatCurrency: React.FC<FormatCurrencyProps> = ({ value, lineThrough, bigger, bg = true }) => {
  const { currency } = useCurrency();

  const formatCurrency = (number: number, currency: string) => {
    const customRates: CustomRates = {
      AED: 0.12,
      // EGP: 30.90,
    };
    const exchangeRate = customRates[currency] || 1;
    const formattedValue = number * exchangeRate;
    const formatter = new Intl.NumberFormat(undefined, {
      currency,
      style: 'currency',
    });
    return formatter.formatToParts(formattedValue);
  };

  const parts = formatCurrency(Number(value), currency); // Convert value to number

  return (
    <div className={`currency pt-[2px] ${lineThrough ? 'text-sm text-gray-400 line-through' : 'inline-flex flex-row-reverse items-center rounded px-1'} ${bigger && !lineThrough ? 'h-[26px]' : 'h-[18px]'}  ${bg && !lineThrough ? 'bg-yellow-910' : ''}`}>
      {parts.map((part, index) => (
        <span key={index} className={`${part.type} ${part.type === 'integer' && !lineThrough && bg ? 'font-semibold ltr:-ml-0.5 rtl:-mr-0.5 -mb-4 text-2xl' : ''} ${part.type === 'decimal' && !lineThrough ? 'hidden' : ''} ${bigger && part.type === 'integer' && !lineThrough && 'text-5xl'}`}>
          {part.value}
        </span>
      ))}
    </div>
  );
};

export default FormatCurrency;
