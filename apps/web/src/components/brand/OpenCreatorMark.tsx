import type { SVGProps } from 'react';

// videoCreator VN identity, Nguyễn Thành Công. Paths keep small icons font-independent.
export default function OpenCreatorMark({ size = 18, className, ...props }:
  Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & { size?: number }) {
  return <svg {...props} className={className === undefined ? 'opencreator-mark' : `opencreator-mark ${className}`}
    width={size} height={size} viewBox="0 0 1024 1024" focusable="false">
    <rect width="1024" height="1024" fill="#000" />
    <path d="M120 300H220L320 620L420 300H520L370 724H270Z M560 300H660L804 550V300H904V724H804L660 474V724H560Z" fill="#fff" />
  </svg>;
}
