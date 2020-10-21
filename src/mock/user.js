import Mock from 'mockjs'

function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  // console.log("最初url", url);
  // console.log("url转换后", JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'));
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

}

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    groupId: "@id",
    codeRole: "@id",
    groupName: Mock.Random.cname(),
    addr: '@county',
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sort: Mock.Random.integer(0, 1),
    isUse: Mock.Random.integer(0, 1)
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    console.log("查询列表请求配置", config)

    const { groupName, page = 1, limit = 10 } = param2Obj(config.url)
    console.log(config);
    const mockList = List.filter(user => {
      if (groupName && user.groupName.indexOf(groupName) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    console.log("查询列表data字段数据", pageList)

    return {
      code: 20000,
      count: mockList.length,//数据长度
      data: pageList//数据
    }
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    console.log("增加列表请求配置", config)
    //post请求用 config.body解析出来
    const addList = JSON.parse(config.body)

    List.unshift(addList)
    console.log("增加列表的数据", addList)
    //如果是get请求 用config.url解析出来
    // const { name, addr, age, birth, sex, id } = param2Obj(config.url)
    // List.unshift({
    //   // id: Mock.Random.guid(),
    //   id: id,
    //   name: name,
    //   addr: addr,
    //   age: age,
    //   birth: birth,
    //   sex: sex
    // })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    console.log("删除列表请求配置", config)

    const { groupIds } = param2Obj(config.url)
    if (!groupIds) {
      console.log("删除失败");
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.groupIds !== groupIds)
      console.log("删除成功,删除之后的数据", List);
      return {
        code: 20000,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    console.log("批量删除列表请求配置", config)
    // const delList = JSON.parse(config.body)
    // console.log("千辛万苦cofig", JSON.parse(config.body));
    // List.map((item, i) => {
    //   delList.data.map(del => {
    //     if (item.id === del.id) {
    //       console.log("shanchu ", i);
    //       List.splice(i, 1)
    //     }
    //   })
    // })
    let { groupIds } = param2Obj(config.url)


    const ids = groupIds.split(",")


    List = List.filter(u => {


      return !ids.includes(u.groupId)
    })
    console.log("批量删除成功,删除之后的数据", List);
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    console.log("修改列表请求配置", config)

    const updateList = JSON.parse(config.body)
    console.log("修改的数据是", updateList);
    List.some(u => {
      if (u.groupId === updateList.groupId) {
        u.groupName = updateList.groupName
        u.addr = updateList.addr
        u.codeRole = updateList.codeRole
        u.sort = updateList.sort
        u.isUse = updateList.isUse
        return true
      }
    })

    //如果是get请求,用config.url解析,如下方法
    // const { id, name, addr, age, birth, sex } = param2Obj(config.url)
    // const sex_num = parseInt(sex)
    // List.some(u => {
    //   if (u.id === id) {
    //     u.name = name
    //     u.addr = addr
    //     u.age = age
    //     u.birth = birth
    //     u.sex = sex_num
    //     return true
    //   }
    // })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}