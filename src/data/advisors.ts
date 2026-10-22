export interface Advisor {
  id: string;
  name: string;
  agency: string;
  role: string;
  reraNumber: string;
  experienceYears: number;
  phone: string;
  whatsapp: string;
  email: string;
  specialization: string[];
  micromarkets: string[];
  activeListingsCount: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
}

export const ADVISORS: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Vikram Malhotra',
    agency: 'Gurugram Prime Advisory Group',
    role: 'Principal Luxury Real Estate Consultant',
    reraNumber: 'HARERA/GGM/2019/314',
    experienceYears: 16,
    phone: '+91 98101 44520',
    whatsapp: '+919810144520',
    email: 'vikram.m@gurugramproperty.in',
    specialization: ['Golf Course Road Super Luxury', 'DLF Luxury Condominiums', 'High-Value Commercial'],
    micromarkets: ['Golf Course Road', 'Cyber City & DLF Phase 1-5'],
    activeListingsCount: 18,
    rating: 4.9,
    reviewCount: 84,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    bio: 'Specializing in trophy assets and high-net-worth residential transactions across Golf Course Road and Cyber City. Recognized with Haryana RERA advisory credentials.',
  },
  {
    id: 'adv-2',
    name: 'Aditi Sharma',
    agency: 'Gurugram Capital Partners',
    role: 'Senior Residential Investment Advisor',
    reraNumber: 'HARERA/GGM/2021/892',
    experienceYears: 11,
    phone: '+91 98112 89045',
    whatsapp: '+919811289045',
    email: 'aditi.sharma@gurugramproperty.in',
    specialization: ['Golf Course Extension Road', 'New Launch Investments', 'High-Yield Rentals'],
    micromarkets: ['Golf Course Ext Road', 'Southern Peripheral Road', 'Noida Expressway'],
    activeListingsCount: 24,
    rating: 4.9,
    reviewCount: 67,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Former banking wealth advisor turned property strategist. Guides home buyers and NRI investors through verified titles, yield calculations, and seamless registrations.',
  },
  {
    id: 'adv-3',
    name: 'Sunil Tanwar',
    agency: 'Expressway Realty Advisors',
    role: 'Dwarka Expressway & SPR Specialist',
    reraNumber: 'HARERA/GGM/2022/411',
    experienceYears: 9,
    phone: '+91 98104 77123',
    whatsapp: '+919810477123',
    email: 'sunil.t@gurugramproperty.in',
    specialization: ['Dwarka Expressway Luxury', 'Independent Floors', 'SCO Plots & Retail'],
    micromarkets: ['Dwarka Expressway', 'New Gurgaon (Sec 80-95)', 'Sohna Road'],
    activeListingsCount: 31,
    rating: 4.8,
    reviewCount: 52,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Deep grassroots knowledge of sector developments, land titles, and master infrastructure progress across Dwarka Expressway and New Gurgaon corridors.',
  },
  {
    id: 'adv-4',
    name: 'Rohan Mehra',
    agency: 'Gurugram Capital Partners',
    role: 'Commercial & Luxury Specialist',
    reraNumber: 'HARERA/GGM/2020/551',
    experienceYears: 13,
    phone: '+91 98188 33190',
    whatsapp: '+919818833190',
    email: 'rohan.mehra@gurugramproperty.in',
    specialization: ['Grade A Offices', 'Retail Leasing', 'Pre-Leased Commercial'],
    micromarkets: ['Golf Course Ext Road', 'Cyber City & DLF Phase 1-5', 'Sohna Road'],
    activeListingsCount: 15,
    rating: 4.9,
    reviewCount: 43,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Advising family offices and corporate occupiers on institutional-grade leasing, pre-leased commercial assets, and high-street SCO retail acquisitions.',
  },
];
