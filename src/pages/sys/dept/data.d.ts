/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 16:36:11
 * @LastEditTime: 2020-03-29 19:27:56
 * @LastEditors: godric
 */
export interface DeptListItem {
  id: number;
  name: string;
  parentId: number;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface TreeNode {
  id: number;
  parentId: number;
  label: string;
  value: string;
  level: number;
  other: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}

export interface R<T> {
  success: boolean;
  ns: string;
  code: number;
  msg: string;
  result: T;
}
