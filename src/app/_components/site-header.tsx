'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, Phone, X, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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

        {/* Desktop Navigation Menu */}
        <nav aria-label={t('header.mainNav')} className="desktop-nav-wrap">
          <div className="desktop-nav">
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
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

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
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu aria-hidden="true" size={22} strokeWidth={2.6} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        aria-hidden="true"
        className={`mobile-drawer-backdrop${isMenuOpen ? ' open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Offcanvas Drawer (Slides from Left) */}
      <aside
        aria-label="Mobile Navigation"
        className={`mobile-drawer${isMenuOpen ? ' open' : ''}`}
      >
        <div className="mobile-drawer-header">
          <Link
            aria-label="IPSUM Pathology home"
            className="drawer-logo-link"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt="IPSUM Pathology"
              className="drawer-logo-image"
              height={38}
              src="/logo.png"
              width={140}
            />
          </Link>
          <button
            aria-label={t('header.closeMenu')}
            className="drawer-close-btn"
            type="button"
            onClick={() => setIsMenuOpen(false)}
          >
            <X aria-hidden="true" size={20} strokeWidth={2.6} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          {navigationItems.map((item) => {
            const isHashLink = item.href.includes('#');
            const isActive =
              !isHashLink &&
              (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));

            return (
              <Link
                className={`drawer-nav-item${isActive ? ' active' : ''}`}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <a className="drawer-phone-link" href={contactInfo.phoneHref}>
            <Phone aria-hidden="true" size={17} strokeWidth={2.4} />
            <span>{contactInfo.phone}</span>
          </a>

          <div className="drawer-hours">
            <Clock aria-hidden="true" size={15} />
            <span>{contactInfo.hours}</span>
          </div>

          <AppointmentDialog
            className="drawer-callback-btn"
            icon="message"
            label={t('header.callback')}
            variant="primary"
          />
        </div>
      </aside>
    </header>
  );
}
