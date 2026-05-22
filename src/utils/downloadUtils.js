/**
 * Download HTML element as PNG image
 * Requires: npm install html-to-image
 */

const waitForDocumentFonts = async () => {
  if (typeof document === "undefined" || !document.fonts?.ready) return;

  try {
    // Explicitly load all fonts before proceeding
    await document.fonts.load('16px "Tiro Bangla"');
    await document.fonts.ready;
  } catch (error) {
    console.warn("Font loading wait failed:", error);
  }
};

const waitForNextPaint = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
      resolve();
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });

export const downloadPNG = async (element, fileName = "result.png") => {
  try {
    // Dynamic import of html-to-image
    const { toPng } = await import("html-to-image");

    // Wait for fonts and next paint
    await waitForDocumentFonts();
    await waitForNextPaint();

    // Wait for all images to load
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );

    // Wait for rendering - extended for font rendering
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get proper dimensions including absolutely positioned children
    const rect = element.getBoundingClientRect();
    let width = element.offsetWidth || rect.width;
    let height = element.offsetHeight || rect.height;

    // Handle case where element has no explicit dimensions
    if (!width || width === 0) width = 800;
    if (!height || height === 0) height = 600;

    // Convert element to PNG
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 3,  // Increased for better quality
      backgroundColor: "#ffffff",
      width: Math.max(width, 200),
      height: Math.max(height, 200),
      allowTaint: true,
      useCORS: true,
      filter: (node) => {
        // Skip problematic external stylesheets
        if (node.tagName === "LINK" && node.href && node.href.includes("fonts.googleapis.com")) {
          return false;
        }
        return true;
      },
    });

    // Create blob from data URL and download
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PNG:", error);
    throw new Error(error?.message || "Failed to download image");
  }
};

/**
 * Download HTML element as PDF
 * Requires: npm install jspdf html-to-image
 */

