import axios from 'axios'
import moment from 'moment'
import slugify from 'slugify'
import { useState, useEffect, createContext, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'components/Elements/DatePicker'
import NumberFormat from 'react-number-format'

import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'
import Tabs from 'components/Elements/Tabs'
import Checkbox from 'components/Elements/Checkbox'

import { countWritingDays } from 'components/Stats/utils'

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
    blurredMode: user.blurredMode,
    typewriterMode: user.typewriterMode,
    startDate: moment(user.startDate).toDate(),
    endDate: moment(user.endDate).toDate(),
    writingGoal: user.writingGoal,
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
        <Tabs tabTitles={['Account Settings', 'Writing Settings']}>
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
      <a href={`/@${settings.username}`} target="_blank" rel="noopener noreferrer">
        https://writingstreak.io/@{settings.username}
      </a>
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
      <WritingDays />
      <h4>Daily wordcount goal</h4>
      <p>The number of words per day you intend to write.</p>
      <NumberFormat
        value={settings.targetWordcount}
        suffix=" words"
        placeholder="250 words"
        thousandSeparator={true}
        renderText={(value) => <div>{value} words</div>}
        onValueChange={({ value }) => updateSetting('targetWordcount', parseInt(value))}
      />
      <WritingSprint />
      <WritingGoal />
      <button className="btn btn-cta right" onClick={saveSettings}>
        Save
      </button>
      <div className="clearfix" />
      {/* <h4>Email Reminders</h4>
      <p>Send email reminders when it's time to write:</p> */}
    </div>
  )
}

function WritingSprint() {
  const { settings, updateSetting, updateInput, saveSettings } = useContext(SettingsContext)
  let description = ''
  if (settings.sprintPace === 'None') description = 'Healthbar is disabled, write at your own pace.'
  if (settings.sprintPace === 'Slow') description = 'You lose the sprint if you stop typing for 60 seconds.'
  if (settings.sprintPace === 'Medium') description = 'You lose the sprint if you stop typing for 20 seconds.'
  if (settings.sprintPace === 'Fast') description = 'You lose the sprint if you stop typing for 10 seconds.'

  return (
    <div>
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
      <p>{description}</p>
      <hr />
      <p>Help yourself to separate writing from editing:</p>
      <Checkbox checked={settings.typewriterMode} onClick={(isChecked) => updateSetting('typewriterMode', isChecked)}>
        <p>Disable backspace and delete keys during the sprint</p>
      </Checkbox>
      <Checkbox checked={settings.blurredMode} onClick={(isChecked) => updateSetting('blurredMode', isChecked)}>
        <p>Blur the text during the sprint</p>
      </Checkbox>
    </div>
  )
}
function WritingGoal() {
  const { settings, updateSetting, updateInput, saveSettings } = useContext(SettingsContext)
  const { startDate, endDate, writingGoal, writingDays } = settings
  console.log('Selected start date', startDate)
  console.log('Selected end date', endDate)
  const correctedEndDate = moment(endDate).isAfter(moment(startDate))
    ? endDate
    : moment(startDate).add(1, 'days').toDate()
  const { numberOfWritingDays } = countWritingDays({ startDate, endDate, writingDays })
  const intendedToWritePerDay = Math.ceil(writingGoal / Math.max(numberOfWritingDays, 1)) // TODO - off by 1 error when there's 0 writing days inbetween
  let description = `To accomplish this goal in time, you will need to write ${intendedToWritePerDay} words per day.`
  if (moment(endDate).isBefore(moment())) description = `Deadline has passed.`
  return (
    <div>
      <h4>Your long-term writing goal</h4>
      <p>Set the number of words you want to write:</p>
      <NumberFormat
        value={settings.writingGoal}
        suffix=" words"
        placeholder="5000 words"
        thousandSeparator={true}
        renderText={(value) => <div>{value} words</div>}
        onValueChange={({ value }) => updateSetting('writingGoal', parseInt(value))}
      />
      <p>Select the date you start writing, and your deadline:</p>
      <div className="date-pickers">
        <DatePicker
          selectsStart
          selected={startDate}
          startDate={startDate}
          endDate={correctedEndDate}
          onChange={(date) => updateSetting('startDate', date)}
        />
        <DatePicker
          selectsEnd
          selected={correctedEndDate}
          minDate={startDate}
          startDate={startDate}
          endDate={correctedEndDate}
          onChange={(date) => updateSetting('endDate', date)}
        />
        <div className="clearfix" />
      </div>
      <p>{description}</p>
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
    <div>
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
    </div>
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
    startDate,
    endDate,
    writingGoal,
    blurredMode,
    typewriterMode,
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
        startDate,
        endDate,
        writingGoal,
        blurredMode,
        typewriterMode,
      },
    },
  }
}
