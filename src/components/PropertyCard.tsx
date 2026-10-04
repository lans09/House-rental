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

  return (
    <article className="group flex flex-col">
      {/* Property Image with refined subtle badges */}
      <Link
        href={`/properties/${property.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper-100 shadow-sm"
      >
        <img
          src={defaultImage}
          alt={`${property.title} in ${property.area}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Clean pill badge for listing purpose (top-left) */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[12px] sm:text-[13px] font-semibold text-ink shadow-sm backdrop-blur-sm">
          {isSale ? 'For sale' : 'For rent'}
        </span>

        {/* Subtle mandate badge (top-right) */}
        {property.is_featured && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-sm shadow-sm">
            Direct mandate
          </span>
        )}
      </Link>

      {/* Property Details */}
      <div className="mt-3.5 sm:mt-4 flex flex-1 flex-col justify-between">
        <div>
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
          <Link href={`/properties/${property.slug}`} className="block mt-1">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-ink group-hover:underline group-hover:decoration-amber-400 group-hover:underline-offset-4 line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location & Specs */}
          <p className="mt-0.5 text-[13px] sm:text-[14px] text-ink-600">
            {property.area}, {property.state} · {property.bedrooms} bed · {property.bathrooms} bath
          </p>
        </div>

        {/* Verification Guarantee & View Action */}
        <div className="mt-2.5 pt-2.5 border-t border-ink/10 flex items-center justify-between">
          <p className="text-[12px] sm:text-[13px] font-medium text-forest-700 flex items-center gap-1.5">
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
