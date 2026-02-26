'use client';

import { Wine, MapPin, DollarSign, Calendar, Trash2, Heart, Star } from 'lucide-react';
import { WineEntry } from '../page';

type WineCardProps = {
  wine: WineEntry;
  onDelete: (id: string) => void;
};

export default function WineCard({ wine, onDelete }: WineCardProps) {
  return (
    <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all hover:scale-[1.02]">
      {/* Photo */}
      {wine.photo && (
        <div className="aspect-[3/4] bg-white/5">
          <img
            src={wine.photo}
            alt={wine.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-lg mb-1 line-clamp-2">
              {wine.name}
            </h3>
            {wine.vintage && (
              <p className="text-sm text-white/60">{wine.vintage}</p>
            )}
          </div>
          <button
            onClick={() => onDelete(wine.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Rating & Liked */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < wine.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
          {wine.liked && (
            <div className="flex items-center gap-1 text-xs text-red-300 bg-red-500/20 px-2 py-1 rounded-full">
              <Heart className="w-3 h-3 fill-red-300" />
              Loved
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-3 text-sm">
          {wine.producer && (
            <div className="text-white/70">{wine.producer}</div>
          )}
          {(wine.region || wine.country) && (
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-3 h-3" />
              {[wine.region, wine.country].filter(Boolean).join(', ')}
            </div>
          )}
          {wine.grape && (
            <div className="text-white/60">
              <span className="text-white/40">Grape:</span> {wine.grape}
            </div>
          )}
          {wine.style && (
            <div className="text-xs text-white/50">{wine.style}</div>
          )}
          {wine.price && (
            <div className="flex items-center gap-1 text-white/60">
              <DollarSign className="w-3 h-3" />
              ${wine.price}
            </div>
          )}
        </div>

        {/* Tasting Notes */}
        <div className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-white/70 line-clamp-3">
            {wine.tastingNotes}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(wine.date).toLocaleDateString()}
          </div>
          <div className={`px-2 py-1 rounded-full ${
            wine.type === 'red' ? 'bg-red-500/20 text-red-300' :
            wine.type === 'white' ? 'bg-yellow-500/20 text-yellow-300' :
            wine.type === 'rosé' ? 'bg-pink-500/20 text-pink-300' :
            'bg-blue-500/20 text-blue-300'
          }`}>
            {wine.type}
          </div>
        </div>
      </div>
    </div>
  );
}
