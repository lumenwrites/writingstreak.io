// @ts-nocheck
import Link from 'components/Elements/Link'
import Layout from "components/Layout/Layout"

export default function Error() {
  return (
    <Layout>
      <div className="error-page">
      <b>404 - Page not Found, sorry!</b>
      <p>You can see all of our posts <b><Link href="/">here</Link></b>.</p>
      </div>
    </Layout>
  )
}
