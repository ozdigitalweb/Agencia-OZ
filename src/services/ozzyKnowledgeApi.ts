export interface KnowledgeLink {
  label: string;
  url: string;
}

export interface OzzyKnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  active: boolean;
  suggestedLinks?: KnowledgeLink[];
  updatedAt: string;
}

export interface KnowledgePayload {
  title: string;
  category: string;
  content: string;
  tags: string[] | string;
  priority?: 'high' | 'medium' | 'low';
  active?: boolean;
  suggestedLinks?: KnowledgeLink[];
}

const TOKEN_KEY = 'oz_admin_token';

export const ozzyKnowledgeApi = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  async getAll(): Promise<OzzyKnowledgeItem[]> {
    const res = await fetch('/api/ozzy/knowledge');
    if (!res.ok) {
      throw new Error('Falha ao carregar a base de conhecimento do Ozzy.');
    }
    const data = await res.json();
    return data.items || [];
  },

  async create(payload: KnowledgePayload): Promise<OzzyKnowledgeItem> {
    const token = this.getToken();
    const res = await fetch('/api/ozzy/knowledge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao criar item na base de conhecimento.');
    }

    return await res.json();
  },

  async update(id: string, payload: Partial<KnowledgePayload>): Promise<OzzyKnowledgeItem> {
    const token = this.getToken();
    const res = await fetch(`/api/ozzy/knowledge/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao atualizar item de conhecimento.');
    }

    return await res.json();
  },

  async delete(id: string): Promise<void> {
    const token = this.getToken();
    const res = await fetch(`/api/ozzy/knowledge/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao excluir item de conhecimento.');
    }
  },

  async resetToDefaults(): Promise<OzzyKnowledgeItem[]> {
    const token = this.getToken();
    const res = await fetch('/api/ozzy/knowledge/reset', {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao restaurar base de conhecimento padrão.');
    }

    const data = await res.json();
    return data.items || [];
  },

  async testQuery(message: string): Promise<{ reply: string; source: string; suggestedActions?: any[] }> {
    const res = await fetch('/api/ozzy/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: [] })
    });

    if (!res.ok) {
      throw new Error('Falha ao testar pergunta com o Ozzy.');
    }

    return await res.json();
  }
};
