// Original line-art style illustrations (inline SVG): black strokes + green accents.
// Abstract medical/dashboard scenes — not copied from any source.
const S = { fill: "none", stroke: "#111827", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" };
const A = "#10b981";   // accent green fill
const AL = "#a7f3d0";  // light green fill

export const HeroArt = () => (
  <svg viewBox="0 0 460 360" width="100%" role="img" aria-label="Hospital dashboard illustration">
    {/* cloud */}
    <path {...S} d="M330 60c-4-16-22-24-36-16-6-14-26-16-34-2-14-2-24 10-20 22 4 12 18 12 18 12h66s18-2 16-18z" fill={AL} />
    {/* monitor */}
    <rect {...S} x="60" y="90" width="220" height="150" rx="10" fill="#fff" />
    <rect x="60" y="90" width="220" height="30" rx="10" fill={A} />
    <circle cx="78" cy="105" r="4" fill="#fff" /><circle cx="92" cy="105" r="4" fill="#fff" />
    {/* chart bars */}
    <line {...S} x1="95" y1="210" x2="95" y2="170" /><line {...S} x1="125" y1="210" x2="125" y2="150" />
    <line {...S} x1="155" y1="210" x2="155" y2="185" /><line {...S} x1="185" y1="210" x2="185" y2="140" />
    {/* pie */}
    <circle {...S} cx="235" cy="175" r="28" fill="#fff" />
    <path d="M235 175 L235 147 A28 28 0 0 1 260 188 Z" fill={A} />
    {/* stand */}
    <line {...S} x1="170" y1="240" x2="170" y2="262" /><line {...S} x1="135" y1="262" x2="205" y2="262" />
    {/* medical cross badge */}
    <circle {...S} cx="355" cy="200" r="46" fill={A} />
    <path d="M348 178h14v14h14v14h-14v14h-14v-14h-14v-14h14z" fill="#fff" />
    {/* test tube */}
    <rect {...S} x="300" y="120" width="18" height="50" rx="9" fill={AL} />
  </svg>
);

export const ArtDigitize = () => (
  <svg viewBox="0 0 460 320" width="100%" role="img" aria-label="Digitize records">
    {/* paper */}
    <rect {...S} x="50" y="70" width="120" height="160" rx="8" fill="#fff" />
    <line {...S} x1="72" y1="100" x2="148" y2="100" /><line {...S} x1="72" y1="125" x2="148" y2="125" />
    <line {...S} x1="72" y1="150" x2="130" y2="150" /><line {...S} x1="72" y1="175" x2="148" y2="175" />
    {/* arrow */}
    <line {...S} x1="195" y1="150" x2="255" y2="150" /><path {...S} d="M243 138l14 12-14 12" />
    {/* device/screen */}
    <rect {...S} x="285" y="70" width="130" height="160" rx="12" fill="#fff" />
    <rect x="285" y="70" width="130" height="26" rx="12" fill={A} />
    <circle {...S} cx="350" cy="160" r="34" fill={AL} />
    <path {...S} d="M336 160l10 10 20-22" />
  </svg>
);

export const ArtCustomize = () => (
  <svg viewBox="0 0 460 320" width="100%" role="img" aria-label="Customize settings">
    {/* big gear */}
    <circle {...S} cx="170" cy="160" r="60" fill={AL} />
    <circle {...S} cx="170" cy="160" r="26" fill="#fff" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 170 + Math.cos(a) * 60, y1 = 160 + Math.sin(a) * 60;
      const x2 = 170 + Math.cos(a) * 76, y2 = 160 + Math.sin(a) * 76;
      return <line key={i} {...S} x1={x1} y1={y1} x2={x2} y2={y2} />;
    })}
    {/* sliders */}
    <line {...S} x1="290" y1="110" x2="410" y2="110" /><circle cx="330" cy="110" r="10" fill={A} stroke="#111827" strokeWidth="3" />
    <line {...S} x1="290" y1="160" x2="410" y2="160" /><circle cx="380" cy="160" r="10" fill={A} stroke="#111827" strokeWidth="3" />
    <line {...S} x1="290" y1="210" x2="410" y2="210" /><circle cx="320" cy="210" r="10" fill={A} stroke="#111827" strokeWidth="3" />
  </svg>
);

export const ArtAccess = () => (
  <svg viewBox="0 0 460 320" width="100%" role="img" aria-label="Access anywhere">
    {/* globe */}
    <circle {...S} cx="160" cy="160" r="80" fill={AL} />
    <ellipse {...S} cx="160" cy="160" rx="34" ry="80" /><line {...S} x1="80" y1="160" x2="240" y2="160" />
    <path {...S} d="M95 120c40 24 90 24 130 0M95 200c40-24 90-24 130 0" />
    {/* devices */}
    <rect {...S} x="300" y="120" width="110" height="80" rx="8" fill="#fff" />
    <line {...S} x1="300" y1="210" x2="410" y2="210" />
    <rect {...S} x="360" y="150" width="50" height="90" rx="8" fill={A} />
  </svg>
);

export const ArtSecurity = () => (
  <svg viewBox="0 0 460 320" width="100%" role="img" aria-label="Data security">
    <path {...S} d="M230 60l90 34v70c0 60-46 92-90 106-44-14-90-46-90-106V94z" fill={AL} />
    {/* lock */}
    <rect {...S} x="195" y="160" width="70" height="56" rx="8" fill="#fff" />
    <path {...S} d="M208 160v-14a22 22 0 0 1 44 0v14" />
    <circle cx="230" cy="184" r="7" fill={A} /><line {...S} x1="230" y1="190" x2="230" y2="202" />
  </svg>
);

export const CtaArt = () => (
  <svg viewBox="0 0 360 300" width="100%" role="img" aria-label="Support">
    <circle {...S} cx="180" cy="120" r="50" fill={A} stroke="#0c2b26" />
    <path d="M165 105h12v12h12v12h-12v12h-12v-12h-12v-12h12z" fill="#fff" />
    {/* phone */}
    <rect {...S} x="120" y="200" width="120" height="60" rx="10" fill="#fff" stroke="#0c2b26" />
    <path {...S} d="M140 230c20 14 60 14 80 0" stroke="#0c2b26" />
    <line {...S} x1="180" y1="170" x2="180" y2="200" stroke="#0c2b26" />
  </svg>
);
