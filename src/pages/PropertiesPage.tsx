import { useLayoutEffect, useRef, useState, useMemo } from "react";
import HeroSection from "../sections/HeroSection";
import { Tag, CheckCircle, Key, ChevronDown, X, ArrowRight } from "lucide-react";
import { PropertyCard, type Property, type Category } from "../components/reusable/PropertyCard";
import { allProperties } from "../data/listingProperties";
import "./PropertiesPage.css";

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_COUNT = 6;

type Filters = {
  cat: "all" | Category;
  price: string;
  beds: string;
  baths: string;
  showAll: boolean;
};

const DEFAULT_FILTERS: Filters = {
  cat: "all", price: "all", beds: "any", baths: "any", showAll: false,
};

const applyFilters = (items: Property[], f: Filters) =>
  items.filter(p => {
    if (f.cat !== "all" && p.category !== f.cat) return false;
    if (f.price === "contact" && p.price !== 0) return false;
    if (f.price === "under500" && (p.price === 0 || p.price >= 500000)) return false;
    if (f.price === "500-800" && (p.price === 0 || p.price < 500000 || p.price > 800000)) return false;
    if (f.price === "800-1200" && (p.price === 0 || p.price < 800000 || p.price > 1200000)) return false;
    if (f.price === "over1200" && (p.price === 0 || p.price <= 1200000)) return false;
    if (f.beds === "land" && p.beds !== 0) return false;
    if (f.beds === "3" && p.beds < 3) return false;
    if (f.beds === "4" && p.beds < 4) return false;
    if (f.beds === "5" && p.beds < 5) return false;
    if (f.baths === "1" && p.baths < 1) return false;
    if (f.baths === "2" && p.baths < 2) return false;
    if (f.baths === "3" && p.baths < 3) return false;
    return true;
  });

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PropertiesPage() {
  // activeFilters drives UI controls (immediate feedback)
  // displayedFilters drives the grid (lags 280ms behind for exit animation)
  const [activeFilters, setActiveFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [displayedFilters, setDisplayedFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [isExiting, setIsExiting] = useState(false);

  const pendingRef = useRef<Filters>(DEFAULT_FILTERS);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<any>(null);

  // ── Filter Change Handler ────────────────────────────────────────────────
  const changeFilters = (patch: Partial<Filters>) => {
    const next = { ...pendingRef.current, ...patch };
    pendingRef.current = next;
    setActiveFilters({ ...next });
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setIsExiting(true);
    exitTimerRef.current = setTimeout(() => {
      setDisplayedFilters({ ...next });
      setIsExiting(false);
    }, 280);
  };

  const clearFilters = () => {
    pendingRef.current = { ...DEFAULT_FILTERS };
    setActiveFilters({ ...DEFAULT_FILTERS });
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    setIsExiting(true);
    exitTimerRef.current = setTimeout(() => {
      setDisplayedFilters({ ...DEFAULT_FILTERS });
      setIsExiting(false);
    }, 280);
  };

  // ── Data ─────────────────────────────────────────────────────────────────
  // filtered/displayed are from displayedFilters (what the grid actually shows)
  const filtered = useMemo(() => applyFilters(allProperties, displayedFilters), [displayedFilters]);
  // activeFiltered is for the result count badge (updates immediately)
  const activeFiltered = useMemo(() => applyFilters(allProperties, activeFilters), [activeFilters]);

  const displayed = displayedFilters.showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = !displayedFilters.showAll && filtered.length > INITIAL_COUNT;

  const hasActiveFilters =
    activeFilters.cat !== "all" || activeFilters.price !== "all" ||
    activeFilters.beds !== "any" || activeFilters.baths !== "any";

  // isoKey drives Isotope reinit — changes only after animation completes
  const isoKey = `${displayedFilters.cat}-${displayedFilters.price}-${displayedFilters.beds}-${displayedFilters.baths}-${displayedFilters.showAll}`;

  // ── Isotope ──────────────────────────────────────────────────────────────
  // transitionDuration:0 — CSS animations handle all visual transitions
  useLayoutEffect(() => {
    if (!gridRef.current || displayed.length === 0) return;
    let iso: any = null;
    const timer = setTimeout(() => {
      if (!gridRef.current) return;
      import("isotope-layout").then(({ default: Isotope }) => {
        if (!gridRef.current) return;
        iso = new Isotope(gridRef.current, {
          itemSelector: ".ap-card-wrap",
          layoutMode: "fitRows",
          transitionDuration: 0,
        });
        isoRef.current = iso;
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      iso?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoKey]);

  return (
    <div className="ap-page">
      <HeroSection
        ready={true}
        showVideo={false}
        bgImage="images/hero-rpg-brisbane.jpg"
        titleLine1={<>Our <span className="rg-gold">Premium</span></>}
        titleLine2={<><span className="rg-amber">Properties</span></>}
        subtitle="Browse our curated portfolio of for-sale, sold and rental properties across South-East Queensland."
        showCta={false}
      />

      {/* ── Filter Bar ─────────────────────────────────────────────────── */}
      <div className="ap-filters">
        <div className="ap-filters__inner">

          {/* Category pills */}
          <div className="ap-filter-group ap-filter-group--pills">
            {[
              { val: "all", label: "All Properties" },
              { val: "for-sale", label: "For Sale", icon: <Tag size={14} /> },
              { val: "sold", label: "Sold", icon: <CheckCircle size={14} /> },
              { val: "for-rent", label: "For Rent", icon: <Key size={14} /> },
            ].map(({ val, label, icon }) => (
              <button
                key={val}
                className={`ap-pill${activeFilters.cat === val ? " active" : ""}`}
                onClick={() => changeFilters({ cat: val as "all" | Category, showAll: false })}
              >
                {icon}{label}
              </button>
            ))}
          </div>

          {/* Dropdowns row */}
          <div className="ap-filter-group ap-filter-group--dropdowns">
            {/* Price */}
            <div className="ap-select-wrap">
              <select
                className="ap-select"
                value={activeFilters.price}
                onChange={e => changeFilters({ price: e.target.value, showAll: false })}
              >
                <option value="all">Any Price</option>
                <option value="contact">Contact Agent</option>
                <option value="under500">Under $500k</option>
                <option value="500-800">$500k – $800k</option>
                <option value="800-1200">$800k – $1.2M</option>
                <option value="over1200">Over $1.2M</option>
              </select>
              <ChevronDown size={14} className="ap-select-icon" />
            </div>

            {/* Bedrooms */}
            <div className="ap-select-wrap">
              <select
                className="ap-select"
                value={activeFilters.beds}
                onChange={e => changeFilters({ beds: e.target.value, showAll: false })}
              >
                <option value="any">Any Beds</option>
                <option value="land">Land / No Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
              <ChevronDown size={14} className="ap-select-icon" />
            </div>

            {/* Bathrooms */}
            <div className="ap-select-wrap">
              <select
                className="ap-select"
                value={activeFilters.baths}
                onChange={e => changeFilters({ baths: e.target.value, showAll: false })}
              >
                <option value="any">Any Baths</option>
                <option value="1">1+ Bathrooms</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
              </select>
              <ChevronDown size={14} className="ap-select-icon" />
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button className="ap-clear-btn" onClick={clearFilters}>
                <X size={14} />Clear
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="ap-result-count">
            {activeFiltered.length} {activeFiltered.length === 1 ? "property" : "properties"} found
          </p>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <div className="ap-grid-section">
        <div className="ap-grid-container">
          {filtered.length === 0 ? (
            <div className="ap-empty">
              <p>No properties match your filters.</p>
              <button className="ap-clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div
                key={isoKey}
                ref={gridRef}
                className={`ap-grid ${isExiting ? "grid-exiting" : "grid-entering"}`}
              >
                {displayed.map((p, i) => (
                  <div
                    key={p.id}
                    className="ap-card-wrap"
                    style={{ "--ap-delay": `${i * 0.06}s` } as React.CSSProperties}
                  >
                    <PropertyCard property={p} cardIndex={i} />
                  </div>
                ))}
              </div>

              {/* View All / Show Less */}
              <div className="ap-view-all">
                {hasMore && (
                  <button className="ap-view-btn" onClick={() => changeFilters({ showAll: true })}>
                    <span>View All {filtered.length} Properties</span>
                    <ArrowRight size={16} />
                  </button>
                )}
                {displayedFilters.showAll && filtered.length > INITIAL_COUNT && (
                  <button className="ap-view-btn ap-view-btn--ghost" onClick={() => changeFilters({ showAll: false })}>
                    Show Less
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
