import { RoleListParams, RolePageResult, RoleListItem } from './data';
import request from '@/utils/request';

/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 21:17:35
 * @LastEditTime: 2020-03-29 21:43:24
 * @LastEditors: godric
 */
const URL_PREFIX = '/api/tiangong/role';
/**
 * 分页查询
 * @param params
 */
export async function queryList(params?: RoleListParams) {
  const data = await request<RolePageResult>(`${URL_PREFIX}/page`, {
    params,
    method: 'POST',
  });
  const { records } = data;
  return {
    data: records,
    page: data.current,
    success: true,
    total: data.total,
  };
}

export async function queryAll() {
  return request<RolePageResult>(`${URL_PREFIX}/all`);
}

export async function queryByKey(params: { key: number }) {
  return request(`${URL_PREFIX}/${params.key}`);
}

/**
 * 新增
 * @param params
 */
export async function add(params: RoleListItem) {
  return request(`${URL_PREFIX}/add`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 更新
 * @param params
 */
export async function update(params: RoleListItem) {
  return request(`${URL_PREFIX}/edit`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除
 * @param params
 */
export async function remove(params: { key: number }) {
  return request(`${URL_PREFIX}/remove`, {
    data: params.key,
    method: 'POST',
  });
}
