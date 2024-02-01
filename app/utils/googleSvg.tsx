import * as React from 'react'
import { SVGProps } from 'react'

export function GoogleSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.26 4.436A7.14 7.14 0 017.643.5c1.925 0 3.542.708 4.778 1.86l-2.047 2.05C9.633 3.7 8.69 3.34 7.643 3.34c-1.86 0-3.436 1.258-3.997 2.946a4.29 4.29 0 00-.224 1.357c0 .471.082.928.224 1.357.562 1.689 2.136 2.945 3.997 2.945.96 0 1.778-.254 2.418-.682a3.285 3.285 0 001.426-2.156H7.643V6.344h6.727c.084.467.13.955.13 1.461 0 2.176-.779 4.007-2.13 5.25-1.181 1.091-2.799 1.73-4.727 1.73A7.14 7.14 0 011.26 4.436z"
        fill="#fff"
      />
    </svg>
  )
}
