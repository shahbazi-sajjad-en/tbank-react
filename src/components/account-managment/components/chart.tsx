// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface LabelProp {
  cx: number
  cy: number
  percent: number
  midAngle: number
  innerRadius: number
  outerRadius: number
}

interface ChartProps {
  availableBalance: number
  blockedBalance: number
}

// برای محاسبه درصد و رنگ
const renderCustomizedLabel = (props: LabelProp) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central' fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const RechartsPieChart = ({ availableBalance, blockedBalance }: ChartProps) => {
  const total = availableBalance + blockedBalance

  const data = [
    { name: 'موجودی قابل برداشت', value: availableBalance, color: '#24B364' },
    { name: 'موجودی مسدود شده', value: blockedBalance, color: '#E64449' }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 160, width: 160 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              dataKey='value'
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} ریال`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend زیر چارت */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        {data.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mx: 2,
              '& svg': { mr: 1, color: item.color }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' /> 
             <Typography variant='body2'>{item.name}</Typography>
          </Box>
        ))}
      </Box> */}

      {/* نمایش مجموع
      <Typography sx={{ mt: 1, fontSize: 12, color: '#666' }}>
        مجموع: {total.toLocaleString()} ریال
      </Typography> */}
    </Box>
  )
}

export default RechartsPieChart
