import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEditorContext } from 'components/Editor/Editor'
import { generateStats, generateDescription, largeNumberFormat } from './utils'

const data = [
  {
    name: 'Page A',
    'Actually Wrote': 4000,
    'Intended to Write': 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    'Actually Wrote': 3000,
    'Intended to Write': 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    'Actually Wrote': 2000,
    'Intended to Write': 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    'Actually Wrote': 2780,
    'Intended to Write': 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    'Actually Wrote': 1890,
    'Intended to Write': 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    'Actually Wrote': 2390,
    'Intended to Write': 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    'Actually Wrote': 3490,
    'Intended to Write': 4300,
    amt: 2100,
  },
]

const prefs = {
  startDate: '2021-12-24',
  endDate: '2022-01-20',
  writingGoal: 1500,
  writingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
}

export default function Burndown() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const stats = generateStats(editorValues.days, prefs)
  return (
    <div>
      <Chart data={stats.data} />
      <div dangerouslySetInnerHTML={{ __html: generateDescription(stats, prefs) }} />
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
    setOpacities((prev) => ({ ...prev, [dataKey]: 1 }))
  }

  function handleMouseLeave(o) {
    const { dataKey } = o
    setOpacities((prev) => ({ ...prev, [dataKey]: 0.5 }))
  }
  const interval = data.length > 30 ? 6 : 0
  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid stroke="#58232311" />
        <XAxis dataKey="name" interval={interval} angle={-45} dx={-15} dy={15} height={55} />
        <YAxis type="number" tickFormatter={tick => { return largeNumberFormat(tick, 1) }} />
        <Tooltip />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Line
          dataKey="Actually Wrote"
          strokeOpacity={opacities['Actually Wrote']}
          stroke="#582323"
          strokeWidth={2}
          activeDot={{ r: 5 }}
        />
        <Line
          dataKey="Intended to Write"
          strokeOpacity={opacities['Intended to Write']}
          stroke="#7c5a4990"
          strokeWidth={2}
          dot={{ r: 0 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
