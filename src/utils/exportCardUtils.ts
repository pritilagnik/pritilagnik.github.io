import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import pritiLogo from '../assets/images/priti_lagnik_logo.webp';
import scanswiftIcon from '../assets/apps-icons/scanswift.jpeg';

const EXPORT_VIEWPORT_WIDTH = 1280;
const EXPORT_CARD_WIDTH = 760;

let cachedLogoBase64: string = '';
let cachedSealBase64: string = '';

/**
 * Converts any image URL (relative, absolute, or external) to a base64 Data URL.
 * Specially handles GitHub Pages subpath hosting, blob conversions, and canvas fallbacks.
 */
export async function convertSrcToDataUrl(src: string): Promise<string | null> {
  if (!src) return null;
  if (src.startsWith('data:')) return src;

  // 1. Try standard fetch as blob (fastest & cleanest on HTTPS / GitHub Pages)
  try {
    const res = await fetch(src, { mode: 'cors' });
    if (res.ok) {
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve('');
        reader.readAsDataURL(blob);
      });
    }
  } catch (err) {
    // Continue to alternative lookup
  }

  // 2. If it begins with / on GitHub Pages with subpath, try resolving relative to current page base
  try {
    if (src.startsWith('/') && !src.startsWith('//')) {
      const pathname = window.location.pathname;
      const baseDir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      const subpathUrl = window.location.origin + baseDir + src.replace(/^\/+/, '');
      const res = await fetch(subpathUrl, { mode: 'cors' });
      if (res.ok) {
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => resolve('');
          reader.readAsDataURL(blob);
        });
      }
    }
  } catch (err) {
    // Continue to canvas fallback
  }

  // 3. Image element with crossOrigin drawing fallback
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const loaded = await new Promise<boolean>((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
      setTimeout(() => resolve(false), 2000);
    });

    if (loaded && img.naturalWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
      }
    }
  } catch (err) {
    // Return null if all strategies failed
  }

  return null;
}

export async function getLogoDataUrl(): Promise<string> {
  if (cachedLogoBase64) return cachedLogoBase64;
  const converted = await convertSrcToDataUrl(pritiLogo);
  if (converted) cachedLogoBase64 = converted;
  return cachedLogoBase64 || pritiLogo;
}

export async function getSealDataUrl(): Promise<string> {
  if (cachedSealBase64) return cachedSealBase64;
  const converted = await convertSrcToDataUrl(scanswiftIcon);
  if (converted) cachedSealBase64 = converted;
  return cachedSealBase64 || scanswiftIcon;
}

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
        setTimeout(onDone, 1200);
      });
    })
  );
}

/**
 * Converts any non-data URL images inside element into in-memory base64 Data URLs.
 * This guarantees html2canvas and toPng will NEVER be tainted by CORS or relative asset paths on GitHub Pages.
 */
async function inlineImagesAsBase64(element: HTMLElement): Promise<() => void> {
  const images = Array.from(element.querySelectorAll('img'));
  const restored: { img: HTMLImageElement; originalSrc: string }[] = [];

  for (const img of images) {
    if (!img.src || img.src.startsWith('data:')) continue;

    try {
      const dataUrl = await convertSrcToDataUrl(img.src);
      if (dataUrl && dataUrl.startsWith('data:image')) {
        restored.push({ img, originalSrc: img.src });
        img.src = dataUrl;
        continue;
      }

      // Drawing fallback
      if (img.complete && img.naturalWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const cData = canvas.toDataURL('image/png');
          if (cData && cData.length > 100) {
            restored.push({ img, originalSrc: img.src });
            img.src = cData;
          }
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
        // Lay the card out at desktop width regardless of the device viewport
        windowWidth: EXPORT_VIEWPORT_WIDTH,
        width: EXPORT_CARD_WIDTH,
        onclone: (clonedDoc, clonedEl) => {
          clonedDoc.body.querySelectorAll(':scope > *').forEach((n) => {
            if (n !== clonedEl && !n.contains(clonedEl)) (n as HTMLElement).style.display = 'none';
          });
          let node: HTMLElement | null = clonedEl.parentElement;
          while (node && node !== clonedDoc.body) {
            node.style.display = 'block';
            node.style.padding = '0';
            node.style.margin = '0';
            node.style.border = '0';
            node.style.width = `${EXPORT_CARD_WIDTH}px`;
            node.style.maxWidth = 'none';
            node.style.overflow = 'visible';
            node = node.parentElement;
          }
          clonedEl.style.width = `${EXPORT_CARD_WIDTH}px`;
          clonedEl.style.maxWidth = 'none';
          clonedEl.style.margin = '0';
          clonedDoc.documentElement.style.minWidth = `${EXPORT_VIEWPORT_WIDTH}px`;
        },
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

function escapeHtml(str: string = ''): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface BulkExportProgress {
  current: number;
  total: number;
  currentName: string;
}

/**
 * Downloads a single combined PDF file containing all filtered registered delegate cards
 * for bulk printing. Each card is rendered as a clean, high-resolution landscape page.
 */
export async function exportBulkDelegateCardsPdf(
  delegates: import('../types').RegistrationRecord[],
  onProgress?: (progress: BulkExportProgress) => void,
  cancelRef?: { cancelled: boolean }
): Promise<void> {
  if (!delegates || delegates.length === 0) {
    throw new Error('No delegate records selected for bulk export');
  }

  // Hidden offscreen container for serial rendering
  const container = document.createElement('div');
  container.id = 'bulk-cards-export-host';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '760px';
  container.style.zIndex = '-9999';
  container.style.opacity = '0.99';
  container.style.pointerEvents = 'none';
  container.style.backgroundColor = '#ffffff';
  document.body.appendChild(container);

  let pdf: jsPDF | null = null;
  const QRCode = (await import('qrcode')).default;
  const logoDataUrl = await getLogoDataUrl();
  const sealDataUrl = await getSealDataUrl();

  try {
    for (let i = 0; i < delegates.length; i++) {
      if (cancelRef?.cancelled) {
        throw new Error('Bulk export cancelled by user');
      }

      const rec = delegates[i];
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: delegates.length,
          currentName: rec.fullName
        });
      }

      // Generate scannable QR code Data URL
      const qrText = `Name: ${rec.fullName}\nAddress: ${rec.city}, ${rec.state}\nContact: ${rec.phone}\nReg ID: ${rec.id}`;
      let qrDataUrl = '';
      try {
        qrDataUrl = await QRCode.toDataURL(qrText, {
          width: 256,
          margin: 1,
          color: { dark: '#000000', light: '#ffffff' },
          errorCorrectionLevel: 'M'
        });
      } catch (qrErr) {
        console.warn('QR Code generation failed for record:', rec.id, qrErr);
      }

      const totalPersons = (Number(rec.maleCount) || 0) + (Number(rec.femaleCount) || 0) + (Number(rec.childrenCount) || 0) || rec.delegationSize || 1;
      const stayText = rec.needAccommodation
        ? (rec.accommodationType?.split(' ')[0] || 'Assigned')
        : 'Self';
      const issuedDate = (rec.confirmedAt || '2026-12').slice(0, 10);

      // Card HTML template matching the official high-contrast cardstock
      container.innerHTML = `
        <div class="printable-card-target" style="width: 760px; padding: 24px; background: linear-gradient(135deg, #fffbeb 0%, #ffffff 50%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 16px; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; color: #1c1917; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fcd34d; padding-bottom: 12px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${logoDataUrl}" style="width: 52px; height: 52px; object-fit: contain; border-radius: 9999px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" alt="Logo" />
              <div>
                <div style="font-size: 10px; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase; color: #92400e; font-weight: bold;">
                  Priti-Lagnik Maha Mahotsav 2026
                </div>
                <div style="font-size: 19px; font-weight: bold; font-family: Georgia, serif; color: #1c1917; letter-spacing: 0.02em;">
                  OFFICIAL REGISTERED DELEGATE PASS
                </div>
                <div style="font-size: 10px; color: #57534e;">
                  20 December 2026 · West Dangarkuthi, Dotma, Kokrajhar, Assam
                </div>
              </div>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; color: #78716c; margin-bottom: 2px;">Pass ID</div>
              <div style="font-size: 13px; font-family: monospace; font-weight: bold; color: #065f46; background: #ecfdf5; border: 1px solid #6ee7b7; padding: 4px 12px; border-radius: 8px; white-space: nowrap; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
                ${rec.id}
              </div>
            </div>
          </div>

          <!-- Body Grid (3 columns) -->
          <div style="display: grid; grid-template-columns: 3.2fr 1.5fr 1.5fr; gap: 16px; align-items: center;">
            
            <!-- Left: Delegate Details -->
            <div>
              <div style="font-size: 9px; text-transform: uppercase; color: #78716c; font-weight: bold;">Delegate Full Name</div>
              <div style="font-size: 19px; font-weight: bold; font-family: Georgia, serif; color: #1c1917; line-height: 1.2; margin: 2px 0;">
                ${escapeHtml(rec.fullName)}
              </div>
              <div style="font-size: 12px; font-weight: 600; color: #44403c;">
                📍 ${escapeHtml(rec.city)}, ${escapeHtml(rec.state)}
              </div>

              <!-- Demographic breakdown -->
              <div style="margin: 10px 0; padding: 8px 10px; background: rgba(254, 243, 199, 0.7); border: 1px solid #fcd34d; border-radius: 10px; font-size: 11px;">
                <div style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: #78350f; margin-bottom: 2px;">
                  Delegation Breakdown (${totalPersons} Total):
                </div>
                <div style="font-family: monospace; font-weight: bold; color: #1c1917;">
                  ${rec.maleCount || 0} Male / ${rec.femaleCount || 0} Female / ${rec.childrenCount || 0} Children
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px;">
                <div>
                  <span style="color: #78716c; display: block; font-size: 10px;">Contact:</span>
                  <strong style="color: #1c1917; font-family: monospace;">${escapeHtml(rec.phone)}</strong>
                </div>
                <div>
                  <span style="color: #78716c; display: block; font-size: 10px;">Arrival:</span>
                  <strong style="color: #1c1917;">${escapeHtml(rec.arrivalDate || '2026-12-20')}</strong>
                </div>
                <div>
                  <span style="color: #78716c; display: block; font-size: 10px;">Accommodation:</span>
                  <strong style="color: #1c1917;">${escapeHtml(stayText)}</strong>
                </div>
                <div>
                  <span style="color: #78716c; display: block; font-size: 10px;">Prasadam / Seva:</span>
                  <strong style="color: #065f46;">Anandabazar Pass</strong>
                </div>
              </div>
            </div>

            <!-- Center: Delegate Portrait Photo -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              ${rec.photoUrl ? `
                <div style="width: 105px; height: 122px; border-radius: 12px; overflow: hidden; border: 2px solid #f59e0b; box-shadow: 0 1px 4px rgba(0,0,0,0.1);">
                  <img src="${rec.photoUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Delegate" />
                </div>
              ` : `
                <div style="width: 105px; height: 122px; border-radius: 12px; border: 2px dashed #cbd5e1; background: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; font-size: 11px;">
                  <span>Photo</span>
                  <span style="font-size: 9px; color: #94a3b8;">(Blank)</span>
                </div>
              `}
              <span style="font-size: 9px; font-weight: bold; text-transform: uppercase; color: #57534e; margin-top: 4px;">Delegate Photo</span>
            </div>

            <!-- Right: Dynamic QR Code -->
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="padding: 6px; background: #ffffff; border-radius: 12px; border: 2px solid #cbd5e1; box-shadow: 0 1px 4px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
                ${qrDataUrl ? `
                  <img src="${qrDataUrl}" style="width: 100px; height: 100px; object-fit: contain;" alt="QR Code" />
                ` : `
                  <div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #78716c;">
                    QR Code
                  </div>
                `}
                <span style="font-size: 9px; font-family: monospace; font-weight: bold; color: #1c1917; margin-top: 2px; white-space: nowrap;">
                  ${rec.id}
                </span>
              </div>
              <span style="font-size: 8px; font-family: monospace; text-align: center; color: #57534e; margin-top: 4px;">
                Name/Address/Phone
              </span>
            </div>
          </div>

          <!-- Card Security Footer: Icon placed in middle between Verified & Granted and Issued -->
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #fde68a; display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #57534e;">
            <span>Central Reception Secretariat Seal: <strong style="color: #065f46;">VERIFIED &amp; GRANTED</strong></span>
            <div style="display: flex; align-items: center; justify-content: center; padding: 0 8px;">
              <img
                src="${sealDataUrl}"
                style="width: 20px; height: 20px; border-radius: 4px; object-fit: contain; border: 1px solid #fcd34d; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"
                alt="Emblem"
              />
            </div>
            <span style="font-family: monospace; font-weight: 600;">Issued: ${issuedDate}</span>
          </div>

        </div>
      `;

      // Capture to PNG
      const dataUrl = await captureElementToPng(container);

      // Measure dimensions
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load card into PDF generator'));
        img.src = dataUrl;
      });

      const pxWidth = img.naturalWidth || 760 * 2;
      const pxHeight = img.naturalHeight || 450 * 2;
      const mmWidth = Math.max(80, Math.round((pxWidth * 25.4) / (96 * 2)));
      const mmHeight = Math.max(50, Math.round((pxHeight * 25.4) / (96 * 2)));
      const margin = 5;

      if (!pdf) {
        pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [mmWidth + margin * 2, mmHeight + margin * 2]
        });
      } else {
        pdf.addPage([mmWidth + margin * 2, mmHeight + margin * 2], 'landscape');
      }

      pdf.addImage(dataUrl, 'PNG', margin, margin, mmWidth, mmHeight, undefined, 'FAST');

      // Yield briefly to keep UI responsive
      await new Promise((r) => setTimeout(r, 30));
    }

    if (!pdf) {
      throw new Error('PDF document could not be generated');
    }

    const filename = `All_Filtered_Delegate_Passes_${new Date().toISOString().slice(0, 10)}.pdf`;
    try {
      pdf.save(filename);
    } catch {
      const pdfBlob = pdf.output('blob');
      triggerBlobDownload(pdfBlob, filename);
    }
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}
