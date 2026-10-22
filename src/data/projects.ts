export interface Project {
  id: string;
  name: string;
  builder: string;
  location: string;
  microMarket: string;
  priceStarting: string;
  possessionTimeline: string;
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  reraNumber: string;
  totalAcreage: string;
  totalTowers: string;
  heroImage: string;
  description: string;
  keyHighlights: string[];
  unitTypes: string[];
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'DLF The Camellias',
    builder: 'DLF Luxury Collections',
    location: 'Sector 42, Golf Course Road, Gurugram',
    microMarket: 'Golf Course Road',
    priceStarting: '₹28.50 Cr onwards',
    possessionTimeline: 'Delivered / Ready to Move',
    status: 'Ready to Move',
    reraNumber: 'RC/REP/HARERA/GGM/2018/14',
    totalAcreage: '17.5 Acres',
    totalTowers: '9 Towers (38 Stories)',
    heroImage: '/src/assets/images/project_luxury_camellias_1792673745173.jpg',
    description: 'The pinnacle of golf course luxury living in Delhi NCR. Facing the Gary Player and Arnold Palmer signature DLF Golf Courses.',
    keyHighlights: ['Direct uninterrupted golf views', 'Bespoke triple-height arrival lobby', 'Private heated lap pool', 'Helipad on campus'],
    unitTypes: ['4 BHK Luxury Decks', '5 BHK Golf Penthouses', '6 BHK Duplexes'],
  },
  {
    id: 'proj-2',
    name: 'Godrej Aristocrat',
    builder: 'Godrej Properties Ltd',
    location: 'Sector 49, Golf Course Ext Road, Gurugram',
    microMarket: 'Golf Course Ext Road',
    priceStarting: '₹4.35 Cr onwards',
    possessionTimeline: 'December 2027',
    status: 'Under Construction',
    reraNumber: 'RC/REP/HARERA/GGM/767/499/2023/111',
    totalAcreage: '9.5 Acres',
    totalTowers: '4 Iconic Towers',
    heroImage: '/src/assets/images/project_dwarka_expressway_1792673745535.jpg',
    description: 'Forest-themed modern luxury residences offering 75% landscaped open greens, vehicle-free podiums, and expansive forest clubhouse.',
    keyHighlights: ['60,000 sq ft Club Aristocrat', 'Half-Olympic temperature regulated pool', 'Air purified common lobbies', 'Zero vehicle podium'],
    unitTypes: ['3 BHK + Utility (2300 sq ft)', '4 BHK Sky Pavilion (3100 sq ft)'],
  },
  {
    id: 'proj-3',
    name: 'Smart World The Edition',
    builder: 'Smart World Developers',
    location: 'Sector 66, Golf Course Ext Road, Gurugram',
    microMarket: 'Golf Course Ext Road',
    priceStarting: '₹5.20 Cr onwards',
    possessionTimeline: 'March 2027',
    status: 'Under Construction',
    reraNumber: 'RC/REP/HARERA/GGM/758/490/2023/102',
    totalAcreage: '10.7 Acres',
    totalTowers: '6 High-Rise Towers',
    heroImage: '/src/assets/images/hero_gurugram_skyline_1792673745379.jpg',
    description: 'Singaporean style architecture featuring cantilevered sky clubs at 100 meters height, private jacuzzi sundecks, and luxury drop-offs.',
    keyHighlights: ['100m high Cantilevered Sky Lounge', 'Private Jacuzzi on sundecks', 'Direct SPR & Ext Road access', 'Destination controlled lifts'],
    unitTypes: ['3.5 BHK Sky Suites', '4.5 BHK Master Duplexes'],
  },
  {
    id: 'proj-4',
    name: 'Cyber One Towers',
    builder: 'DLF Commercial',
    location: 'Cyber City, Phase 2, Gurugram',
    microMarket: 'Cyber City & DLF Phase 1-5',
    priceStarting: '₹14.50 Cr onwards',
    possessionTimeline: 'Ready to Move',
    status: 'Ready to Move',
    reraNumber: 'RC/REP/HARERA/GGM/2017/08',
    totalAcreage: '6 Acres',
    totalTowers: '2 Grade-A Towers',
    heroImage: '/src/assets/images/commercial_cyber_city_1792673746094.jpg',
    description: 'LEED Platinum certified commercial office and retail arcade directly linked to Rapid Metro and Cyber Hub.',
    keyHighlights: ['LEED Platinum Green building', 'Direct skybridge to Rapid Metro', 'Floor plates up to 30,000 sq ft', 'MERV 14 HVAC air filtration'],
    unitTypes: ['Executive Office Floors', 'Whole Tower Floor Plates', 'Ground Retail Arcades'],
  },
];
