import { useLayoutEffect, useRef, useState, useMemo } from "react";
import HeroSection from "../sections/HeroSection";
import { Tag, CheckCircle, Key, ChevronDown, X, ArrowRight } from "lucide-react";
import { PropertyCard, type Property, type Category } from "../components/reusable/PropertyCard";
import "./PropertiesPage.css";

// ─── All Property Data ────────────────────────────────────────────────────────
const allProperties: Property[] = [
  // ── For Sale (live listings from realestate.com.au) ─────────────────────
  {
    id: 101, slug: "south-maclean-land-999k", category: "for-sale",
    title: "Residential Land", location: "South Maclean, QLD",
    price: 999999,
    image: "https://i2.au.reastatic.net/500x300/c95c5dfb0139245920e64e438376008240e1af52aec15193efd6b887807712f3/image.jpg",
    beds: 0, baths: 0, sqft: 8000, garage: 0,
    features: ["Residential Land", "New Estate", "Prime Position"],
    badge: "For Sale", isNew: true, views: 87,
  },
  {
    id: 102, slug: "46-belhaven-ave-yarrabilba", category: "for-sale",
    title: "46 Belhaven Ave", location: "Yarrabilba, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/7b4d86b5af69ac84d16ee4940806551e518f727089b72069f985c1ddea7a0512/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "Yarrabilba Estate", "Contact Agent"],
    badge: "For Sale", views: 54,
  },
  {
    id: 103, slug: "greenbank-house-land-890k", category: "for-sale",
    title: "House & Land Package", location: "Greenbank, QLD",
    price: 890000,
    image: "https://i2.au.reastatic.net/500x300/4714635bbbf6483cc6f8b117575a29e4a950b91c9e56483cab70dd514bf5a5a3/image.jpg",
    beds: 4, baths: 2, sqft: 2400, garage: 2,
    features: ["House & Land", "New Build", "Quality Finishes"],
    badge: "House & Land", isNew: true, views: 143,
  },
  {
    id: 104, slug: "lot-66-oak-circuit-caboolture", category: "for-sale",
    title: "Lot 66, Oak Circuit", location: "Caboolture, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/9d1826b7a737d02aae6f5efc0a59fb798b8924a306886365a32c8121a21963c7/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "New Estate", "Contact Agent"],
    badge: "For Sale", views: 39,
  },
  {
    id: 105, slug: "lot-131-spring-street-caboolture", category: "for-sale",
    title: "Lot 131, Spring Street", location: "Caboolture, QLD",
    price: 899000,
    image: "https://i2.au.reastatic.net/500x300/44f2c21d234f4c35d3ce8ebdad5bbfae07003ec0b0aaf1a33a3bc81d34bafcde/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "Prime Block", "Great Location"],
    badge: "For Sale", views: 62,
  },
  {
    id: 106, slug: "lot-170-premier-drive-kingaroy", category: "for-sale",
    title: "Lot 170, Premier Drive", location: "Kingaroy, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/c79487573fb579dfa21352fa7b0d3a02044bc32b881132971ff29212e69d393a/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "Kingaroy", "Contact Agent"],
    badge: "For Sale", views: 28,
  },
  {
    id: 107, slug: "south-maclean-house-land-4bed", category: "for-sale",
    title: "House & Land Package", location: "South Maclean, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/536b63de52ee5207e6ab482911a1ae6632b31fbc92a80356dc308e5bff08b2d8/image.png",
    beds: 4, baths: 2, sqft: 2800, garage: 2,
    features: ["House & Land", "4 Bedrooms", "New Build"],
    badge: "House & Land", views: 91,
  },
  {
    id: 108, slug: "lilywood-land-for-sale", category: "for-sale",
    title: "Residential Land", location: "Lilywood, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/944eb693ae37737da5685ea4983f043bc81cac0fd4e45456d4e65450155b43ec/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "Lilywood Estate", "Contact Agent"],
    badge: "For Sale", views: 47,
  },
  {
    id: 109, slug: "south-maclean-land-contact", category: "for-sale",
    title: "Residential Land", location: "South Maclean, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/c04a986e1d20c67e9a6b0d0e914e042dce4dd3212bcfd5797043f9d765cbf556/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "South Maclean", "Contact Agent"],
    badge: "For Sale", views: 33,
  },
  {
    id: 110, slug: "lot-108-landings-blvd-lilywood", category: "for-sale",
    title: "Lot 108, Landings Boulevard", location: "Lilywood, QLD",
    price: 0,
    image: "https://i2.au.reastatic.net/500x300/c3cf818fb6fe69082d93b2f01ba5d9286cc0a477bfbb41fcc591aa621b1f263c/image.jpg",
    beds: 0, baths: 0, sqft: 0, garage: 0,
    features: ["Residential Land", "Under Offer", "Lilywood"],
    badge: "Under Offer", views: 76,
  },

  // ── Sold ─────────────────────────────────────────────────────────────────
  {
    id: 1, slug: "73-mount-moogerah-drive-algester", category: "sold",
    title: "73 Mount Moogerah Drive", location: "Algester, QLD",
    price: 1500000, soldPrice: 1500000,
    image: "https://i2.au.reastatic.net/800x600/c37701121db965e2181e90a0269133fc2d2967643f86bf8c85a2b0f4958d7ba6/image.jpg",
    beds: 5, baths: 3, sqft: 4500, garage: 6,
    features: ["12 Car Spaces", "Large Block", "Premium Home"],
    soldDate: "5 weeks ago", daysOnMarket: 28,
  },
  {
    id: 2, slug: "26-jacana-close-springfield", category: "sold",
    title: "26 Jacana Close", location: "Springfield, QLD",
    price: 1137000, soldPrice: 1137000,
    image: "https://i2.au.reastatic.net/800x600/28a77f3d11097e6e7254f26797c3a50a5dbd8084abed79665d857465a175c8d2/image.jpg",
    beds: 4, baths: 2, sqft: 3200, garage: 2,
    features: ["Family Home", "Great Location", "Modern Finishes"],
    soldDate: "3 months ago", daysOnMarket: 22,
  },
  {
    id: 3, slug: "51-dobbie-crescent-ripley", category: "sold",
    title: "51 Dobbie Crescent", location: "Ripley, QLD",
    price: 970000, soldPrice: 970000,
    image: "https://i2.au.reastatic.net/800x600/7e3a9d18a2cd7cc29cda98993de0c6791efd652c0f80549f38ed742aeab03c39/image.jpg",
    beds: 4, baths: 2, sqft: 2800, garage: 2,
    features: ["Family Home", "Double Garage", "Quality Build"],
    soldDate: "6 months ago", daysOnMarket: 19,
  },
  {
    id: 4, slug: "85-bayliss-road-south-ripley", category: "sold",
    title: "85 Bayliss Road", location: "South Ripley, QLD",
    price: 1100000, soldPrice: 1100000,
    image: "https://i2.au.reastatic.net/800x600/2b7286a31eca5ee4b452d8d15ee9cfca0ef70c543bbf149d3d1737bb46f1cd91/image.jpg",
    beds: 4, baths: 2, sqft: 3500, garage: 2,
    features: ["Large Land", "Private Setting", "Quality Build"],
    soldDate: "9 months ago", daysOnMarket: 31,
  },
  {
    id: 5, slug: "26-hepburn-street-greenbank", category: "sold",
    title: "26 Hepburn Street", location: "Greenbank, QLD",
    price: 890000, soldPrice: 890000,
    image: "https://i2.au.reastatic.net/800x600/d744995f1cbc8af65653e6d4aa19cb9e7ecf1c6d72fe8d0bdf95a18d169e6b5b/image.jpg",
    beds: 4, baths: 2, sqft: 2900, garage: 2,
    features: ["Spacious Yard", "Quiet Street", "Family Friendly"],
    soldDate: "9 months ago", daysOnMarket: 14,
  },
  {
    id: 6, slug: "32-highbury-court-greenbank", category: "sold",
    title: "32 Highbury Court", location: "Greenbank, QLD",
    price: 880000, soldPrice: 880000,
    image: "https://i2.au.reastatic.net/800x600/1030bd2599d6aa18e29d450d345df4c33777979576e283b9256c0e877683d823/image.jpg",
    beds: 4, baths: 2, sqft: 2800, garage: 2,
    features: ["Cul-de-Sac", "Modern Kitchen", "Family Home"],
    soldDate: "10 months ago", daysOnMarket: 18,
  },
  {
    id: 7, slug: "66-greenhaven-circuit-narangba", category: "sold",
    title: "66 Greenhaven Circuit", location: "Narangba, QLD",
    price: 770000, soldPrice: 770000,
    image: "https://i2.au.reastatic.net/800x600/0b984c985a3e5b0ef241e068254ab5e4a4808f68a41783687b3fee05e70c3aa0/image.jpg",
    beds: 3, baths: 2, sqft: 2100, garage: 2,
    features: ["Modern Home", "Low Maintenance", "Great Suburb"],
    soldDate: "11 months ago", daysOnMarket: 25,
  },
  {
    id: 8, slug: "60-pinnacle-circuit-heathwood", category: "sold",
    title: "60 Pinnacle Circuit", location: "Heathwood, QLD",
    price: 1040000, soldPrice: 1040000,
    image: "https://i2.au.reastatic.net/800x600/48baee38f613ec6cb38fc75249b7bbf866cc276446fd318df6965a4a7dc25905/image.png",
    beds: 4, baths: 2, sqft: 3400, garage: 4,
    features: ["4 Car Garage", "Premium Suburb", "Spacious Home"],
    soldDate: "12 months ago", daysOnMarket: 16,
  },
  {
    id: 9, slug: "10-redcomb-drive-park-ridge", category: "sold",
    title: "10 Redcomb Drive", location: "Park Ridge, QLD",
    price: 600000, soldPrice: 600000,
    image: "https://i2.au.reastatic.net/800x600/4fb818eeb10863afd6ca1917e70ff45bd9d582197413fb5e2808dd86c4019fe4/image.jpg",
    beds: 0, baths: 0, sqft: 10764, garage: 0,
    features: ["Residential Land", "Development Opportunity", "Park Ridge"],
    soldDate: "6 weeks ago", daysOnMarket: 35,
  },
  {
    id: 10, slug: "lot-834-south-maclean", category: "sold",
    title: "Lot 834, 95 Endeavour Cct", location: "South Maclean, QLD",
    price: 400000, soldPrice: 400000,
    image: "https://i2.au.reastatic.net/800x600/ba08c62e76942997fbdd47bfd377286a87bf0a8badd2980dded2059e9d568532/image.jpg",
    beds: 0, baths: 0, sqft: 8073, garage: 0,
    features: ["Residential Land", "New Estate", "Build Your Dream Home"],
    soldDate: "6 months ago", daysOnMarket: 28,
  },

  // ── For Rent ─────────────────────────────────────────────────────────────
  {
    id: 14, slug: "5-parkside-close-greenbank-rent", category: "for-rent",
    title: "5 Parkside Close", location: "Greenbank, QLD",
    price: 2600,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    beds: 4, baths: 2, sqft: 2750, garage: 2,
    features: ["Air Conditioning", "Large Yard", "Pets Considered"],
    badge: "Available Now", deposit: 5200, minLease: "12 months",
  },
  {
    id: 15, slug: "3-sunridge-court-ripley-rent", category: "for-rent",
    title: "3 Sunridge Court", location: "Ripley, QLD",
    price: 2200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 3, baths: 2, sqft: 2100, garage: 2,
    features: ["Modern Finishes", "NBN Ready", "Close to Schools"],
    badge: "Available Now", deposit: 4400, minLease: "12 months",
  },
  {
    id: 16, slug: "12-ironbark-street-narangba-rent", category: "for-rent",
    title: "12 Ironbark Street", location: "Narangba, QLD",
    price: 1950,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    beds: 3, baths: 1, sqft: 1800, garage: 1,
    features: ["Fully Fenced", "Garden Shed", "Quiet Street"],
    badge: "Utilities Included", deposit: 3900, minLease: "6 months",
  },
];

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
