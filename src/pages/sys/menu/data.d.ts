/*
 * @Description:
 * @Author: godric
 * @Date: 2020-03-29 21:49:11
 * @LastEditTime: 2020-03-30 22:55:12
 * @LastEditors: godric
 */
export interface MenuListItem {
  id: number;
  name: string;
  parentId: number;
  url: string;
  type: number;
  icon: string;
  visible: boolean;
  orderNum: number;
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
