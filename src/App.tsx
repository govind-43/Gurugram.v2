/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { AdvisorDirectory } from './components/AdvisorDirectory';
import { ListPropertyModal } from './components/ListPropertyModal';
import { CompareModal } from './components/CompareModal';
import { EnquiriesCRMModal } from './components/EnquiriesCRMModal';
import { MobileActionBar } from './components/MobileActionBar';
import { Footer } from './components/Footer';

import { INITIAL_PROPERTIES } from './data/properties';
import { Property, LeadEnquiry, PropertyListingSubmission, CityCategory } from './types/property';
import { Heart, X, ArrowRight, ShieldCheck, Sparkles, Building, Phone, MessageSquare } from 'lucide-react';

const STORAGE_SHORTLIST_KEY = 'gp_shortlisted_ids';
const STORAGE_LEADS_KEY = 'gp_leads_enquiries';
const STORAGE_SUBMISSIONS_KEY = 'gp_property_submissions';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'browse' | 'projects' | 'advisors' | 'sell'>('browse');

  // Filter States
  const [listingTypeFilter, setListingTypeFilter] = useState<'All' | 'Buy' | 'Rent' | 'Commercial'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<CityCategory | 'All'>('All');
  const [selectedMicroMarket, setSelectedMicroMarket] = useState<string>('All');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('All');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Modals & Selection States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailModalInitialTab, setDetailModalInitialTab] = useState<'overview' | 'visit' | 'units' | 'emi'>('overview');
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [isShortlistDrawerOpen, setIsShortlistDrawerOpen] = useState(false);

  // Shortlist State (LocalStorage backed)
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SHORTLIST_KEY);
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  // Compare State (Up to 3 properties)
  const [comparePropertyIds, setComparePropertyIds] = useState<string[]>([]);

  // Leads & Submissions State (LocalStorage backed)
  const [leads, setLeads] = useState<LeadEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LEADS_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'REQ-849102',
              propertyId: 'prop-1',
              propertyTitle: 'DLF The Camellias – Signature Golf-Facing Residence',
              propertyRef: 'GP-1042',
              type: 'Site Visit',
              name: 'Dr. Alok Srivastava',
              phone: '+91 98105 11200',
              email: 'alok.srivastava@medanta.org',
              preferredDate: 'Upcoming Saturday',
              preferredTimeSlot: '11:00 AM – 01:00 PM',
              needsPickup: true,
              timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
              status: 'Site Visit Scheduled',
            },
            {
              id: 'REQ-620419',
              propertyId: 'prop-2',
              propertyTitle: 'Godrej Aristocrat – Forest-Themed High Rise',
              propertyRef: 'GP-1088',
              type: 'General Enquiry',
              name: 'Pooja Agarwal',
              phone: '+91 98110 54321',
              email: 'pooja.agarwal@deloitte.com',
              message: 'Requesting updated payment plan and brochure for 4 BHK unit.',
              timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
              status: 'Contacted',
            },
          ];
    } catch {
      return [];
    }
  });

  const [propertySubmissions, setPropertySubmissions] = useState<PropertyListingSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'PROP-SUB-102941',
              ownerName: 'Manish Chawla',
              phone: '+91 98114 99012',
              email: 'manish.chawla@gmail.com',
              propertyType: 'Apartment',
              city: 'Gurugram',
              microMarket: 'Golf Course Road (Sector 54)',
              projectOrSociety: 'DLF The Crest',
              bedrooms: 4,
              totalArea: 3500,
              expectedPrice: '₹10.50 Cr',
              possessionStatus: 'Ready to Move',
              listingType: 'Sell',
              submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            },
          ];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SHORTLIST_KEY, JSON.stringify(shortlistedIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [shortlistedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(propertySubmissions));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [propertySubmissions]);

  // Lead Submission Handler
  const handleLeadSubmit = (enquiry: LeadEnquiry) => {
    setLeads((prev) => [enquiry, ...prev]);
  };

  // Property Submission Handler
  const handleListingSubmit = (submission: PropertyListingSubmission) => {
    setPropertySubmissions((prev) => [submission, ...prev]);
  };

  // Update Lead Status
  const handleUpdateLeadStatus = (id: string, status: LeadEnquiry['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  // Toggle Shortlist
  const handleToggleShortlist = (propertyId: string) => {
    setShortlistedIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (property: Property) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(property.id)) {
        return prev.filter((id) => id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties at once. Please remove one first.');
        return prev;
      }
      return [...prev, property.id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparePropertyIds((prev) => prev.filter((item) => item !== id));
  };

  // Open property details
  const handleSelectProperty = (
    property: Property,
    initialTab: 'overview' | 'visit' | 'units' | 'emi' = 'overview'
  ) => {
    setSelectedProperty(property);
    setDetailModalInitialTab(initialTab);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setListingTypeFilter('All');
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedMicroMarket('All');
    setSelectedPropertyType('All');
    setSelectedBedrooms('All');
    setSelectedBudgetRange('All');
    setSelectedStatus('All');
    setSortBy('featured');
  };

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((prop) => {
      // Listing Type (Buy / Rent / Commercial)
      if (listingTypeFilter !== 'All') {
        if (listingTypeFilter === 'Commercial' && prop.listingType !== 'Commercial') return false;
        if (listingTypeFilter === 'Buy' && prop.listingType !== 'Buy') return false;
        if (listingTypeFilter === 'Rent' && prop.listingType !== 'Rent') return false;
      }

      // City filter
      if (selectedCity !== 'All' && prop.city !== selectedCity) {
        return false;
      }

      // Micro-market filter
      if (selectedMicroMarket !== 'All' && prop.microMarket !== selectedMicroMarket) {
        return false;
      }

      // Property type filter
      if (selectedPropertyType !== 'All' && prop.propertyType !== selectedPropertyType) {
        return false;
      }

      // Bedrooms filter
      if (selectedBedrooms !== 'All') {
        const numBhk = parseInt(selectedBedrooms, 10);
        if (numBhk === 5) {
          if (prop.bedrooms < 5) return false;
        } else {
          if (prop.bedrooms !== numBhk) return false;
        }
      }

      // Budget filter
      if (selectedBudgetRange !== 'All') {
        if (selectedBudgetRange === 'under-2cr' && prop.price > 20000000) return false;
        if (selectedBudgetRange === '2cr-5cr' && (prop.price < 20000000 || prop.price > 50000000)) return false;
        if (selectedBudgetRange === '5cr-10cr' && (prop.price < 50000000 || prop.price > 100000000)) return false;
        if (selectedBudgetRange === '10cr-plus' && prop.price < 100000000) return false;
      }

      // Availability status filter
      if (selectedStatus !== 'All' && prop.availability !== selectedStatus) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesBuilder = prop.builder.toLowerCase().includes(q);
        const matchesLocation = prop.location.toLowerCase().includes(q);
        const matchesSector = prop.sector.toLowerCase().includes(q);
        const matchesRera = prop.reraId.toLowerCase().includes(q);
        const matchesRef = prop.refCode.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBuilder && !matchesLocation && !matchesSector && !matchesRera && !matchesRef) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.totalArea - a.totalArea;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    listingTypeFilter,
    selectedCity,
    selectedMicroMarket,
    selectedPropertyType,
    selectedBedrooms,
    selectedBudgetRange,
    selectedStatus,
    searchQuery,
    sortBy,
  ]);

  const comparedProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => comparePropertyIds.includes(p.id));
  }, [comparePropertyIds]);

  const shortlistedProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => shortlistedIds.includes(p.id));
  }, [shortlistedIds]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      {/* Top Bar Contract (Wordmark, Nav Links, 1 Primary Action) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        listingTypeFilter={listingTypeFilter}
        setListingTypeFilter={setListingTypeFilter}
        shortlistCount={shortlistedIds.length}
        openShortlist={() => setIsShortlistDrawerOpen(true)}
        compareCount={comparePropertyIds.length}
        openCompare={() => setIsCompareOpen(true)}
        openListProperty={() => setIsListPropertyOpen(true)}
        openAdminHub={() => setIsAdminHubOpen(true)}
        enquiriesCount={leads.length}
      />

      <main className="flex-1">
        {/* View 1: Marketplace Browse Tab */}
        {activeTab === 'browse' && (
          <div>
            {/* Hero Section */}
            <Hero
              selectedListingType={listingTypeFilter}
              setSelectedListingType={(t) => setListingTypeFilter(t)}
              selectedMicroMarket={selectedMicroMarket}
              setSelectedMicroMarket={setSelectedMicroMarket}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedBudgetRange={selectedBudgetRange}
              setSelectedBudgetRange={setSelectedBudgetRange}
              onSearch={() => {
                const el = document.getElementById('property-grid-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              totalPropertiesCount={filteredProperties.length}
            />

            {/* Filter Bar */}
            <SearchFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedMicroMarket={selectedMicroMarket}
              setSelectedMicroMarket={setSelectedMicroMarket}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedBedrooms={selectedBedrooms}
              setSelectedBedrooms={setSelectedBedrooms}
              selectedBudgetRange={selectedBudgetRange}
              setSelectedBudgetRange={setSelectedBudgetRange}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
              totalFilteredCount={filteredProperties.length}
            />

            {/* Property Grid Section */}
            <section
              id="property-grid-section"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
            >
              {filteredProperties.length === 0 ? (
                <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center max-w-xl mx-auto space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    No verified properties match the selected criteria
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Try broadening your micro-market, budget range, or typology filters to view additional verified listings in Gurugram and Delhi NCR.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded hover:bg-neutral-800"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={(p, tab) => handleSelectProperty(p, tab)}
                      isShortlisted={shortlistedIds.includes(property.id)}
                      onToggleShortlist={handleToggleShortlist}
                      isCompared={comparePropertyIds.includes(property.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* View 2: Flagship Projects Showcase */}
        {activeTab === 'projects' && (
          <ProjectsShowcase
            onScheduleProjectVisit={(projectName) => {
              const matchedProp = INITIAL_PROPERTIES.find((p) => p.title.includes(projectName)) || INITIAL_PROPERTIES[0];
              handleSelectProperty(matchedProp, 'visit');
            }}
            onExploreProjectProperties={(microMarket) => {
              setActiveTab('browse');
              setSelectedMicroMarket(microMarket);
            }}
          />
        )}

        {/* View 3: Verified Advisors Directory */}
        {activeTab === 'advisors' && (
          <AdvisorDirectory
            onAdvisorEnquiry={handleLeadSubmit}
            onFilterAdvisorMarket={(market) => {
              setActiveTab('browse');
              setSelectedMicroMarket(market);
            }}
          />
        )}
      </main>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isShortlisted={selectedProperty ? shortlistedIds.includes(selectedProperty.id) : false}
        onToggleShortlist={handleToggleShortlist}
        isCompared={selectedProperty ? comparePropertyIds.includes(selectedProperty.id) : false}
        onToggleCompare={handleToggleCompare}
        onLeadSubmit={handleLeadSubmit}
        initialTab={detailModalInitialTab}
      />

      {/* List Property Modal */}
      <ListPropertyModal
        isOpen={isListPropertyOpen}
        onClose={() => setIsListPropertyOpen(false)}
        onListingSubmit={handleListingSubmit}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        properties={comparedProperties}
        onRemoveProperty={handleRemoveCompare}
        onSelectProperty={(p) => handleSelectProperty(p)}
      />

      {/* Admin / Leads Hub Modal */}
      <EnquiriesCRMModal
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
        enquiries={leads}
        onUpdateStatus={handleUpdateLeadStatus}
        propertySubmissions={propertySubmissions}
      />

      {/* Shortlist Drawer */}
      {isShortlistDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-neutral-300">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                <h3 className="font-semibold text-sm text-neutral-900">
                  Saved Properties ({shortlistedProperties.length})
                </h3>
              </div>
              <button
                onClick={() => setIsShortlistDrawerOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {shortlistedProperties.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs">
                  Your shortlist is currently empty. Tap the heart icon on any residence to save it for later review.
                </div>
              ) : (
                shortlistedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-20 h-16 object-cover rounded shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsShortlistDrawerOpen(false);
                        handleSelectProperty(prop);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          setIsShortlistDrawerOpen(false);
                          handleSelectProperty(prop);
                        }}
                        className="font-semibold text-xs text-neutral-900 truncate cursor-pointer hover:text-amber-800"
                      >
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        {prop.priceDisplay} · {prop.bedrooms > 0 ? `${prop.bedrooms} BHK` : prop.propertyType}
                      </p>
                      <button
                        onClick={() => {
                          setIsShortlistDrawerOpen(false);
                          handleSelectProperty(prop, 'visit');
                        }}
                        className="text-[11px] font-semibold text-amber-800 hover:underline mt-1 block"
                      >
                        Schedule Visit →
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleShortlist(prop.id)}
                      className="text-neutral-400 hover:text-red-600 p-1"
                      title="Remove from saved"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {shortlistedProperties.length > 0 && (
              <div className="p-4 border-t border-neutral-200">
                <button
                  onClick={() => setShortlistedIds([])}
                  className="w-full py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded"
                >
                  Clear Shortlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Action Bar (height < 15% viewport) */}
      <MobileActionBar
        onCallClick={() => {
          window.location.href = 'tel:+919810144520';
        }}
        onWhatsAppClick={() => {
          window.open(
            'https://wa.me/919810144520?text=Hello%20GurugramProperty.in%20team,%20I%20am%20looking%20for%20verified%20properties%20in%20Gurugram.',
            '_blank'
          );
        }}
        onScheduleVisitClick={() => {
          if (filteredProperties[0]) {
            handleSelectProperty(filteredProperties[0], 'visit');
          }
        }}
      />

      {/* Footer */}
      <Footer
        onMicroMarketClick={(market) => {
          setActiveTab('browse');
          setSelectedMicroMarket(market);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenListProperty={() => setIsListPropertyOpen(true)}
      />
    </div>
  );
}
