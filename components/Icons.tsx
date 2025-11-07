import React from 'react';

export const BloomyMascot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Stem */}
    <path d="M 50 95 C 50 85, 45 70, 50 60" stroke="#A8D8B9" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Leaf */}
    <path d="M 50 80 C 60 85, 65 75, 53 70" fill="#A8D8B9" stroke="#A8D8B9" strokeWidth="2" strokeLinecap="round" />
    {/* Petals */}
    <path d="M50,60 C30,60 30,30 50,30 C70,30 70,60 50,60 Z" fill="#FFC7C7"/>
    <path d="M50,60 C50,80 80,80 80,60 C80,40 50,40 50,60 Z" fill="#FF8A8A"/>
    <path d="M50,60 C30,60 30,80 50,80 C70,80 70,60 50,60 Z" fill="#FFC7C7"/>
    <path d="M50,60 C50,40 20,40 20,60 C20,80 50,80 50,60 Z" fill="#FF8A8A"/>
    {/* Face */}
    <circle cx="50" cy="60" r="18" fill="#FFDF7A" />
    <circle cx="44" cy="58" r="2.5" fill="#444" />
    <circle cx="56" cy="58" r="2.5" fill="#444" />
    <path d="M 46 65 Q 50 69 54 65" stroke="#444" fill="none" strokeWidth="2" strokeLinecap="round" />
  </svg>
);


export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L21 3m0 0l-7.5 16.5L12 13.5m9-10.5L12 13.5" />
  </svg>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.226.55-.22 1.156-.22 1.706 0 .55.22 1.02.684 1.11 1.226l.044.261a3.75 3.75 0 015.59 2.282l.121-.04a1.875 1.875 0 012.318 2.318l-.04.121a3.75 3.75 0 01-2.282 5.59l-.261.044c-.542.09-1.007.56-1.226 1.11-.22.55-.22 1.156 0 1.706.22.55.684 1.02 1.226 1.11l.261.044a3.75 3.75 0 012.282 5.59l-.04.121a1.875 1.875 0 01-2.318 2.318l-.121-.04a3.75 3.75 0 01-5.59 2.282l-.044.261c-.09.542-.56 1.007-1.11 1.226-.55.22-1.156-.22-1.706 0-.55.22-1.02.684-1.11-1.226l-.044-.261a3.75 3.75 0 01-5.59-2.282l-.121.04a1.875 1.875 0 01-2.318-2.318l.04-.121a3.75 3.75 0 012.282-5.59l.261-.044c.542-.09 1.007-.56 1.226-1.11.22-.55.22-1.156 0-1.706-.22-.55-.684-1.02-1.226-1.11l-.261-.044a3.75 3.75 0 01-2.282-5.59l.04-.121a1.875 1.875 0 012.318-2.318l.121.04a3.75 3.75 0 015.59-2.282l.044-.261zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
    </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716C7.59 2.25 6.68 3.204 6.68 4.384v.916m7.5 0h-7.5" />
    </svg>
);

export const BloomingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <g className="breathing-face-container">
      <circle cx="12" cy="12" r="10" className="breathing-face-bg" fillOpacity="0.8"/>
      <circle cx="7" cy="13.5" r="2" className="breathing-cheek" fillOpacity="0.1" />
      <circle cx="17" cy="13.5" r="2" className="breathing-cheek" fillOpacity="0.1" />
      <path d="M9 10.5 C 9.5 9.5, 10.5 9.5, 11 10.5" className="breathing-eye" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
      <path d="M13 10.5 C 13.5 9.5, 14.5 9.5, 15 10.5" className="breathing-eye" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
      <path d="M9 15 Q 12 16.5 15 15" className="breathing-mouth" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.9"/>
    </g>
  </svg>
);


export const BudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
      <path d="M12,12.5 C11,14 9,14 8,12.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M16,12.5 C15,14 13,14 12,12.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
);

export const DroopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="8" fillOpacity="0.8"/>
      <path d="M8.5 10.5 Q 9.5 9 10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M13.5 10.5 Q 14.5 9 15.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M9 15 H 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M6,8 C4,10 4,14 6,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
      <path d="M18,8 C20,10 20,14 18,16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.6"/>
    </svg>
);

export const WiltedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="8" fillOpacity="0.6"/>
      <path d="M8.5 10.5 Q 9.5 11.5 10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M13.5 10.5 Q 14.5 11.5 15.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M9 15 Q 12 13.5 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M7,7 C5,9 5,15 7,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
      <path d="M17,7 C19,9 19,15 17,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
    </svg>
);


export const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a2.25 2.25 0 01-1.476-1.476L12 18.75l1.938-.648a2.25 2.25 0 011.476-1.476L17.25 15l.648 1.938a2.25 2.25 0 011.476 1.476L21 18.75l-1.938.648a2.25 2.25 0 01-1.476 1.476z" />
    </svg>
);

export const HeartPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
    </svg>
);

export const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125-1.125h-4.5A1.125 1.125 0 0113.5 10.5z" />
    </svg>
);

export const WindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12c0-3.314 2.686-6 6-6s6 2.686 6 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3m12 0h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17c0-2.21 1.79-4 4-4s4 1.79 4 4" />
  </svg>
);

export const PaletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402a3.75 3.75 0 00-.615-6.401l-6.402 6.402a3.75 3.75 0 000 5.304zm-3.022.72a.75.75 0 001.06 1.06l1.5-1.5a.75.75 0 00-1.06-1.06l-1.5 1.5zm1.5-1.5l1.5-1.5a.75.75 0 00-1.06-1.06l-1.5 1.5a.75.75 0 001.06 1.06z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.875 14.875a3.75 3.75 0 115.304-5.304m-5.304 5.304L1.5 22.5l1.06-1.061 9.314-9.314z" />
    </svg>
);