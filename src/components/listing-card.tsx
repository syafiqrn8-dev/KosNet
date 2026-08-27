"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FacilityBadge } from "./facility-badge";
import type { GenderType, RoomStatus } from "@/types";
import { ROOM_STATUS_MAP, GENDER_LABEL } from "@/types";

const STATUS_DOT_COLORS: Record<string, string> = {
  info: "bg-[--color-status-tersedia]",
  warning: "bg-[--color-status-dikunci]",
  danger: "bg-[--color-status-terisi]",
};

export interface ListingCardProps {
  id: string;
  imageUrl: string;
  rating: number;
  name: string;
  location: string;
  price: number;
  gender: GenderType;
  facilities: string[];
  status: RoomStatus;
  onSave?: (id: string) => void;
  onSelect?: (id: string) => void;
}

export function ListingCard({
  id,
  imageUrl,
  rating,
  name,
  location,
  price,
  gender,
  facilities,
  status,
  onSave,
  onSelect,
}: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const statusInfo = ROOM_STATUS_MAP[status];
  const visibleFacilities = facilities.slice(0, 2);
  const extraCount = facilities.length - 2;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(id);
  };

  const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

  return (
    <article
      onClick={() => onSelect?.(id)}
      className="group bg-card hover:ring-primary/30 relative flex cursor-pointer flex-col overflow-hidden rounded-[--radius-lg] shadow-sm ring-1 ring-[--border] transition-all hover:shadow-md"
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-white">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
        </div>
        {/* Tombol Simpan */}
        <button
          onClick={handleSave}
          className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label={saved ? "Hapus dari favorit" : "Simpan ke favorit"}
        >
          <Heart className={cn("size-4 transition-colors", saved && "fill-red-500 text-red-500")} />
        </button>
      </div>

      {/* Konten */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-secondary line-clamp-1 text-[17px] leading-tight font-semibold">
          {name}
        </h3>
        <p className="text-muted text-[13px]">📍 {location}</p>
        <p className="text-primary text-[15px] font-bold">
          {formatPrice(price)}
          <span className="text-muted font-normal"> /bulan</span>
        </p>

        {/* Badge */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="bg-primary-light text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium">
            {GENDER_LABEL[gender]}
          </span>
          {visibleFacilities.map((fac) => (
            <FacilityBadge key={fac} code={fac} />
          ))}
          {extraCount > 0 && <span className="text-muted text-[12px]">+{extraCount}</span>}
        </div>

        {/* Status dot */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn("inline-block size-2 rounded-full", STATUS_DOT_COLORS[statusInfo.color])}
          />
          <span className="text-muted text-[13px]">{statusInfo.label}</span>
        </div>
      </div>
    </article>
  );
}
