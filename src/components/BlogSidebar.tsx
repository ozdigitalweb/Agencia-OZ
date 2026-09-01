import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { mockPosts } from '../data/mockPosts';
import { blogApi, StoredPost } from '../services/api';

interface BlogSidebarProps {
  currentCategory?: string;
  onCategorySelect?: (category: string | null) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function BlogSidebar({ 
  currentCategory, 
  onCategorySelect, 
  searchQuery = '', 
  onSearchChange 
}: BlogSidebarProps) {
  const [posts, setPosts] = useState<StoredPost[]>(mockPosts as StoredPost[]);

  useEffect(() => {
    blogApi.getPosts({ status: 'published' }).then(fetched => {
      if (fetched && fetched.length > 0) {
        setPosts(fetched);
      }
    }).catch(() => {});
  }, []);

  // Calculate category posts counts dynamically
  const categoriesCount = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const categories = Object.keys(categoriesCount).map(catName => ({
    name: catName,
    count: categoriesCount[catName]
  }));

  // Get 3 recent posts
  const recentPosts = [...posts].slice(0, 3);

  return (
    <aside id="blog-sidebar" className="space-y-8">
      
      {/* Search Widget */}
      {onSearchChange && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-display font-bold text-slate-900 mb-4 text-base border-l-2 border-orange-500 pl-3 tracking-tight">
            Buscar no Blog
          </h3>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Digite sua busca..."
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-700"
            />
            <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
          </div>
        </div>
      )}

      {/* Categories Widget */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-display font-bold text-slate-900 mb-4 text-base border-l-2 border-blue-700 pl-3 tracking-tight">
          Categorias
        </h3>
        <ul className="space-y-2">
          {onCategorySelect && (
            <li>
              <button
                onClick={() => onCategorySelect(null)}
                className={`w-full flex items-center justify-between py-2 text-sm font-medium transition-colors hover:text-orange-500 ${
                  !currentCategory ? 'text-orange-500 font-semibold' : 'text-slate-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Todos os Artigos
                </span>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                  {posts.length}
                </span>
              </button>
            </li>
          )}
          
          {categories.map((cat) => (
            <li key={cat.name}>
              {onCategorySelect ? (
                <button
                  onClick={() => onCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between py-2 text-sm font-medium transition-colors hover:text-orange-500 ${
                    currentCategory === cat.name ? 'text-orange-500 font-semibold' : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5" /> {cat.name}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                    {cat.count}
                  </span>
                </button>
              ) : (
                <Link
                  to="/blog"
                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5" /> {cat.name}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                    {cat.count}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-display font-bold text-slate-900 mb-4 text-base border-l-2 border-emerald-500 pl-3 tracking-tight">
          Posts Recentes
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`} 
              className="flex gap-3 group items-start"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                loading="lazy"
                width={64}
                height={64}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:opacity-85 transition-opacity"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Local Support Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-2 translate-y-2 pointer-events-none">
          <BookOpen className="h-40 w-40" />
        </div>
        <span className="text-xs font-bold tracking-widest uppercase bg-slate-800 border border-slate-700 text-white px-2.5 py-1 rounded-full">
          Suporte Local
        </span>
        <h4 className="font-display font-bold text-lg mt-4 mb-2 leading-snug tracking-tight">
          Precisa de um site veloz?
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Fale com nossa equipe técnica em Canoas e melhore a velocidade e SEO do seu site WordPress.
        </p>
        <Link
          to="/orcamento"
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors w-full"
        >
          Solicitar Diagnóstico Grátis
        </Link>
      </div>

    </aside>
  );
}
