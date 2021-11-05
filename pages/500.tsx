// @ts-nocheck
import Link from 'components/Elements/Link'
import Layout from "components/Layout/Layout"

export default function Error() {
  return (
    <Layout>
      <div className="error-page">
      <b>Server error.</b>
        <p>Sorry, that&apos;s not supposed to happen!</p>
        <p>If you see this page - please send an email to <b>lumenwrites@gmail.com</b> and let me know.</p>
        <p>In the email, please mention what you were trying to do when this happened, <br/> that will really help me to find and fix the issue!</p>
      </div>
    </Layout>
  )
}
