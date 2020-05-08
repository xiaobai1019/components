// 将length大于100的数组分成小数组[[],[]]
/**
 * 
 * @param {Array} arr 需要分割的数组
 * @param {Number} num 每个数组num个
 */
export function sliceArr(arr, num) {
    if (!Array.isArray(arr)) {
        console.log('arr 必须是数组');
        return
    }
    if (isNaN(num)) {
        console.log('num 必须是数字');
        return
    }
    let newArr = [];
    let index = parseInt(arr.length / num);//每num个为一组 需要分多少组

    let remain = arr.length % num;//每num个为一组，原数组剩余多少个
    // 每num个放到新的数组里
    for (let i = 1; i < index; i++) {
        let a = [];
        a.push(arr.slice(i * num, (i + 1) * num));
        newArr.push(a)
    }
    // 将剩余的放到数组里
    if (remain !== 0) {

        newArr.push(arr.slice(-remain))
    }
    return newArr
}
// 获取年月日
export function getYMD(timestamp) {
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000
    }
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    return `${Y}-${M}-${D}`;
}
// 获取年月日 时分
export function getYMDhm(timestamp) {
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000
    }
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    return `${Y}-${M}-${D} ${h}:${m}`;
}
// 获取年月日 时分秒
export function getYMDhms(timestamp) {
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000
    }
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}
// 获取时分
export function gethm(timestamp) {
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000
    }
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var h = date.getHours();
    var m = date.getMinutes();
    return `${h}:${m}`;
}
// 日期转为时间戳
export function timeToTimestamp(time) {
    let date = new Date(time);
    return date.valueOf();
}

// 获取传入日期的一天24小时数组，精确到时分
export function getTimeArr(date) {
    let times = [];
    for (let h = 0; h < 24; h++) {
        if (h < 10) {
            h = `0${h}`
        }
        for (let m = 0; m < 60; m++) {
            if (m < 10) {
                m = `0${m}`
            }
            let MD = new Date(`${date} ${h}:${m}`);
            times.push(MD.valueOf())
        }
    }
    return times
}