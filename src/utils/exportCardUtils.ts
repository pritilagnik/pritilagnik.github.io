import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Exports an HTML element (pass card, acknowledgement slip, car windshield card)
 * as a high-resolution PDF file.
 */
export async function exportElementAsPdf(
  element: HTMLElement,
  filename: string = 'Pass_Card.pdf'
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Convert pixel dimensions to mm at 72 dpi approximation
    const mmWidth = (imgWidth * 25.4) / (96 * 2.5);
    const mmHeight = (imgHeight * 25.4) / (96 * 2.5);

    // Orientation: landscape if width > height
    const orientation = mmWidth > mmHeight ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: [mmWidth + 10, mmHeight + 10]
    });

    pdf.addImage(imgData, 'PNG', 5, 5, mmWidth, mmHeight);
    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
  } catch (err) {
    console.error('Failed to export element as PDF:', err);
    // Fallback: trigger print dialog
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
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export element as Image:', err);
    window.print();
  }
}
