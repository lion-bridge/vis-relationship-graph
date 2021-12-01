/**
 * 字符串索引签名，key为指定的枚举类型
 */

// 枚举
enum LogoName {
  key1 = 'company',
  key2 = 'companyInner',
  key3 = 'companyOuter',
  key4 = 'group22',
}

// 使用`type`关键字定义， 索引是`in`而不是`:`
type ObjType = {
  [key in LogoName]?: { address: string; };
};

// 例子
const obj: ObjType = {
  company: { address: '地址1'},
  companyInner: {address: '地址2'}
}


