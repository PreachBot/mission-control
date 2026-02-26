'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { WineEntry } from '../page';

type AddWineModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wine: Omit<WineEntry, 'id' | 'date'>) => void;
};

export default function AddWineModal({ isOpen, onClose, onAdd }: AddWineModalProps) {
  const [name, setName] = useState('');
  const [vintage, setVintage] = useState('');
  const [producer, setProducer] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [grape, setGrape] = useState('');
  const [type, setType] = useState<'red' | 'white' | 'rosé' | 'sparkling'>('red');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(3);
  const [liked, setLiked] = useState(false);
  const [tastingNotes, setTastingNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name,
      vintage: vintage || undefined,
      producer: producer || undefined,
      region: region || undefined,
      country: country || undefined,
      grape: grape || undefined,
      type,
      style: style || undefined,
      price: price ? parseFloat(price) : undefined,
      rating,
      liked,
      tastingNotes,
    });

    // Reset
    setName('');
    setVintage('');
    setProducer('');
    setRegion('');
    setCountry('');
    setGrape('');
    setType('red');
    setStyle('');
    setPrice('');
    setRating(3);
    setLiked(false);
    setTastingNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 border border-white/20 rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add Wine</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Wine Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Louis M. Martini Cabernet Sauvignon"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Type & Vintage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="red" className="bg-slate-800">Red</option>
                <option value="white" className="bg-slate-800">White</option>
                <option value="rosé" className="bg-slate-800">Rosé</option>
                <option value="sparkling" className="bg-slate-800">Sparkling</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Vintage
              </label>
              <input
                type="text"
                value={vintage}
                onChange={(e) => setVintage(e.target.value)}
                placeholder="2021"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Producer & Grape */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Producer
              </label>
              <input
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                placeholder="Winery name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Grape
              </label>
              <input
                type="text"
                value={grape}
                onChange={(e) => setGrape(e.target.value)}
                placeholder="Cabernet Sauvignon"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Region & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Region
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Napa Valley"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="USA"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Style & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Style
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="Full-bodied, Bold"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(r)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      r <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Liked */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="liked"
              checked={liked}
              onChange={(e) => setLiked(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/10 text-red-600 focus:ring-2 focus:ring-red-500"
            />
            <label htmlFor="liked" className="text-white/80">
              I loved this wine ❤️
            </label>
          </div>

          {/* Tasting Notes */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Tasting Notes
            </label>
            <textarea
              value={tastingNotes}
              onChange={(e) => setTastingNotes(e.target.value)}
              placeholder="Rich and bold with structured tannins..."
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              Add Wine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
