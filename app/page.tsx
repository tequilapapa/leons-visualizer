
// app/page.tsx
"use client";

import Link from "next/link";
import { woodProfiles } from "../lib/woodProfiles";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Leon&apos;s Visualizer
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          This is the visual side of your funnel. Pick a wood profile, then jump
          into the camera experience to see how it could look on real floors.
        </p>
      </div>

      <section className="w-full max-w-3xl space-y-4">
        <h2 className="text-lg font-medium text-left">
          Wood Profiles (sample)
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {woodProfiles.map((profile) => (
            <li
              key={profile.id}
              className="border rounded-lg p-4 flex flex-col justify-between gap-2"
            >
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-xs text-gray-500">
                  {profile.species} · {profile.sheen} · {profile.type}
                </p>
                <p className="text-xs mt-1 text-gray-600">
                  Est. range: ${profile.priceMin} – ${profile.priceMax} / sqft
                </p>
              </div>
              <Link
                href={`/camera?profileId=${encodeURIComponent(profile.id)}`}
                className="mt-3 inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition"
              >
                See this on my floors →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}