import { useState } from 'react'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'
import Tabs from 'components/Elements/Tabs'
import { useAuth } from 'context/AuthContext'

export default function Settings({ user }) {
  return (
    <Layout>
      <Tabs tabs={['Account Settings', 'Writing Settings']}>
        <div className="settings text">
          <h1>Account Settings</h1>
          <ManageSubscription user={ user }/>
          <AccountSettings user={ user }/>
          <ProfileSettings user={ user }/>
        </div>
        <div className="settings text">
          <h1>Writing Settings</h1>
          <h4>Writing Sprint</h4>
          <p>Sprint pace and duration.</p>
          <h4>Daily word count goal</h4>
          <p>How many words per day you intend to write.</p>
          <input type="number" value={250} onChange={() => {}} />
          <WritingDays />
          <h4>Email Reminders</h4>
          <p>Send email reminders when it's time to write:</p>
        </div>
      </Tabs>
    </Layout>
  )
}

function AccountSettings({ user }) {
  const [info, setInfo] = useState(user)
  console.log('user', user)
  function changeInfo(e) {
      let { value, name } = e.target;
      setInfo((prev) => ({...prev, [name]: value }))
  }
  return (
    <>
      <h4>Account</h4>
      <input placeholder="Username..." name="username" value={info.username} onChange={changeInfo} />
      <input placeholder="Email..." name="email" value={info.email} onChange={changeInfo} />
      {/* <input placeholder="Change password..." /> */}
      <button className="btn btn-cta right">Save</button>
      <div className="clearfix" />
    </>
  )
}
function ProfileSettings({ user }) {
  const [info, setInfo] = useState(user)
  console.log('user', user)
  function changeInfo(e) {
      let { value, name } = e.target;
      setInfo((prev) => ({...prev, [name]: value }))
  }
  return (
    <>
      <h4>Your Profile</h4>
      <Link href="/@lumen">https://writingstreak.io/@lumen</Link>
      <input placeholder="Bio..." name="bio" value={info.bio} onChange={changeInfo} />
      <input placeholder="Website..." name="website" value={info.website} onChange={changeInfo} />
      {/* <input placeholder="Twitter..." /> */}
      <button className="btn btn-cta right">Save</button>
      <div className="clearfix" />
    </>
  )
}
function ManageSubscription({ user }) {
  return (
    <>
      <h4>Billing</h4>
      <p>Upgrade your account, cancel, pause, or renew subscription, update payment method.</p>
      <a className="btn btn-cta right" href="/api/payments/create-customer-portal-session">
        Manage my Subscription
      </a>
      <div className="clearfix" />
    </>
  )
}
function WritingDays() {
  const [writingDays, setWritingDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  function toggleDay(name) {
    if (writingDays.includes(name)) {
      setWritingDays((prev) => prev.filter((d) => d !== name))
    } else {
      setWritingDays((prev) => [...prev, name])
    }
  }

  return (
    <>
      <h4>Writing days</h4>
      <p>
        The days of the week when you intend to write (not writing during the inactive days won't count against your
        streak).
      </p>
      <div className="writing-days">
        {names.map((name) => (
          <button
            key={name}
            className={`writing-day ${writingDays.includes(name) ? 'active' : ''}`}
            onClick={() => toggleDay(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="clearfix" />
    </>
  )
}

import { getUser } from 'prisma/api/users/get-user'

export async function getServerSideProps({ req, res, query }) {
  const user = await getUser(req)
  if (!user) return { redirect: { permanent: false, destination: '/' }, props: {} }

  const { username, email, bio, website } = user
  return { props: { user: { username, email, bio, website } } }
}
