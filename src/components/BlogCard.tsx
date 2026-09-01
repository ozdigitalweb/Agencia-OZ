import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../data/mockPosts';

interface BlogCardProps {
  post: BlogPost;
  key?: any;
}

export default function BlogCard({ post }: BlogCardProps) {
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'WordPress':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Hospedagem':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'SEO':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <article
      id={`blog-card-${post.id}`}
      className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-300"
    >
      {/* Featured Image Link */}
      <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden group">
        <img
          src={post.featuredImage}
          alt={`Capa do artigo: ${post.title}`}
          loading="lazy"
          width={360}
          height={203}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-4 left-4 border px-3 py-1 rounded-full text-[13px] font-bold ${getCategoryColor(post.category)} shadow-sm`}>
          {post.category}
        </span>
      </Link>

      {/* Content Wrapper */}
      <div className="flex flex-col p-6 flex-grow">
        
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-slate-400" />
            {post.author.name}
          </span>
        </div>

        {/* Title & Excerpt */}
        <h3 className="font-display text-lg font-bold text-slate-900 mb-2 hover:text-blue-700 transition-colors leading-snug tracking-tight">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer Author & Link */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              loading="lazy"
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="text-sm font-semibold text-slate-600 line-clamp-1">
              {post.author.name}
            </span>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-orange-500 group/read transition-colors"
          >
            Ler Mais
            <ArrowRight className="h-3 w-3 transition-transform group-hover/read:translate-x-1" />
          </Link>
        </div>

      </div>
    </article>
  );
}
