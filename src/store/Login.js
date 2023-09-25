import {writable, get} from "svelte/store";
import {BASE_URL, API_NOAUTH_URI, API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import axios from "axios";
import {isEmpty, setCookie, getCookie} from "../js/utils/Utils.js";
import {tick} from "svelte";

const isPushAgree = writable(1);
export const name = writable('');
export const phone = writable('');
export const role = writable('');
export const termsAgree = writable(false);
export const inviteCode = writable();

export function loginUser() {
    // validation check
    if (isEmpty(get(phone))) {
        alert('전화번호를 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=phone]");
            Input.focus()
        });
        return;
    }
    if (isEmpty(get(name))) {
        alert('닉네임을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=name]");
            Input.focus()
        });
        return;
    }
    if (isEmpty(get(role))) {
        alert('역할을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=role]");
            Input.focus()
        });
        return;
    }
    if (!get(termsAgree)) {
        alert('개인정보 수집 및 이용에 동의하셔야 합니다.');
        return;
    }

    axios({
        method: 'POST',
        url: API_URL + API_NOAUTH_URI + '/login',
        data: JSON.stringify({
            name: get(name),
            phone: get(phone),
            role: get(role),
            is_push_agree: get(isPushAgree),
        })
    }).then(
        (response) => {
            let api_response = response.data
            let code = api_response.code
            let message = api_response.message
            let data = api_response.data

            if (code !== 200) {
                alert(message)
                return;
            }

            setCookie('token', data.token, 3650)
            console.log(getCookie('token'))
            window.location.href = '/#/welcome';
        },
        (error) => {
            console.log(error);
        }
    );
}

export function joinInviteCode() {
    // validation check
    if (isEmpty(get(inviteCode)) || get(inviteCode).length < 6) {
        alert('올바르지 않은 초대코드 입니다.');
        return;
    }

    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/invite/join',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            invite_code: parseInt(get(inviteCode))
        })
    }).then(
        (response) => {
            let api_response = response.data
            let code = api_response.code
            let message = api_response.message
            let data = api_response.data

            if (code !== 200) {
                alert(message)
                return;
            }

            window.location.href = '/#/items';
        },
        (error) => {
            console.log(error);
        }
    );
}