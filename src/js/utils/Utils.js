export function authToken() {
    // console.log(getCookie('token'));
    if (!getCookie('token')) {
        alert("잘못된 접근입니다.");
        location.href = '/';
        return false;
    }
}

export function isEmpty(value) {
    const isEmptyObject = function (a) {
        if (typeof a.length === 'undefined') { // it's an Object, not an Array
            const hasNonempty = Object.keys(a).some(function nonEmpty(element) {
                return !isEmpty(a[element]);
            });
            return hasNonempty ? false : isEmptyObject(Object.keys(a));
        }

        return !a.some(function nonEmpty(element) { // check if array is really not empty as JS thinks
            return !isEmpty(element); // at least one element should be non-empty
        });
    };
    return (
        value == false
        || typeof value === 'undefined'
        || value == null
        || (typeof value === 'object' && isEmptyObject(value))
    );
}

export function goBack() {
    history.back()
}

export function setCookie(name, value, exp) {
    let date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

export function getCookie(name) {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}