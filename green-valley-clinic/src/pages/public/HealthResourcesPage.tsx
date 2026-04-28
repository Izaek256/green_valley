import React, { useState } from 'react';
import { mockArticles } from '../../data/mockArticles';
import type { HealthArticle } from '../../data/types';

export const HealthResourcesPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Nutrition', 'Mental Health', 'Preventive Care', 'Fitness', 'General'];
  
  const filteredArticles = categoryFilter === 'All'
    ? mockArticles
    : mockArticles.filter(article => article.category === categoryFilter);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={() => setSelectedArticle(null)}
          className="mb-4 text-[#A8D98A] hover:underline"
        >
          ← Back to Articles
        </button>
        <article className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold text-[#1E2A6E] mb-4">{selectedArticle.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {selectedArticle.category} • {selectedArticle.publishedAt}
          </p>
          <div className="prose max-w-none">
            {selectedArticle.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#1E2A6E] mb-8 text-center">Health Resources</h1>
      
      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded ${
              categoryFilter === cat
                ? 'bg-[#A8D98A] text-[#1E2A6E]'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow overflow-hidden">
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <span className="text-sm text-[#A8D98A] font-medium">{article.category}</span>
              <h3 className="text-xl font-semibold text-[#1E2A6E] mt-2 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
              <button
                onClick={() => setSelectedArticle(article)}
                className="text-[#A8D98A] hover:underline font-medium"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
