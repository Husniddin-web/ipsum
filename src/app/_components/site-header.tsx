'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { contactInfo } from '../_data/content';
import { AppointmentDialog } from './appointment-dialog';
import { LanguageSwitcher } from './language-switcher';

export function SiteHeader() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.about'), href: '/about' },
    { label: t('navigation.education'), href: '/education' },
    { label: t('navigation.services'), href: '/services' },
    { label: t('navigation.contact'), href: '/contact' },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Logo */}
        <Link
          aria-label="IPSUM Pathology home"
          className="logo-link"
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            alt="IPSUM Pathology"
            className="logo-image"
            height={46}
            priority
            src="/logo.png"
            width={170}
          />
        </Link>

        {/* Navigation Menu */}
        <div className={`header-menu${isMenuOpen ? ' open' : ''}`}>
          <nav aria-label={t('header.mainNav')} className="desktop-nav">
            {navigationItems.map((item) => {
              const isHashLink = item.href.includes('#');
              const isActive =
                !isHashLink &&
                (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));

              return (
                <Link
                  className={isActive ? 'active' : undefined}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="header-actions">
          <a className="phone-link" href={contactInfo.phoneHref} title={contactInfo.phone}>
            <Phone aria-hidden="true" size={17} strokeWidth={2.4} />
            <span className="phone-text">{contactInfo.phone}</span>
          </a>
          <AppointmentDialog
            className="header-callback"
            icon="message"
            label={t('header.callback')}
            variant="ghost"
          />
          <LanguageSwitcher />
        </div>

        {/* Mobile / Tablet Controls */}
        <div className="header-mobile-controls">
          <LanguageSwitcher />
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={22} strokeWidth={2.6} />
            ) : (
              <Menu aria-hidden="true" size={22} strokeWidth={2.6} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
