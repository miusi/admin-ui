/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 21:17:25
 * @LastEditTime: 2020-03-29 21:28:23
 * @LastEditors: godric
 */
export interface RoleListItem {
  id: number;
  username: string;
  name: string;
  remarks: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface RolePageResult {
  records: RoleListItem[];
  total: number;
  long: number;
  size: number;
  current: number;
}

export interface RoleListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  pageNum?: number;
}
