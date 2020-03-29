/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 16:34:28
 * @LastEditTime: 2020-03-29 19:34:35
 * @LastEditors: godric
 */

import request from '@/utils/request';
import { TreeNode, R, DeptListItem } from './data';

const URL_PREFIX = '/api/tiangong/dept';

export async function queryAll() {
  const data = await request<R<TreeNode>>(`${URL_PREFIX}/all`);
  return {
    data: data.result,
  };
}

/**
 * 获取部门详情
 * @param params
 */
export async function queryBykey(params: { key: number }) {
  return request(`${URL_PREFIX}/${params.key}`);
}

export async function add(params: DeptListItem) {
  return request(`${URL_PREFIX}/add`, {
    data: params,
    method: 'POST',
  });
}

export async function update(params: DeptListItem) {
  return request(`${URL_PREFIX}/edit`, {
    data: params,
    method: 'POST',
  });
}

export async function remove(params: { key: number }) {
  return request(`${URL_PREFIX}/remove`, {
    data: params.key,
    method: 'POST',
  });
}
