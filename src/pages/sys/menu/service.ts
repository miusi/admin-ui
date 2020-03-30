import request from '@/utils/request';
import { TreeNode, R, MenuListItem } from './data';

/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 21:49:17
 * @LastEditTime: 2020-03-30 23:11:48
 * @LastEditors: godric
 */
const URL_PREFIX = '/api/tiangong/menu';

export async function queryAll() {
  const data = await request<R<TreeNode>>(`${URL_PREFIX}/all`);
  return {
    data: data.result,
  };
}

export async function add(params: MenuListItem) {
  return request(`${URL_PREFIX}/add`, {
    data: params,
    method: 'POST',
  });
}
