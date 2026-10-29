/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { toPng } from 'html-to-image';

export interface ExportSectionOptions {
  elementId: string;
  sectionTitle: string;
  filenamePrefix?: string;
  targetWidth?: number; // default: 1280
}

/**
 * Composites a crisp branded header onto a section snapshot canvas and downloads as PNG.
 */
function drawHeaderAndExport(
  sectionDataUrl: string,
  sectionTitle: string,
  timestampText: string,
  filename: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Scale factor relative to 1280px (typically 2 for retina)
        const scale = Math.max(1, imgWidth / 1280);
        const headerHeight = Math.round(76 * scale);

        canvas.width = imgWidth;
        canvas.height = imgHeight + headerHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context not available');
        }

        // 1. Canvas background
        ctx.fillStyle = '#0A0C10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Header banner background
        ctx.fillStyle = '#111620';
        ctx.fillRect(0, 0, canvas.width, headerHeight);

        // 3. Amber accent line on top of header
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(0, 0, canvas.width, Math.max(2, Math.round(3 * scale)));

        // 4. Subtle bottom border on header
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = Math.max(1, Math.round(1 * scale));
        ctx.beginPath();
        ctx.moveTo(0, headerHeight);
        ctx.lineTo(canvas.width, headerHeight);
        ctx.stroke();

        const padX = Math.round(22 * scale);

        // 5. Badge text line: "VICTORIAN STATE ELECTION SIMULATOR • created by cluelessness.net"
        ctx.font = `bold ${Math.round(11 * scale)}px "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = '#F59E0B';
        const brandPrefix = 'VICTORIAN STATE ELECTION SIMULATOR';
        ctx.fillText(brandPrefix, padX, Math.round(27 * scale));

        const prefixWidth = ctx.measureText(brandPrefix).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        const bullet = ' • ';
        ctx.fillText(bullet, padX + prefixWidth, Math.round(27 * scale));

        const bulletWidth = ctx.measureText(bullet).width;
        ctx.fillStyle = '#FBBF24';
        ctx.fillText('created by cluelessness.net', padX + prefixWidth + bulletWidth, Math.round(27 * scale));

        // 6. Section Title (Serif, white, italic)
        ctx.font = `italic bold ${Math.round(20 * scale)}px "Playfair Display", Georgia, "Times New Roman", serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(sectionTitle, padX, Math.round(55 * scale));

        // 7. Timestamp on right side
        ctx.font = `${Math.round(10.5 * scale)}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
        ctx.fillStyle = '#94A3B8';
        ctx.textAlign = 'right';
        ctx.fillText(`Captured: ${timestampText}`, canvas.width - padX, Math.round(53 * scale));

        // 8. Draw captured section image
        ctx.drawImage(img, 0, headerHeight);

        // 9. Download the result as PNG
        const finalDataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = filename;
        link.href = finalDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        resolve();
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      reject(new Error(`Failed to load rendered section image: ${err}`));
    };

    img.src = sectionDataUrl;
  });
}

/**
 * Renders a target DOM node in an isolated 1280px desktop viewport via a hidden iframe.
 * This guarantees:
 * 1. CSS media queries (@media min-width: 640px, 768px, 1024px) evaluate to desktop values,
 *    so components layout with true desktop proportions instead of mobile stretching.
 * 2. The live UI never flashes, resizes, or jumps on the user's screen.
 * 3. Text wrapping, flexboxes, and SVGs compute natural desktop heights without collisions.
 */
async function captureViaDesktopIframe(
  targetElement: HTMLElement,
  targetWidth: number
): Promise<string> {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '0';
  iframe.style.top = '0';
  iframe.style.width = `${targetWidth}px`;
  iframe.style.height = '1400px';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  iframe.style.zIndex = '-99999';
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';

  document.body.appendChild(iframe);

  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error('Unable to access iframe document');
    }

    // 1. Copy all document stylesheets and font links to the iframe
    document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach((styleNode) => {
      iframeDoc.head.appendChild(styleNode.cloneNode(true));
    });

    // 2. Add base theme rules and reset animations/transitions inside iframe
    const iframeBaseStyle = iframeDoc.createElement('style');
    iframeBaseStyle.textContent = `
      *, *::before, *::after {
        box-sizing: border-box !important;
        transition: none !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background-color: #0A0C10 !important;
        color: #E0E0E0 !important;
        width: ${targetWidth}px !important;
        min-width: ${targetWidth}px !important;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif !important;
      }
      /* Remove scrollbars from iframe rendering */
      ::-webkit-scrollbar {
        display: none !important;
      }
    `;
    iframeDoc.head.appendChild(iframeBaseStyle);

    // 3. Deep clone target element into iframe
    const clone = targetElement.cloneNode(true) as HTMLElement;
    clone.style.width = '100%';
    clone.style.maxWidth = '100%';
    clone.style.height = 'auto';
    clone.style.minHeight = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.margin = '0';

    // Remove buttons marked for exclusion
    clone.querySelectorAll('[data-export-ignore="true"], .no-export').forEach((el) => el.remove());

    // Expand all scrollable containers so full content renders
    clone.querySelectorAll<HTMLElement>('.overflow-y-auto, .overflow-x-auto, .overflow-auto').forEach((el) => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    });

    iframeDoc.body.appendChild(clone);

    // 4. Wait for iframe to render and calculate layout at true 1280px width
    await new Promise((resolve) => {
      iframe.contentWindow?.requestAnimationFrame(() => {
        iframe.contentWindow?.requestAnimationFrame(() => {
          setTimeout(resolve, 200);
        });
      });
    });

    // Adjust iframe height to fit cloned content
    const measuredHeight = Math.max(clone.offsetHeight, clone.scrollHeight, 600);
    iframe.style.height = `${measuredHeight}px`;

    // 5. Capture the cloned node using html-to-image
    const dataUrl = await toPng(clone, {
      pixelRatio: 2,
      skipFonts: true,
      cacheBust: false,
      backgroundColor: '#161B22',
    });

    return dataUrl;
  } finally {
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }
}

/**
 * Exports a specific section of the application as a crisp, full-width (1280px) PNG image.
 * Uses an isolated desktop rendering pipeline so wide tables and charts never clip,
 * responsive media queries evaluate to desktop, and the live UI never jumps or flickers.
 */
export async function exportSectionImage(options: ExportSectionOptions): Promise<void> {
  const { elementId, sectionTitle, filenamePrefix = 'vic-simulator', targetWidth = 1280 } = options;

  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`exportSectionImage: Target element with id "${elementId}" not found.`);
    throw new Error(`Section element #${elementId} not found.`);
  }

  // Format timestamp for banner and filename
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const timestampText = `${formattedDate}, ${formattedTime}`;

  const cleanSlug = sectionTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const fileTimestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `${filenamePrefix}-${cleanSlug}-${fileTimestamp}.png`;

  let sectionDataUrl: string;

  try {
    // Attempt isolated desktop iframe capture first
    sectionDataUrl = await captureViaDesktopIframe(targetElement, targetWidth);
  } catch (iframeErr) {
    console.warn('Iframe capture failed, falling back to direct capture:', iframeErr);

    // Fallback: capture target element directly
    sectionDataUrl = await toPng(targetElement, {
      pixelRatio: 2,
      skipFonts: true,
      cacheBust: false,
      backgroundColor: '#161B22',
      filter: (domNode) => {
        const el = domNode as HTMLElement;
        if (el?.dataset?.exportIgnore === 'true' || el?.classList?.contains('no-export')) {
          return false;
        }
        return true;
      },
    });
  }

  // Draw branded header onto canvas and trigger PNG download
  await drawHeaderAndExport(sectionDataUrl, sectionTitle, timestampText, filename);
}
