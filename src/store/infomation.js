import axios from "axios";
import {API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import {getCookie} from "../js/utils/Utils.js";
import {get, writable} from "svelte/store";
import {inviteCode} from "./Login.js";

const isPushAgree = writable(1)
const userIdx = writable()
export const name = writable('')
export const phone = writable('')
export const role = writable('')

export async function getUserInfo() {
    // try {
    //     const result = await axios({
    //         method: 'POST',
    //         url: API_URL + API_SERVICE_URI + '/user/info',
    //         headers: {
    //             Authorization: 'Bearer ' + getCookie('token'),
    //         }
    //     })
    //     const res = result.data
    //     console.log(res);
    //     if (res.code !== 200) {
    //         alert(res.message)
    //         return;
    //     }
    //
    //     name.set(res.data.name);
    //     phone.set(res.data.phone);
    //     role.set(res.data.role);
    //
    // } catch (error) {
    //     console.log(error, 'error')
    // }

    await axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/user/info',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        }
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
            console.log(data.user_type)

            userIdx.set(data.idx)
            name.set(data.name);
            phone.set(data.phone);
            role.set(data.role);
        },
        (error) => {
            console.log(error);
        }
    );
}

export function modifyUserInfo() {
    // let test = JSON.stringify({
    //     name: get(name),
    //     phone: get(phone),
    //     role: get(role)
    // })
    //
    // console.log(test);
    // return false;

    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/user/modify',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            idx: get(userIdx),
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
            console.log(api_response);

            // location.reload();
            // window.location.href = "/#/"
        },
        (error) => {
            console.log(error);
        }
    );

}