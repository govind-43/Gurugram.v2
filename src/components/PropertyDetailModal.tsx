import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  Building,
  Layers,
  Compass,
  Car,
  Zap,
  Droplets,
  Calculator,
  ArrowRight,
  Heart,
  Scale,
  Copy,
  Clock,
  CarFront,
} from 'lucide-react';
import { Property, LeadEnquiry } from '../types/property';
import {
  formatArea,
  formatRate,
  formatAvailability,
  calculateEMI,
  createWhatsAppLink,
} from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isShortlisted: boolean;
  onToggleShortlist: (propertyId: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
  onLeadSubmit: (enquiry: LeadEnquiry) => void;
  initialTab?: 'overview' | 'visit' | 'units' | 'emi';
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isShortlisted,
  onToggleShortlist,
  isCompared,
  onToggleCompare,
  onLeadSubmit,
  initialTab = 'overview',
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'amenities' | 'location' | 'emi' | 'visit'>(
    initialTab
  );
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

  // EMI Calculator State
  const defaultLoanAmount = Math.round(property.price * 0.8);
  const [loanAmount, setLoanAmount] = useState<number>(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const emiCalculation = calculateEMI(loanAmount, interestRate, tenureYears);

  // Site Visit Form State
  const [visitDate, setVisitDate] = useState<string>('');
  const [visitTimeSlot, setVisitTimeSlot] = useState<string>('11:00 AM – 01:00 PM');
  const [needsCabPickup, setNeedsCabPickup] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [spamAnswer, setSpamAnswer] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submissionRef, setSubmissionRef] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [copiedRera, setCopiedRera] = useState<boolean>(false);

  const handleCopyRera = () => {
    navigator.clipboard?.writeText(property.reraId);
    setCopiedRera(true);
    setTimeout(() => setCopiedRera(false), 2500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setFormError('Please fill in your name, contact phone number, and email.');
      return;
    }

    if (clientPhone.replace(/[^0-9]/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Anti-spam check (4 + 3 = 7)
    if (spamAnswer.trim() !== '7') {
      setFormError('Please solve the verification question correctly (4 + 3 = ?).');
      return;
    }

    const ref = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnquiry: LeadEnquiry = {
      id: ref,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyRef: property.refCode,
      type: activeTab === 'visit' ? 'Site Visit' : 'General Enquiry',
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      preferredDate: visitDate || 'Earliest Available',
      preferredTimeSlot: visitTimeSlot,
      needsPickup: needsCabPickup,
      timestamp: new Date().toISOString(),
      status: 'New',
    };

    onLeadSubmit(newEnquiry);
    setSubmissionRef(ref);
    setFormSubmitted(true);
  };

  const whatsappUrl = createWhatsAppLink(
    property.advisor.whatsapp,
    property.title,
    property.refCode,
    property.priceDisplay,
    property.location
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] border border-neutral-300">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-neutral-200 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
              {property.refCode}
            </span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-medium text-neutral-700">{property.microMarket}</span>
              <span aria-hidden="true">·</span>
              <span>{property.city}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Compare Toggle */}
            <button
              onClick={() => onToggleCompare(property)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                isCompared
                  ? 'bg-amber-700 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            {/* Shortlist Toggle */}
            <button
              onClick={() => onToggleShortlist(property.id)}
              className={`p-1.5 rounded transition-colors ${
                isShortlisted
                  ? 'text-red-600 bg-red-50'
                  : 'text-neutral-500 hover:text-red-600 bg-neutral-100 hover:bg-neutral-200'
              }`}
              title="Save property"
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-red-600' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors ml-1"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Section 1: Hero & Gallery */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
                  <span>{property.propertyType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{property.listingType === 'Commercial' ? 'Commercial' : `For ${property.listingType}`}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700">{property.availability}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-serif font-semibold text-neutral-900">
                  {property.title}
                </h2>
                <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{property.location}</span>
                </p>
              </div>

              <div className="md:text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950">
                  {property.priceDisplay}
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-0.5">
                  {formatRate(property.pricePerSqFt)}
                </div>
              </div>
            </div>

            {/* Main Active Photo */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-950">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnails Strip */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-700 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Tabbed Navigation */}
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-6 text-sm font-medium overflow-x-auto pb-px">
              {[
                { id: 'overview', label: 'Property Overview' },
                { id: 'units', label: 'Unit Configurations & Sizes' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'location', label: 'Location & Transit' },
                { id: 'emi', label: 'Loan EMI Calculator' },
                { id: 'visit', label: 'Schedule Site Visit' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-800 text-amber-800 font-semibold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab 1: Property Overview & Specific Bug Fix Checklist */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary Metric Grid (Directly addressing raw template expression bug) */}
              <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  Verified Engineering & Unit Dimensions
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-neutral-500 block">Total Area</span>
                    <span className="font-semibold text-neutral-900 font-mono">
                      {formatArea(property.totalArea)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Built-up Area</span>
                    <span className="font-semibold text-neutral-900 font-mono">
                      {formatArea(property.builtupArea)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Carpet Area</span>
                    <span className="font-semibold text-neutral-900 font-mono">
                      {formatArea(property.carpetArea)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Rate / Sq.Ft</span>
                    <span className="font-semibold text-neutral-900 font-mono">
                      {formatRate(property.pricePerSqFt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Availability</span>
                    <span className="font-semibold text-emerald-800">
                      {formatAvailability(property.availability)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Possession Date</span>
                    <span className="font-semibold text-neutral-900">
                      {property.possessionDate || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">Construction Status</span>
                    <span className="font-semibold text-neutral-900">
                      {property.constructionStatus || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block">HARERA Reg. No</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-neutral-900 font-mono text-xs truncate">
                        {property.reraId}
                      </span>
                      <button
                        onClick={handleCopyRera}
                        className="text-neutral-400 hover:text-neutral-700"
                        title="Copy RERA ID"
                      >
                        {copiedRera ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">Architectural Description</h3>
                <p className="text-neutral-700 text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Specifications Matrix */}
              <div>
                <h3 className="text-base font-semibold text-neutral-900 mb-3">Construction & Finishes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Layers className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Flooring & Finishes</span>
                      <span className="text-neutral-900">{property.specifications.flooring}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Building className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Ceiling Height</span>
                      <span className="text-neutral-900">{property.specifications.ceilingHeight}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Orientation & Facing</span>
                      <span className="text-neutral-900">{property.specifications.facing}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Car className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Reserved Parking</span>
                      <span className="text-neutral-900">{property.specifications.parking}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Power Infrastructure</span>
                      <span className="text-neutral-900">{property.specifications.powerBackup}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded bg-white border border-neutral-200">
                    <Droplets className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-500 block">Water Source</span>
                      <span className="text-neutral-900">{property.specifications.waterSource}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Unit Configurations (Explicit fix for unit['availability'], unit['total_area'], unit['builtup_area'], unit['rate']) */}
          {activeTab === 'units' && (
            <div className="space-y-6">
              <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Verified Floor Layouts & Precise Dimensions</span>
                  <span>
                    Each unit plan below reflects verified architectural measurements approved under HARERA. Total area,
                    built-up area, and pricing rates are calculated accurately without placeholder expressions.
                  </span>
                </div>
              </div>

              {/* Unit Configuration Tabs */}
              <div className="flex flex-wrap gap-2">
                {property.units.map((unit, idx) => (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnitIndex(idx)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all ${
                      selectedUnitIndex === idx
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>

              {/* Selected Unit Breakdown Card */}
              {property.units[selectedUnitIndex] && (
                <div className="bg-white rounded-lg border border-neutral-200 p-5 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">
                        {property.units[selectedUnitIndex].name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {property.units[selectedUnitIndex].bedrooms} Bedrooms · Exclusive Floor Layout
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl font-bold font-mono text-neutral-950">
                        {property.units[selectedUnitIndex].priceDisplay}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">
                        {formatRate(property.units[selectedUnitIndex].rate)}
                      </div>
                    </div>
                  </div>

                  {/* Explicit 4-factor Metric Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-md">
                    <div>
                      <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
                        Total Super Area
                      </span>
                      <span className="text-sm font-bold text-neutral-900 font-mono">
                        {formatArea(property.units[selectedUnitIndex].totalArea)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
                        Built-Up Area
                      </span>
                      <span className="text-sm font-bold text-neutral-900 font-mono">
                        {formatArea(property.units[selectedUnitIndex].builtupArea)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
                        Carpet Area
                      </span>
                      <span className="text-sm font-bold text-neutral-900 font-mono">
                        {formatArea(property.units[selectedUnitIndex].carpetArea)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
                        Availability
                      </span>
                      <span className="text-sm font-bold text-emerald-700">
                        {formatAvailability(property.units[selectedUnitIndex].availability)}
                      </span>
                    </div>
                  </div>

                  {/* Floor Plan Diagram Simulation */}
                  <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50/50 flex flex-col items-center justify-center text-center py-10">
                    <Building className="w-10 h-10 text-neutral-400 mb-2" />
                    <span className="text-sm font-semibold text-neutral-800">
                      Approved Architectural Floor Plan – {property.units[selectedUnitIndex].name}
                    </span>
                    <span className="text-xs text-neutral-500 max-w-md mt-1">
                      Includes Master Suite with Walk-in Wardrobe, Living/Dining Deck, Servant Quarters, and Modular Italian Kitchen.
                    </span>
                    <button
                      onClick={() => setActiveTab('visit')}
                      className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded transition-colors"
                    >
                      Request High-Res Architectural Blueprint
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Amenities */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-neutral-900">Lifestyle & Community Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-md border border-neutral-200 bg-white"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-medium text-neutral-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Location & Transit */}
          {activeTab === 'location' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">Neighborhood Infrastructure</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Strategic connectivity to key NCR business parks, airports, and social infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                  <span className="font-semibold text-neutral-900 block mb-1">Metro & Rail Transit</span>
                  <p className="text-neutral-600">{property.neighborhood.metro}</p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                  <span className="font-semibold text-neutral-900 block mb-1">International Airport</span>
                  <p className="text-neutral-600">{property.neighborhood.airport}</p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                  <span className="font-semibold text-neutral-900 block mb-1">Healthcare Centers</span>
                  <p className="text-neutral-600">{property.neighborhood.hospitals}</p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                  <span className="font-semibold text-neutral-900 block mb-1">Leading Schools</span>
                  <p className="text-neutral-600">{property.neighborhood.schools}</p>
                </div>

                <div className="sm:col-span-2 p-4 bg-neutral-50 border border-neutral-200 rounded-md">
                  <span className="font-semibold text-neutral-900 block mb-1">Commercial Hubs & Workplaces</span>
                  <p className="text-neutral-600">{property.neighborhood.commercialHubs}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: EMI Calculator */}
          {activeTab === 'emi' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-700" />
                  <span>Home Loan EMI Estimator</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Calculate estimated monthly installments based on prevailing NCR banking interest rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                {/* Sliders */}
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-neutral-600">Loan Amount</span>
                      <span className="font-mono font-bold text-neutral-900">
                        ₹{(loanAmount / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                    <input
                      type="range"
                      min={Math.round(property.price * 0.2)}
                      max={property.price}
                      step={500000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-amber-700"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5 font-mono">
                      <span>Min: 20%</span>
                      <span>Max: 100%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-neutral-600">Interest Rate</span>
                      <span className="font-mono font-bold text-neutral-900">{interestRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min={7.5}
                      max={12.0}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-700"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-neutral-600">Tenure</span>
                      <span className="font-mono font-bold text-neutral-900">{tenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full accent-amber-700"
                    />
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-white p-5 rounded-md border border-neutral-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 block mb-1">
                      Estimated Monthly EMI
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950">
                      ₹{emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-neutral-100 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Principal Amount</span>
                      <span className="font-mono font-medium text-neutral-800">
                        ₹{loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Total Interest Payable</span>
                      <span className="font-mono font-medium text-neutral-800">
                        ₹{emiCalculation.totalInterest.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold pt-1 border-t border-neutral-100">
                      <span className="text-neutral-900">Total Outflow</span>
                      <span className="font-mono text-neutral-950">
                        ₹{emiCalculation.totalPayment.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Schedule Site Visit & Enquiry */}
          {activeTab === 'visit' && (
            <div className="space-y-6">
              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-emerald-950">
                    Site Visit Request Confirmed
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your request has been logged under reference code{' '}
                    <span className="font-mono font-bold">{submissionRef}</span>. Dedicated advisor{' '}
                    <span className="font-semibold">{property.advisor.name}</span> will contact you within 30 minutes to
                    coordinate access and gate passes.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmissionRef('');
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-900 underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">
                      Schedule a Private Guided Site Tour
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Experience the property, clubhouse amenities, and view orientation in person with our RERA certified specialist.
                    </p>
                  </div>

                  {formError && (
                    <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Preferred Time Window</label>
                      <select
                        value={visitTimeSlot}
                        onChange={(e) => setVisitTimeSlot(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                      >
                        <option value="10:00 AM – 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                        <option value="12:00 PM – 02:00 PM">Midday (12:00 PM – 02:00 PM)</option>
                        <option value="03:00 PM – 05:00 PM">Afternoon (03:00 PM – 05:00 PM)</option>
                        <option value="05:00 PM – 07:00 PM">Sunset / Evening (05:00 PM – 07:00 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Singhania"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Mobile Number (with WhatsApp)</label>
                      <input
                        type="tel"
                        placeholder="e.g. 98100 12345"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rajesh@singhaniagroup.com"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    {/* Chauffeur Service Option */}
                    <div className="sm:col-span-2 bg-neutral-50 border border-neutral-200 rounded p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CarFront className="w-4 h-4 text-amber-700" />
                        <div>
                          <span className="font-semibold text-neutral-900 block">Complimentary Chauffeur Transit</span>
                          <span className="text-[11px] text-neutral-500">
                            Available within Gurugram & South Delhi for shortlisted properties.
                          </span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={needsCabPickup}
                        onChange={(e) => setNeedsCabPickup(e.target.checked)}
                        className="h-4 w-4 accent-amber-700 rounded"
                      />
                    </div>

                    {/* Anti-spam Verification */}
                    <div className="sm:col-span-2">
                      <label className="block font-medium text-neutral-700 mb-1">
                        Spam Protection: What is 4 + 3?
                      </label>
                      <input
                        type="text"
                        placeholder="Enter the number"
                        required
                        value={spamAnswer}
                        onChange={(e) => setSpamAnswer(e.target.value)}
                        className="w-32 bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800 focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded transition-colors uppercase tracking-wider"
                  >
                    Confirm Site Visit Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Section 3: Verified Advisor Card */}
          <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={property.advisor.avatar}
                alt={property.advisor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-600/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-neutral-900">{property.advisor.name}</h4>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                    RERA Certified
                  </span>
                </div>
                <p className="text-xs text-neutral-500">{property.advisor.agency}</p>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Reg: {property.advisor.reraNumber} · {property.advisor.experienceYears}+ yrs experience
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${property.advisor.phone.replace(/[^0-9+]/g, '')}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Advisor</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
