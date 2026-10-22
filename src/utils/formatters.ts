/**
 * Utility functions for formatting real estate metrics,
 * preventing raw template strings, and financial calculations.
 */

export function formatArea(area?: number | string | null): string {
  if (area === undefined || area === null || area === '' || area === "unit['total_area']" || area === "unit['builtup_area']") {
    return 'Not specified';
  }
  const num = typeof area === 'string' ? parseFloat(area.replace(/[^0-9.]/g, '')) : area;
  if (isNaN(num) || num <= 0) {
    return 'Not specified';
  }
  return `${num.toLocaleString('en-IN')} sq ft`;
}

export function formatRate(rate?: number | string | null): string {
  if (rate === undefined || rate === null || rate === '' || rate === "unit['rate']") {
    return 'Not specified';
  }
  const num = typeof rate === 'string' ? parseFloat(rate.replace(/[^0-9.]/g, '')) : rate;
  if (isNaN(num) || num <= 0) {
    return 'Not specified';
  }
  return `₹${num.toLocaleString('en-IN')} / sq ft`;
}

export function formatAvailability(avail?: string | null): string {
  if (!avail || avail.trim() === '' || avail === "unit['availability']") {
    return 'Not specified';
  }
  return avail;
}

export function formatPriceInWords(priceInINR: number): string {
  if (!priceInINR || isNaN(priceInINR)) return 'Price on Request';

  if (priceInINR >= 10000000) {
    const cr = priceInINR / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  } else if (priceInINR >= 100000) {
    const lakh = priceInINR / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return `₹${priceInINR.toLocaleString('en-IN')}`;
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number = 8.5,
  tenureYears: number = 20
): {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
} {
  if (!principal || principal <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0 };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

export function createWhatsAppLink(
  phoneNumber: string,
  propertyTitle: string,
  refCode: string,
  price: string,
  location: string
): string {
  // Format Indian phone number (ensure country code)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const message = `Hello, I am interested in ${propertyTitle} (Ref: ${refCode}) listed at ${price} located in ${location} via GurugramProperty.in. Please share floor plans, brochure, and schedule a site visit.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9+]/g, '');
}
