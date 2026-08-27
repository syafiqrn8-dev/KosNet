import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/listing-card";
import { FacilityBadge } from "@/components/facility-badge";
import { WAButton } from "@/components/wa-button";
import { SpecialNote } from "@/components/special-note";
import { RatingStars } from "@/components/rating-stars";
import { EmptyState } from "@/components/empty-state";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { Star, Heart } from "lucide-react";

export default function HomePage() {
  const kosData = {
    id: "1",
    imageUrl: "https://placehold.co/600x450/e2e8f0/64748b?text=Kos+Putri+Melati",
    rating: 4.8,
    name: "Kos Putri Melati",
    location: "Kotagede, Yogyakarta",
    price: 850000,
    gender: "wanita" as const,
    facilities: ["ac", "wifi", "km_dalam", "parkir", "dapur"],
    status: "tersedia" as const,
  };

  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-8">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-secondary text-[30px] font-bold">KosNet</h1>
        <p className="text-muted mt-2 text-[15px]">Temukan kos dalam hitungan menit, bukan hari.</p>
        <p className="text-muted/70 mt-1 text-[13px]">— Sistem Desain Fase 1 —</p>
      </section>

      {/* ───── Design Tokens ───── */}
      <section className="mb-12">
        <h2 className="text-secondary mb-4 text-[22px] font-semibold">Design Tokens</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "Primary", color: "#16A34A" },
            { name: "Primary Dark", color: "#15803D" },
            { name: "Primary Light", color: "#DCFCE7" },
            { name: "WA", color: "#25D366" },
            { name: "Secondary", color: "#0F172A" },
            { name: "Info", color: "#3B82F6" },
            { name: "Warning", color: "#F59E0B" },
            { name: "Danger", color: "#DC2626" },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-2">
              <div
                className="size-8 rounded-lg ring-1 ring-black/10"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-muted text-[13px]">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Komponen ───── */}
      <section className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* ListingCard */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">ListingCard</h3>
          <ListingCard {...kosData} />
        </div>

        {/* FacilityBadge */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">FacilityBadge</h3>
          <div className="flex flex-wrap gap-2">
            <FacilityBadge code="ac" />
            <FacilityBadge code="wifi" />
            <FacilityBadge code="km_dalam" />
            <FacilityBadge code="parkir" />
            <FacilityBadge code="dapur" />
            <FacilityBadge code="laundry" />
            <FacilityBadge code="listrik_include" />
          </div>
        </div>

        {/* WAButton */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">WAButton</h3>
          <div className="space-y-2">
            <WAButton phoneNumber="08123456789" message="Halo, saya tertarik dengan kos ini" />
            <WAButton phoneNumber="08123456789" disabled />
          </div>
        </div>

        {/* SpecialNote */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">SpecialNote</h3>
          <SpecialNote note="Biaya listrik terpisah (ditanggung penyewa). Pembayaran bulanan tanggal 5." />
        </div>

        {/* RatingStars */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">RatingStars</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <RatingStars rating={4.5} size="sm" />
              <span className="text-muted text-[13px]">sm</span>
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={3} size="md" />
              <span className="text-muted text-[13px]">md (4.5)</span>
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={3} interactive size="lg" />
              <span className="text-muted text-[13px]">lg + interactive</span>
            </div>
          </div>
        </div>

        {/* EmptyState */}
        <div>
          <h3 className="text-secondary mb-4 text-[17px] font-semibold">EmptyState</h3>
          <EmptyState
            title="Belum ada kos yang cocok"
            description="Coba longgarkan filter atau cari kata kunci lain."
            action={
              <Button variant="outline" size="sm">
                Reset Filter
              </Button>
            }
          />
        </div>
      </section>

      {/* ───── Skeleton ───── */}
      <section className="mb-12">
        <h2 className="text-secondary mb-4 text-[22px] font-semibold">Skeleton Loader</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <SkeletonLoader variant="card" />
          <SkeletonLoader variant="card" />
          <SkeletonLoader variant="card" />
        </div>
        <div className="mt-4 space-y-2">
          <SkeletonLoader variant="avatar" />
          <SkeletonLoader variant="avatar" />
        </div>
      </section>
    </main>
  );
}
