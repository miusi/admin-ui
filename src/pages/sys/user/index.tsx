/*
* @Description: 
* @Author: godric
* @Date: 2020-03-19 23:35:00
 * @LastEditTime: 2020-03-23 22:20:20
 * @LastEditors: godric
*/

import { useState, useRef } from "react";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { TableListItem } from "./data.d";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message, Button } from "antd";
import { FormValueType } from "@/pages/user/list/components/UpdateForm";
import { add, queryList, remove, update } from "./service";
import CreateForm from "./components/CreateFrom";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";


/**
 * 添加用户
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await add({
      id: fields.id,
      userName: fields.userName,
      name: fields.name,
      phone: fields.phone,
      password: fields.password
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

/**
 * 更新
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在跟新');
  try {
    await update({
      id: fields.id,
      userName: fields.userName,
      name: fields.name,
      phone: fields.phone
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await remove({
      key: selectedRows.map(row => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const UserList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '登录名',
      dataIndex: 'userName',
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
        1: { text: '有效', status: 'Processing' }
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '更新人',
      dataIndex: 'updateBy'
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',

    },
  ];

  return (
    //根据用户权限判断显示按钮
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          //TODO 根据权限判断显示的按钮
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
                </Button>

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
    </PageHeaderWrapper>
  );
};

export default UserList;