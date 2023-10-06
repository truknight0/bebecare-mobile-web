import {DEVELOPER_MAIL} from "../constants/Constants.js";

export function authToken() {
    // console.log(getCookie('token'));
    if (!getCookie('token')) {
        alert("잘못된 접근입니다.");
        window.location.href = '/';
        return false;
    }
}

export function isEmpty(value) {
    const isEmptyObject = function (a) {
        if (typeof a.length === 'undefined') {
            const hasNonempty = Object.keys(a).some(function nonEmpty(element) {
                return !isEmpty(a[element]);
            });
            return hasNonempty ? false : isEmptyObject(Object.keys(a));
        }

        return !a.some(function nonEmpty(element) {
            return !isEmpty(element);
        });
    };
    return (
        value == false
        || typeof value === 'undefined'
        || value == null
        || (typeof value === 'object' && isEmptyObject(value))
    );
}

export function isParams(key) {
    const search = window.location.href.split('?')
    const urlParams = new URLSearchParams(search[1]);
    return urlParams.has(key);
}

export function goBack() {
    history.back()
}

export function changePhoneFormat(phoneNum) {
    return phoneNum.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

export function dateformatYmd(d, viewTime) {
    let date = new Date(d);
    if (d === 'now') {
        date = new Date();
    }

    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    if (viewTime === true) {
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    }

    return year + '-' + month + '-' + day;
}

export function changeDateFormat(sd, ed, format) {
    const today = new Date()
    const beginDay = new Date(sd);
    const start = beginDay.getTime();

    let end = today.getTime();
    if (typeof ed !== 'undefined' && ed !== "" && ed != null) {
        end = new Date(ed);
    }

    const mSec = end - start;
    const calc_date = Math.ceil((mSec) / 24 / 60 / 60 / 1000) + 1;

    if (sd === ed) return '';

    let return_d;
    if (format === 'week') {
        if (calc_date < 7) {
            return calc_date + '일';
        }
        let week = Math.floor(calc_date / 7);
        let q = calc_date % 7;
        return_d = week + '주 ' + q + '일';
        return return_d;
    } else if (format === 'month') {
        if (calc_date < 30) {
            return calc_date + '일';
        }
        let month = Math.floor(calc_date / 30);
        let q = calc_date % 30;
        return_d = month + '개월 ' + q + '일';
        return return_d;
    } else if (format === 'dateTime') {
        return_d = changeMicroTimeToDateTime(mSec, '방금');
        return return_d;
    }

    return '';
}

export function changeBetweenDateMicroTime(sd, ed) {
    const start = new Date(sd);
    const end = new Date(ed);

    if (sd === ed || end - start <= 0) return 0;

    return end - start;
}

export function changeMicroTimeToDateTime(mt, zeroStr) {
    if (mt === 0 || mt == null) {
        if (zeroStr) return zeroStr;
        else return '';
    }

    const cd = Math.ceil((mt) / 24 / 60 / 60 / 1000);

    let date = cd - 1;
    let hour = Math.floor((mt / 1000 / 60 / 60) - (date * 24));
    let min = Math.floor(mt / 1000 / 60) % 60;

    if (date === 0) {
        date = '';
    }  else {
        date = date + '일 ';
    }

    if (hour === 0) {
        hour = '';
    }  else {
        hour = hour + '시간 ';
    }

    if (min === 0) {
        if (zeroStr) {
            min = zeroStr;
        } else {
            min = '';
        }
    }  else {
        min = min + '분';
    }

    return date + hour + min;
}

export function mailRedirect()
{
    window.location.href = "mailto:" + DEVELOPER_MAIL;
    return false;
}
export function pageRedirect(uri)
{
    window.location.href = uri;
    return false;
}

export function setCookie(name, value, exp) {
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

export function getCookie(name) {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}