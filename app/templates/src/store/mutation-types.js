// 之所以mutation-types用一个文件输出,因为mutation-type是全局公用的,
// 放在一个文件里,可以保证命名不重复,为了规范type命名,每个type都以所在的模块名称为前缀,比如USER_,CART_,PRODUCT_
export const SAMPLE = 'SAMPLE'
export const SET_ZHIHU_SEARCH_RESULT = 'SET_ZHIHU_SEARCH_RESULT'
