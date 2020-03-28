/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-20 23:46:59
 * @LastEditTime: 2020-03-28 14:57:24
 * @LastEditors: godric
 */
export interface TableListItem {
  id: number;
  username: string;
  name: string;
  phone: string;
  password: string;
  status: boolean;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  pageNum: number;
}

export interface TableListData {
  records: TableListItem[];
  total: number;
  long: number;
  size: number;
  current: number;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  pageNum?: number;
}
