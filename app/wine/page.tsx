'use client';

import { useState, useEffect } from 'react';
import { Wine, Plus, Search, Filter, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import WineCard from './components/WineCard';
import AddWineModal from './components/AddWineModal';

export type WineEntry = {
  id: string;
  name: string;
  vintage?: string;
  producer?: string;
  region?: string;
  country?: string;
  grape?: string;
  type: 'red' | 'white' | 'rosé' | 'sparkling';
  style?: string;
  price?: number;
  photo?: string;
  rating: number; // 1-5
  liked: boolean;
  tastingNotes: string;
  date: string;
};

const sampleWines: WineEntry[] = [
  {
    id: '1',
    name: 'Louis M. Martini Napa Valley Cabernet Sauvignon',
    vintage: '2021',
    producer: 'Louis M. Martini',
    region: 'Napa Valley',
    country: 'USA',
    grape: 'Cabernet Sauvignon',
    type: 'red',
    style: 'Full-bodied, Structured, Bold',
    price: 25,
    rating: 5,
    liked: true,
    tastingNotes: 'Rich and bold with structured tannins. Dark fruit, oak, vanilla notes. Perfect with steak.',
    date: '2026-02-15',
  },
  {
    id: '2',
    name: 'St. Giorgio Toscana',
    producer: 'St. Giorgio',
    region: 'Tuscany',
    country: 'Italy',
    type: 'red',
    style: 'Super Tuscan, Elegant, Full-bodied',
    rating: 5,
    liked: true,
    tastingNotes: 'Incredible Super Tuscan. Smooth, elegant, complex. Cherry and earth notes.',
    date: '2026-02-16',
  },
];

export default function WinePage() {
  const [wines, setWines] = useState<WineEntry[]>(sampleWines);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wine-collection');
    if (saved) {
      setWines(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('wine-collection', JSON.stringify(wines));
  }, [wines]);

  // Filter wines
  const filteredWines = wines.filter((wine) => {
    const matchesSearch =
      searchTerm === '' ||
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.grape?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || wine.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleAddWine = (wine: Omit<WineEntry, 'id' | 'date'>) => {
    const newWine: WineEntry = {
      ...wine,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setWines([newWine, ...wines]);
  };

  const handleDeleteWine = (id: string) => {
    setWines(wines.filter((w) => w.id !== id));
  };

  const avgRating = wines.length > 0 
    ? (wines.reduce((sum, w) => sum + w.rating, 0) / wines.length).toFixed(1)
    : '0';

  const likedCount = wines.filter((w) => w.liked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white/70" />
              </Link>
              <div className="flex items-center gap-3">
                <Wine className="w-8 h-8 text-red-400" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Wine Collection</h1>
                  <p className="text-red-300 text-sm">
                    {wines.length} wines • {likedCount} loved • {avgRating}★ avg
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Wine
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search wines, regions, grapes..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'red', 'white', 'rosé', 'sparkling'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === type
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wine Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filteredWines.length === 0 ? (
          <div className="text-center py-16">
            <Wine className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No wines found
            </h3>
            <p className="text-white/60 mb-6">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first wine'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Wine
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWines.map((wine) => (
              <WineCard key={wine.id} wine={wine} onDelete={handleDeleteWine} />
            ))}
          </div>
        )}
      </main>

      {/* Add Wine Modal */}
      <AddWineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWine}
      />

      {/* Stats Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-red-300">
            <div className="flex gap-6">
              <span>🍷 {wines.filter((w) => w.type === 'red').length} Red</span>
              <span>🥂 {wines.filter((w) => w.type === 'white').length} White</span>
              <span>🌸 {wines.filter((w) => w.type === 'rosé').length} Rosé</span>
              <span>✨ {wines.filter((w) => w.type === 'sparkling').length} Sparkling</span>
            </div>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
