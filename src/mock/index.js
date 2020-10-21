import Mock from 'mockjs'

import tableAPI from './user'
Mock.setup({
    timeout: '300-600'
})
// 最初的版本,都是用get post使用
// Mock.mock(/\/user\/getUserList/, 'get', tableAPI.getUserList)
// Mock.mock(/\/user\/deleteUser/, 'get', tableAPI.deleteUser)
// Mock.mock(/\/user\/batchremove/, 'post', tableAPI.batchremove)//批量删除
// Mock.mock(/\/user\/createUser/, 'get', tableAPI.createUser)
// Mock.mock(/\/user\/updateUser/, 'get', tableAPI.updateUser)
//mcok 最终版本resful风格,后续如果要改按照一下步骤
/* 
1 在main.js 里面import "@/mock"导入到全局中
2 user.js里面的代码作为接口模板不动,复制一份新的,同时index.js也复制新的
3 更新真实的接口url,mock对应上即可
4 复制后的js里面更改固定的字段,可以用全局替换

 */
Mock.mock(/group\/list/, 'get', tableAPI.getUserList)//查询
Mock.mock(/group\/1/, 'delete', tableAPI.deleteUser)//删除
Mock.mock(/group\/delete/, 'delete', tableAPI.batchremove)//批量删除
Mock.mock(/group\/save/, 'post', tableAPI.createUser)//增加
Mock.mock(/group\/update/, 'post', tableAPI.updateUser)//修改