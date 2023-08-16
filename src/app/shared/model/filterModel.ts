export interface ControlItem {
    name: string;
    value: string;
    code: string;
  }
  
export interface JsonDataItem {
title: string;
property: string;
disable: boolean;
isOpen: boolean;
control: ControlItem[];
}

export interface filterResult {
    jsonData: JsonDataItem[];
    filterData: DynamicObject<any>;
  }
  
export interface DynamicObject<T> {
[key: string]: T;
}