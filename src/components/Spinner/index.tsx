import React from 'react';
import Style from './spinner.module.css';

function Spinner(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg height="1em" width="1em" viewBox="0 0 56 56" {...props}>
      <g className={Style.g}>
        <circle cx="28" cy="28" r="16" className={Style.circle} />
      </g>
    </svg>
    )
};

export default Spinner;