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
    "cookie": "__tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227209954493814539834%2522%252C%2522web_id%2522%253A%25227209954493814539834%2522%252C%2522timestamp%2522%253A1683169494445%257D; passport_csrf_token=ae4f184aff26e873e7e85a8887129463; passport_csrf_token_default=ae4f184aff26e873e7e85a8887129463; n_mh=Yq3knZ6Rp_a8gxjLwXONTv-Q8KJJAjj9f-_3ftAhH_U; sid_guard=10b5a39af5c75f3298e7323a24fe74bc%7C1683270912%7C31536000%7CSat%2C+04-May-2024+07%3A15%3A12+GMT; uid_tt=ee5cca959fc7d6468fc4431963173c4e; uid_tt_ss=ee5cca959fc7d6468fc4431963173c4e; sid_tt=10b5a39af5c75f3298e7323a24fe74bc; sessionid=10b5a39af5c75f3298e7323a24fe74bc; sessionid_ss=10b5a39af5c75f3298e7323a24fe74bc; sid_ucp_v1=1.0.0-KGEyMTlkNzQ4Y2FhMTI5NGJmYTJhYzZmNzk2ZWQzNmZhYzdiYWE5ZDAKFwjo7NDA_fWlBhCA2tKiBhiwFDgHQPQHGgJsZiIgMTBiNWEzOWFmNWM3NWYzMjk4ZTczMjNhMjRmZTc0YmM; ssid_ucp_v1=1.0.0-KGEyMTlkNzQ4Y2FhMTI5NGJmYTJhYzZmNzk2ZWQzNmZhYzdiYWE5ZDAKFwjo7NDA_fWlBhCA2tKiBhiwFDgHQPQHGgJsZiIgMTBiNWEzOWFmNWM3NWYzMjk4ZTczMjNhMjRmZTc0YmM; store-region=cn-bj; store-region-src=uid; _tea_utm_cache_2608={%22utm_source%22:%22web_banner%22%2C%22utm_medium%22:%22banner%22%2C%22utm_campaign%22:%22xiaoce_GPT_20230510%22}; csrf_session_id=b73387b4db727dd54fc2494f26e0abbb; msToken=cLbtjcZndkBh2MLZRT2D-GOVa-3v94yFwgtaGsRm-KkRFseQeyNWidDRA9LYXEQxYsE4XaVqeZbZV_CR-liUqXIDM4ygk346kj-YtmpV91qBuzd_zpThswcXWxBPECF1",
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
