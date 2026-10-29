import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Pre-checks and ensures all images inside an element are fully loaded
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
        // Timeout after 1.5s so we don't hang indefinitely
        setTimeout(onDone, 1500);
      });
    })
  );
}

/**
 * Captures an HTML element to a high-resolution PNG Data URL.
 * Uses html-to-image (SVG foreignObject) with an html2canvas fallback.
 */
export async function captureElementToPng(element: HTMLElement): Promise<string> {
  await waitForImagesToLoad(element);

  try {
    // Primary renderer: html-to-image preserves exact fonts, SVG, gradients, and dark mode colors
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: false,
      filter: (node) => {
        // Exclude interactive print / download action buttons inside card
        if (node instanceof HTMLElement && node.classList.contains('no-export')) {
          return false;
        }
        return true;
      }
    });

    if (dataUrl && dataUrl.length > 500) {
      return dataUrl;
    }
    throw new Error('toPng returned empty data URL');
  } catch (err) {
    console.warn('html-to-image failed, falling back to html2canvas:', err);

    // Fallback: html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    return canvas.toDataURL('image/png');
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

    // Page format with 6mm padding margins
    const margin = 6;
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [mmWidth + margin * 2, mmHeight + margin * 2]
    });

    pdf.addImage(dataUrl, 'PNG', margin, margin, mmWidth, mmHeight, undefined, 'FAST');
    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(safeFilename);
  } catch (err) {
    console.error('Failed to export element as PDF:', err);
    // If saving PDF fails, invoke system print dialog as fallback
    window.print();
  }
}

/**
 * Exports an HTML element as a crisp PNG image file.
 */
export async function exportElementAsImage(
  element: HTMLElement,
  filename: string = 'Pass_Card.png'
): Promise<void> {
  try {
    const dataUrl = await captureElementToPng(element);

    const safeFilename = filename.toLowerCase().endsWith('.png') ? filename : `${filename}.png`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = safeFilename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (err) {
    console.error('Failed to export element as Image:', err);
    window.print();
  }
}
