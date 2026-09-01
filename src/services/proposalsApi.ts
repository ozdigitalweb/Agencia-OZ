import { ProposalConfig, ProposalPackage } from '../types/proposals';

const ADMIN_TOKEN_KEY = 'oz_admin_token';

function getAuthHeaders() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const proposalsApi = {
  // Get proposal packages and general configuration
  async getConfig(): Promise<ProposalConfig> {
    const res = await fetch('/api/proposals/config', {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao carregar configurações de propostas.');
    }
    return res.json();
  },

  // Save complete configuration or updates
  async updateConfig(config: Partial<ProposalConfig>): Promise<ProposalConfig> {
    const res = await fetch('/api/proposals/config', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(config)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao salvar configurações de propostas.');
    }
    return res.json();
  },

  // Add new proposal package
  async createPackage(pkg: Omit<ProposalPackage, 'order'>): Promise<ProposalPackage> {
    const res = await fetch('/api/proposals/packages', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(pkg)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao criar pacote de proposta.');
    }
    return res.json();
  },

  // Update a single package
  async updatePackage(id: string, pkg: Partial<ProposalPackage>): Promise<ProposalPackage> {
    const res = await fetch(`/api/proposals/packages/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(pkg)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao atualizar pacote de proposta.');
    }
    return res.json();
  },

  // Delete a package
  async deletePackage(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/proposals/packages/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao excluir pacote de proposta.');
    }
    return res.json();
  },

  // Reset to default factory proposal packages and settings
  async resetDefaults(): Promise<ProposalConfig> {
    const res = await fetch('/api/proposals/reset-defaults', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao restaurar tabela padrão de propostas.');
    }
    return res.json();
  }
};
