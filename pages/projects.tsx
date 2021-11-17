import Header from 'components/Portfolio/Header'
import Skills from 'components/Portfolio/Skills'
import Projects from 'components/Portfolio/Projects'
import About from 'components/Portfolio/About'
import Layout from 'components/Layout/Layout'

export default function MyProjects() {
  return (
    <Layout subnav={<Header />}>
      {/* <Header /> */}
     {/*  <Skills /> */}
      <Projects />
      {/* <About />  */}
    </Layout>
  )
}
