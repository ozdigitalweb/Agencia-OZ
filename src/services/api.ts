import { BlogPost, mockPosts } from '../data/mockPosts';

export interface PostPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  status?: 'published' | 'draft';
  date?: string;
}

export interface StoredPost extends BlogPost {
  status?: 'published' | 'draft';
}

const TOKEN_KEY = 'oz_admin_token';

export const blogApi = {
  // Auth helpers
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async login(username: string, password: string) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Falha no login');
    }

    const data = await res.json();
    this.setToken(data.token);
    return data;
  },

  async verifyAuth() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        this.removeToken();
        return null;
      }
      return await res.json();
    } catch {
      return null;
    }
  },

  // Fetch all posts (or filtered)
  async getPosts(options: { status?: 'published' | 'draft' | 'all'; category?: string; search?: string } = {}): Promise<StoredPost[]> {
    try {
      const params = new URLSearchParams();
      if (options.status) params.append('status', options.status);
      if (options.category) params.append('category', options.category);
      if (options.search) params.append('search', options.search);

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (!res.ok) throw new Error('Erro ao buscar postagens');

      const data = await res.json();
      return data.posts || [];
    } catch (err) {
      console.warn('API error, falling back to mockPosts:', err);
      return mockPosts.map(p => ({ ...p, status: 'published' as const }));
    }
  },

  // Fetch single post
  async getPost(slugOrId: string): Promise<StoredPost | null> {
    try {
      const res = await fetch(`/api/posts/${slugOrId}`);
      if (!res.ok) throw new Error('Artigo não encontrado');
      return await res.json();
    } catch (err) {
      console.warn('API error fetching post, falling back to mockPosts:', err);
      const found = mockPosts.find(p => p.slug === slugOrId || p.id.toString() === slugOrId);
      return found ? { ...found, status: 'published' as const } : null;
    }
  },

  // Create post
  async createPost(payload: PostPayload): Promise<StoredPost> {
    const token = this.getToken();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Erro ao criar artigo');
    }

    return await res.json();
  },

  // Update post
  async updatePost(id: number, payload: Partial<PostPayload>): Promise<StoredPost> {
    const token = this.getToken();
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Erro ao atualizar artigo');
    }

    return await res.json();
  },

  // Delete post
  async deletePost(id: number): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Erro ao deletar artigo');
    }

    return true;
  }
};

export interface DbStatusResponse {
  connected: boolean;
  type: 'mysql' | 'json_fallback';
  host: string;
  port: number;
  database: string;
  user: string;
  latencyMs?: number;
  error?: string | null;
  tables: {
    posts: number;
    knowledge_items: number;
    conversations: number;
    agent_logs: number;
    proposals_config: number;
    site_settings: number;
  };
}

export const databaseApi = {
  async getStatus(): Promise<DbStatusResponse> {
    const res = await fetch('/api/database/status');
    if (!res.ok) {
      throw new Error('Falha ao obter status do banco de dados');
    }
    return await res.json();
  },

  async testConnection(config?: { host?: string; port?: number; user?: string; password?: string; database?: string }): Promise<{ success: boolean; message: string; latencyMs?: number }> {
    const res = await fetch('/api/database/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config || {})
    });
    return await res.json();
  },

  async migrateJsonToMysql(): Promise<{ success: boolean; message: string; migrated?: Record<string, number> }> {
    const token = blogApi.getToken();
    const res = await fetch('/api/database/migrate-json-to-mysql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return await res.json();
  }
};

