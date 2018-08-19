import React from 'react';
import Media from 'react-media';

const fCClogo = '/img/freeCodeCamp-logo.svg';
const fCCglyph = '/img/FFCFire.png';

function NavLogo() {
  return (
    <Media query='(min-width: 735px)'>
      {matches =>
        matches ? (
          <img
            alt='learn to code at freeCodeCamp logo'
            className='nav-logo logo'
            src={fCClogo}
          />
        ) : (
          <img
            alt='learn to code at freeCodeCamp logo'
            className='nav-logo logo'
            src={fCCglyph}
          />
        )
      }
    </Media>
  );
}

NavLogo.displayName = 'NavLogo';

export default NavLogo;
