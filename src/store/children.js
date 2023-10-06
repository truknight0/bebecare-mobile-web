import {writable, get} from "svelte/store";
import {BASE_URL, API_NOAUTH_URI, API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import axios from "axios";
import {isEmpty, setCookie, getCookie, isParams} from "../js/utils/Utils.js";
import {tick} from "svelte";

export const childrenIdx = writable();
export const name = writable('');
export const birthday = writable('');
export const gender = writable('');
export const weight = writable('');
export const tall = writable('');
export const headSize = writable('');
export const imageUrl = writable('');

function validationData() {
    // validation check
    if (isEmpty(get(name))) {
        alert('이름을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=name]");
            Input.focus()
        });
        return false;
    }
    if (isEmpty(get(birthday))) {
        alert('생년월일을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=birthday]");
            Input.focus()
        });
        return false;
    }
    if (isEmpty(get(gender))) {
        alert('성별을 선택하세요.');
        return false;
    }

    return true;
}

export function getChildrenInfo(idx) {
    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/children/info',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            idx: idx
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            if (code !== 200) {
                alert(message)
                window.location.href = '/#/user/info';
                return;
            }

            childrenIdx.set(data.idx);
            name.set(data.name);
            birthday.set(data.birthday);
            gender.set(data.gender);
            weight.set(data.weight);
            tall.set(data.tall);
            headSize.set(data.head_size);
            imageUrl.set(data.image_url);
        },
        (error) => {
            console.log(error);
        }
    );
}

export function childrenAdd(returnInfo) {
    let check = validationData();
    if (!check) {
        return;
    }

    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/children/insert',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            name: get(name),
            birthday: get(birthday),
            gender: get(gender),
            weight: get(weight),
            tall: get(tall),
            head_size: get(headSize)
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message

            if (code !== 200) {
                alert(message)
                return;
            }

            alert("아이 정보가 등록 되었습니다.");
            if (isParams('more') === true) {
                window.location.href = '/#/user/info';
            } else {
                window.location.href = '/#/items';
            }
        },
        (error) => {
            console.log(error);
        }
    );
}

export function childrenModify() {
    let check = validationData();
    if (!check) {
        return;
    }

    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/children/modify',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            idx: get(childrenIdx),
            name: get(name),
            birthday: get(birthday),
            gender: get(gender),
            weight: get(weight),
            tall: get(tall),
            head_size: get(headSize)
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message

            if (code !== 200) {
                alert(message)
                return;
            }

            window.location.href = '/#/user/info';
        },
        (error) => {
            console.log(error);
        }
    );
}