import {writable, get} from "svelte/store";
import {BASE_URL, API_NOAUTH_URI, API_SERVICE_URI, API_URL} from "./constants/Constants.js";
import axios from "axios";
import isEmpty from "./utils/Utils.js";
import {tick} from "svelte";

export const name = writable('');
export const phone = writable('');
export const role = writable('');
export const termsAgree = writable(false);

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
    if (get(termsAgree) === false) {
        alert('개인정보 수집 및 이용에 동의하셔야 합니다.');
        return;
    }

    axios({
        method: 'POST',
        url: API_URL + API_NOAUTH_URI + '/login',
        data: JSON.stringify({
            name: get(name),
            phone: get(phone),
            role: get(role)
        })
    }).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
}