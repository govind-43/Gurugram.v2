import React from 'react';
import { Search, ShieldCheck, MapPin, Building2, CheckCircle2, Award } from 'lucide-react';
import { MicroMarket, PropertyType } from '../types/property';

interface HeroProps {
  selectedListingType: 'All' | 'Buy' | 'Rent' | 'Commercial';
  setSelectedListingType: (type: 'All' | 'Buy' | 'Rent' | 'Commercial') => void;
  selectedMicroMarket: string;
  setSelectedMicroMarket: (micro: string) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (type: string) => void;
  selectedBudgetRange: string;
  setSelectedBudgetRange: (range: string) => void;
  onSearch: () => void;
  totalPropertiesCount: number;
}

const MICRO_MARKETS: MicroMarket[] = [
  'Golf Course Road',
  'Golf Course Ext Road',
  'Dwarka Expressway',
  'Southern Peripheral Road',
  'Sohna Road',
  'Cyber City & DLF Phase 1-5',
  'New Gurgaon (Sec 80-95)',
  'Noida Expressway',
  'South Delhi',
];

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'Penthouse',
  'Independent Floor',
  'Luxury Villa',
  'Commercial Office',
  'Retail SCO',
];

export const Hero: React.FC<HeroProps> = ({
  selectedListingType,
  setSelectedListingType,
  selectedMicroMarket,
  setSelectedMicroMarket,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedBudgetRange,
  setSelectedBudgetRange,
  onSearch,
  totalPropertiesCount,
}) => {
  return (
    <section className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Background Image with High-Fidelity Architectural Asset & Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_gurugram_skyline_1792673745379.jpg"
          alt="Gurugram Golf Course Road Skyline at twilight"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Subtle unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-4">
            <span>Direct Haryana RERA Verified</span>
            <span aria-hidden="true">·</span>
            <span>Golf Course Road & Expressway Corridors</span>
            <span aria-hidden="true">·</span>
            <span>NCR Prime Realty</span>
          </div>

          {/* Balanced display headline (anti-orphan rule) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white mb-6 [text-wrap:balance] leading-tight">
            Curated Luxury & Verified Real Estate in <span className="italic text-amber-300">Gurugram</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal mb-8 max-w-2xl leading-relaxed">
            Discover vetted luxury residences, penthouses, independent builder floors, and Grade-A commercial spaces.
            Accurate possession timelines, genuine prices per sq ft, and zero misleading data.
          </p>
        </div>

        {/* Interactive Search Console */}
        <div className="bg-white text-neutral-900 rounded-lg shadow-2xl p-4 sm:p-6 max-w-5xl border border-neutral-200">
          {/* Functional Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-4 mb-5">
            {(['All', 'Buy', 'Rent', 'Commercial'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedListingType(type)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedListingType === type
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {type === 'All' ? 'All Properties' : type === 'Commercial' ? 'Commercial & SCO' : `${type} Luxury`}
              </button>
            ))}
          </div>

          {/* Search Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Micro-Market */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Micro-Market</span>
              </label>
              <select
                value={selectedMicroMarket}
                onChange={(e) => setSelectedMicroMarket(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-md py-2.5 px-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              >
                <option value="All">All Gurugram & NCR Corridors</option>
                {MICRO_MARKETS.map((market) => (
                  <option key={market} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Property Typology</span>
              </label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-md py-2.5 px-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              >
                <option value="All">All Typologies</option>
                {PROPERTY_TYPES.map((ptype) => (
                  <option key={ptype} value={ptype}>
                    {ptype}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Budget Bracket
              </label>
              <select
                value={selectedBudgetRange}
                onChange={(e) => setSelectedBudgetRange(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-md py-2.5 px-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
              >
                <option value="All">Any Budget</option>
                <option value="under-2cr">Under ₹2.00 Crore</option>
                <option value="2cr-5cr">₹2.00 Cr – ₹5.00 Crore</option>
                <option value="5cr-10cr">₹5.00 Cr – ₹10.00 Crore</option>
                <option value="10cr-plus">Above ₹10.00 Crore (Ultra Luxury)</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="sm:col-span-2 lg:col-span-1 pt-1">
              <button
                onClick={onSearch}
                className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 px-4 rounded-md transition-colors text-sm shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Find Residences ({totalPropertiesCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-neutral-300 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>HARERA Registered Titles</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Zero Unverified Listings</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>16+ Years NCR Market Advisory</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>No Fake Reviews or Mock Data</span>
          </div>
        </div>
      </div>
    </section>
  );
};
