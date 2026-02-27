import { useLayoutEffect, useRef, useState, useMemo } from "react";
import HeroSection from "../sections/HeroSection";
import { Tag, CheckCircle, Key, ChevronDown, X, ArrowRight } from "lucide-react";
import { PropertyCard, type Property, type Category } from "../components/reusable/PropertyCard";
import { allProperties } from "../data/listingProperties";
import "./PropertiesPage.css";

// ─── Page ─────────────────────────────────────────────────────────────────────
const INITIAL_COUNT = 6;

export default function PropertiesPage() {
  const [catFilter, setCatFilter] = useState<"all" | Category>("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [bedsFilter, setBedsFilter] = useState("any");
  const [bathsFilter, setBathsFilter] = useState("any");
  const [showAll, setShowAll] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<any>(null);
  const isoKey = `${catFilter}-${priceFilter}-${bedsFilter}-${bathsFilter}-${showAll}`;

  // ── Filter Logic ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return allProperties.filter(p => {
      if (catFilter !== "all" && p.category !== catFilter) return false;

      if (priceFilter === "contact" && p.price !== 0) return false;
      if (priceFilter === "under500" && (p.price === 0 || p.price >= 500000)) return false;
      if (priceFilter === "500-800" && (p.price === 0 || p.price < 500000 || p.price > 800000)) return false;
      if (priceFilter === "800-1200" && (p.price === 0 || p.price < 800000 || p.price > 1200000)) return false;
      if (priceFilter === "over1200" && (p.price === 0 || p.price <= 1200000)) return false;

      if (bedsFilter === "land" && p.beds !== 0) return false;
      if (bedsFilter === "3" && p.beds < 3) return false;
      if (bedsFilter === "4" && p.beds < 4) return false;
      if (bedsFilter === "5" && p.beds < 5) return false;

      if (bathsFilter === "1" && p.baths < 1) return false;
      if (bathsFilter === "2" && p.baths < 2) return false;
      if (bathsFilter === "3" && p.baths < 3) return false;

      return true;
    });
  }, [catFilter, priceFilter, bedsFilter, bathsFilter]);

  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = !showAll && filtered.length > INITIAL_COUNT;

  const hasActiveFilters =
    catFilter !== "all" || priceFilter !== "all" ||
    bedsFilter !== "any" || bathsFilter !== "any";

  const clearFilters = () => {
    setCatFilter("all");
    setPriceFilter("all");
    setBedsFilter("any");
    setBathsFilter("any");
    setShowAll(false);
  };

  // ── Isotope ──────────────────────────────────────────────────────────────
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
          transitionDuration: "0.35s",
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
                className={`ap-pill${catFilter === val ? " active" : ""}`}
                onClick={() => { setCatFilter(val as "all" | Category); setShowAll(false); }}
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
                value={priceFilter}
                onChange={e => { setPriceFilter(e.target.value); setShowAll(false); }}
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
                value={bedsFilter}
                onChange={e => { setBedsFilter(e.target.value); setShowAll(false); }}
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
                value={bathsFilter}
                onChange={e => { setBathsFilter(e.target.value); setShowAll(false); }}
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
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
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
              <div key={isoKey} ref={gridRef} className="ap-grid">
                {displayed.map((p, i) => (
                  <div key={p.id} className="ap-card-wrap">
                    <PropertyCard property={p} cardIndex={i} />
                  </div>
                ))}
              </div>

              {/* View All / Show Less */}
              <div className="ap-view-all">
                {hasMore && (
                  <button className="ap-view-btn" onClick={() => setShowAll(true)}>
                    <span>View All {filtered.length} Properties</span>
                    <ArrowRight size={16} />
                  </button>
                )}
                {showAll && filtered.length > INITIAL_COUNT && (
                  <button className="ap-view-btn ap-view-btn--ghost" onClick={() => setShowAll(false)}>
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
