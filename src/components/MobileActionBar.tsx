import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

interface MobileActionBarProps {
  onScheduleVisitClick: () => void;
  onCallClick: () => void;
  onWhatsAppClick: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onScheduleVisitClick,
  onCallClick,
  onWhatsAppClick,
}) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-3 py-2 shadow-lg"
    >
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onCallClick}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-neutral-900 text-white rounded text-xs font-semibold"
        >
          <Phone className="w-3.5 h-3.5 text-neutral-300" />
          <span>Call Desk</span>
        </button>

        <button
          onClick={onWhatsAppClick}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 text-white rounded text-xs font-semibold"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={onScheduleVisitClick}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-amber-700 text-white rounded text-xs font-semibold"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Site Visit</span>
        </button>
      </div>
    </aside>
  );
};
