// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


interface ChartProps {
  availableBalance: number | string;
  blockedBalance: number | string;
  creditBalance: number | string;
}

// برچسب درصد
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent === 0) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RechartsPieChart = ({
  availableBalance,
  blockedBalance,
  creditBalance,
}: ChartProps) => {
  // تبدیل به عدد
  const available = Number(availableBalance) || 0;
  const blocked = Number(blockedBalance) || 0;
  const credit = Number(creditBalance) || 0;

  const total = available + blocked + credit;
  // اگر مجموع صفر بود یا یکی از مقادیر صفر بود، Recharts آن بخش را حذف می‌کند
  // برای جلوگیری از حذف، مقادیر خیلی کوچک (epsilon) برای رسم حفظ می‌کنیم
  const epsilon = 0.00001;

  const data = [
    {
      name: "موجودی قابل برداشت",
      value: available > 0 ? available : epsilon,
      color: "#24B364",
    },
    {
      name: "موجودی مسدود شده",
      value: blocked > 0 ? blocked : epsilon,
      color: "#E64449",
    },
    {
      name: "موجودی اعتباری",
      value: credit > 0 ? credit : epsilon,
      color: "#FFB700",
    },
  ];


  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ height: 160, width: 160 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
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
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* نمایش مجموع */}
      <Typography sx={{ mt: 1, fontSize: 12, color: "#666" }}>
        مجموع: {total.toLocaleString()} ریال
      </Typography>
    </Box>
  );
};

export default RechartsPieChart;
