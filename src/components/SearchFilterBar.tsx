import React from 'react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CityCategory, MicroMarket, PropertyType } from '../types/property';

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: CityCategory | 'All';
  setSelectedCity: (city: CityCategory | 'All') => void;
  selectedMicroMarket: string;
  setSelectedMicroMarket: (micro: string) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (type: string) => void;
  selectedBedrooms: string;
  setSelectedBedrooms: (bhk: string) => void;
  selectedBudgetRange: string;
  setSelectedBudgetRange: (range: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onReset: () => void;
  totalFilteredCount: number;
}

const CITIES: (CityCategory | 'All')[] = ['All', 'Gurugram', 'Delhi NCR', 'Noida', 'Faridabad'];

const GURUGRAM_MICROMARKETS: MicroMarket[] = [
  'Golf Course Road',
  'Golf Course Ext Road',
  'Dwarka Expressway',
  'Southern Peripheral Road',
  'Sohna Road',
  'Cyber City & DLF Phase 1-5',
  'New Gurgaon (Sec 80-95)',
];

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedMicroMarket,
  setSelectedMicroMarket,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedBudgetRange,
  setSelectedBudgetRange,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  onReset,
  totalFilteredCount,
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCity !== 'All' ||
    selectedMicroMarket !== 'All' ||
    selectedPropertyType !== 'All' ||
    selectedBedrooms !== 'All' ||
    selectedBudgetRange !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="bg-white border-b border-neutral-200 sticky top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        {/* Row 1: Search Input & City Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name, sector (e.g. Sector 54), builder (DLF, Godrej), or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                aria-label="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-md overflow-x-auto">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedCity === city
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {city === 'All' ? 'All NCR' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Secondary Filters & Sort */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs">
          {/* Micro-market */}
          <div>
            <select
              value={selectedMicroMarket}
              onChange={(e) => setSelectedMicroMarket(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="All">All Micro-Markets</option>
              {GURUGRAM_MICROMARKETS.map((mm) => (
                <option key={mm} value={mm}>
                  {mm}
                </option>
              ))}
            </select>
          </div>

          {/* Typology */}
          <div>
            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="All">All Typologies</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Independent Floor">Independent Floor</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Commercial Office">Commercial Office</option>
              <option value="Retail SCO">Retail SCO</option>
            </select>
          </div>

          {/* BHK */}
          <div>
            <select
              value={selectedBedrooms}
              onChange={(e) => setSelectedBedrooms(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="All">All Configurations</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK / Penthouse</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <select
              value={selectedBudgetRange}
              onChange={(e) => setSelectedBudgetRange(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="All">All Budgets</option>
              <option value="under-2cr">Under ₹2 Cr</option>
              <option value="2cr-5cr">₹2 Cr – ₹5 Cr</option>
              <option value="5cr-10cr">₹5 Cr – ₹10 Cr</option>
              <option value="10cr-plus">₹10 Cr+ Luxury</option>
            </select>
          </div>

          {/* Possession Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="All">All Statuses</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
              <option value="Immediate Possession">Immediate Possession</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded py-2 px-2.5 text-neutral-800 focus:outline-none focus:border-neutral-900 font-medium"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
          </div>
        </div>

        {/* Row 3: Filter feedback & Reset indicator */}
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900 font-mono tabular-nums">
              {totalFilteredCount}
            </span>
            <span>Verified Residences & Commercial Units Available</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-medium hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
