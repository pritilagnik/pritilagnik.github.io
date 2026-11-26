import React, { useEffect, useRef } from 'react';
import { getVideoEmbedUrl, getVideoSource } from '../utils/videoEmbed';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

interface GalleryVideoProps {
  url: string;
  title: string;
  poster?: string;
  autoPlay?: boolean;
  preview?: boolean;
  className?: string;
}

const loadTwitterWidget = (): Promise<void> => {
  if (window.twttr?.widgets) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>('script[data-gallery-x-widget]');
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Unable to load the X embed.')), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.dataset.galleryXWidget = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load the X embed.'));
    document.body.appendChild(script);
  });
};

export const GalleryVideo: React.FC<GalleryVideoProps> = ({
  url,
  title,
  poster,
  autoPlay = false,
  preview = false,
  className = 'w-full h-full'
}) => {
  const xContainerRef = useRef<HTMLDivElement>(null);
  const source = getVideoSource(url);
  const embedUrl = getVideoEmbedUrl(url);

  useEffect(() => {
    if (source !== 'x') return;

    let cancelled = false;
    loadTwitterWidget()
      .then(() => {
        if (!cancelled && xContainerRef.current) {
          window.twttr?.widgets.load(xContainerRef.current);
        }
      })
      .catch((error: Error) => {
        if (!cancelled) console.error(error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [source, url]);

  if (source === 'x') {
    return (
      <div ref={xContainerRef} className={`${className} overflow-auto bg-white flex items-start justify-center`}>
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={url}>{title}</a>
        </blockquote>
      </div>
    );
  }

  if (source === 'direct') {
    return (
      <video
        controls={!preview}
        autoPlay={autoPlay}
        className={`${className} object-contain bg-black`}
        poster={poster}
        playsInline
        muted={preview}
        preload="metadata"
      >
        <source src={url} />
        Your browser does not support HTML5 video.
      </video>
    );
  }

  let playbackUrl = embedUrl;
  if (autoPlay && (source === 'youtube' || source === 'facebook')) {
    try {
      const parsedUrl = new URL(embedUrl);
      parsedUrl.searchParams.set('autoplay', source === 'youtube' ? '1' : 'true');
      playbackUrl = parsedUrl.toString();
    } catch (error) {
      console.error('Unable to prepare the gallery video URL.', error);
    }
  }

  return (
    <iframe
      src={playbackUrl}
      title={title}
      className={className}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading={preview ? 'lazy' : 'eager'}
      tabIndex={preview ? -1 : undefined}
    />
  );
};
