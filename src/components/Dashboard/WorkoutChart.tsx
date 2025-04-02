import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Mon", duration: 30 },
  { date: "Tue", duration: 45 },
  { date: "Wed", duration: 20 },
  { date: "Thu", duration: 50 },
];

export default function WorkoutChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="duration" stroke="#1890ff" />
      </LineChart>
    </ResponsiveContainer>
  );
}
