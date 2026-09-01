import { SitePromoSettings, DEFAULT_PROMO_SETTINGS } from '../types/siteSettings';

const SETTINGS_STORAGE_KEY = 'oz_site_promo_settings_v1';
const SETTINGS_EVENT_NAME = 'oz-promo-settings-changed';

export const siteSettingsApi = {
  // Get cached settings immediately or return defaults
  getCachedSettings(): SitePromoSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROMO_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Error reading promo settings from localStorage:', e);
    }
    return DEFAULT_PROMO_SETTINGS;
  },

  // Fetch latest settings from server with local cache fallback
  async getSettings(): Promise<SitePromoSettings> {
    try {
      const res = await fetch('/api/site-settings');
      if (res.ok) {
        const data = await res.json();
        const merged = { ...DEFAULT_PROMO_SETTINGS, ...data };
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch (err) {
      console.warn('Could not fetch settings from API, using cached fallback:', err);
    }
    return this.getCachedSettings();
  },

  // Update settings on server and locally
  async updateSettings(partial: Partial<SitePromoSettings>): Promise<SitePromoSettings> {
    const current = this.getCachedSettings();
    const updated: SitePromoSettings = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString()
    };

    // Update local cache immediately
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
    this.broadcastChange(updated);

    // Sync with backend API
    try {
      const token = localStorage.getItem('oz_admin_token');
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        const serverData = await res.json();
        const finalData = { ...updated, ...serverData };
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(finalData));
        this.broadcastChange(finalData);
        return finalData;
      }
    } catch (err) {
      console.warn('Failed to sync settings with server, cached locally:', err);
    }

    return updated;
  },

  // Broadcast change event
  broadcastChange(settings: SitePromoSettings) {
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT_NAME, { detail: settings }));
  },

  // Subscribe to real-time changes
  subscribe(callback: (settings: SitePromoSettings) => void) {
    const handler = (event: Event) => {
      const customEv = event as CustomEvent<SitePromoSettings>;
      if (customEv.detail) {
        callback(customEv.detail);
      }
    };
    window.addEventListener(SETTINGS_EVENT_NAME, handler);
    return () => {
      window.removeEventListener(SETTINGS_EVENT_NAME, handler);
    };
  }
};
