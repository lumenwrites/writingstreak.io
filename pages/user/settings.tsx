import axios from 'axios'
import slugify from 'slugify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'
import Tabs from 'components/Elements/Tabs'

const SettingsContext = createContext({
  settings: {} as any,
  updateSetting: (name, value) => {},
  updateInput: (e) => {},
  saveSettings: () => {},
})

export default function Settings({ user }) {
  const [settings, setSettings] = useState({
    id: user.id,
    subscriptionStatus: user.subscriptionStatus,
    username: user.username,
    email: user.email,
    bio: user.bio,
    website: user.website,
    twitter: user.twitter,
    // Writing settings
    writingDays: user.writingDays,
    targetWordcount: user.targetWordcount,
    sprintPace: user.sprintPace,
    sprintDuration: user.sprintDuration,
  })
  function updateSetting(name, value) {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }
  function updateInput(e) {
    let { value, name } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }
  async function saveSettings() {
    // console.log('Saving settings to server', settings)
    const { data } = await axios.post('/api/users/update-settings', settings)
    console.log('Saved settings to server', data)
    // If I changed username, I want to refetch it.
    window.location.reload()
  }
  return (
    <Layout>
      <SettingsContext.Provider value={{ settings, updateSetting, saveSettings, updateInput }}>
        <Tabs tabs={['Account Settings', 'Writing Settings']}>
          <div className="settings text">
            <h1>Account Settings</h1>
            <ManageSubscription />
            {/* <AccountSettings /> */}
            <ProfileSettings />
          </div>
          <div className="settings text">
            <WritingSettings />
          </div>
        </Tabs>
      </SettingsContext.Provider>
    </Layout>
  )
}

// function AccountSettings() {
//   const { settings, updateInput, saveSettings } = useContext(SettingsContext)
//   return (
//     <>
//       <h4>Account</h4>
//       {/* <input placeholder="Email..." value={settings.email} name="email" onChange={updateInput} /> */}
//       {/* <input placeholder="Change password..." /> */}
//       <button className="btn btn-cta right" onClick={saveSettings}>
//         Save
//       </button>
//       <div className="clearfix" />
//     </>
//   )
// }
function ProfileSettings() {
  const { settings, updateSetting, updateInput, saveSettings } = useContext(SettingsContext)
  function updateUsername(e) {
    updateSetting('username', slugify(e.target.value, { lower: true, strict: true }))
  }
  return (
    <>
      <h4>Your Profile</h4>
      <p>Username:</p>
      <a href={`/@${settings.username}`} target="_blank" rel="noopener noreferrer">https://prolificacademy.io/@{settings.username}</a>
      <input placeholder="Username..." value={settings.username} name="username" onChange={updateUsername} />
      <p>Bio:</p>
      <input placeholder="Bio..." name="bio" value={settings.bio} onChange={updateInput} />
      <p>Website:</p>
      <input placeholder="Website..." name="website" value={settings.website} onChange={updateInput} />
      <p>Twitter handle:</p>
      <input placeholder="Twitter..." name="twitter" value={settings.twitter} onChange={updateInput} />
      {/* <input placeholder="Twitter..." /> */}
      <button className="btn btn-cta right" onClick={saveSettings}>
        Save
      </button>
      <div className="clearfix" />
    </>
  )
}
function ManageSubscription() {
  const { settings } = useContext(SettingsContext)
  return (
    <>
      <h4>Billing</h4>
      <p>Upgrade your account, cancel, pause, or renew subscription, update payment method.</p>
      {settings.subscriptionStatus === 'FREE' || settings.subscriptionStatus === 'LIFETIME_FREE' ? (
        <a className="btn btn-cta right" href="/api/payments/create-checkout-session">
          <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
          Upgrade my Subscription ($20/mo)
        </a>
      ) : (
        <a className="btn btn-cta right" href="/api/payments/create-customer-portal-session">
          Manage my Subscription
        </a>
      )}
      <div className="clearfix" />
    </>
  )
}

function WritingSettings() {
  const { settings, updateSetting, updateInput, saveSettings } = useContext(SettingsContext)
  return (
    <div>
      <h1>Writing Settings</h1>
      <h4>Writing Sprint</h4>
      <p>Sprint pace and duration.</p>
      <div className="dropdown sprint-pace">
        <div className="btn menu-handle">{settings.sprintPace}</div>
        <div className="menu">
          <button className="btn item" onClick={() => updateSetting('sprintPace', 'None')}>
            None
          </button>
          <button className="btn item" onClick={() => updateSetting('sprintPace', 'Slow')}>
            Slow
          </button>
          <button className="btn item" onClick={() => updateSetting('sprintPace', 'Medium')}>
            Medium
          </button>
          <button className="btn item" onClick={() => updateSetting('sprintPace', 'Fast')}>
            Fast
          </button>
        </div>
      </div>
      <div className="dropdown sprint-duration">
        <div className="btn menu-handle">{settings.sprintDuration} min</div>
        <div className="menu">
          {[5, 10, 15, 20, 30].map((duration) => (
            <button key={duration} className="btn item" onClick={() => updateSetting('sprintDuration', duration)}>
              {duration} min
            </button>
          ))}
        </div>
      </div>
      <div className="clearfix" />
      <h4>Daily wordcount goal</h4>
      <p>The number of words per day you intend to write.</p>
      <input
        type="number"
        placeholder="Wordcount..."
        name="targetWordcount"
        value={settings.targetWordcount}
        onChange={(e) => updateSetting('targetWordcount', parseInt(e.target.value))}
      />
      <WritingDays />
      <button className="btn btn-cta right" onClick={saveSettings}>
        Save
      </button>
      <div className="clearfix" />
      {/* <h4>Email Reminders</h4>
      <p>Send email reminders when it's time to write:</p> */}
    </div>
  )
}

function WritingDays() {
  const { settings, updateSetting, updateInput, saveSettings } = useContext(SettingsContext)
  const [writingDays, setWritingDays] = useState(settings.writingDays)
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  useEffect(() => {
    updateSetting('writingDays', writingDays)
  }, [writingDays])
  function toggleDay(name) {
    setWritingDays((prev) => {
      let updatedDays
      if (prev.includes(name)) {
        updatedDays = prev.filter((d) => d !== name)
      } else {
        updatedDays = [...prev, name]
      }
      return updatedDays
    })
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
  const {
    id,
    subscriptionStatus,
    username,
    email,
    bio,
    website,
    twitter,
    writingDays,
    targetWordcount,
    sprintPace,
    sprintDuration,
  } = user
  return {
    props: {
      user: {
        id,
        subscriptionStatus,
        username,
        email,
        bio,
        website,
        twitter,
        writingDays,
        targetWordcount,
        sprintPace,
        sprintDuration,
      },
    },
  }
}
