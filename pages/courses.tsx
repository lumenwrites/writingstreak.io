import { getAllCourses } from 'api/courses'
import Link from 'components/Elements/Link'
import Layout from "components/Layout/Layout"
import Browse from "components/Posts/Browse"
import SubscribeBox from 'components/Layout/SubscribeBox'

export default function index({ courses }) {
  return (
    <Layout>
      <Browse posts={courses} />
      <SubscribeBox/>
    </Layout>
  )
}

export async function getStaticProps() {
  const courses = await getAllCourses()
  console.log('getStaticProps courses', courses)
  return { props: { courses } }
}
