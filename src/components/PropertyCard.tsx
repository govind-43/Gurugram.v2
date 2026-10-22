import React from 'react';
import { Heart, Scale, Phone, MessageSquare, ShieldCheck, Check, Calendar, ArrowUpRight } from 'lucide-react';
import { Property } from '../types/property';
import { formatArea, formatRate, createWhatsAppLink } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property, initialTab?: 'overview' | 'visit' | 'units' | 'emi') => void;
  isShortlisted: boolean;
  onToggleShortlist: (propertyId: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isShortlisted,
  onToggleShortlist,
  isCompared,
  onToggleCompare,
}) => {
  const whatsappUrl = createWhatsAppLink(
    property.advisor.whatsapp,
    property.title,
    property.refCode,
    property.priceDisplay,
    property.location
  );

  return (
    <article className="group bg-white rounded-lg border border-neutral-200 overflow-hidden hover:border-neutral-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      {/* Top Media Slot */}
      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient Scrim for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/20 pointer-events-none" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Subtle RERA verification tag */}
          <div className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>HARERA Vetted</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-amber-700 text-white'
                  : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-neutral-950'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              aria-label="Compare property"
            >
              {isCompared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
            </button>

            {/* Shortlist Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleShortlist(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isShortlisted
                  ? 'bg-red-50 text-red-600'
                  : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-red-600'
              }`}
              title={isShortlisted ? 'Remove from shortlist' : 'Save property'}
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Media Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{property.possessionDate}</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-300 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
            {property.images.length} Photos
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-neutral-500 font-medium mb-2">
            <span>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{formatArea(property.totalArea)}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-700">{property.microMarket}</span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onSelect(property)}
            className="text-base font-semibold text-neutral-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {property.title}
          </h2>

          {/* Builder & Location Subtitle */}
          <p className="text-xs text-neutral-500 mb-3 line-clamp-1">
            By <span className="font-medium text-neutral-700">{property.builder}</span> · {property.location}
          </p>

          {/* Price & Unit Rate Block (Tabular Numerals) */}
          <div className="flex items-baseline justify-between border-t border-neutral-100 pt-3 mb-3">
            <div>
              <div className="text-lg font-bold text-neutral-950 font-mono tracking-tight">
                {property.priceDisplay}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                {formatRate(property.pricePerSqFt)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-medium text-neutral-600 block">Status</span>
              <span className="text-xs font-semibold text-emerald-700">
                {property.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-neutral-100 space-y-2">
          {/* Primary View Details Button */}
          <button
            onClick={() => onSelect(property)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
          >
            <span>View Verified Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
          </button>

          {/* Secondary Quick Contact Strip */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => onSelect(property, 'visit')}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium rounded border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            >
              <Calendar className="w-3 h-3 text-amber-700" />
              <span className="truncate">Site Visit</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium rounded border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${property.advisor.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium rounded border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-neutral-600" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
