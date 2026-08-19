'use client';

import { useState } from 'react';
import { Building2, Clock, Copy, Check, MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type BranchItem = {
  id: string;
  badge: string;
  name: string;
  fullName: string;
  address: string;
  hours: string;
  phones: string[];
  email: string;
  mapQuery: string;
  yandexQuery: string;
  gisQuery: string;
};

export function BranchCards({ branches }: { branches: BranchItem[] }) {
  const t = useTranslations('contact');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="branches-grid">
      {branches.map((branch, index) => {
        const isCopied = copiedId === branch.id;

        return (
          <article
            className="branch-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            key={branch.id}
          >
            {/* Top Badges & Header */}
            <div className="branch-card-top">
              <div className="branch-card-badge-row">
                <span className="branch-number-badge">{branch.badge}</span>
                <span className="branch-hours-badge">
                  <Clock size={13} strokeWidth={2.4} />
                  {branch.hours}
                </span>
              </div>

              <div className="branch-card-heading">
                <div className="branch-avatar">
                  <Building2 size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="branch-title">{branch.name}</h3>
                  <p className="branch-subtitle">{branch.fullName}</p>
                </div>
              </div>
            </div>

            {/* Address Row with Copy Button */}
            <div className="branch-address-box">
              <div className="branch-address-content">
                <MapPin className="branch-address-icon" size={17} strokeWidth={2.2} />
                <span className="branch-address-text">{branch.address}</span>
              </div>
              <button
                type="button"
                className={`branch-copy-btn${isCopied ? ' copied' : ''}`}
                onClick={() => handleCopy(branch.id, branch.address)}
                title={isCopied ? t('addressCopied') : t('copyAddress')}
                aria-label={isCopied ? t('addressCopied') : t('copyAddress')}
              >
                {isCopied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.2} />}
                <span>{isCopied ? t('addressCopied') : t('copyAddress')}</span>
              </button>
            </div>

            {/* Contact Details (Phones & Email) */}
            <div className="branch-details-grid">
              <div className="branch-phones-group">
                <span className="branch-group-label">{t('phonesLabel')}</span>
                <div className="branch-phone-chips">
                  {branch.phones.map((phone) => (
                    <a
                      className="branch-phone-chip"
                      href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                      key={phone}
                    >
                      <Phone size={13} strokeWidth={2.4} />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="branch-email-group">
                <span className="branch-group-label">{t('emailLabel')}</span>
                <a className="branch-email-chip" href={`mailto:${branch.email}`}>
                  <Mail size={13} strokeWidth={2.4} />
                  <span>{branch.email}</span>
                </a>
              </div>
            </div>

            {/* Navigator Links */}
            <div className="branch-navigators-group">
              <span className="branch-nav-title">
                <Navigation size={13} strokeWidth={2.4} />
                {t('openInMapTitle')}
              </span>
              <div className="branch-navigators-row">
                <a
                  className="branch-nav-btn nav-yandex"
                  href={`https://yandex.uz/maps/?text=${encodeURIComponent(branch.yandexQuery)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="nav-brand-dot yandex" />
                  <span>Yandex Maps</span>
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>

                <a
                  className="branch-nav-btn nav-2gis"
                  href={`https://2gis.uz/tashkent/search/${encodeURIComponent(branch.gisQuery)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="nav-brand-dot dgis" />
                  <span>2GIS</span>
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>

                <a
                  className="branch-nav-btn nav-google"
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.mapQuery)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="nav-brand-dot google" />
                  <span>Google Maps</span>
                  <ExternalLink size={12} strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
