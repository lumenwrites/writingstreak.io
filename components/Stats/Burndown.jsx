import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEditorContext } from 'components/Editor/Editor'
import { loadTodayIntoSavedDays, generateStats, generateDescription, largeNumberFormat } from './utils'

// const prefs = {
//   startDate: '2021-12-01',
//   endDate: '2022-01-01',
//   writingGoal: 20000,
//   writingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
// }

export default function Burndown() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const { startDate, endDate, writingGoal, writingDays } = editorValues
  const daysWithTodaysStats = loadTodayIntoSavedDays(editorValues)
  const stats = generateStats(daysWithTodaysStats, { startDate, endDate, writingGoal, writingDays })
  return (
    <div>
      <Chart data={stats.data} />
      <div className="center-text" dangerouslySetInnerHTML={{ __html: generateDescription(stats, { endDate }) }} />
    </div>
  )
}

function Chart({ data }) {
  const [opacities, setOpacities] = useState({
    'Actually Wrote': 1,
    'Intended to Write': 0.5,
  })

  function handleMouseEnter(o) {
    const { dataKey } = o
    // setOpacities((prev) => ({ ...prev, [dataKey]: 1 }))
  }

  function handleMouseLeave(o) {
    const { dataKey } = o
    // setOpacities((prev) => ({ ...prev, [dataKey]: 0.5 }))
  }
  let interval = 0
  if (data.length > 32) interval = 6
  if (data.length > 100) interval = 31
  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#58232311" />
        <XAxis dataKey={data.length > 100 ? "month" : "name"} interval={interval} angle={-45} dx={-15} dy={15} height={55} />
        <YAxis
          type="number"
          tickFormatter={(tick) => {
            return largeNumberFormat(tick, 1)
          }}
          width={40}
        >
          <Label
            value="Words Written"
            position="insideLeft"
            angle={-90}
            dx={-5}
            style={{ textAnchor: 'middle', fontSize: '90%', fill: '#7c5a49bc' }}
          />
        </YAxis>
        <Tooltip />
        {/* <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /> */}
        <Line
          dataKey="Actually Wrote"
          strokeOpacity={opacities['Actually Wrote']}
          stroke="#582323"
          strokeWidth={2}
          activeDot={{ r: data.length > 100 ? 0 : 5 }}
        />
        <Line
          dataKey="Need to Write"
          strokeOpacity={opacities['Intended to Write']}
          stroke="#7c5a49c8"
          strokeWidth={2}
          dot={{ r: 0 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
