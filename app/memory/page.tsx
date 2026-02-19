'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, FileText, Video, MessageSquare, Code, BookOpen, Calendar, Tag as TagIcon } from 'lucide-react';
import Link from 'next/link';
import MemoryCard from './components/MemoryCard';
import AddMemoryModal from './components/AddMemoryModal';

export type MemoryType = 'article' | 'video' | 'conversation' | 'code' | 'note';

export type Memory = {
  id: string;
  type: MemoryType;
  title: string;
  summary: string;
  content?: string;
  url?: string;
  keyPoints?: string[];
  tags: string[];
  date: string;
  importance: 'low' | 'medium' | 'high';
  relatedProjects?: string[];
};

const initialMemories: Memory[] = [
  {
    id: '1',
    type: 'article',
    title: 'Building AI Agent Businesses',
    summary: 'Explored 3 business ideas that can be powered by AI agents: Research Assistant, Notion Automation, and Social Media Intelligence.',
    keyPoints: [
      'Services that used to need teams can now run 24/7',
      'Start with one idea, validate, then scale',
      'Revenue: $49-499/mo depending on service',
    ],
    tags: ['ai', 'business', 'agents'],
    date: '2026-02-15',
    importance: 'high',
    relatedProjects: ['AI Agent Projects'],
  },
  {
    id: '2',
    type: 'conversation',
    title: 'Wine Brain System Discussion',
    summary: 'Designed a 4-database Notion system for tracking wines, tastings, palate preferences, and knowledge.',
    content: 'Created Wine Collection, Tasting Log, Palate Model, and Wine Knowledge databases. Added favorite wines including Louis M. Martini, JAX, and St. Giorgio Toscana.',
    tags: ['wine', 'notion', 'tracking'],
    date: '2026-02-16',
    importance: 'high',
    relatedProjects: ['Wine Brain'],
  },
  {
    id: '3',
    type: 'note',
    title: 'George\'s Wine Preferences',
    summary: 'Loves structured, full-bodied dry reds. Napa Cabernets and Italian Super Tuscans are his sweet spot.',
    keyPoints: [
      'Favorite style: Structured, full-bodied, dry reds',
      'Top regions: Napa Valley, Tuscany, Rioja',
      'Favorite wineries: Augusta Vin, Safari Wine Bar (Fredericksburg, TX)',
    ],
    tags: ['wine', 'preferences', 'profile'],
    date: '2026-02-16',
    importance: 'high',
  },
];

const typeIcons = {
  article: FileText,
  video: Video,
  conversation: MessageSquare,
  code: Code,
  note: BookOpen,
};

const typeColors = {
  article: 'text-blue-400',
  video: 'text-red-400',
  conversation: 'text-purple-400',
  code: 'text-green-400',
  note: 'text-yellow-400',
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MemoryType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('memory-bank');
    if (saved) {
      setMemories(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('memory-bank', JSON.stringify(memories));
  }, [memories]);

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch =
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || memory.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleAddMemory = (memory: Omit<Memory, 'id' | 'date'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setMemories([newMemory, ...memories]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  const typeButtons = [
    { type: 'all' as const, label: 'All', icon: Filter },
    { type: 'article' as const, label: 'Articles', icon: FileText },
    { type: 'video' as const, label: 'Videos', icon: Video },
    { type: 'conversation' as const, label: 'Conversations', icon: MessageSquare },
    { type: 'code' as const, label: 'Code', icon: Code },
    { type: 'note' as const, label: 'Notes', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-purple-300 hover:text-purple-200 transition-colors"
              >
                ← Mission Control
              </Link>
              <div className="h-6 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-3xl font-bold text-white">Memory Bank</h1>
                  <p className="text-purple-300 text-sm">Search & archive everything</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Memory
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories, tags, or content..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {typeButtons.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">{memories.length}</div>
            <div className="text-sm text-purple-300">Total Memories</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {memories.filter((m) => m.type === 'article').length}
            </div>
            <div className="text-sm text-purple-300">Articles</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {memories.filter((m) => m.type === 'conversation').length}
            </div>
            <div className="text-sm text-purple-300">Conversations</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {memories.filter((m) => m.importance === 'high').length}
            </div>
            <div className="text-sm text-purple-300">High Priority</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {new Set(memories.flatMap((m) => m.tags)).size}
            </div>
            <div className="text-sm text-purple-300">Unique Tags</div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-white/60">
          {filteredMemories.length} {filteredMemories.length === 1 ? 'result' : 'results'}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Memory Cards */}
        <div className="space-y-4">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onDelete={handleDeleteMemory}
            />
          ))}

          {filteredMemories.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No memories found</p>
              <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMemory}
      />
    </div>
  );
}
