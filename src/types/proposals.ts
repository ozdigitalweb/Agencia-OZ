export interface ProposalPackage {
  id: string; // e.g. "solucao_360", "landing_page", "site_institucional"
  title: string;
  category: string;
  setupPrice: number;
  monthlyPrice: number;
  deliveryDays: string;
  paymentTerms: string;
  badge?: string;
  popular?: boolean;
  deliverables: string[];
  notes?: string;
  active: boolean;
  order: number;
}

export interface ProposalGeneralSettings {
  defaultWhatsApp: string;
  defaultDiscountPixPercent: number; // e.g. 10
  proposalValidityDays: number; // e.g. 7
  companyLegalName: string;
  defaultFooterNotes: string;
}

export interface ProposalConfig {
  packages: ProposalPackage[];
  generalSettings: ProposalGeneralSettings;
  updatedAt: string;
}

export interface GeneratedProposalData {
  proposalId: string;
  serviceType: string;
  title: string;
  clientCompany: string;
  clientContact: string;
  clientPhone?: string;
  clientCity?: string;
  setupPrice: number;
  setupPriceFormatted: string;
  monthlyPrice: number;
  monthlyPriceFormatted: string;
  deliveryDays: string;
  paymentTerms: string;
  deliverables: string[];
  notes?: string;
  validUntil: string;
  directWhatsAppLink: string;
  status: 'draft' | 'generated' | 'sent' | 'accepted' | 'declined';
  createdAt: string;
}
