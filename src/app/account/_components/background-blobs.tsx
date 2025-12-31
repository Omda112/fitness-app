export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
      <div className="absolute left-[-120px] top-[80px] h-[420px] w-[420px] rounded-full bg-orange-500/18 blur-[110px]" />
      <div className="absolute right-[-140px] top-[140px] h-[520px] w-[520px] rounded-full bg-white/10 blur-[120px]" />
      <div className="absolute bottom-[-160px] left-[20%] h-[520px] w-[520px] rounded-full bg-orange-500/12 blur-[130px]" />
    </div>
  );
}
