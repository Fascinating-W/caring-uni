/*
 * @Author: Wanko
 * @Date: 2024-01-09 15:33:22
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-05 20:53:34
 * @Description:
 */
export default {
  os() {
    return uni.getSystemInfoSync().platform.toLowerCase()
  },

  sys() {
    return uni.getSystemInfoSync()
  },
  // 获取当前页面路径
  page() {
    const pages = getCurrentPages()
    return `/${getCurrentPages()[pages.length - 1].route}`
  },

  // 对uniAPI的二次封装
  showModal(option = {}) {
    let title = '提示',
      content = '',
      showCancel = true,
      cancelText = '取消',
      confirmText = '确定',
      confirmColor = uni.$c ? uni.$c.color.primary : ''

    if (typeof option === 'string') {
      content = option
    } else if (typeof option === 'object' && option !== null) {
      ;({
        title = title,
        content = content,
        showCancel = showCancel,
        cancelText = cancelText,
        confirmText = confirmText,
        confirmColor = confirmColor
      } = option)
    }

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
  },

  showLoading(title = '数据加载中') {
    uni.showLoading({
      title,
      mask: true
    })
  },
  hideLoading() {
    uni.hideLoading()
  },

  /**
   * @description 设置navBar的标题
   */
  setTitle(title) {
    uni.setNavigationBarTitle({
      title
    })
  },
  setClipboardData(data) {
    return new Promise((resolve) => {
      uni.setClipboardData({
        data,
        success: () => {
          resolve()
        }
      })
    })
  },

  toast(
    title = '未知错误信息',
    { duration = 1000, mask = true, icon = 'none' } = {}
  ) {
    if (title.length <= 20) {
      uni.showToast({
        title: String(title),
        icon,
        mask,
        duration
      })
    } else {
      uni.showModal({
        content: title,
        showCancel: false
      })
    }
  }
}
