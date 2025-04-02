import { Table } from "antd";

const columns = [
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Workout Type", dataIndex: "type", key: "type" },
  { title: "Duration (mins)", dataIndex: "duration", key: "duration" },
];

const data = [
  { key: 1, date: "2025-03-01", type: "Cardio", duration: 30 },
  { key: 2, date: "2025-03-02", type: "Strength", duration: 45 },
];

export default function HistoryTable() {
  return <Table columns={columns} dataSource={data} />;
}
