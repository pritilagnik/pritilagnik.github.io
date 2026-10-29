import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Pre-checks and ensures all images inside an element are fully loaded before capturing
 */
async function waitForImagesToLoad(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  if (images.length === 0) return;

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const onDone = () => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
          resolve();
        };
        img.addEventListener('load', onDone);
        img.addEventListener('error', onDone);
        setTimeout(onDone, 1500);
      });
    })
  );
}

/**
 * Converts any non-data URL images inside element into in-memory base64 Data URLs.
 * This guarantees html2canvas and toPng will NEVER be tainted by CORS or relative asset paths.
 */
async function inlineImagesAsBase64(element: HTMLElement): Promise<() => void> {
  const images = Array.from(element.querySelectorAll('img'));
  const restored: { img: HTMLImageElement; originalSrc: string }[] = [];

  for (const img of images) {
    if (!img.src || img.src.startsWith('data:')) continue;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width || 120;
      canvas.height = img.naturalHeight || img.height || 120;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl && dataUrl.length > 100) {
          restored.push({ img, originalSrc: img.src });
          img.src = dataUrl;
        }
      }
    } catch (e) {
      // Continue even if an individual image cannot be inlined
    }
  }

  return () => {
    restored.forEach(({ img, originalSrc }) => {
      img.src = originalSrc;
    });
  };
}

/**
 * Converts a base64 Data URL string to a native binary Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Robust cross-browser file downloader using Blob Object URL.
 * Works inside iframes, desktop, and mobile browsers without truncation.
 */
export function triggerBlobDownload(blobOrDataUrl: Blob | string, filename: string): void {
  const blob = typeof blobOrDataUrl === 'string' ? dataUrlToBlob(blobOrDataUrl) : blobOrDataUrl;
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }, 1000);
}

/**
 * Captures an HTML element to a high-resolution PNG Data URL.
 * Tries html2canvas (with allowTaint: false) then falls back to html-to-image (skipFonts: true).
 */
export async function captureElementToPng(element: HTMLElement): Promise<string> {
  await waitForImagesToLoad(element);
  const restoreImages = await inlineImagesAsBase64(element);

  try {
    // Strategy 1: html2canvas with inlined images and clean white background
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 5000,
        ignoreElements: (node) => {
          return node instanceof HTMLElement && (node.classList.contains('no-export') || node.tagName === 'BUTTON');
        }
      });
      const dataUrl = canvas.toDataURL('image/png');
      if (dataUrl && dataUrl.length > 500) {
        return dataUrl;
      }
    } catch (h2cError) {
      console.warn('html2canvas capture failed, trying html-to-image fallback:', h2cError);
    }

    // Strategy 2: html-to-image with skipFonts: true to prevent cross-origin stylesheet errors
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: false,
      skipFonts: true,
      backgroundColor: '#ffffff',
      filter: (node) => {
        if (node instanceof HTMLElement && (node.classList.contains('no-export') || node.tagName === 'BUTTON')) {
          return false;
        }
        return true;
      }
    });

    if (dataUrl && dataUrl.length > 500) {
      return dataUrl;
    }

    throw new Error('Capture returned an empty image');
  } finally {
    restoreImages();
  }
}

/**
 * Exports an HTML element as a crisp, high-resolution PNG image file.
 */
export async function exportElementAsImage(
  element: HTMLElement,
  filename: string = 'Pass_Card.png'
): Promise<void> {
  try {
    const dataUrl = await captureElementToPng(element);
    const safeFilename = filename.toLowerCase().endsWith('.png') ? filename : `${filename}.png`;
    triggerBlobDownload(dataUrl, safeFilename);
  } catch (err) {
    console.error('Failed to export element as Image:', err);
    throw err;
  }
}

/**
 * Exports an HTML element (pass card, acknowledgement slip, car windshield card)
 * as a high-resolution PDF file matching exact visual dimensions.
 */
export async function exportElementAsPdf(
  element: HTMLElement,
  filename: string = 'Pass_Card.pdf'
): Promise<void> {
  try {
    const dataUrl = await captureElementToPng(element);

    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load captured image into PDF generator'));
      img.src = dataUrl;
    });

    const pxWidth = img.naturalWidth || element.offsetWidth * 2;
    const pxHeight = img.naturalHeight || element.offsetHeight * 2;

    // Convert pixels to millimeters: 1 px ≈ 0.264583 mm at 96 dpi (scaled 2x)
    const mmWidth = Math.max(80, Math.round((pxWidth * 25.4) / (96 * 2)));
    const mmHeight = Math.max(50, Math.round((pxHeight * 25.4) / (96 * 2)));

    const orientation = mmWidth >= mmHeight ? 'landscape' : 'portrait';

    const margin = 5;
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [mmWidth + margin * 2, mmHeight + margin * 2]
    });

    pdf.addImage(dataUrl, 'PNG', margin, margin, mmWidth, mmHeight, undefined, 'FAST');
    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;

    try {
      pdf.save(safeFilename);
    } catch (saveErr) {
      // Fallback via Blob download if pdf.save() is restricted
      const pdfBlob = pdf.output('blob');
      triggerBlobDownload(pdfBlob, safeFilename);
    }
  } catch (err) {
    console.error('Failed to export element as PDF:', err);
    throw err;
  }
}
