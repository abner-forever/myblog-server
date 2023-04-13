const bcrypt = require('bcryptjs');
const none = () => { }

// 返回错误代码
const handleData = ({ res, data, error, callbacks = {} }) => {
	let { success, fail } = {
		success: callbacks.success || none,
		fail: callbacks.fail || none
	}
	if (error) {
		fail()
		res.json({ code: 500, message: error.message || error })
	} else {
		success()
		response.call(res, { code: 0, message: 'success', data: data })
	}
}
// 响应
const response = function ({ code, message, data }) {
	this.send({
		code,
		message,
		data
	})
}

function bcryptHashSync(myPlaintextPassword, cost) {
  let salt = bcrypt.genSaltSync(cost);
  let hash = bcrypt.hashSync(myPlaintextPassword, salt);
  return hash;
}

module.exports = {
	handleData,
	bcryptHashSync
}
