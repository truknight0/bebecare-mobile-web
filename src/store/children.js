import {writable, get} from "svelte/store";
import {BASE_URL, API_NOAUTH_URI, API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import axios from "axios";
import {isEmpty, setCookie, getCookie} from "../js/utils/Utils.js";
import {tick} from "svelte";

export const name = writable('');
export const birthday = writable('');
export const gender = writable('');
export const weight = writable('');
export const tall = writable('');
export const headSize = writable('');

export function childrenAdd() {
    // validation check
    if (isEmpty(get(name))) {
        alert('이름을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=name]");
            Input.focus()
        });
        return;
    }
    if (isEmpty(get(birthday))) {
        alert('생년월일을 입력하세요.');
        tick().then(() => {
            let Input = document.querySelector("input[name=birthday]");
            Input.focus()
        });
        return;
    }
    if (isEmpty(get(gender))) {
        alert('성별을 선택하세요.');
        return;
    }

    // fetch(API_URL + API_SERVICE_URI + '/children/insert', {
    //     method: 'POST',
    //     headers: {
    //         "Authorization": 'Bearer ' + getCookie('token'),
    //         "Content-Type": 'application/json'
    //     },
    //     mode: 'no-cors',
    //     credentials: 'same-origin',
    //     body: JSON.stringify({
    //         name: get(name),
    //         birthday: get(birthday),
    //         gender: get(gender),
    //         weight: get(weight),
    //         tall: get(tall),
    //         head_size: get(headSize)
    //     })
    // }).then(
    //     (response) => {
    //         console.log(response)
    //         let api_response = response.data
    //         let code = api_response.code
    //         let message = api_response.message
    //         let data = api_response.data
    //
    //         if (code !== 200) {
    //             alert(message)
    //             return;
    //         }
    //
    //         window.location.href = '/#/items';
    //     },
    //     (error) => {
    //         console.log(error);
    //     }
    // );

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
            let api_response = response.data
            let code = api_response.code
            let message = api_response.message

            if (code !== 200) {
                alert(message)
                return;
            }

            alert("아이 정보가 등록 되었습니다.");
            window.location.href = '/#/items';
        },
        (error) => {
            console.log(error);
        }
    );
}