import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

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
 

const UpdateForm: React.FC<UpdateFormProps> = props => {
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
    title="新建规则"
    visible={modalVisible}
    onOk={okHandle}
    onCancel={() => onCancel()}
  >
    <Form form={form}>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
        name="desc"
        rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
    </Form>
  </Modal>
  );
};

export default UpdateForm;
