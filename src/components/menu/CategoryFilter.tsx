import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === category 
              ? 'bg-mineiro-brown text-white shadow-lg shadow-mineiro-brown/20' 
              : 'bg-white text-gray-600 border border-mineiro-cream/50 hover:border-mineiro-brown/30'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
