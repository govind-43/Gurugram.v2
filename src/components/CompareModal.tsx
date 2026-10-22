import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { Property } from '../types/property';
import { formatArea, formatRate } from '../utils/formatters';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemoveProperty: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  properties,
  onRemoveProperty,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white max-w-5xl w-full rounded-xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-semibold text-neutral-900">
              Side-by-Side Property Comparison ({properties.length}/3)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          {properties.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No properties selected for comparison. Click the scale icon on property cards to compare up to 3 residences.
            </div>
          ) : (
            <table className="w-full text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-3 w-40 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                    Attribute
                  </th>
                  {properties.map((prop) => (
                    <th key={prop.id} className="p-3 text-left w-64 align-top">
                      <div className="relative">
                        <button
                          onClick={() => onRemoveProperty(prop.id)}
                          className="absolute -top-1 -right-1 p-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          className="w-full h-28 object-cover rounded mb-2"
                        />
                        <h4 className="font-semibold text-neutral-900 line-clamp-1">{prop.title}</h4>
                        <span className="text-amber-800 font-bold font-mono text-sm block mt-0.5">
                          {prop.priceDisplay}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProperty(prop);
                          }}
                          className="mt-2 text-[11px] font-semibold text-neutral-900 hover:text-amber-800 underline block"
                        >
                          Open Detailed View →
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Rate / Sq.Ft</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 font-mono font-semibold text-neutral-900">
                      {formatRate(prop.pricePerSqFt)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Typology</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 text-neutral-800">
                      {prop.bedrooms > 0 ? `${prop.bedrooms} BHK ` : ''}
                      {prop.propertyType}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Total Area</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 font-mono text-neutral-800">
                      {formatArea(prop.totalArea)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Carpet Area</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 font-mono text-neutral-800">
                      {formatArea(prop.carpetArea)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Micro-Market</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 font-medium text-neutral-900">
                      {prop.microMarket}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Developer / Builder</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 text-neutral-700">
                      {prop.builder}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Possession Timeline</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 text-neutral-800 font-medium">
                      {prop.possessionDate}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">HARERA Registration</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 font-mono text-emerald-800 font-medium truncate max-w-[200px]">
                      {prop.reraId}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-medium text-neutral-500">Signature Amenity</td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="p-3 text-neutral-600">
                      {prop.amenities[0] || 'Modern Clubhouse & Swimming Pool'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
