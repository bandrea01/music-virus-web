type Role = 'fan' | 'artist' | 'venue' | 'admin';

export interface TabItem {
    id: string;
    label: string;
    icon?: string;
    panel: string;
}

export const roleTabs: Record<Role, TabItem[]> = {
    fan: [
        { id: 'explore', label: 'Esplora Eventi', panel: 'DashboardPanel' },
        { id: 'tickets', label: 'I Miei Biglietti', panel: 'EventsPanel' },
        { id: 'payments', label: 'I Miei Contributi', panel: 'PaymentsPanel' },
        { id: 'profile', label: 'Profilo', panel: 'ProfilePanel' },
    ],
    artist: [
        { id: 'dashboard', label: 'Dashboard', panel: 'DashboardPanel' },
        { id: 'campaigns', label: 'Le Mie Campagne', panel: 'EventsPanel' },
        { id: 'feedback', label: 'Feedback', panel: 'FeedbackPanel' },
        { id: 'profile', label: 'Profilo', panel: 'ProfilePanel' },
    ],
    venue: [
        { id: 'dashboard', label: 'Dashboard', panel: 'DashboardPanel' },
        { id: 'requests', label: 'Richieste Eventi', panel: 'RequestsPanel' },
        { id: 'fee', label: 'Pagamenti & Fee', panel: 'PaymentsPanel' },
        { id: 'profile', label: 'Profilo Venue', panel: 'ProfilePanel' },
    ],
    admin: [
        { id: 'overview', label: 'Pannello Generale', panel: 'DashboardPanel' },
        { id: 'artists', label: 'Gestione Artisti', panel: 'EventsPanel' },
        { id: 'reports', label: 'Segnalazioni', panel: 'ReportsPanel' },
        { id: 'stats', label: 'Report & Statistiche', panel: 'StatsPanel' },
    ],
};
