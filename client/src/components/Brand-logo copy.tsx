import SFG_LOGO from '@/assets/sfg_logo.png';
import POLICE_LOGO from '@/assets/dubai_police_logo.png';
import GOVERNMENT_LOGO from '@/assets/dubai_govt_logo.png';

import SFG_LOGO_BLACK from '@/assets/sfg-black.png';
import POLICE_LOGO_BLACK from '@/assets/police-black.png';
import GOVERNMENT_LOGO_BLACK from '@/assets/govt-green.png';

import SFG_LOGO_GREEN from '@/assets/sfg-green.png';
import POLICE_LOGO_GREEN from '@/assets/police-green.png';
import GOVERNMENT_LOGO_GREEN from '@/assets/govt-green.png';

const logoVariants: any = {
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

export default function BrandLogo({
  variant = 'normal',
  classNames = {},
}: any) {
  const logos = logoVariants[variant] || logoVariants.normal;

  return (
    <div className='flex items-center gap-4'>
      <img src={logos.sfg} alt='SFG Logo' className={classNames.sfg || ''} />

      <img
        src={logos.police}
        alt='Police Logo'
        className={classNames.police || ''}
      />

      <img
        src={logos.govt}
        alt='Government Logo'
        className={classNames.govt || ''}
      />
    </div>
  );
}
