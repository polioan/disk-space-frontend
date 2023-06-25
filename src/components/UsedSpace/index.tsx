import cl from './UsedSpace.module.scss'
import { formatBytes } from '../../helpers'
import { useMeQuery } from '../../hooks'
import cn from 'classnames'

interface UsedSpaceProps {
  className?: string | undefined
}

export const UsedSpace: React.FC<UsedSpaceProps> = ({ className }) => {
  const { usedSpace, storageSize } = useMeQuery()

  const progressInBytes = `${formatBytes(usedSpace)} / ${formatBytes(
    storageSize
  )}`

  const progressInPercentage = Math.floor((usedSpace / storageSize) * 100) || 0

  return (
    <div
      aria-label={`Использовано ${progressInPercentage}% `}
      title={`Использовано ${progressInPercentage}%`}
      className={cn(cl.bar, className)}
      data-progress-in-bytes={progressInBytes}
      style={
        { '--progress': `${progressInPercentage}%` } as React.CSSProperties
      }
    ></div>
  )
}
