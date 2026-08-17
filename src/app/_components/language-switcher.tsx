'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Locale } from '@/i18n/routing';

const languages: { code: Locale; label: string; short: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
  { code: 'uz', label: "O'zbekcha", short: 'UZ', flag: 'UZ' },
  { code: 'en', label: 'English', short: 'EN', flag: 'EN' },
];

export function LanguageSwitcher({
  variant = 'dropdown',
  className = '',
  onSelect,
}: {
  variant?: 'dropdown' | 'inline';
  className?: string;
  onSelect?: () => void;
}) {
  const t = useTranslations('common.header');
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      onSelect?.();
      return;
    }

    const query = typeof window !== 'undefined' ? window.location.search : '';
    const target = query ? `${pathname}${query}` : pathname;

    // Use router.replace with the new locale
    router.replace(target, { locale });
    setIsOpen(false);
    onSelect?.();
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  if (variant === 'inline') {
    return (
      <div className={`lang-switcher-inline ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`lang-btn-inline${currentLocale === lang.code ? ' active' : ''}`}
            onClick={() => handleSwitch(lang.code)}
            aria-label={`${t('chooseLanguage')}: ${lang.label}`}
          >
            <span className="lang-text">{lang.short}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`lang-switcher-dropdown ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="lang-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('chooseLanguage')}
      >
        <Globe size={16} className="lang-globe-icon" />
        <span className="lang-current-label">{currentLang.short}</span>
        <ChevronDown size={14} className={`lang-chevron${isOpen ? ' rotated' : ''}`} />
      </button>

      {isOpen && (
        <ul className="lang-menu" role="listbox">
          {languages.map((lang) => {
            const isSelected = currentLocale === lang.code;
            return (
              <li key={lang.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`lang-menu-item${isSelected ? ' active' : ''}`}
                  onClick={() => handleSwitch(lang.code)}
                >
                  <span className="lang-full-label">{lang.label}</span>
                  <span className="lang-short-badge">{lang.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
