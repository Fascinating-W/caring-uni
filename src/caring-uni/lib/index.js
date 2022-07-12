function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1)
    arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`)
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          let commaStr = ''
          value.forEach((_value) => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(`${key}=${commaStr}`)
          break
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
      }
    } else {
      _result.push(`${key}=${value}`)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

export function os() {
  return uni.getSystemInfoSync().platform.toLowerCase()
}

export function sys() {
  return uni.getSystemInfoSync()
}

// 获取当前页面路径
export function page() {
  const pages = getCurrentPages()
  return `/${getCurrentPages()[pages.length - 1].route}`
}

/**
 * @description 获取路由参数
 * @param {Object} query 路由参数
 * @returns url解码反序列化的 路由参数
 */
export function query(query) {
  const obj = {}
  for (const key in query) {
    const q = decodeURIComponent(query[key])
    if (q.startsWith('{') || q.startsWith('[')) {
      obj[key] = JSON.parse(q)
    }
  }
  return Object.assign(query, obj)
}

/**
 * @description 封装uni路由跳转，对象传惨
 * @param {String} url page路径
 * @param {Object} params 参数
 */
export function route(url, params, type = 'navigateTo') {
  if (params) {
    const obj = {}
    for (let key in params) {
      if (typeof params[key] === 'object') {
        obj[key] = encodeURIComponent(JSON.stringify(params[key]))
      }
      // 如果包含http链接进行编码操作
      if (typeof params[key] === 'string' && params[key].includes('http')) {
        params[key] = encodeURIComponent(params[key])
      }
    }
    const query = Object.assign(params, obj)
    url = url + queryParams(query)
    uni[type]({ url })
  } else {
    uni[type]({ url })
  }
}

// 对uniAPI的二次封装
export function showModal(option = {}) {
  const {
    title = '提示',
    content = 'content内容',
    showCancel = true,
    cancelText = '取消',
    confirmText = '确定',
    confirmColor = ''
  } = option
  return new Promise((resolve, reject) => {
    // uni的showModal 默认形式为：title 和 content 为空字符串，同时展示取消和确定按钮
    uni
      .showModal({
        title,
        content,
        showCancel,
        cancelText,
        confirmText,
        confirmColor
      })
      .then((res) => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      })
  })
}

export function showLoading(title = '数据加载中') {
  uni.showLoading({
    title,
    mask: true
  })
}
export function hideLoading() {
  uni.hideLoading()
}

/**
 * @description 设置navBar的标题
 */
export function setTitle(title) {
  uni.setNavigationBarTitle({
    title
  })
}
export function setClipboardData(data) {
  return new Promise((resolve) => {
    uni.setClipboardData({
      data,
      success: () => {
        resolve()
      }
    })
  })
}

export function toast(title = '未知错误信息', duration = 1000) {
  if (title.length <= 20) {
    uni.showToast({
      title: String(title),
      icon: 'none',
      mask: true,
      duration
    })
  } else {
    uni.showModal({
      content: title,
      showCancel: false
    })
  }
}
