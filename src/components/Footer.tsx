import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onMicroMarketClick: (market: string) => void;
  onOpenListProperty: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onMicroMarketClick, onOpenListProperty }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-24 md:pb-16 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Advisory Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xl font-bold tracking-tight text-white flex items-center">
              <span className="font-serif italic text-amber-400 mr-1 text-2xl font-normal">G</span>
              <span>
                Gurugram<span className="text-amber-400">Property</span>
                <span className="text-xs font-mono font-semibold text-neutral-500 ml-0.5">.in</span>
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              The premier digital real estate advisory for Gurugram and Delhi NCR. We connect high-net-worth home buyers,
              corporates, and NRI investors with verified luxury residences, independent builder floors, and commercial assets.
            </p>

            <div className="space-y-2 pt-2 text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>One Horizon Center, Golf Course Road, Sector 54, Gurugram, Haryana 122002</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+919810144520" className="hover:text-white transition-colors">
                  +91 98101 44520 / +91 98112 89045
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:advisory@gurugramproperty.in" className="hover:text-white transition-colors">
                  advisory@gurugramproperty.in
                </a>
              </div>
            </div>
          </div>

          {/* Micro-Market Corridors */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Gurugram Corridors
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {[
                'Golf Course Road',
                'Golf Course Ext Road',
                'Dwarka Expressway',
                'Southern Peripheral Road',
                'Sohna Road',
                'Cyber City & DLF Phase 1-5',
                'New Gurgaon (Sec 80-95)',
              ].map((corridor) => (
                <li key={corridor}>
                  <button
                    onClick={() => onMicroMarketClick(corridor)}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    {corridor}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* NCR Locations */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Delhi NCR Regions
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onMicroMarketClick('South Delhi')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  South Delhi Luxury
                </button>
              </li>
              <li>
                <button
                  onClick={() => onMicroMarketClick('Noida Expressway')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Noida Expressway
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Greater Noida West</span>
              </li>
              <li>
                <span className="text-neutral-500">Faridabad Neharpar</span>
              </li>
              <li>
                <button
                  onClick={onOpenListProperty}
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  + List Property for Sale
                </button>
              </li>
            </ul>
          </div>

          {/* HARERA Regulatory Compliance */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              RERA Compliance
            </h4>
            <div className="bg-neutral-800/80 p-3.5 rounded border border-neutral-700 space-y-2 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>HARERA Acknowledged</span>
              </div>
              <p className="leading-normal">
                Haryana Real Estate Regulatory Authority (HARERA) Registered Advisory Partners. All marketing is conducted
                in strict alignment with the RERA Act 2016.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} GurugramProperty.in. All rights reserved. RERA Advisory Registration RC/HARERA/GGM/2019/314.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Advisory</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">HARERA Verification Protocol</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">XML Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
