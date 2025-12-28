// app/camera/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { woodProfiles } from "../../lib/woodProfiles";
import { useEffect } from "react";

export default function CameraPage() {
  const searchParams = useSearchParams();
  const profileId = searchParams.get("profileId");

  const profile = woodProfiles.find((p) => p.id === profileId) ?? woodProfiles[0];
    useEffect(() => {
      const video = document.getElementById("camera") as HTMLVideoElement;
      const img = document.getElementById("photo-preview") as HTMLImageElement;
      const button = document.getElementById("open-camera") as HTMLButtonElement;
      const upload = document.getElementById("photo-input") as HTMLInputElement;

      let stream: MediaStream | null = null;

        async function enableCamera() {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: { ideal: "environment" }
              },
              audio: false
            });

            video.srcObject = stream;
            await video.play();

            video.classList.remove("hidden");
            img.classList.add("hidden");
          } catch (err: any) {
            console.error("Camera Error:", err);
            alert(
              "Camera blocked or unavailable. If you're on iPhone, open this page via HTTPS or enable camera permissions."
            );
          }
        }

      button?.addEventListener("click", enableCamera);

      upload?.addEventListener("change", (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result as string;
          img.classList.remove("hidden");
          video.classList.add("hidden");

          if (stream) stream.getTracks().forEach((t) => t.stop());
        };

        reader.readAsDataURL(file);
      });

      return () => {
        if (stream) stream.getTracks().forEach((t) => t.stop());
      };
    }, []);
  return (
    <main className="min-h-screen flex flex-col p-6 gap-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Visualize Your Floors
          </h1>
          <p className="text-sm text-gray-600">
            (Phase 1) We&apos;re setting up the visualizer shell. Next step is wiring in
            the actual camera and overlay logic.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs border rounded-md px-3 py-1.5 hover:bg-gray-50 transition"
        >
          ← Back to profiles
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-[1.3fr_1fr] items-start">
        {/* Left: camera / preview area */}
          <div className="border rounded-lg aspect-video flex flex-col items-center justify-center bg-black/5 overflow-hidden relative">

            {/* CAMERA STREAM */}
            <video
              id="camera"
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* UPLOAD PREVIEW */}
            <img
              id="photo-preview"
              className="w-full h-full object-cover hidden"
              alt="Uploaded room preview"
            />

            {/* CONTROLS */}
            <div className="absolute bottom-2 flex gap-2">
              <button
                id="open-camera"
                className="text-xs border rounded-md px-3 py-1.5 bg-black/70 text-white"
              >
                Use Live Camera
              </button>

              <label className="text-xs border rounded-md px-3 py-1.5 bg-white/80 cursor-pointer">
                Upload Photo
                <input id="photo-input" type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

        {/* Right: profile details + next steps */}
        <aside className="border rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">Selected Profile</h2>
          <div className="text-sm">
            <p className="font-medium">{profile.name}</p>
            <p className="text-xs text-gray-500">
              {profile.species} · {profile.sheen} · {profile.type}
            </p>
            <p className="text-xs mt-1 text-gray-600">
              Est. range: ${profile.priceMin} – ${profile.priceMax} / sqft
            </p>
          </div>

          <div className="space-y-2 text-xs text-gray-600">
            <p>
              Coming soon: camera access, AR-like overlay, and the ability to swipe
              between profiles without leaving this screen.
            </p>
            <p>
              We&apos;ll also add a CTA like “Save this look & book a consultation”
              that pushes the data to your funnel.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
