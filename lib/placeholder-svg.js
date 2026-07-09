export function placeholderSvg({ label, colors, ratio }) {
  const [start, end] = colors;
  const [width, height] = ratio;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width * 400} ${height * 400}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      <circle cx="${width * 320}" cy="${height * 120}" r="${width * 90}" fill="rgba(255,255,255,0.08)" />
      <circle cx="${width * 90}" cy="${height * 320}" r="${width * 120}" fill="rgba(0,0,0,0.14)" />
      <text
        x="50%"
        y="82%"
        fill="rgba(255,255,255,0.82)"
        font-family="Georgia, serif"
        font-size="48"
        text-anchor="middle"
        letter-spacing="6"
      >${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
