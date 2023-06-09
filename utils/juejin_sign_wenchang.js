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
    "cookie": "__tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227032109826869315111%2522%252C%2522web_id%2522%253A%25227032109826869315111%2522%252C%2522timestamp%2522%253A1648866796573%257D; _ga=GA1.2.1747078924.1649212333; n_mh=iV_RMbBqEWFXIFdf22YqSpMQVbVFuKvHohGjKhn7Ey8; sid_guard=39e9240f17033e2c093e75d00fcbef16%7C1655266077%7C31535999%7CThu%2C+15-Jun-2023+04%3A07%3A56+GMT; uid_tt=a2a53abc1665926879d54e89437860dc; uid_tt_ss=a2a53abc1665926879d54e89437860dc; sid_tt=39e9240f17033e2c093e75d00fcbef16; sessionid=39e9240f17033e2c093e75d00fcbef16; sessionid_ss=39e9240f17033e2c093e75d00fcbef16; sid_ucp_v1=1.0.0-KGQ5ODM3OGM3YmFiZDZlNThhZDM3Yzc2N2JmM2I2NjYyYWQxZGY3YmMKFgjuo7C2lI36BBCdtqWVBhiwFDgIQAsaAmxmIiAzOWU5MjQwZjE3MDMzZTJjMDkzZTc1ZDAwZmNiZWYxNg; ssid_ucp_v1=1.0.0-KGQ5ODM3OGM3YmFiZDZlNThhZDM3Yzc2N2JmM2I2NjYyYWQxZGY3YmMKFgjuo7C2lI36BBCdtqWVBhiwFDgIQAsaAmxmIiAzOWU5MjQwZjE3MDMzZTJjMDkzZTc1ZDAwZmNiZWYxNg; _tea_utm_cache_2608={%22utm_source%22:%22722juejinzz%22}; MONITOR_WEB_ID=79d2b391-2a92-42fe-af30-69858c11c9b3; _gid=GA1.2.1882534635.1661394264",
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
    // let cfg = config.email.qq;
    // if (!cfg || !cfg.user || !cfg.pass) return;
    // const transporter = nodeMailer.createTransport({service: 'qq', auth: {user: cfg.user, pass: cfg.pass}});
    // transporter.sendMail({
    //     from: cfg.from,
    //     to: cfg.to,
    //     subject: subject,
    //     html: html
    // }, (err) => {
    //     if (err) return console.log(`发送邮件失败：${err}`, true);
    //     console.log('发送邮件成功')
    // })
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

exports.juejin_wenchang = (event, context) => {
    console.log('开始');
    sedEmail();
    console.log('结束');
};