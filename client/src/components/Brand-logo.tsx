import * as React from 'react';


import SFG_LOGO from '@/assets/sfg_logo.png';
import POLICE_LOGO from '@/assets/dubai_police_logo.png';
import GOVERNMENT_LOGO from '@/assets/dubai_govt_logo.png';

import SFG_LOGO_BLACK from '@/assets/sfg-black.png';
import POLICE_LOGO_BLACK from '@/assets/police-black.png';
import GOVERNMENT_LOGO_BLACK from '@/assets/govt-green.png';

import SFG_LOGO_GREEN from '@/assets/sfg-green.png';
import POLICE_LOGO_GREEN from '@/assets/police-green.png';
import GOVERNMENT_LOGO_GREEN from '@/assets/govt-green.png';
import { useDesignMode } from '@/contexts/DesignModeContext';

const logoVariants = {
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

export default function BrandLogo() {
  const { mode } = useDesignMode();

  // Map design mode → logo variant
  const variant =
    mode === 'wireframe'
      ? 'black'
      : mode === 'low-fidelity'
      ? 'green'
      : 'normal';

  const logos = logoVariants[variant];

  /**
   * Full isolation from global design CSS
   */
  const containerStyle: React.CSSProperties = {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const imgStyle: React.CSSProperties = {
    all: 'unset',
    display: 'block',
    opacity: 1,
    filter: 'none',
    userSelect: 'none',
  };

  return (
    <div style={containerStyle}>
      <img src={logos.sfg} alt='SFG Logo' style={{ ...imgStyle, height: 40 }} />
      <img
        src={logos.police}
        alt='Police Logo'
        style={{ ...imgStyle, height: 56 }}
      />
      <img
        src={logos.govt}
        alt='Government Logo'
        style={{ ...imgStyle, height: 48 }}
      />
    </div>
  );
}
