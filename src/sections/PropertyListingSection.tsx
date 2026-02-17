import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  ArrowRight,
  ArrowLeft,
  Car,
  CheckCircle,
  Tag,
  Clock,
  Eye,
  Key,
  Building2,
} from "lucide-react";
import "./PropertyListingsection.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

type Category = "for-sale" | "sold" | "for-rent";

const propertiesData = [
  {
    id: 1,
    category: "for-sale" as Category,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2450000,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    beds: 5,
    baths: 4,
    sqft: 4200,
    garage: 2,
    features: ["Pool", "Smart Home", "Garden"],
    badge: "Featured",
    isNew: true,
    views: 234,
  },
  {
    id: 2,
    category: "for-sale" as Category,
    title: "Contemporary Penthouse",
    location: "Manhattan, NY",
    price: 3890000,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3100,
    garage: 1,
    features: ["City View", "Terrace", "Gym"],
    badge: "Premium",
    views: 189,
  },
  {
    id: 3,
    category: "for-sale" as Category,
    title: "Oceanfront Estate",
    location: "Malibu, CA",
    price: 8500000,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    beds: 6,
    baths: 7,
    sqft: 7800,
    garage: 4,
    features: ["Beach Access", "Wine Cellar", "Theater"],
    badge: "Exclusive",
    isNew: true,
    views: 456,
  },
  {
    id: 4,
    category: "for-sale" as Category,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: 4200000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    beds: 5,
    baths: 5,
    sqft: 5500,
    garage: 3,
    features: ["Ski Access", "Fireplace", "Sauna"],
    views: 312,
  },
  {
    id: 5,
    category: "for-sale" as Category,
    title: "Urban Loft Living",
    location: "San Francisco, CA",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    beds: 3,
    baths: 2,
    sqft: 2400,
    garage: 1,
    features: ["High Ceilings", "Industrial", "Rooftop"],
    isNew: true,
    views: 178,
  },
  {
    id: 6,
    category: "for-sale" as Category,
    title: "Classic Colonial Home",
    location: "Greenwich, CT",
    price: 2950000,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    beds: 6,
    baths: 4,
    sqft: 5200,
    garage: 2,
    features: ["Library", "Garden", "Pool House"],
    views: 267,
  },
  {
    id: 7,
    category: "sold" as Category,
    title: "Riverside Mansion",
    location: "Austin, TX",
    price: 3200000,
    soldPrice: 3150000,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    beds: 5,
    baths: 4,
    sqft: 4800,
    garage: 3,
    features: ["River View", "Dock", "Guest House"],
    soldDate: "2 weeks ago",
    daysOnMarket: 18,
  },
  {
    id: 8,
    category: "sold" as Category,
    title: "Downtown Condo",
    location: "Chicago, IL",
    price: 890000,
    soldPrice: 875000,
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    beds: 2,
    baths: 2,
    sqft: 1600,
    garage: 1,
    features: ["Doorman", "Balcony", "Storage"],
    soldDate: "1 week ago",
    daysOnMarket: 12,
  },
  {
    id: 9,
    category: "sold" as Category,
    title: "Golf Course Villa",
    location: "Scottsdale, AZ",
    price: 1750000,
    soldPrice: 1720000,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3400,
    garage: 2,
    features: ["Golf View", "Infinity Pool", "Outdoor Kitchen"],
    soldDate: "3 days ago",
    daysOnMarket: 8,
  },
  {
    id: 10,
    category: "sold" as Category,
    title: "Historic Brownstone",
    location: "Boston, MA",
    price: 2100000,
    soldPrice: 2250000,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3200,
    garage: 0,
    features: ["Original Details", "Garden", "Renovated"],
    soldDate: "1 month ago",
    daysOnMarket: 5,
  },
  {
    id: 11,
    category: "sold" as Category,
    title: "Lakefront Cottage",
    location: "Lake Tahoe, NV",
    price: 1450000,
    soldPrice: 1480000,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 3,
    baths: 2,
    sqft: 2100,
    garage: 1,
    features: ["Lake Access", "Fireplace", "Deck"],
    soldDate: "2 months ago",
    daysOnMarket: 22,
  },
  {
    id: 12,
    category: "sold" as Category,
    title: "Modern Farmhouse",
    location: "Nashville, TN",
    price: 1280000,
    soldPrice: 1300000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3600,
    garage: 2,
    features: ["Barn", "Acreage", "Modern Design"],
    soldDate: "3 weeks ago",
    daysOnMarket: 14,
  },
  {
    id: 13,
    category: "for-rent" as Category,
    title: "Luxury High-Rise Apt",
    location: "Miami Beach, FL",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    beds: 3,
    baths: 2,
    sqft: 2200,
    garage: 2,
    features: ["Ocean View", "Concierge", "Gym"],
    badge: "Available Now",
    deposit: 17000,
    minLease: "12 months",
  },
  {
    id: 14,
    category: "for-rent" as Category,
    title: "Furnished Studio Loft",
    location: "Seattle, WA",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    beds: 1,
    baths: 1,
    sqft: 850,
    garage: 1,
    features: ["Furnished", "Utilities Incl", "Pet Friendly"],
    badge: "Utilities Included",
    deposit: 6400,
    minLease: "6 months",
  },
  {
    id: 15,
    category: "for-rent" as Category,
    title: "Family Townhouse",
    location: "Denver, CO",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 2800,
    garage: 2,
    features: ["Backyard", "Near Schools", "Updated"],
    badge: "Pet Friendly",
    deposit: 9600,
    minLease: "12 months",
  },
  {
    id: 16,
    category: "for-rent" as Category,
    title: "Executive Suite",
    location: "Washington, DC",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    beds: 2,
    baths: 2,
    sqft: 1800,
    garage: 1,
    features: ["Luxury Finishes", "Doorman", "Rooftop"],
    badge: "Corporate Ready",
    deposit: 13000,
    minLease: "12 months",
  },
  {
    id: 17,
    category: "for-rent" as Category,
    title: "Beachfront Condo",
    location: "San Diego, CA",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    beds: 2,
    baths: 2,
    sqft: 1400,
    garage: 1,
    features: ["Beach Access", "Balcony", "A/C"],
    badge: "Short Term OK",
    deposit: 10400,
    minLease: "3 months",
  },
  {
    id: 18,
    category: "for-rent" as Category,
    title: "Artist's Warehouse",
    location: "Portland, OR",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    beds: 2,
    baths: 1,
    sqft: 1900,
    garage: 0,
    features: ["Live/Work", "Natural Light", "Open Plan"],
    badge: "Creative Space",
    deposit: 7600,
    minLease: "12 months",
  },
];

const filterTabs = [
  { id: "for-sale", label: "For Sale", icon: Tag, count: 6 },
  { id: "sold", label: "Sold", icon: CheckCircle, count: 6 },
  { id: "for-rent", label: "For Rent", icon: Key, count: 6 },
];

const formatPrice = (price: number, isRent: boolean = false) => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${price.toLocaleString()}${isRent ? "/mo" : ""}`;
};

const badgeClass = (badge?: string) => {
  if (!badge) return "";
  const key = badge.toLowerCase();
  if (key.includes("new")) return "badge-new";
  if (key.includes("available")) return "badge";
  if (key.includes("utilities")) return "badge";
  if (key.includes("pet")) return "badge";
  if (key.includes("corporate")) return "badge";
  if (key.includes("short")) return "badge";
  if (key.includes("creative")) return "badge";
  return "badge";
};

const PropertyCard = ({
  property,
  cardIndex = 0,
}: {
  property: (typeof propertiesData)[0];
  cardIndex?: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const isSold = property.category === "sold";
  const isRent = property.category === "for-rent";
  const displayPrice = isSold
    ? (property.soldPrice ?? property.price)
    : property.price;

  return (
    <div
      className={`property-card ${property.category}`}
      style={{ animationDelay: `${cardIndex * 55}ms` }}
    >
      <div className="card-image-wrapper">
        <img
          src={property.image}
          alt={property.title}
          className={`card-image ${isSold ? "sold" : ""}`}
        />
        <div className="card-overlay" />

        <div className="card-badges">
          {property.badge && (
            <span className={`badge ${badgeClass(property.badge)}`}>
              <Tag size={12} />
              {property.badge}
            </span>
          )}
          {property.isNew && (
            <span className="badge badge-new">New Listing</span>
          )}
          {isSold && (
            <span className="badge badge-sold">
              <CheckCircle size={12} />
              Sold
            </span>
          )}
        </div>

        <button
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={() => setIsLiked((prev) => !prev)}
        >
          <Heart size={16} />
        </button>

        <div className="card-price-wrapper">
          <div className="price-info">
            {isSold && property.soldPrice && (
              <span className="price-original">
                {formatPrice(property.price)}
              </span>
            )}
            <span className="price-current">
              {formatPrice(displayPrice, isRent)}
            </span>
          </div>
          {property.views && (
            <span className="card-views">
              <Eye size={14} />
              {property.views}
            </span>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{property.title}</h3>
          <div className="card-location">
            <MapPin size={14} />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="card-stats">
          <div className="stat">
            <div className="stat-icon">
              <Bed size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.beds}</span>
              <span className="stat-label">Beds</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Bath size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.baths}</span>
              <span className="stat-label">Baths</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Square size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">
                {(property.sqft / 1000).toFixed(1)}k
              </span>
              <span className="stat-label">Sq Ft</span>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">
              <Car size={14} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{property.garage}</span>
              <span className="stat-label">Garage</span>
            </div>
          </div>
        </div>

        <div className="card-features">
          {property.features.map((feature, idx) => (
            <span key={idx} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>

        {isSold && (
          <div className="card-meta">
            <div className="meta-item">
              <Clock size={14} />
              <span>Sold {property.soldDate}</span>
            </div>
            <div className="meta-item meta-highlight">
              <span>{property.daysOnMarket} days on market</span>
            </div>
          </div>
        )}

        {isRent && property.deposit && (
          <div className="card-meta">
            <div className="meta-item">
              <span className="meta-label">Deposit:</span>
              <span>${property.deposit.toLocaleString()}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Min:</span>
              <span>{property.minLease}</span>
            </div>
          </div>
        )}

        <button
          className={`card-btn ${isSold ? "btn-secondary" : "btn-primary"}`}
        >
          <span>
            {isSold
              ? "View Details"
              : isRent
                ? "Schedule Tour"
                : "View Property"}
          </span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const PropertyListingSection = () => {
  const [activeFilter, setActiveFilter] = useState<Category | "*">("*");

  const filtered =
    activeFilter === "*"
      ? propertiesData
      : propertiesData.filter((p) => p.category === activeFilter);

  return (
    <section className="property-section">
      <div className="property-container">
        <header className="section-header">
          <div className="section-badge">
            <Building2 size={16} />
            <span>Featured Properties</span>
          </div>
          <h2 className="section-title">
            Discover Your <em>Dream Home</em>
          </h2>
          <p className="section-subtitle">
            Explore our handpicked collection of premium properties designed for
            modern living
          </p>
        </header>

        <div className="filter-wrapper">
          <div className="filter-tabs">
            <button
              onClick={() => setActiveFilter("*")}
              className={`filter-tab ${activeFilter === "*" ? "active" : ""}`}
              data-filter="*"
            >
              <span>All</span>
            </button>
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as Category)}
                className={`filter-tab ${activeFilter === tab.id ? "active" : ""}`}
                data-filter={`.${tab.id}`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div key={activeFilter} className="property-grid">
          {filtered.map((property, index) => (
            <PropertyCard key={property.id} property={property} cardIndex={index} />
          ))}
        </div>

        <div key={`swiper-${activeFilter}`} className="property-swiper-wrapper">
          <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            spaceBetween={16}
            slidesPerView={1.15}
            centeredSlides={false}
            grabCursor={true}
            freeMode={{ enabled: true, sticky: false, momentumRatio: 0.8 }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              prevEl: ".swiper-btn-prev",
              nextEl: ".swiper-btn-next",
            }}
            breakpoints={{
              480: { slidesPerView: 1.3, spaceBetween: 20 },
              640: { slidesPerView: 1.8, spaceBetween: 24 },
            }}
            className="property-swiper"
          >
            {filtered.map((property, index) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} cardIndex={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-nav">
            <button
              className="swiper-btn swiper-btn-prev"
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
            <button className="swiper-btn swiper-btn-next" aria-label="Next">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="view-all-wrapper">
          <button className="view-all-btn">
            <span>View All Properties</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="stats-bar">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-icon">
                <Home size={24} />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">2,500+</span>
                <span className="stat-card-label">Properties Listed</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">1,800+</span>
                <span className="stat-card-label">Happy Clients</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon">
                <MapPin size={24} />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">150+</span>
                <span className="stat-card-label">Cities Covered</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon">
                <Building2 size={24} />
              </div>
              <div className="stat-card-content">
                <span className="stat-card-value">15+</span>
                <span className="stat-card-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyListingSection;
