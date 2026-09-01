import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import { mockPosts } from '../data/mockPosts';
import { blogApi, StoredPost } from '../services/api';
import BlogPostContent from '../components/BlogPostContent';
import BlogSidebar from '../components/BlogSidebar';
import BlogCard from '../components/BlogCard';

export default function BlogSingle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<StoredPost | null>(null);
  const [allPosts, setAllPosts] = useState<StoredPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      loadPostAndRelated(slug);
    }
  }, [slug]);

  const loadPostAndRelated = async (currentSlug: string) => {
    setIsLoading(true);
    try {
      const [fetchedPost, fetchedList] = await Promise.all([
        blogApi.getPost(currentSlug),
        blogApi.getPosts({ status: 'published' })
      ]);
      
      setPost(fetchedPost);
      setAllPosts(fetchedList || []);
    } catch (err) {
      console.warn('Error loading single post, fallback:', err);
      const found = mockPosts.find(p => p.slug === currentSlug);
      setPost(found ? { ...found, status: 'published' } : null);
      setAllPosts(mockPosts as StoredPost[]);
    } finally {
      setIsLoading(false);
    }
  };

  // Set page title dynamically for individual blog post SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | AGÊNCIA OZ`;
    }
  }, [post]);

  // Find related posts (exclude current, prefer same category, slice 2)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    
    let candidates = allPosts.filter(p => p.id !== post.id);
    let categoryMatches = candidates.filter(p => p.category.toLowerCase() === post.category.toLowerCase());
    
    if (categoryMatches.length > 0) {
      return categoryMatches.slice(0, 2);
    }
    return candidates.slice(0, 2);
  }, [post, allPosts]);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 border border-orange-100 text-orange-500">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
          Artigo Não Encontrado
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          O artigo solicitado não existe ou pode ter sido movido para um novo endereço de link.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-100"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao Blog
        </Link>
      </div>
    );
  }

  return (
    <div id="blog-single-page" className="pb-16 animate-fade-in">
      
      {/* Back Button Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para Artigos
          </Link>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
            Lógica do WordPress: single.php
          </span>
        </div>
      </section>

      {/* Main Grid Wrapper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-12">
            
            <BlogPostContent post={post} />

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-slate-200">
                <h3 className="font-display text-xl font-bold text-slate-900 border-l-3 border-orange-500 pl-3 tracking-tight">
                  Artigos Relacionados
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar />
          </div>

        </div>
      </section>

    </div>
  );
}
