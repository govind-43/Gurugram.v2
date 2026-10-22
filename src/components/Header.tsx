import React, { useState } from 'react';
import { Heart, Scale, PlusCircle, Menu, X, Phone, ShieldCheck, Database } from 'lucide-react';

interface HeaderProps {
  activeTab: 'browse' | 'projects' | 'advisors' | 'sell';
  setActiveTab: (tab: 'browse' | 'projects' | 'advisors' | 'sell') => void;
  listingTypeFilter: 'Buy' | 'Rent' | 'Commercial' | 'All';
  setListingTypeFilter: (type: 'Buy' | 'Rent' | 'Commercial' | 'All') => void;
  shortlistCount: number;
  openShortlist: () => void;
  compareCount: number;
  openCompare: () => void;
  openListProperty: () => void;
  openAdminHub: () => void;
  enquiriesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  setListingTypeFilter,
  shortlistCount,
  openShortlist,
  compareCount,
  openCompare,
  openListProperty,
  openAdminHub,
  enquiriesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'browse' | 'projects' | 'advisors' | 'sell', filter?: 'Buy' | 'Rent' | 'Commercial' | 'All') => {
    setActiveTab(tab);
    if (filter) {
      setListingTypeFilter(filter);
    } else if (tab === 'browse') {
      setListingTypeFilter('All');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <button
            onClick={() => handleNavClick('browse', 'All')}
            className="flex items-center text-left text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <span className="font-serif italic text-amber-700 mr-1.5 text-2xl font-normal">G</span>
            <span className="text-neutral-900 group-hover:text-amber-800 transition-colors">
              Gurugram<span className="text-amber-700">Property</span>
              <span className="text-xs font-mono font-semibold tracking-normal text-neutral-400 ml-0.5">.in</span>
            </span>
          </button>

          {/* Zone 2: Clean 4–5 single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <button
              onClick={() => handleNavClick('browse', 'Buy')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'browse' ? 'text-amber-800 font-semibold border-b-2 border-amber-700 pb-1' : ''
              }`}
            >
              Buy Homes
            </button>
            <button
              onClick={() => handleNavClick('browse', 'Rent')}
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Rent Luxury
            </button>
            <button
              onClick={() => handleNavClick('browse', 'Commercial')}
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0"
            >
              Commercial & SCO
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'projects' ? 'text-amber-800 font-semibold border-b-2 border-amber-700 pb-1' : ''
              }`}
            >
              Flagship Projects
            </button>
            <button
              onClick={() => handleNavClick('advisors')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'advisors' ? 'text-amber-800 font-semibold border-b-2 border-amber-700 pb-1' : ''
              }`}
            >
              Verified Advisors
            </button>
          </nav>

          {/* Zone 3: Primary action & utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Compare shortcut */}
            {compareCount > 0 && (
              <button
                onClick={openCompare}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                title="Compare selected properties"
              >
                <Scale className="w-3.5 h-3.5 text-amber-700" />
                <span>Compare ({compareCount})</span>
              </button>
            )}

            {/* Shortlist shortcut */}
            <button
              onClick={openShortlist}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 rounded-md transition-colors"
              title="Saved Properties"
              aria-label="Saved Properties"
            >
              <Heart className={`w-5 h-5 ${shortlistCount > 0 ? 'fill-amber-600 text-amber-600' : ''}`} />
              {shortlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Admin / Leads Hub Button */}
            <button
              onClick={openAdminHub}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="View Enquiries & Leads Hub"
            >
              <Database className="w-4 h-4 text-neutral-500" />
              <span>Leads Hub</span>
              {enquiriesCount > 0 && (
                <span className="bg-neutral-200 text-neutral-700 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                  {enquiriesCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Top Bar Contract: 1 primary action) */}
            <button
              onClick={openListProperty}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-neutral-900 hover:bg-amber-900 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>List Property</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-800">
            <button
              onClick={() => handleNavClick('browse', 'Buy')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50"
            >
              Buy Homes & Luxury Condos
            </button>
            <button
              onClick={() => handleNavClick('browse', 'Rent')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50"
            >
              Rent Premium Residences
            </button>
            <button
              onClick={() => handleNavClick('browse', 'Commercial')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50"
            >
              Commercial Office & Retail SCO
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50"
            >
              Flagship Projects
            </button>
            <button
              onClick={() => handleNavClick('advisors')}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50"
            >
              Verified RERA Advisors
            </button>
            <button
              onClick={() => {
                openAdminHub();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-neutral-50 flex items-center justify-between"
            >
              <span>Leads Hub & Enquiries</span>
              <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded font-mono">{enquiriesCount}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <a
              href="tel:+919810144520"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-800 hover:text-amber-800"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>+91 98101 44520</span>
            </a>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>HARERA Compliant</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
