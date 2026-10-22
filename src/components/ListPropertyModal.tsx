import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Building2, MapPin, IndianRupee, Layers } from 'lucide-react';
import { PropertyType, CityCategory, PropertyListingSubmission } from '../types/property';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingSubmit: (submission: PropertyListingSubmission) => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  isOpen,
  onClose,
  onListingSubmit,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [listingType, setListingType] = useState<'Sell' | 'Rent'>('Sell');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [city, setCity] = useState<CityCategory>('Gurugram');
  const [microMarket, setMicroMarket] = useState('Golf Course Road');
  const [projectOrSociety, setProjectOrSociety] = useState('');
  const [sector, setSector] = useState('');

  const [bedrooms, setBedrooms] = useState(3);
  const [totalArea, setTotalArea] = useState<number>(2200);
  const [furnishing, setFurnishing] = useState('Semi-Furnished');

  const [expectedPrice, setExpectedPrice] = useState('₹4.20 Cr');
  const [possessionStatus, setPossessionStatus] = useState('Ready to Move');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!ownerName || !ownerPhone || !ownerEmail) {
      setFormError('Please enter your full name, phone number, and email.');
      return;
    }

    if (ownerPhone.replace(/[^0-9]/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (mathAnswer.trim() !== '9') {
      setFormError('Verification check failed: What is 6 + 3?');
      return;
    }

    const submission: PropertyListingSubmission = {
      id: `PROP-SUB-${Math.floor(100000 + Math.random() * 900000)}`,
      ownerName,
      phone: ownerPhone,
      email: ownerEmail,
      propertyType,
      city,
      microMarket: `${microMarket} (${sector})`,
      projectOrSociety,
      bedrooms,
      totalArea,
      expectedPrice,
      possessionStatus,
      listingType,
      submittedAt: new Date().toISOString(),
    };

    onListingSubmit(submission);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Top */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block">
              Direct Owner & Broker Desk
            </span>
            <h3 className="text-lg font-serif font-bold text-neutral-900">List Your Property in Gurugram</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-semibold text-neutral-900">
                Property Submitted for Title Verification
              </h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold">{ownerName}</span>. Your listing for{' '}
                <span className="font-semibold">{projectOrSociety || 'your property'}</span> has been submitted to our
                Gurugram property appraisal desk. Our team will verify ownership documents and publish it across our verified network.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded"
              >
                Close & Return to Marketplace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Stepper Header */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step >= 1 ? 'bg-amber-800 text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    1
                  </span>
                  <span className="font-medium text-neutral-700">Property Info</span>
                </div>
                <span className="text-neutral-300">→</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step >= 2 ? 'bg-amber-800 text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    2
                  </span>
                  <span className="font-medium text-neutral-700">Specs & Pricing</span>
                </div>
                <span className="text-neutral-300">→</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step >= 3 ? 'bg-amber-800 text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    3
                  </span>
                  <span className="font-medium text-neutral-700">Verification</span>
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded">{formError}</div>
              )}

              {/* Step 1: Property Location & Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Intent</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setListingType('Sell')}
                        className={`py-2 px-3 rounded font-semibold border ${
                          listingType === 'Sell'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        Sell Property
                      </button>
                      <button
                        type="button"
                        onClick={() => setListingType('Rent')}
                        className={`py-2 px-3 rounded font-semibold border ${
                          listingType === 'Rent'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        Rent Out Property
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Property Typology</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as any)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Independent Floor">Independent Floor</option>
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Commercial Office">Commercial Office</option>
                        <option value="Retail SCO">Retail SCO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">City / Region</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as any)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value="Gurugram">Gurugram</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Noida">Noida</option>
                        <option value="Faridabad">Faridabad</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Project or Society Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DLF The Crest, M3M Golfestate, Godrej Aristocrat"
                      value={projectOrSociety}
                      onChange={(e) => setProjectOrSociety(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Micro-Market Corridor</label>
                      <select
                        value={microMarket}
                        onChange={(e) => setMicroMarket(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value="Golf Course Road">Golf Course Road</option>
                        <option value="Golf Course Ext Road">Golf Course Ext Road</option>
                        <option value="Dwarka Expressway">Dwarka Expressway</option>
                        <option value="Southern Peripheral Road">Southern Peripheral Road</option>
                        <option value="Sohna Road">Sohna Road</option>
                        <option value="Cyber City & DLF Phase 1-5">Cyber City & DLF Phase 1-5</option>
                        <option value="New Gurgaon (Sec 80-95)">New Gurgaon (Sec 80-95)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Sector Number</label>
                      <input
                        type="text"
                        placeholder="e.g. Sector 54, Sector 65"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!projectOrSociety.trim()) {
                          setFormError('Please state the Project or Society name.');
                          return;
                        }
                        setFormError('');
                        setStep(2);
                      }}
                      className="px-4 py-2 bg-neutral-900 text-white font-semibold rounded hover:bg-neutral-800"
                    >
                      Continue to Specs
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Specs & Pricing */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Bedrooms</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value={1}>1 BHK</option>
                        <option value={2}>2 BHK</option>
                        <option value={3}>3 BHK</option>
                        <option value={4}>4 BHK</option>
                        <option value={5}>5+ BHK</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Total Super Area (sq ft)</label>
                      <input
                        type="number"
                        value={totalArea}
                        onChange={(e) => setTotalArea(Number(e.target.value))}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Furnishing</label>
                      <select
                        value={furnishing}
                        onChange={(e) => setFurnishing(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">
                        Expected Price ({listingType === 'Sell' ? 'INR' : 'Monthly Rent'})
                      </label>
                      <input
                        type="text"
                        placeholder={listingType === 'Sell' ? 'e.g. ₹3.85 Cr' : 'e.g. ₹1.20 Lakh / mo'}
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Possession Status</label>
                      <select
                        value={possessionStatus}
                        onChange={(e) => setPossessionStatus(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      >
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Immediate Possession">Immediate Possession</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-neutral-300 text-neutral-700 font-semibold rounded hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-neutral-900 text-white font-semibold rounded hover:bg-neutral-800"
                    >
                      Continue to Verification
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Owner Details & Anti-Spam */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Your Full Name (Title Holder / Broker)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjay Verma"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Phone Number (with WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98111 23456"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sanjay@verma.com"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded p-2 text-neutral-800"
                      />
                    </div>
                  </div>

                  {/* Anti-spam Question */}
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded">
                    <label className="block font-medium text-neutral-700 mb-1">
                      Anti-Spam Human Verification: What is 6 + 3?
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter the number"
                      value={mathAnswer}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      className="w-28 bg-white border border-neutral-300 rounded p-2 text-neutral-800 font-mono"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 border border-neutral-300 text-neutral-700 font-semibold rounded hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded uppercase tracking-wider"
                    >
                      Publish Property for Verification
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
