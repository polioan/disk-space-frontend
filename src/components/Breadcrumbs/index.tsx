import cl from './Breadcrumbs.module.scss'
import { useFilesStore } from '../../stores'
import { ArrowIcon } from '../../icons'

export const Breadcrumbs: React.FC = () => {
  const [path, goToPathFromIndex] = useFilesStore(store => [
    store.path,
    store.goToPathFromIndex,
  ])

  return (
    <nav>
      <ol className={cl.line_container}>
        {path.map((pathPart, idx, arr) => (
          <li
            className={cl.path_part_container}
            key={`${pathPart}${idx}`}
            aria-current={idx === arr.length - 1 ? 'page' : undefined}
          >
            {idx === 0 && <ArrowIcon />}
            <button
              onClick={() => goToPathFromIndex(idx)}
              className={cl.path_part}
            >
              {pathPart}
            </button>
            {idx < arr.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
