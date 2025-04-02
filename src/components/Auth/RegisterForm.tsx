import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Steps,
  Typography,
  notification,
} from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import sportia from "../../assets/iaproject.webp"
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
const { Step } = Steps;
const { useNotification } = notification;
interface FormValues {
  fullName: string;
  email: string;
  password: string;
  age: number;
  gender: "Male" | "Female";
  heightCm: number;
  weightKg: number;
  position: "Center" | "Forward" | "Guard";
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function Register() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<FormValues>();
  const [formData, setFormData] = useState<Partial<FormValues>>({});
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();
  const [api, contextHolder] = useNotification();

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, ...values });
        setCurrent(current + 1);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  const prev = () => setCurrent(current - 1);

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      const completeFormData = { ...formData, ...values } as FormValues;

      console.log("Submitting form data:", completeFormData);

      await register(completeFormData);

      api.success({
        message: "Registration Successful",
        description: "Your account has been created. Please verify your email.",
        placement: "topRight",
        duration: 4.5,
      });

      setTimeout(() => {
        navigate("/login", {
          state: {
            email: values.email,
            message: "verify",
          },
        });
      }, 2500);
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      let errorMessage = "An error occurred during registration";
      if (typeof error === "object" && error !== null) {
        const apiError = error as ApiError;
        errorMessage =
          apiError.response?.data?.message || apiError.message || errorMessage;
      }

      api.error({
        message: "Registration Failed",
        description: errorMessage,
        placement: "topRight",
        duration: 4.5,
      });
    }
  };
  const steps = [
    {
      title: "Personal Information",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Full Name is required" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Valid email required",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Physical Attributes",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Age is required" }]}
          >
            <InputNumber
              min={10}
              max={100}
              placeholder="Enter your age"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Select gender" }]}
          >
            <Select placeholder="Select Gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Measurements & Position",
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="heightCm"
            label="Height (cm)"
            rules={[{ required: true, message: "Height is required" }]}
          >
            <InputNumber
              min={100}
              max={250}
              placeholder="Enter your height"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="weightKg"
            label="Weight (kg)"
            rules={[{ required: true, message: "Weight is required" }]}
          >
            <InputNumber
              min={30}
              max={200}
              placeholder="Enter your weight"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Select your position" }]}
          >
            <Select placeholder="Select Position">
              <Select.Option value="Center">Center</Select.Option>
              <Select.Option value="Forward">Forward</Select.Option>
              <Select.Option value="Guard">Guard</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Summary & Confirmation",
      content: (
        <div
          style={{
            padding: 24,
            borderRadius: 8,
            background: "#fff",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
          }}
        >
          <Typography.Title
            level={3}
            style={{ marginBottom: 24, color: "#1890ff" }}
          >
            Registration Summary
          </Typography.Title>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                background: "#fafafa",
              }}
            >
              <Typography.Text
                strong
                style={{ display: "block", marginBottom: 8 }}
              >
                Personal Information
              </Typography.Text>
              <Typography.Text>
                <b>Full Name:</b> {formData.fullName}
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                <b>Email:</b> {formData.email}
              </Typography.Text>
            </div>

            <div
              style={{
                padding: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                background: "#fafafa",
              }}
            >
              <Typography.Text
                strong
                style={{ display: "block", marginBottom: 8 }}
              >
                Physical Attributes
              </Typography.Text>
              <Typography.Text>
                <b>Age:</b> {formData.age}
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                <b>Gender:</b> {formData.gender}
              </Typography.Text>
            </div>

            <div
              style={{
                padding: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                background: "#fafafa",
              }}
            >
              <Typography.Text
                strong
                style={{ display: "block", marginBottom: 8 }}
              >
                Measurements
              </Typography.Text>
              <Typography.Text>
                <b>Height:</b> {formData.heightCm} cm
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                <b>Weight:</b> {formData.weightKg} kg
              </Typography.Text>
              <Typography.Text style={{ display: "block" }}>
                <b>Position:</b> {formData.position}
              </Typography.Text>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: "#f6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: 8,
            }}
          >
            <Typography.Text>
              Please review your information before submitting.
            </Typography.Text>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", height: "100vh", width: "100%" }}>
        <div
          style={{
            width: "45%",
            backgroundImage: `url(${sportia})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          style={{
            width: "55%",
            padding: "48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: "2%",
            }}
          >
            <Typography.Title
              level={2}
              style={{ textAlign: "center", color: "#1890ff" }}
            >
              Welcome to AthleRecovAI
            </Typography.Title>
            <Typography.Title
              level={3}
              style={{ textAlign: "center", color: "#1890ff" }}
            >
              Create new account
            </Typography.Title>
          </Box>
          <Steps current={current} style={{ marginBottom: "32px" }}>
            {steps.map((step) => (
              <Step key={step.title} title={step.title} />
            ))}
          </Steps>
          <div>{steps[current].content}</div>
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {current > 0 && (
              <Button style={{ width: "150px" }} onClick={prev}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" style={{ width: "150px" }} onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                style={{ width: "150px" }}
                onClick={handleRegister}
                loading={loading}
                disabled={loading}
              >
                Register
              </Button>
            )}
          </div>
          <Typography.Text style={{ marginTop: 20 }}>
    Already have an account?{' '}
    <Link to="/login" style={{ color: '#1890ff', fontWeight: 500 }}>
      Login
    </Link>
  </Typography.Text>
        </div>
      </div>
    </>
  );
}

export default Register;
