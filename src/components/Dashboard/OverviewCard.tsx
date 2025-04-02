import { Card, Typography } from "antd";
interface OverviewCardProps {
  title: string;
  value: string;
}
export default function OverviewCard({ title, value }: OverviewCardProps) {
  return (
    <Card style={{ textAlign: "center", margin: "16px 0" }}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{value}</Typography.Text>
    </Card>
  );
}
