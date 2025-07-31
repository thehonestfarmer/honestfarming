
// PWA Icon Generator Script
// This creates PNG versions from SVG for better PWA compatibility

function svgToPng(svgContent, width, height, outputPath) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = width;
  canvas.height = height;
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }, 'image/png');
    };
    img.onerror = reject;
    img.src = 'data:image/svg+xml;base64,' + btoa(svgContent);
  });
}

// Usage: Run this in browser console to generate PNG data URLs
