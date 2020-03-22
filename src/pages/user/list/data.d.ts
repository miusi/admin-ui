/*
 * @Description: 
 * @Author: godric
 * @Date: 2020-03-20 23:46:59
 * @LastEditTime: 2020-03-22 23:29:53
 * @LastEditors: godric
 */
export interface TableListItem {
    id: number; 
    userName: string;
    name: string;
    phone: string;
    status: boolean;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date; 
  }
  
  export interface TableListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface TableListData {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  }
  
  export interface TableListParams {
    sorter?: string;
    status?: string;
    name?: string;
    desc?: string;
    key?: number;
    pageSize?: number;
    currentPage?: number;
  }
  