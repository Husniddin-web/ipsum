'use client';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dna,
  FlaskConical,
  LayoutGrid,
  LayoutList,
  Microscope,
  Plus,
  Search,
  SlidersHorizontal,
  TestTube,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePublicCatalog, usePublicServices } from '@/lib/api/public-hooks';
import { useSelectionStore } from '@/lib/store/selection-store';
import { AppointmentDialog } from '../appointment-dialog';

const PAGE_SIZE = 20;

/* ── Skeleton ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="svc-skeleton">
      <div className="svc-skeleton-icon" />
      <div className="svc-skeleton-body">
        <div className="svc-skeleton-line svc-skeleton-code" />
        <div className="svc-skeleton-line svc-skeleton-title" />
        <div className="svc-skeleton-line svc-skeleton-meta" />
      </div>
      <div className="svc-skeleton-btn" />
    </div>
  );
}

/* ── Pagination ───────────────────────────────────────────── */
function Pagination({
  page,
  pages,
  onChange,
  infoText,
  prevAria,
  nextAria,
  pageAria,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
  infoText: string;
  prevAria: string;
  nextAria: string;
  pageAria: (p: number) => string;
}) {
  if (pages <= 1) return null;

  const getPages = () => {
    const result: (number | '...')[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) result.push(i);
    } else {
      result.push(1);
      if (page > 3) result.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(pages - 1, page + 1);
      for (let i = start; i <= end; i++) result.push(i);
      if (page < pages - 2) result.push('...');
      result.push(pages);
    }
    return result;
  };

  return (
    <div className="svc-pagination">
      <span className="svc-pagination-info">{infoText}</span>
      <div className="svc-pagination-controls">
        <button
          className="svc-page-btn svc-page-nav"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label={prevAria}
        >
          <ChevronLeft size={16} />
        </button>

        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="svc-page-ellipsis">…</span>
          ) : (
            <button
              key={p}
              className={`svc-page-btn${page === p ? ' active' : ''}`}
              onClick={() => onChange(p)}
              aria-label={pageAria(p)}
              aria-current={page === p ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}

        <button
          className="svc-page-btn svc-page-nav"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          aria-label={nextAria}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export function ServiceCatalog() {
  const t = useTranslations('services');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams?.get('search') || '';
  const directionId = searchParams?.get('directionId') || '';
  const categoryId = searchParams?.get('categoryId') || '';
  const page = Number(searchParams?.get('page') || '1');

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const selection = useSelectionStore();

  const setUrlParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const serviceParams = useMemo(
    () => ({
      limit: PAGE_SIZE,
      page,
      search: query || undefined,
      directionId: categoryId ? undefined : directionId || undefined,
      categoryId: categoryId || undefined,
    }),
    [categoryId, directionId, page, query],
  );

  const catalogQuery = usePublicCatalog();
  const servicesQuery = usePublicServices(serviceParams);
  const directions = useMemo(() => catalogQuery.data ?? [], [catalogQuery.data]);
  const services = servicesQuery.data?.items ?? [];
  const totalServices = servicesQuery.data?.total ?? 0;
  const totalPages = servicesQuery.data?.pages ?? 1;

  const visibleDirections = useMemo(
    () =>
      directions
        .map((direction) => ({
          ...direction,
          categories: direction.categories.filter((c) => (c.serviceCount ?? 0) > 0),
        }))
        .filter((d) => d.categories.length > 0),
    [directions],
  );

  const categories = useMemo(
    () =>
      directionId
        ? (visibleDirections.find((d) => d._id === directionId)?.categories ?? [])
        : visibleDirections.flatMap((d) => d.categories),
    [directionId, visibleDirections],
  );

  const activeCategory = categories.find((c) => c._id === categoryId);
  const activeDirection = visibleDirections.find((d) => d._id === directionId);
  const hasActiveFilter = !!(directionId || categoryId || query);

  const clearFilters = () => {
    setUrlParams({ directionId: undefined, categoryId: undefined, search: undefined, page: undefined });
    setFiltersOpen(false);
  };

  const handlePageChange = (p: number) => {
    setUrlParams({ page: p > 1 ? String(p) : undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalServices);

  return (
    <div className="svc-shell">
      {/* ── Search & Toggle Bar ─────────────────────── */}
      <div className="svc-toolbar">
        <div className="svc-search">
          <Search size={18} className="svc-search-icon" />
          <input
            value={query}
            onChange={(e) => {
              setUrlParams({ search: e.target.value || undefined, page: undefined });
            }}
            placeholder={t('searchPlaceholder')}
          />
          {query && (
            <button
              className="svc-search-clear"
              onClick={() => {
                setUrlParams({ search: undefined, page: undefined });
              }}
              aria-label={t('clearSearch')}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="svc-toolbar-right">
          <div className="svc-view-toggle">
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              title="List view"
            >
              <LayoutList size={17} />
            </button>
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid size={17} />
            </button>
          </div>
          <button
            id="svc-filter-btn"
            className={`svc-filter-btn${hasActiveFilter ? ' has-filter' : ''}`}
            onClick={() => setFiltersOpen(true)}
            aria-label={t('filtersBtn')}
          >
            <SlidersHorizontal size={18} />
            <span>{t('filtersBtn')}</span>
            {hasActiveFilter && <span className="svc-filter-dot" />}
          </button>
        </div>
      </div>

      {/* ── Active Filter Chips ─────────────────────── */}
      {hasActiveFilter && (
        <div className="svc-chips">
          {activeDirection && !activeCategory && (
            <span className="svc-chip">
              {activeDirection.name}
              <button onClick={() => setUrlParams({ directionId: undefined, page: undefined })} aria-label={t('removeFilter')}>
                <X size={12} />
              </button>
            </span>
          )}
          {activeCategory && (
            <span className="svc-chip">
              {activeCategory.name}
              <button onClick={() => setUrlParams({ categoryId: undefined, page: undefined })} aria-label={t('removeFilter')}>
                <X size={12} />
              </button>
            </span>
          )}
          {query && (
            <span className="svc-chip svc-chip--search">
              «{query}»
              <button
                onClick={() => {
                  setUrlParams({ search: undefined, page: undefined });
                }}
                aria-label={t('clearSearch')}
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button className="svc-chip-clear" onClick={clearFilters}>
            {t('resetAll')}
          </button>
        </div>
      )}

      <div className="svc-layout">
        {/* ── Backdrop ────────────────────────────────── */}
        <div
          className={`svc-backdrop${filtersOpen ? ' open' : ''}`}
          onClick={() => setFiltersOpen(false)}
        />

        {/* ── Sidebar ─────────────────────────────────── */}
        <aside className={`svc-sidebar${filtersOpen ? ' open' : ''}`}>
          <div className="svc-sidebar-head">
            <div className="svc-sidebar-title">
              <SlidersHorizontal size={16} />
              <strong>{t('sidebarTitle')}</strong>
            </div>
            <button
              className="svc-sidebar-close"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="svc-sidebar-nav">
            <button
              className={`svc-dir-btn${!directionId ? ' active' : ''}`}
              onClick={clearFilters}
              data-tooltip={t('allDirections')}
            >
              <span className="svc-dir-icon">
                <Microscope size={14} />
              </span>
              <span className="svc-dir-label">{t('allDirections')}</span>
            </button>

            {visibleDirections.map((direction) => {
              const isActive = directionId === direction._id;
              const totalCount = direction.categories.length;
              return (
                <div key={direction._id} className="svc-dir-group">
                  <button
                    className={`svc-dir-btn${isActive ? ' active' : ''}`}
                    data-tooltip={direction.name}
                    onClick={() => {
                      setUrlParams({
                        directionId: direction._id,
                        categoryId: undefined,
                        page: undefined,
                      });
                    }}
                  >
                    <span className="svc-dir-icon">
                      <FlaskConical size={14} />
                    </span>
                    <span className="svc-dir-label">{direction.name}</span>
                    <span className="svc-dir-count">{totalCount}</span>
                    <ChevronRight
                      size={14}
                      className={`svc-dir-chevron${isActive ? ' rotated' : ''}`}
                    />
                  </button>

                  {isActive && (
                    <div className="svc-cat-list">
                      {direction.categories.map((category) => (
                        <button
                          key={category._id}
                          className={`svc-cat-btn${categoryId === category._id ? ' active' : ''}`}
                          onClick={() => {
                            setUrlParams({
                              directionId: direction._id,
                              categoryId: category._id,
                              page: undefined,
                            });
                            setFiltersOpen(false);
                          }}
                        >
                          <span className="svc-cat-dot" />
                          <span className="svc-cat-label">{category.name}</span>
                          <span className="svc-cat-count">{category.serviceCount}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Results ─────────────────────────────────── */}
        <section className="svc-results">
          <div className="svc-results-head">
            <div>
              <p className="svc-eyebrow">{t('catalogEyebrow')}</p>
              <h2 className="svc-results-title">
                {categoryId
                  ? categories.find((c) => c._id === categoryId)?.name
                  : directionId
                    ? (activeDirection?.name ?? t('fallbackResultsTitle'))
                    : t('defaultResultsTitle')}
              </h2>
            </div>
            {!servicesQuery.isLoading && (
              <span className="svc-results-count">
                {t('totalCountUnit', { count: totalServices })}
              </span>
            )}
          </div>

          {/* Cards */}
          {servicesQuery.isLoading ? (
            <div className={`svc-cards svc-cards--${viewMode}`}>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : servicesQuery.isError ? (
            <div className="svc-empty svc-empty--error">
              <FlaskConical size={40} />
              <p>{t('errorText')}</p>
              <button className="svc-retry" onClick={() => servicesQuery.refetch()}>
                {t('retry')}
              </button>
            </div>
          ) : services.length ? (
            <>
              <div className={`svc-cards svc-cards--${viewMode}`}>
                {services.map((service) => {
                  const added = selection.has(service._id);
                  return (
                    <article
                      key={service._id}
                      className={`svc-card${added ? ' svc-card--added' : ''}`}
                    >
                      <div className="svc-card-icon">
                        <FlaskConical size={20} />
                      </div>
                      <div className="svc-card-body">
                        {service.code && (
                          <span className="svc-card-code">{service.code}</span>
                        )}
                        <h3 className="svc-card-name">{service.name}</h3>
                        <div className="svc-card-meta">
                          {service.biomaterial && (
                            <span className="svc-meta-tag" title="Biomaterial">
                              <TestTube size={12} />
                              {service.biomaterial}
                            </span>
                          )}
                          {service.method && (
                            <span className="svc-meta-tag" title="Method">
                              <Dna size={12} />
                              {service.method}
                            </span>
                          )}
                          {service.duration && (
                            <span className="svc-meta-tag svc-meta-tag--time" title="Duration">
                              <Clock size={12} />
                              {service.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className={`svc-card-btn${added ? ' added' : ''}`}
                        onClick={() => selection.toggle(service)}
                        aria-label={added ? t('removeAria') : t('addAria')}
                      >
                        {added ? (
                          <Check size={16} strokeWidth={2.5} />
                        ) : (
                          <Plus size={16} strokeWidth={2.5} />
                        )}
                        <span>{added ? t('added') : t('add')}</span>
                      </button>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                pages={totalPages}
                onChange={handlePageChange}
                infoText={t('paginationInfo', { from, to, total: totalServices })}
                prevAria={t('prevPage')}
                nextAria={t('nextPage')}
                pageAria={(p) => t('pageAria', { page: p })}
              />
            </>
          ) : (
            <div className="svc-empty">
              <Search size={40} />
              <strong>{t('emptyTitle')}</strong>
              <p>{t('emptyText')}</p>
              {hasActiveFilter && (
                <button className="svc-retry" onClick={clearFilters}>
                  {t('resetFilters')}
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      {/* ── Selection Bar ──────────────────────────────── */}
      {selection.items.length > 0 && (
        <div className="svc-selection-bar">
          <div className="svc-selection-info">
            <span className="svc-selection-badge">{selection.items.length}</span>
            <div>
              <strong>{t('selectedCount', { count: selection.items.length })}</strong>
              <span className="svc-selection-hint">{t('selectionHint')}</span>
            </div>
          </div>
          <div className="svc-selection-actions">
            <button className="svc-selection-clear" onClick={selection.clear}>
              <X size={14} />
              {t('selectionClear')}
            </button>
            <AppointmentDialog
              label={t('selectionApply')}
              icon="message"
              selectedServices={selection.items}
            />
          </div>
        </div>
      )}
    </div>
  );
}
