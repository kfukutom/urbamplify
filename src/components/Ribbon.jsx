import React from 'react';
import './Ribbon.css';

import {amazonLogo} from '../assets/amazon.png';
/*
import rossLogo from './assets/logos/ross.jpg';
import tjhsstLogo from './assets/logos/tjhsst.png';
import v1michiganLogo from './assets/logos/v1michigan.jpeg';
import engineeringLogo from './assets/logos/engineering.png';
import commaLogo from './assets/logos/comma.png';
import jackpotLogo from './assets/logos/jackpot.png';
import foundessLogo from './assets/logos/foundess.png';
*/

const Ribbon = () => {
  const logos = [
    { src: amazonLogo, alt: "Amazon" },
    /*
    { src: rossLogo, alt: "Ross" },
    { src: tjhsstLogo, alt: "TJHSST" },
    { src: v1michiganLogo, alt: "V1 @ Michigan" },
    { src: engineeringLogo, alt: "Engineering" },
    { src: commaLogo, alt: "Comma Capital" },
    { src: jackpotLogo, alt: "Jackpot" },
    { src: foundessLogo, alt: "Foundess" },
     */
  ];

  return (
    <div className="logo-ribbon">
      <div className="logo-ribbon-content">
        {[...Array(3)].map((_, index) => (
          <React.Fragment key={index}>
            {logos.map((logo, logoIndex) => (
              <img key={`${index}-${logoIndex}`} src={logo.src} alt={logo.alt} className="logo" />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ribbon; // Export Ribbon component final.