import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Tag, Clock } from 'lucide-react';
import { BlogPost } from '../data/mockPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article id={`single-post-${post.id}`} className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-slate-100">
      
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
          <Tag className="h-3.5 w-3.5" />
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-400 mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            loading="lazy"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <span className="text-slate-700">
            Por <strong className="font-bold">{post.author.name}</strong> ({post.author.role})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>Leitura: 5 min</span>
        </div>
      </div>

      {/* Capa */}
      {post.featuredImage && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner mb-10 bg-slate-100">
          <img
            src={post.featuredImage}
            alt={`Imagem destacada: ${post.title}`}
            width={800}
            height={450}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
          />
        </div>
      )}

      {/* Main Body with Clean Markdown & GFM */}
      <div className="blog-article-body text-slate-700 text-base leading-relaxed space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight border-b border-slate-100 pb-3">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight border-b border-slate-100 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="font-display text-base font-bold text-slate-900 mt-6 mb-2">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-base text-slate-700 leading-relaxed mb-5 font-normal">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2.5 my-5 text-base text-slate-700 leading-relaxed">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2.5 my-5 text-base text-slate-700 leading-relaxed">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-slate-700 leading-relaxed pl-1">
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-slate-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-slate-800">{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-orange-500 bg-orange-50/50 rounded-r-2xl py-3.5 px-5 my-6 text-slate-700 italic">
                {children}
              </blockquote>
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className && typeof children === 'string' && !children.includes('\n');
              if (isInline) {
                return (
                  <code className="bg-slate-100 text-orange-600 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm p-4 rounded-2xl overflow-x-auto my-6 border border-slate-800 shadow-inner">
                  <code>{children}</code>
                </pre>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs tracking-wider">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3.5 font-bold text-slate-800 border-b border-slate-200">
                {children}
              </th>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-slate-100 bg-white">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-slate-50/60 transition-colors">
                {children}
              </tr>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3.5 text-slate-700">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 underline font-medium"
              >
                {children}
              </a>
            ),
            hr: () => <hr className="my-8 border-slate-200" />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Author Box Profile */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          loading="lazy"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover shadow-sm shrink-0 border-2 border-white"
        />
        <div className="text-center sm:text-left">
          <h4 className="font-display font-bold text-slate-900 text-base mb-1">
            Escrito por {post.author.name}
          </h4>
          <p className="text-xs font-bold text-blue-700 mb-2">
            {post.author.role}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Especialista comprometido com soluções de ponta. Atua no desenvolvimento de sistemas web de alta escalabilidade, segurança cibernética e otimização para mecanismos de busca da AGÊNCIA OZ em Canoas.
          </p>
        </div>
      </div>

    </article>
  );
}
