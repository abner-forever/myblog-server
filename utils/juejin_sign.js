"use strict"

/*---------------依赖-----------------*/
const nodeMailer = require('nodemailer');
const axios = require('axios');

/*---------------配置-----------------*/
const config = {
    "baseUrl": "https://api.juejin.cn",
    "apiUrl": {
        "getTodayStatus": "/growth_api/v1/get_today_status",
        "checkIn": "/growth_api/v1/check_in",
        "getLotteryConfig": "/growth_api/v1/lottery_config/get",
        "drawLottery": "/growth_api/v1/lottery/draw"
    },
    "cookie": "MONITOR_WEB_ID=eb5aba69-6078-41be-b002-37e6b3f7d074; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227031070485736572448%2522%252C%2522web_id%2522%253A%25227031070485736572448%2522%252C%2522timestamp%2522%253A1641793252842%257D; _ga=GA1.2.427455057.1652012411; _tea_utm_cache_2608={%22utm_source%22:%22xiaocejie%22%2C%22utm_medium%22:%22OM%22%2C%22utm_campaign%22:%22vip_presale_2022%22}; _gid=GA1.2.839939766.1654052378; passport_csrf_token=882bda68cca086b0d8b0a59f00ab7080; passport_csrf_token_default=882bda68cca086b0d8b0a59f00ab7080; n_mh=Yq3knZ6Rp_a8gxjLwXONTv-Q8KJJAjj9f-_3ftAhH_U; sid_guard=30d2f211b434cbd8951f1b4aa176bf3c%7C1654052391%7C31536000%7CThu%2C+01-Jun-2023+02%3A59%3A51+GMT; uid_tt=19b8bf1671f8208f4025609d1a159120; uid_tt_ss=19b8bf1671f8208f4025609d1a159120; sid_tt=30d2f211b434cbd8951f1b4aa176bf3c; sessionid=30d2f211b434cbd8951f1b4aa176bf3c; sessionid_ss=30d2f211b434cbd8951f1b4aa176bf3c; sid_ucp_v1=1.0.0-KDI5ZTQ3NDZkNjJiNmJkNTU0NDE5NmM4NDk1ZWE4MWRkM2RhYTM1ZWUKFgjo7NDA_fWlBhCnrNuUBhiwFDgIQAsaAmxmIiAzMGQyZjIxMWI0MzRjYmQ4OTUxZjFiNGFhMTc2YmYzYw; ssid_ucp_v1=1.0.0-KDI5ZTQ3NDZkNjJiNmJkNTU0NDE5NmM4NDk1ZWE4MWRkM2RhYTM1ZWUKFgjo7NDA_fWlBhCnrNuUBhiwFDgIQAsaAmxmIiAzMGQyZjIxMWI0MzRjYmQ4OTUxZjFiNGFhMTc2YmYzYw; _gat=1",
    "email": {
        "qq": {
            "user": "1661287843@qq.com",
            "from": "1661287843@qq.com",
            "to": "1661287843@qq.com",
            "pass": "kbulaygbqfsweech"
        }
    }
}

/*---------------掘金-----------------*/

// 签到
const checkIn = async () => {
    let {error, isCheck} = await getTodayCheckStatus();
    if (error) return console.log('查询签到失败');
    if (isCheck) return console.log('今日已参与签到');
    const {cookie, baseUrl, apiUrl} = config;
    let { data } = await axios({url: baseUrl + apiUrl.checkIn, method: 'post', headers: {Cookie: cookie}});
    return data;
}

// 查询今日是否已经签到
const getTodayCheckStatus = async () => {
    const {cookie, baseUrl, apiUrl} = config;
    let {data} = await axios({url: baseUrl + apiUrl.getTodayStatus, method: 'get', headers: {Cookie: cookie}});
    if (data.err_no) {
        await sendEmailFromQQ('今日掘金签到查询：失败', JSON.stringify(data));
    }
    return {error: data.err_no !== 0, isCheck: data.data}
}

// 抽奖
const draw = async () => {
    let {error, isDraw} = await getTodayDrawStatus();
    if (error) return console.log('查询抽奖次数失败');
    if (isDraw) return console.log('今日已无免费抽奖次数');
    const {cookie, baseUrl, apiUrl} = config;
    let {data} = await axios({url: baseUrl + apiUrl.drawLottery, method: 'post', headers: {Cookie: cookie}});
    if (data.err_no) return console.log('免费抽奖失败');
    console.log(`恭喜抽到：${data.data.lottery_name}`);
    return data;
}

// 获取今天免费抽奖的次数
const getTodayDrawStatus = async () => {
    const {cookie, baseUrl, apiUrl} = config;
    let {data} = await axios({url: baseUrl + apiUrl.getLotteryConfig, method: 'get', headers: {Cookie: cookie}});
    if (data.err_no) {
        return {error: true, isDraw: false}
    } else {
        return {error: false, isDraw: data.data.free_count === 0}
    }
}

/*---------------邮件-----------------*/

// 通过qq邮箱发送
const sendEmailFromQQ = async (subject, html) => {
    let cfg = config.email.qq;
    if (!cfg || !cfg.user || !cfg.pass) return;
    const transporter = nodeMailer.createTransport({service: 'qq', auth: {user: cfg.user, pass: cfg.pass}});
    transporter.sendMail({
        from: cfg.from,
        to: cfg.to,
        subject: subject,
        html: html
    }, (err) => {
        if (err) return console.log(`发送邮件失败：${err}`, true);
        console.log('发送邮件成功')
    })
}

// 发送今天签到以及抽奖信息
const sedEmail = async () => {
    const signInfo = await checkIn();
    const { err_no, sum_point, incr_point } = signInfo && signInfo.data || {}
    if (err_no) {
      console.log('签到失败');
      await sendEmailFromQQ('今日掘金签到：失败', JSON.stringify(signInfo));
    } else if (sum_point) {
      console.log(`签到成功！当前积分：${sum_point}`);
      const drawInfo = await draw();
      const { lottery_name } = drawInfo && drawInfo.data || {}
      sendEmailFromQQ('今日掘金签到：成功✌️', `
              <p>今日获得矿石：${incr_point}</p>
              <p>总矿石：${sum_point}</p>
              <p>${lottery_name ? `免费抽奖恭喜抽到：${lottery_name}` : '免费抽奖失败'}</p>
          `);
    } else {
        sendEmailFromQQ('今日掘金签到：已签', '签到过了');
    }
  }

exports.juejin = (event, context) => {
    console.log('开始');
    sedEmail();
    console.log('结束');
};