import { Aperture } from "lucide-react";

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-mute" role="status">
      <Aperture className="h-10 w-10 animate-spin text-accent" style={{ animationDuration: "1.6s" }} />
      <span className="text-sm">{label}...</span>
    </div>
  );
}
export function SkeletonCard() {
  return (
    <div className="card animate-pulse overflow-hidden">
      <div className="h-52 bg-line" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-line" /><div className="h-3 w-1/2 rounded bg-line" /><div className="h-9 rounded bg-line" />
      </div>
    </div>
  );
}
export function SkeletonGrid({ n = 6 }: { n?: number }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: n }).map((_, i) => <SkeletonCard key={i} />)}</div>;
}
