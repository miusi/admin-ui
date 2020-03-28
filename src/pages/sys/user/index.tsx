/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-19 23:35:00
 * @LastEditTime: 2020-03-29 00:36:23
 * @LastEditors: godric
 */

import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableListItem } from './data.d';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { add, queryList, update, toggleStatus, remove } from './service';
import CreateForm from './components/CreateFrom';

/**
 * 添加用户
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await add({
      id: fields.id,
      userName: fields.username,
      name: fields.name,
      phone: fields.phone,
      password: fields.password,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    const data = await update({
      id: fields.id,
      userName: fields.username,
      name: fields.name,
      phone: fields.phone,
    });
    hide();
    if (data.success) {
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
    return data.success;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const handleToggleStatus = async (params: { key: number; status: number }) => {
  console.log(params);
  const hide = message.loading(params.status === 1 ? '正在禁用' : '正在启用');
  try {
    const data = await toggleStatus(params);
    hide();
    if (data.success) {
      message.success(params.status === 1 ? '禁用成功' : '启用成功');
    } else {
      message.error(params.status === 1 ? '禁用失败' : '启用失败');
    }
    return data.success;
  } catch (error) {
    hide();
    message.error(params.status === 1 ? '禁用失败请重试！' : '启用失败请重试！');
    return false;
  }
};

const handleRemove = async (params: { key: number }) => {
  const hide = message.loading('正在删除');
  try {
    const data = await remove(params);
    hide();
    if (data.success) {
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
    return data.success;
  } catch (error) {
    hide();
    message.error('删除失败请重试！');
    return false;
  }
};

const UserList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '登录名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '无效', status: 'Default' },
        1: { text: '有效', status: 'Processing' },
      },
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          {record.status ? (
            <a
              onClick={() => {
                handleToggleStatus({
                  key: record.id,
                  status: record.status,
                });
                action.reload();
              }}
            >
              禁用
            </a>
          ) : (
            <a
              onClick={() => {
                handleToggleStatus({
                  key: record.id,
                  status: record.status,
                });
                action.reload();
              }}
            >
              启用
            </a>
          )}
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove({ key: record.id });
              action.reload();
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    // 根据用户权限判断显示按钮
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          // TODO 根据权限判断显示的按钮
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        request={params => queryList(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default UserList;
