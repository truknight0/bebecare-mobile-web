import axios from "axios";
import {API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import {getCookie} from "../js/utils/Utils.js";
import {get, writable} from "svelte/store";

const isPushAgree = writable(1)
export const userIdx = writable()
export const name = writable('')
export const phone = writable('')
export const role = writable('')
export const userType = writable('')
export const inviteCode = writable('')
export const children = writable([])
export const parents = writable([])

export async function getUserInfo() {

    await axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/user/info',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        }
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            if (code !== 200) {
                alert(message)
                return;
            }

            // console.log(data)
            userIdx.set(data.idx)
            name.set(data.name);
            phone.set(data.phone);
            role.set(data.role);
            userType.set(data.user_type);
            inviteCode.set(data.invite_code);
            children.set(data.children);
            parents.set(data.parents);

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
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            if (code !== 200) {
                alert(message)
                return;
            }
            // console.log(apiRes);
            window.location.href = "/#/user/info"
        },
        (error) => {
            console.log(error);
        }
    );
}

export function disconnectUser(userIdx) {
    if (confirm("정말 공동 양육자 연결을 해제 하시겠습니까?")) {
        axios({
            method: 'POST',
            url: API_URL + API_SERVICE_URI + '/parents/disconnect',
            headers: {
                Authorization: 'Bearer ' + getCookie('token'),
            },
            data: JSON.stringify({
                idx: userIdx
            })
        }).then(
            (response) => {
                let apiRes = response.data
                let code = apiRes.code
                let message = apiRes.message
                let data = apiRes.data

                if (code !== 200) {
                    alert(message)
                    return;
                }
                alert("연결이 해제되었습니다.");
                // location.reload();
                // window.location.href = "/#/"
            },
            (error) => {
                console.log(error);
            }
        );
    }
}

export function setInviteCode() {
    let childIdx = get(children)[0].idx;
    if (childIdx == 0 || childIdx == '' || childIdx == null) {
        alert("양육할 아이 등록 후 초대 코드 생성이 가능합니다.");
        return;
    }
    // console.log(childIdx);
    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/invite/make',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            children_idx: get(childIdx)
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            if (code !== 200) {
                alert(message)
                return;
            }
            // console.log(apiRes);
            inviteCode.set(data.invite_code)

            alert("초대 코드가 생성되었습니다.");
            // location.reload();
            // window.location.href = "/#/"
        },
        (error) => {
            console.log(error);
        }
    );
}

export function deleteUser() {
    if (confirm("정말 내 정보를 모두 삭제하시겠습니까?")) {
        axios({
            method: 'POST',
            url: API_URL + API_SERVICE_URI + '/user/delete',
            headers: {
                Authorization: 'Bearer ' + getCookie('token'),
            }
        }).then(
            (response) => {
                let apiRes = response.data
                let code = apiRes.code
                let message = apiRes.message
                let data = apiRes.data

                if (code !== 200) {
                    alert(message)
                    return;
                }
                window.location.href = "/";
            },
            (error) => {
                console.log(error);
            }
        );
    }
}