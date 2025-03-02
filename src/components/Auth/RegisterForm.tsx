import { Button, Form, Input, InputNumber, Select, Steps, Typography } from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import sportia from "../../../public/sportia.webp";

const { Step } = Steps;

interface FormData {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  weight?: number;
  sleepQuality?: string;
  stressLevel?: string;
}

function Register() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<FormData>({});

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, ...values });
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const prev = () => setCurrent(current - 1);

  const handleFinish = (values: any) => {
    console.log("Register Data:", { ...formData, ...values });
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}> 
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required" }]}> 
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}> 
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Physical Metrics",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item name="age" label="Age" rules={[{ required: true, message: "Age is required" }]}> 
            <InputNumber min={10} max={100} placeholder="Enter your age" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="weight" label="Weight (kg)" rules={[{ required: true, message: "Weight is required" }]}> 
            <InputNumber min={30} max={200} placeholder="Enter your weight" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Health Metrics",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item name="sleepQuality" label="Sleep Quality" rules={[{ required: true, message: "Select sleep quality" }]}> 
            <Select placeholder="Select Sleep Quality">
              <Select.Option value="good">Good</Select.Option>
              <Select.Option value="average">Average</Select.Option>
              <Select.Option value="poor">Poor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="stressLevel" label="Stress Level" rules={[{ required: true, message: "Select stress level" }]}> 
            <Select placeholder="Select Stress Level">
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="moderate">Moderate</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Summary & Confirmation",
      content: (
        <div>
          <Typography.Title level={4}>Summary</Typography.Title>
          <Typography.Text>
            <div><b>Name:</b> {formData.name}</div>
            <div><b>Email:</b> {formData.email}</div>
            <div><b>Age:</b> {formData.age}</div>
            <div><b>Weight:</b> {formData.weight}</div>
            <div><b>Sleep Quality:</b> {formData.sleepQuality}</div>
            <div><b>Stress Level:</b> {formData.stressLevel}</div>
          </Typography.Text>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width:"100%" }}>
      <div style={{ width: "45%", backgroundImage: `url(${sportia})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div style={{ width: "55%", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#f5f5f5", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Typography.Title level={1} style={{ textAlign: "center", color: "#1890ff", marginBottom: "15%" }}>AthleRecovAI Registration</Typography.Title>
        <Steps current={current} style={{ marginBottom: "32px" }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <div>{steps[current].content}</div>
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
          {current > 0 && <Button style={{width:"150px"}} onClick={prev}>Previous</Button>}
          {current < steps.length - 1 && <Button type="primary" style={{width:"150px"}} onClick={next}>Next</Button>}
          {current === steps.length - 1 && <Button type="primary" style={{width:"150px"}} onClick={() => form.submit()}>Register</Button>}
        </div>
        <Form form={form} onFinish={handleFinish} />
        <div style={{ marginTop: "32px", textAlign: "left" }}>
          <Typography.Text>You have an account? <a href="/login">Login</a></Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default Register;