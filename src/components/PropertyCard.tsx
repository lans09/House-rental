'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/database.types';

export interface CatalogueProperty {
  id: string;
  title: string;
  slug: string;
  state: string;
  lga?: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  toilets?: number;
  parking_spaces?: number;
  unit_info?: string;
  description?: string;
  rent_price: number;
  total_upfront_estimate?: number;
  property_type: any;
  listing_type?: 'rent' | 'sale';
  is_verified?: boolean;
  is_featured?: boolean;
  cover_image_url?: string;
}

interface PropertyCardProps {
  property: CatalogueProperty | (Omit<Partial<Property>, 'property_type'> & {
    id: string;
    title: string;
    slug: string;
    state: string;
    lga?: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    toilets?: number;
    parking_spaces?: number;
    unit_info?: string;
    description?: string;
    rent_price: number;
    total_upfront_estimate?: number;
    property_type: any;
    listing_type?: 'rent' | 'sale';
    is_verified?: boolean;
    is_featured?: boolean;
    cover_image_url?: string;
  });
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const defaultImage =
    property.cover_image_url ||
    '/images/hero-eastern-nigerian-mansion.jpg';

  const isSale = property.listing_type === 'sale';
  const isFlatOrUnit =
    property.property_type === 'flat_apartment' ||
    property.property_type === 'self_contain' ||
    Boolean(property.unit_info);

  // Label for property type or unit status
  const getUnitTypeLabel = () => {
    if (property.unit_info) return property.unit_info;
    if (property.property_type === 'flat_apartment') return 'Flat / Apartment Unit';
    if (property.property_type === 'self_contain') return 'Self-Contained Unit';
    if (property.property_type === 'duplex') return 'Duplex / Terraced';
    if (property.property_type === 'detached_mansion') return 'Detached Mansion';
    if (property.property_type === 'land') return 'Verified Land Plot';
    return 'Residential Property';
  };

  // Parking display logic
  const getParkingLabel = () => {
    if (property.parking_spaces && property.parking_spaces > 0) {
      return `${property.parking_spaces} ${property.parking_spaces === 1 ? 'car park' : 'car parks'}`;
    }
    return isFlatOrUnit ? 'Allocated parking' : 'Gated compound parking';
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-ink/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Property Image with Badges */}
      <Link
        href={`/properties/${property.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-100"
      >
        <img
          src={defaultImage}
          alt={`${property.title} in ${property.area}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Top-left: purpose badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[12px] sm:text-[13px] font-semibold text-ink shadow-sm backdrop-blur-sm">
          {isSale ? 'For sale' : 'For rent'}
        </span>

        {/* Top-right: direct mandate badge */}
        {property.is_featured && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-sm shadow-sm">
            Direct mandate
          </span>
        )}

        {/* Bottom overlay: unit type indicator */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="rounded-md bg-ink/80 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
            {getUnitTypeLabel()}
          </span>
        </div>
      </Link>

      {/* Property Content */}
      <div className="p-4 sm:p-5 flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          {/* Price line */}
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-serif text-xl sm:text-2xl text-ink tracking-tight font-normal">
              {formatNaira(property.rent_price)}{' '}
              {!isSale && (
                <span className="font-sans text-[13px] sm:text-[14px] text-ink-600 font-normal">
                  / year
                </span>
              )}
              {isSale && (
                <span className="font-sans text-[12px] sm:text-[13px] text-ink-600 font-normal">
                  outright
                </span>
              )}
            </p>
            {!isSale && property.total_upfront_estimate && (
              <span className="text-[12px] font-medium text-ink-600 tabular-nums">
                Move-in: {formatNaira(property.total_upfront_estimate)}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-ink group-hover:underline group-hover:decoration-amber-400 group-hover:underline-offset-4 line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location Area & State */}
          <p className="text-[13px] sm:text-[14px] text-ink-600 truncate">
            {property.area}, {property.state}
          </p>

          {/* Optional Short Description (Clamped safely) */}
          {property.description && (
            <p className="text-[12px] sm:text-[13px] text-ink-600 line-clamp-2 leading-relaxed pt-0.5">
              {property.description.split('\n')[0]}
            </p>
          )}

          {/* Structured Key Specs Bar (Bedrooms, Bathrooms, Car Park) */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-[12px] font-medium text-ink-800">
            {/* Bedrooms */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-paper-100 border border-ink/5">
              <svg className="h-3.5 w-3.5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
              </svg>
              <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`}</span>
            </span>

            {/* Bathrooms */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-paper-100 border border-ink/5">
              <svg className="h-3.5 w-3.5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{property.bathrooms} Bath</span>
            </span>

            {/* Car Park / Parking */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-paper-100 border border-ink/5">
              <svg className="h-3.5 w-3.5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>{getParkingLabel()}</span>
            </span>
          </div>
        </div>

        {/* Verification Guarantee & View Action */}
        <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
          <p className="text-[12px] font-medium text-forest-700 flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5 text-forest-700 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Mandate & title verified</span>
          </p>
          <Link
            href={`/properties/${property.slug}`}
            className="text-[12px] sm:text-[13px] font-semibold text-ink group-hover:text-amber-600 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
