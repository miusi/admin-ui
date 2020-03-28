import { TableListParams, TableListData } from './data';
import request from '@/utils/request';

/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-23 20:18:16
 * @LastEditTime: 2020-03-28 23:50:55
 * @LastEditors: godric
 */
const URL_PREFIX = '/api/tiangong/user/';
/**
 * 分页查询
 * @param params
 */
export async function queryList(params?: TableListParams) {
  const data = await request<TableListData>(`${URL_PREFIX}page`, {
    params,
  });
  const { records } = data;
  return {
    data: records,
    page: data.current,
    success: true,
    total: data.total,
  };
}

/**
 * 获取用户详情
 * @param params
 */
export async function queryBykey(params: { key: number[] }) {
  return request(URL_PREFIX + params.key);
}

/**
 * 新增
 * @param params
 */
export async function add(params: TableListParams) {
  return request(`${URL_PREFIX}add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 更新
 * @param params
 */
export async function update(params: TableListParams) {
  return request(`${URL_PREFIX}edit`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 禁用启用账号
 * @param params
 */
export async function toggleStatus(params: { key: number }) {
  return request(`${URL_PREFIX + params.key}/toggleStatus`, {
    method: 'PUT',
  });
}

/**
 * 禁用启用账号
 * @param params
 */
export async function resetPassword(params: { key: number[] }) {
  return request(`${URL_PREFIX + params.key}/resetPassword`, {
    method: 'PUT',
  });
}

export async function remove(params: { key: number }) {
  return request(`${URL_PREFIX}remove`, {
    data: { id: params.key },
    method: 'POST',
  });
}
