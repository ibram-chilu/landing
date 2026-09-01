"use client";

import { useMemo, useState } from "react";

import { siteContent } from "@/content/site";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

type VideoSectionProps = {
  hasLocalVideo: boolean;
  hasPoster: boolean;
  hasCaptions: boolean;
};

export function VideoSection({
  hasLocalVideo,
  hasPoster,
  hasCaptions,
}: VideoSectionProps) {
  const [started, setStarted] = useState(false);
  const videoSrc =
    process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ||
    siteContent.video.fallbackVideoPath;
  const usePlaceholder =
    !process.env.NEXT_PUBLIC_DEMO_VIDEO_URL && !hasLocalVideo;
  const poster = hasPoster ? siteContent.video.fallbackPosterPath : undefined;

  const preload = useMemo(
    () => (usePlaceholder ? "none" : "metadata"),
    [usePlaceholder],
  );

  if (usePlaceholder) {
    return (
      <div className="rounded-[2rem] border border-dashed border-synq-teal/40 bg-synq-mint/55 p-8 text-left shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-synq-teal">
          Development placeholder
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-synq-navy">
          {siteContent.video.placeholderTitle}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-synq-ink/78">
          {siteContent.video.placeholderBody}
        </p>
        <ul className="mt-5 space-y-2 text-sm text-synq-ink/78">
          <li>Add the MP4 at `public/synq-explainer.mp4`.</li>
          <li>Add the poster image at `public/synq-video-poster.jpg`.</li>
          <li>
            Replace `public/synq-captions.vtt` with final captions before
            launch.
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-synq-navy/10 bg-synq-navy p-2 shadow-soft">
      <video
        className="aspect-video w-full rounded-[1.5rem] bg-synq-navy"
        controls
        playsInline
        preload={preload}
        poster={poster}
        title="Synq beta explainer video"
        onPlay={() => {
          if (!started) {
            setStarted(true);
            trackEvent(analyticsEvents.videoStarted);
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        {hasCaptions ? (
          <track
            kind="captions"
            src={siteContent.video.captionsPath}
            srcLang="en"
            label="English captions"
            default
          />
        ) : null}
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
