'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Tag } from 'lucide-react';
import { CardType } from '../page';

type CardProps = {
  card: CardType;
  isDragging?: boolean;
  onDelete?: (cardId: string) => void;
};

const priorityColors = {
  low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function Card({ card, isDragging, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? 'shadow-2xl shadow-purple-500/50 scale-105' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-5 h-5 text-white/40 hover:text-white/60" />
        </div>
        <button
          onClick={() => onDelete && onDelete(card.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>

      <h3 className="font-semibold text-white mb-2">{card.title}</h3>
      <p className="text-sm text-white/70 mb-3">{card.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full border ${priorityColors[card.priority]}`}
        >
          {card.priority}
        </span>
        <span className="text-xs text-white/50">
          {new Date(card.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
