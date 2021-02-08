
const none = () => { }

// 返回错误代码
const handleData = (res, data, callbacks = {}) => {
    let { success, fail } = {
        success: callbacks.success || none,
        fail: callbacks.fail || none
    }
    console.log('data:', !data);
    if (!data) {
        fail()
        response.call(res, { code: 500, msg: '发生了不可预知的错误' })

    } else {
        success()
        response.call(res, { code: 200, msg: 'success', data: data })
    }
}
// 响应
const response = function ({ code,msg, data }) {
    this.json({
        code: code,
        msg: msg,
        data: data
    })
}

module.exports = {
    handleData
}
