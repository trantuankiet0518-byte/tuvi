"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";

const videoSrc =
  "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

export default function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      const handleLoadedMetadata = () => {
        video.play().catch(() => {});
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }

    void import("hls.js")
      .then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;

        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      className="absolute inset-0 h-full w-full object-cover opacity-18 saturate-[0.72] mix-blend-screen"
      preload="metadata"
      muted
      loop
      playsInline
    />
  );
}
