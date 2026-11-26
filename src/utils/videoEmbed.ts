export type VideoSource = 'youtube' | 'facebook' | 'x' | 'direct' | 'website';

const YOUTUBE_ID_PATTERN = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
const DIRECT_VIDEO_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(?:[?#].*)?$/i;

export function getVideoSource(url: string): VideoSource {
  const normalized = url.toLowerCase();
  if (normalized.includes('youtube.com') || normalized.includes('youtu.be')) return 'youtube';
  if (normalized.includes('facebook.com') || normalized.includes('fb.watch')) return 'facebook';
  if (/(?:^|\/\/)(?:(?:www|mobile)\.)?(?:x\.com|twitter\.com)\//.test(normalized)) return 'x';
  if (DIRECT_VIDEO_PATTERN.test(url)) return 'direct';
  return 'website';
}

export function getVideoProviderLabel(url: string): string {
  const labels: Record<VideoSource, string> = {
    youtube: 'YouTube Video',
    facebook: 'Facebook Video',
    x: 'X / Twitter Video',
    direct: 'Website Video',
    website: 'Embedded Video'
  };
  return labels[getVideoSource(url)];
}

export function getVideoEmbedUrl(url: string): string {
  const source = getVideoSource(url);

  if (source === 'youtube') {
    const idMatch = url.match(YOUTUBE_ID_PATTERN);
    return idMatch?.[1] ? `https://www.youtube.com/embed/${idMatch[1]}` : url;
  }

  if (source === 'facebook') {
    if (url.includes('facebook.com/plugins/video.php')) return url;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=1280`;
  }

  return url;
}

export function getVideoThumbnail(url: string, fallback: string): string {
  if (getVideoSource(url) === 'youtube') {
    const idMatch = url.match(YOUTUBE_ID_PATTERN);
    if (idMatch?.[1]) return `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`;
  }
  return fallback;
}

export function isValidMediaUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}
