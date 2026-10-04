'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/database.types';

interface PropertyCardProps {
  property: Omit<Partial<Property>, 'property_type'> & {
    id: string;
    title: string;
    slug: string;
    state: string;
    lga: string;
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
  };
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
  const monthlyEquivalent = Math.round(property.rent_price / 12);
  const upfrontTotal = property.total_upfront_estimate || Math.round(property.rent_price * 1.35);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Visual Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <img
          src={defaultImage}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Verification & Listing Type Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isSale ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 font-bold backdrop-blur-sm shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950"></span>
              FOR SALE • VERIFIED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-950/90 text-emerald-400 border border-emerald-500/40 font-bold backdrop-blur-sm shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              FOR RENT • VERIFIED
            </span>
          )}

          {property.is_featured && (
            <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-stone-950/80 text-amber-300 border border-white/10 font-bold backdrop-blur-sm">
              DIRECT MANDATE
            </span>
          )}
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md bg-stone-950/90 border border-white/10 text-stone-200 font-medium">
            {property.property_type?.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          {/* Price & Upfront Disclosure */}
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl font-black text-stone-950">
                  {formatNaira(property.rent_price)}
                </span>
                {!isSale && <span className="text-xs text-stone-500 font-medium">/ yr</span>}
              </div>
              <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                {isSale ? 'Outright Purchase (Verified Deed)' : `~${formatNaira(monthlyEquivalent)}/mo equiv.`}
              </p>
            </div>
            {!isSale && (
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-semibold block">Total Move-In</span>
                <span className="text-xs font-mono font-bold text-amber-700">
                  {formatNaira(upfrontTotal)}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block group-hover:text-amber-600 transition-colors">
            <h3 className="font-serif text-base font-bold text-stone-950 leading-snug line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-xs text-stone-600 truncate font-normal">
            {property.area}, {property.lga}, {property.state}
          </p>
        </div>

        {/* Specs & Link */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-mono">
          <div className="flex items-center gap-2.5 text-stone-700 font-medium">
            <span>{property.bedrooms} Beds</span>
            <span>•</span>
            <span>{property.bathrooms} Baths</span>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className="text-stone-950 group-hover:text-amber-600 font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1 transition-colors"
          >
            <span>Inspect</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
