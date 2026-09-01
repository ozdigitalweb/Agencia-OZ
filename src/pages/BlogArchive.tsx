import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { mockPosts, BlogPost } from '../data/mockPosts';
import { blogApi, StoredPost } from '../services/api';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';

export default function BlogArchive() {
  const [allPosts, setAllPosts] = useState<StoredPost[]>(mockPosts as StoredPost[]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const postsPerPage = 4;

  useEffect(() => {
    loadLivePosts();
  }, []);

  const loadLivePosts = async () => {
    setIsLoading(true);
    try {
      const posts = await blogApi.getPosts({ status: 'published' });
      if (posts && posts.length > 0) {
        setAllPosts(posts);
      }
    } catch (err) {
      console.warn('Fallback to mockPosts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    let results = allPosts;

    if (selectedCategory) {
      results = results.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    return results;
  }, [allPosts, selectedCategory, searchQuery]);

  // Reset pagination on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="blog-archive-page" className="space-y-12 pb-16 animate-fade-in">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2.5 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 flex items-center justify-center sm:justify-start gap-1">
              <BookOpen className="h-4 w-4" /> Central de Conhecimento
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Blog da AGÊNCIA OZ
            </h1>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
              Dicas realistas sobre desenvolvimento WordPress rápido, segredos de SEO Local de Canoas e infraestrutura de servidores Cloud.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Layout (Grid + Sidebar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Posts Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Filter Indicators */}
            {(selectedCategory || searchQuery) && (
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Filtrado por:</span>
                  {selectedCategory && (
                    <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 text-xs">
                      Categoria: {selectedCategory}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 text-xs">
                      Busca: "{searchQuery}"
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors"
                >
                  Limpar Filtros ×
                </button>
              </div>
            )}

            {/* Loop Area */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {paginatedPosts.map((post) => (
                  <div key={post.id} className="h-full">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
                <HelpCircle className="h-12 w-12 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-slate-800 text-lg tracking-tight">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tente alterar seus termos de pesquisa ou selecionar outra categoria no menu lateral.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Ver Todos os Artigos
                </button>
              </div>
            )}

            {/* Pagination Widget */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 border-t border-slate-200 text-xs font-bold text-slate-500">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  &larr; Anterior
                </button>
                
                <span>
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  Próxima &rarr;
                </button>
              </div>
            )}

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4">
            <BlogSidebar
              currentCategory={selectedCategory || undefined}
              onCategorySelect={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

        </div>
      </section>

    </div>
  );
}
