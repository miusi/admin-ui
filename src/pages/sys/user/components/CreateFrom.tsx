import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {id:number, userName: string,name:string,phone:string,password:string }) => void;
  onCancel: () => void;
}

const CreateForm :React.FC<CreateFormProps>= props=>{
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        form.resetFields();
        handleAdd(fieldsValue);
      };

      return (
        <Modal
          destroyOnClose
          title="新增用户"
          visible={modalVisible}
          onOk={okHandle}
          onCancel={() => onCancel()}
        >
          <Form form={form}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="登录名"
              name="userName"
              rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
            >
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
            >
              <Input placeholder="请输入真实姓名" />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="手机号码"
              name="phone"
              //todo 手机号验证 rules={[{}]}
              >
                    <Input placeholder="请输入手机号码" />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="密码"
              name="password"
              //todo 手机号验证 rules={[{}]}
              >
                    <Input placeholder="请输入登录密码" />
            </FormItem>
          </Form>
        </Modal>
      );
}

export default CreateForm;