import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight">KosNet</h1>
      <p className="text-muted-foreground text-lg">Temukan kos dalam hitungan menit, bukan hari.</p>
      <Button size="lg">Mulai</Button>
      <p className="text-muted-foreground/70 text-sm">— dalam pembangunan abc —</p>
    </main>
  );
}
