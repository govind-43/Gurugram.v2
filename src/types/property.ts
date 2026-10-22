export type CityCategory = 'Gurugram' | 'Delhi NCR' | 'Noida' | 'Faridabad';

export type MicroMarket =
  | 'Golf Course Road'
  | 'Golf Course Ext Road'
  | 'Dwarka Expressway'
  | 'Southern Peripheral Road'
  | 'Sohna Road'
  | 'Cyber City & DLF Phase 1-5'
  | 'New Gurgaon (Sec 80-95)'
  | 'Noida Expressway'
  | 'South Delhi';

export type PropertyType =
  | 'Apartment'
  | 'Penthouse'
  | 'Independent Floor'
  | 'Luxury Villa'
  | 'Commercial Office'
  | 'Retail SCO';

export type ListingType = 'Buy' | 'Rent' | 'Commercial' | 'New Project';

export type AvailabilityStatus =
  | 'Ready to Move'
  | 'Under Construction'
  | 'New Launch'
  | 'Immediate Possession';

export interface UnitConfiguration {
  id: string;
  name: string;
  bedrooms: number;
  totalArea: number; // in sq ft
  builtupArea: number; // in sq ft
  carpetArea: number; // in sq ft
  rate: number; // price per sq ft in INR
  priceDisplay: string;
  availability: string;
  floorPlanImage?: string;
}

export interface Property {
  id: string;
  refCode: string;
  title: string;
  builder: string;
  location: string;
  sector: string;
  city: CityCategory;
  microMarket: MicroMarket;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number; // in INR
  priceDisplay: string;
  pricePerSqFt: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  totalArea: number; // total super area
  builtupArea: number; // built-up area
  carpetArea: number; // carpet area
  availability: string;
  possessionDate: string;
  constructionStatus: string;
  reraId: string;
  verified: boolean;
  featured: boolean;
  images: string[];
  units: UnitConfiguration[];
  amenities: string[];
  description: string;
  specifications: {
    flooring: string;
    ceilingHeight: string;
    facing: string;
    furnishing: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
    parking: string;
    powerBackup: string;
    waterSource: string;
  };
  neighborhood: {
    metro: string;
    airport: string;
    hospitals: string;
    schools: string;
    commercialHubs: string;
  };
  advisor: {
    name: string;
    agency: string;
    phone: string;
    whatsapp: string;
    reraNumber: string;
    experienceYears: number;
    avatar: string;
  };
}

export interface LeadEnquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyRef?: string;
  type: 'General Enquiry' | 'Site Visit' | 'WhatsApp Click' | 'Call Click' | 'Property Submission';
  name: string;
  phone: string;
  email: string;
  message?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  needsPickup?: boolean;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Closed';
}

export interface PropertyListingSubmission {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  city: CityCategory;
  microMarket: string;
  projectOrSociety: string;
  bedrooms: number;
  totalArea: number;
  expectedPrice: string;
  possessionStatus: string;
  listingType: 'Sell' | 'Rent';
  submittedAt: string;
}
