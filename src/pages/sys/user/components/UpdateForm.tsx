import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals] = useState<FormValueType>({
    id: props.values.id,
    username: props.values.username,
    name: props.values.name,
    phone: props.values.phone,
  });
  const [form] = Form.useForm();

  const { updateModalVisible, onSubmit: handleUpdate, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.id = formVals.id;
    fieldsValue.username = formVals.username;
    form.resetFields();
    handleUpdate(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="修改用户"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          username: formVals.username,
          name: formVals.name,
          phone: formVals.phone,
        }}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入真实姓名" />
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号码" name="phone">
          <Input placeholder="请输入手机号码" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
