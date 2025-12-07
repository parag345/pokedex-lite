'use client';

import { TYPE_COLORS } from '@/utils/types';
import { X } from 'lucide-react';

interface TypeFilterProps {
  types: string[];
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export function TypeFilter({ types, selectedTypes, onChange }: TypeFilterProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Filter by Type</h3>
        {selectedTypes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 capitalize ${
                isSelected
                  ? `${TYPE_COLORS[type] || 'bg-gray-400'} text-white scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
