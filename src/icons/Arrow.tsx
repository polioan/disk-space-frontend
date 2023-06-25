export const ArrowIcon: React.FC<React.ComponentProps<'svg'>> = props => {
  return (
    <svg
      role='img'
      aria-label='Значок стрелки'
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path fill='none' d='M0 0h24v24H0V0z'></path>
      <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
    </svg>
  )
}
