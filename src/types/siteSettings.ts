export interface SitePromoSettings {
  promoPopupEnabled: boolean;
  promoFloatingButtonEnabled: boolean;
  promoAutoOpenEnabled: boolean;
  promoAutoOpenDelay: number;
  promoButtonText?: string;
  promoButtonSubtext?: string;
  updatedAt?: string;
}

export const DEFAULT_PROMO_SETTINGS: SitePromoSettings = {
  promoPopupEnabled: true,
  promoFloatingButtonEnabled: true,
  promoAutoOpenEnabled: true,
  promoAutoOpenDelay: 1.5,
  promoButtonText: 'Ganhe 1 Site + E-mail Grátis!',
  promoButtonSubtext: 'Clique para participar',
  updatedAt: new Date().toISOString()
};
