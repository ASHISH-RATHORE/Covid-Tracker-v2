import React from 'react';
import { Form, Input, Button} from 'antd';
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};


 function OTP({onFinish,onFinishFailed}){

    return (
    <Form
    {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Phone"
        name="Phone Number"
        rules={[
          {
            required: true,
            message: '10 Digits only',    
            len:10,
        
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item  >
        <Button  type="primary" htmlType="submit">
          Get OTP
        </Button>
      </Form.Item>
    </Form>
);
};

export default React.memo(OTP)