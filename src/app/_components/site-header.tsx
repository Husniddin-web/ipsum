'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { contactInfo, navigation } from '../_data/content';
import { AppointmentDialog } from './appointment-dialog';

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-bar">
          <Link
            aria-label="IPSUM Pathology home"
            className="logo-link"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt="IPSUM Pathology"
              className="logo-image"
              height={48}
              priority
              src="/logo.png"
              width={190}
            />
          </Link>

          <div className="header-actions">
            <a className="phone-link" href={contactInfo.phoneHref}>
              <Phone aria-hidden="true" size={18} strokeWidth={2.4} />
              {contactInfo.phone}
            </a>
            <AppointmentDialog
              className="header-callback"
              icon="message"
              label="Вам перезвонить?"
              variant="ghost"
            />
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
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

        <div className={`header-menu${isMenuOpen ? ' open' : ''}`}>
          <nav aria-label="Основная навигация" className="desktop-nav">
            {navigation.map((item) => {
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
      </div>
    </header>
  );
}
