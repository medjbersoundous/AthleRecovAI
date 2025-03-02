import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import sportia from '../../../public/sportia.webp';

function LoginForm() {
  const [form] = Form.useForm();

  const handleFinish = (values:any) => {
    console.log('Login Data:', values);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '45%', backgroundImage: `url(${sportia})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div style={{ width: '55%', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography.Title level={1} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '15%' }}>AthleRecovAI Login</Typography.Title>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}> 
            <Input prefix={<UserOutlined />} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}> 
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>
          <Typography  style={{ marginTop: '32px' }}>
          Forget password?  <a href="/forgetPassword" style={{color:"#1890ff", textDecoration:"underline"}}> click here</a>
        </Typography>
          <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '16px' }}>Login</Button>
        </Form>
        <Typography  style={{ marginTop: '32px' }}>
          Don't have an account? <a href="/signup">Register</a>
        </Typography>
      </div>
    </div>
  );
}

export default LoginForm;