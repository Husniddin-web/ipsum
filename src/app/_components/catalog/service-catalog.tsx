'use client';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dna,
  Filter,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  total,
  limit,
  onChange,
}: {
  page: number;
  pages: number;
  total: number;
  limit: number;
  onChange: (p: number) => void;
}) {
  if (pages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Build page number list with ellipsis
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
      <span className="svc-pagination-info">
        {from}–{to} из {total}
      </span>
      <div className="svc-pagination-controls">
        <button
          className="svc-page-btn svc-page-nav"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Предыдущая страница"
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
              aria-label={`Страница ${p}`}
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
          aria-label="Следующая страница"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export function ServiceCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('search') || '');
  const [directionId, setDirectionId] = useState(() => searchParams.get('directionId') || '');
  const [categoryId, setCategoryId] = useState(() => searchParams.get('categoryId') || '');
  const [page, setPage] = useState(() => Number(searchParams.get('page') || '1'));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const selection = useSelectionStore();

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, directionId, categoryId]);

  const setUrlParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
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
    setDirectionId('');
    setCategoryId('');
    setPage(1);
    setUrlParams({ directionId: undefined, categoryId: undefined, page: undefined });
    setFiltersOpen(false);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    setUrlParams({ page: p > 1 ? String(p) : undefined });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="svc-shell">
      {/* ── Search & Toggle Bar ─────────────────────── */}
      <div className="svc-toolbar">
        <div className="svc-search">
          <Search size={18} className="svc-search-icon" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setUrlParams({ search: e.target.value || undefined, page: undefined });
            }}
            placeholder="Поиск по названию, коду или биоматериалу…"
          />
          {query && (
            <button
              className="svc-search-clear"
              onClick={() => {
                setQuery('');
                setUrlParams({ search: undefined, page: undefined });
              }}
              aria-label="Очистить поиск"
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
              aria-label="Список"
              title="Список"
            >
              <LayoutList size={17} />
            </button>
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Сетка"
              title="Сетка"
            >
              <LayoutGrid size={17} />
            </button>
          </div>
          <button
            id="svc-filter-btn"
            className={`svc-filter-btn${hasActiveFilter ? ' has-filter' : ''}`}
            onClick={() => setFiltersOpen(true)}
            aria-label="Открыть фильтры"
          >
            <SlidersHorizontal size={18} />
            <span>Фильтры</span>
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
              <button onClick={clearFilters} aria-label="Убрать фильтр">
                <X size={12} />
              </button>
            </span>
          )}
          {activeCategory && (
            <span className="svc-chip">
              {activeCategory.name}
              <button onClick={clearFilters} aria-label="Убрать фильтр">
                <X size={12} />
              </button>
            </span>
          )}
          {query && (
            <span className="svc-chip svc-chip--search">
              «{query}»
              <button
                onClick={() => {
                  setQuery('');
                  setUrlParams({ search: undefined, page: undefined });
                }}
                aria-label="Убрать поиск"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button className="svc-chip-clear" onClick={clearFilters}>
            Сбросить всё
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
              <strong>Направления</strong>
            </div>
            <button
              className="svc-sidebar-close"
              onClick={() => setFiltersOpen(false)}
              aria-label="Закрыть"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="svc-sidebar-nav">
            <button
              className={`svc-dir-btn${!directionId ? ' active' : ''}`}
              onClick={clearFilters}
            >
              <span className="svc-dir-icon">
                <Microscope size={14} />
              </span>
              <span className="svc-dir-label">Все направления</span>
            </button>

            {visibleDirections.map((direction) => {
              const isActive = directionId === direction._id;
              const totalCount = direction.categories.length;
              return (
                <div key={direction._id} className="svc-dir-group">
                  <button
                    className={`svc-dir-btn${isActive ? ' active' : ''}`}
                    onClick={() => {
                      setDirectionId(direction._id);
                      setCategoryId('');
                      setPage(1);
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
                            setDirectionId(direction._id);
                            setCategoryId(category._id);
                            setPage(1);
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
              <p className="svc-eyebrow">Лабораторный каталог</p>
              <h2 className="svc-results-title">
                {categoryId
                  ? categories.find((c) => c._id === categoryId)?.name
                  : directionId
                    ? (activeDirection?.name ?? 'Исследования')
                    : 'Все исследования'}
              </h2>
            </div>
            {!servicesQuery.isLoading && (
              <span className="svc-results-count">
                {totalServices}{' '}
                {totalServices === 1 ? 'услуга' : totalServices < 5 ? 'услуги' : 'услуг'}
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
              <p>Не удалось загрузить каталог.</p>
              <button className="svc-retry" onClick={() => servicesQuery.refetch()}>
                Попробовать снова
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
                            <span className="svc-meta-tag" title="Биоматериал">
                              <TestTube size={12} />
                              {service.biomaterial}
                            </span>
                          )}
                          {service.method && (
                            <span className="svc-meta-tag" title="Метод">
                              <Dna size={12} />
                              {service.method}
                            </span>
                          )}
                          {service.duration && (
                            <span className="svc-meta-tag svc-meta-tag--time" title="Срок">
                              <Clock size={12} />
                              {service.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className={`svc-card-btn${added ? ' added' : ''}`}
                        onClick={() => selection.toggle(service)}
                        aria-label={added ? 'Убрать из заявки' : 'Добавить в заявку'}
                      >
                        {added ? (
                          <Check size={16} strokeWidth={2.5} />
                        ) : (
                          <Plus size={16} strokeWidth={2.5} />
                        )}
                        <span>{added ? 'Добавлено' : 'Добавить'}</span>
                      </button>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                pages={totalPages}
                total={totalServices}
                limit={PAGE_SIZE}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <div className="svc-empty">
              <Search size={40} />
              <strong>Ничего не найдено</strong>
              <p>Попробуйте изменить запрос или сбросить фильтры</p>
              {hasActiveFilter && (
                <button className="svc-retry" onClick={clearFilters}>
                  Сбросить фильтры
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
              <strong>Выбрано услуг</strong>
              <span className="svc-selection-hint">Оператор уточнит стоимость</span>
            </div>
          </div>
          <div className="svc-selection-actions">
            <button className="svc-selection-clear" onClick={selection.clear}>
              <X size={14} />
              Очистить
            </button>
            <AppointmentDialog
              label="Оставить заявку"
              icon="message"
              selectedServices={selection.items}
            />
          </div>
        </div>
      )}
    </div>
  );
}
