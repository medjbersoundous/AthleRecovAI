import { Button, Form, Input, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import sportia from "../../assets/iaproject.webp"
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [form] = Form.useForm();
  const { login, loading } = useAuthStore();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const handleFinish = async (values: any) => {
    try {
      await login(values);
      api.success({
        message: 'Login Successful',
        description: 'You are now logged in.',
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
      
    } catch (err: any) {
      if (err.message.includes('verify')) {
        api.warning({
          message: 'Account Not Verified',
          description: 'Please check your email and verify your account before logging in.',
          duration: 4.5, 
        });
      } else {
        api.error({
          message: 'Login Failed',
          description: err.message || 'Invalid email or password',
        });
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%',
      backgroundColor: '#f5f5f5'
    }}>
      {contextHolder}
      <div style={{ 
        width: '45%', 
        backgroundImage: `url(${sportia})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }} />
      <div style={{ 
        width: '55%', 
        padding: '48px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          marginBottom: '48px',
          padding: '0 20px'
        }}>
          <Typography.Title 
            level={1} 
            style={{ 
              color: '#1890ff', 
              marginBottom: '16px',
              fontWeight: 600,
              fontSize: '2.5rem',
              lineHeight: 1.2
            }}
          >
            AthleRecovAI
          </Typography.Title>
          <Typography.Title 
            level={3} 
            style={{ 
              color: '#595959',
              fontWeight: 400,
              fontSize: '1.25rem',
              margin: 0
            }}
          >
            Welcome back to your performance dashboard
          </Typography.Title>
        </div>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item 
            name="email" 
            label={<span style={{ fontWeight: 500 }}>Email</span>}
            rules={[{ required: true, type: 'email', message: 'Valid email required' }]}
          > 
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Enter your email" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item 
            name="password" 
            label={<span style={{ fontWeight: 500 }}>Password</span>}
            rules={[{ required: true, message: 'Password is required' }]}
          > 
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Enter your password" 
              size="large"
            />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            style={{ 
              width: '100%', 
              marginTop: '24px',
              height: '40px',
              fontSize: '1rem'
            }}
            loading={loading}
          >
            Login
          </Button>
        </Form>

        <Typography style={{ 
          marginTop: '32px', 
          textAlign: 'center',
          color: '#595959',
          textAlignLast:"left"
        }}>
          Don't have an account?{' '}
          <a href="/" style={{ color: '#1890ff' }}>Register now</a>
        </Typography>
      </div>
    </div>
  );
}

export default LoginForm;