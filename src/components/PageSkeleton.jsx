export default function PageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 h-20 bg-surface/95 backdrop-blur-md border-b border-outline px-gutter-mobile lg:px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-outline-variant animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 rounded bg-outline-variant animate-pulse" />
            <div className="w-20 h-3 rounded bg-outline-variant/60 animate-pulse" />
          </div>
        </div>
        <div className="hidden xl:flex items-center gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-16 h-4 rounded bg-outline-variant/60 animate-pulse" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block w-32 h-10 rounded-xl bg-outline-variant animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-outline-variant animate-pulse" />
        </div>
      </header>

      {/* Hero Skeleton (Centered Vibe UI Layout) */}
      <main className="w-full pt-40 px-gutter-mobile lg:px-margin-desktop flex flex-col items-center">
        {/* Badge */}
        <div className="w-24 h-6 rounded-md bg-outline-variant animate-pulse mb-6" />
        
        {/* Title */}
        <div className="w-full max-w-2xl h-12 md:h-16 rounded-xl bg-outline-variant animate-pulse mb-4" />
        <div className="w-3/4 max-w-xl h-12 md:h-16 rounded-xl bg-outline-variant animate-pulse mb-6" />
        
        {/* Subtitle */}
        <div className="w-full max-w-lg h-5 rounded bg-outline-variant/60 animate-pulse mb-3" />
        <div className="w-2/3 max-w-md h-5 rounded bg-outline-variant/60 animate-pulse mb-8" />
        
        {/* CTAs */}
        <div className="flex items-center gap-4 mb-24">
          <div className="w-40 h-12 rounded-md bg-outline-variant animate-pulse" />
          <div className="w-48 h-12 rounded-md bg-outline-variant/60 animate-pulse" />
        </div>

        {/* Floating Cards Skeleton */}
        <div className="relative w-full max-w-5xl h-[400px] flex justify-center">
          {/* Left Decorative */}
          <div className="hidden md:block absolute left-0 top-16 w-[320px] h-48 rounded-xl bg-surface border border-outline shadow-lg -rotate-6 scale-90 p-6 flex flex-col justify-between opacity-60">
            <div className="w-full h-8 bg-outline-variant/50 animate-pulse rounded" />
            <div className="space-y-3">
              <div className="w-full h-3 bg-outline-variant/50 animate-pulse rounded" />
              <div className="w-5/6 h-3 bg-outline-variant/50 animate-pulse rounded" />
            </div>
          </div>
          
          {/* Right Decorative */}
          <div className="hidden md:block absolute right-0 top-10 w-[320px] h-48 rounded-xl bg-surface border border-outline shadow-lg rotate-6 scale-90 p-6 flex flex-col justify-between opacity-60">
            <div className="w-full h-8 bg-outline-variant/50 animate-pulse rounded" />
            <div className="space-y-3">
              <div className="w-full h-3 bg-outline-variant/50 animate-pulse rounded" />
              <div className="w-4/6 h-3 bg-outline-variant/50 animate-pulse rounded" />
            </div>
          </div>

          {/* Center Main Card */}
          <div className="relative z-10 w-full max-w-md h-80 rounded-xl bg-surface border border-outline shadow-2xl p-6 flex flex-col gap-6">
             <div className="flex justify-between items-center pb-4 border-b border-outline">
                <div className="w-32 h-6 bg-outline-variant animate-pulse rounded" />
                <div className="w-20 h-5 bg-outline-variant/50 animate-pulse rounded" />
             </div>
             <div className="grid grid-cols-4 gap-4 mb-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-outline-variant/30 animate-pulse rounded-lg" />
               ))}
             </div>
             <div className="space-y-3">
               <div className="w-full h-4 bg-outline-variant/50 animate-pulse rounded" />
               <div className="w-3/4 h-4 bg-outline-variant/50 animate-pulse rounded" />
             </div>
             <div className="mt-auto w-full h-12 bg-outline-variant animate-pulse rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  )
}
