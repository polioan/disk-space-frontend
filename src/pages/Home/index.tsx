import cl from './Home.module.scss'
import { Breadcrumbs, Header, UsedSpace } from '../../components'
import { UploadFilesButton } from './UploadFilesButton'
import { FilesContainer } from './FilesContainer'
import { CreateButton } from './CreateButton'

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className={cl.main}>
        <section className={cl.left_section}>
          <UploadFilesButton />
          <CreateButton />
          <UsedSpace className={cl.used_space} />
        </section>
        <section className={cl.right_section}>
          <Breadcrumbs />
          <FilesContainer />
        </section>
      </main>
    </>
  )
}

export default Home
