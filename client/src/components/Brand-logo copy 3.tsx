import SFG_LOGO from '@/assets/sfg_logo.png';
import POLICE_LOGO from '@/assets/dubai_police_logo.png';
import GOVERNMENT_LOGO from '@/assets/dubai_govt_logo.png';

import SFG_LOGO_BLACK from '@/assets/sfg-black.png';
import POLICE_LOGO_BLACK from '@/assets/police-black.png';
import GOVERNMENT_LOGO_BLACK from '@/assets/govt-green.png';

import SFG_LOGO_GREEN from '@/assets/sfg-green.png';
import POLICE_LOGO_GREEN from '@/assets/police-green.png';
import GOVERNMENT_LOGO_GREEN from '@/assets/govt-green.png';

const logoVariants: Record<string, any> = {
  normal: {
    sfg: SFG_LOGO,
    police: POLICE_LOGO,
    govt: GOVERNMENT_LOGO,
  },
  black: {
    sfg: SFG_LOGO_BLACK,
    police: POLICE_LOGO_BLACK,
    govt: GOVERNMENT_LOGO_BLACK,
  },
  green: {
    sfg: SFG_LOGO_GREEN,
    police: POLICE_LOGO_GREEN,
    govt: GOVERNMENT_LOGO_GREEN,
  },
};

export default function BrandLogo({ variant = 'normal' }) {
  const logos = logoVariants[variant] || logoVariants.normal;

  /**
   * Inline hard reset + minimal restore
   * This blocks global wireframe styles like:
   * opacity, filter, grayscale, outlines, etc.
   */
  const resetStyle: React.CSSProperties = {
    all: 'unset',
  };

  const baseImgStyle: React.CSSProperties = {
    all: 'unset',
    display: 'block',
    opacity: 1,
    filter: 'none',
    userSelect: 'none',
    maxWidth: 'none',
  };

  return (
    <div
      style={{
        ...resetStyle,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <img
        src={logos.sfg}
        alt='SFG Logo'
        style={{
          ...baseImgStyle,
          height: '40px',
        }}
      />

      <img
        src={logos.police}
        alt='Police Logo'
        style={{
          ...baseImgStyle,
          height: '56px',
        }}
      />

      <img
        src={logos.govt}
        alt='Government Logo'
        style={{
          ...baseImgStyle,
          height: '48px',
        }}
      />
    </div>
  );
}
