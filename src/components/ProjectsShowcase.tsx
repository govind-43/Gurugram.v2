import React from 'react';
import { FEATURED_PROJECTS, Project } from '../data/projects';
import { ShieldCheck, Calendar, MapPin, Layers, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';

interface ProjectsShowcaseProps {
  onScheduleProjectVisit: (projectName: string) => void;
  onExploreProjectProperties: (microMarket: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onScheduleProjectVisit,
  onExploreProjectProperties,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2">
          Master Planned Enclaves
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-semibold text-neutral-900 tracking-tight">
          Flagship Developments in Gurugram
        </h2>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          Comprehensive project profiles with verified HARERA registrations, delivery track records, acreage, and tower configurations.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {FEATURED_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Project Hero Image */}
              <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                <div className="absolute top-3 left-3">
                  <span className="bg-neutral-900/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{project.reraNumber}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <span className="text-xs text-neutral-300 block font-medium">By {project.builder}</span>
                    <h3 className="text-xl font-bold font-serif">{project.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-neutral-300 block">Starting From</span>
                    <span className="text-sm font-bold font-mono text-amber-300">{project.priceStarting}</span>
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-medium">
                  <span className="flex items-center gap-1 text-neutral-700">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    {project.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    {project.possessionTimeline}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                    {project.totalAcreage} ({project.totalTowers})
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">{project.description}</p>

                {/* Key Highlights */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Project Highlights
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {project.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unit Types */}
                <div className="pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Configurations Offered
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {project.unitTypes.map((ut, i) => (
                      <span key={i} className="bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded text-[11px] font-medium">
                        {ut}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => onScheduleProjectVisit(project.name)}
                className="flex-1 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded text-center transition-colors"
              >
                Schedule Project Tour
              </button>

              <button
                onClick={() => onExploreProjectProperties(project.microMarket)}
                className="flex items-center gap-1 py-2.5 px-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded transition-colors"
              >
                <span>View Listings</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
