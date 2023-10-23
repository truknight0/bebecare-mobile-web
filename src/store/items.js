import axios from "axios";
import {API_SERVICE_URI, API_URL} from "../js/constants/Constants.js";
import {
    changeBetweenDateMicroTime,
    changeMicroTimeToDateTime,
    dateformatYmd,
    deleteCookie,
    getCookie,
    responseCodeProcess
} from "../js/utils/Utils.js";
import {get, writable} from "svelte/store";

export const userIdx = writable(0);
export const childrenIdx = writable(0);
export const childrenList = writable([]);
export const searchDate = writable(dateformatYmd('now'));
export const type = writable('all');
export const itemList = writable([]);

export const napTime = writable('0시간 0분');
export const sleepTime = writable('0시간 0분');
export const milkPowder = writable('0ml');
export const milkTime = writable('0시간 0분');
export const babyFood = writable('0ml');


export const itemIdx = writable();
export const sDate = writable();
export const sTime = writable();
export const eDate = writable();
export const eTime = writable();

export async function getChildrenList() {
    await axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/user/check',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        }
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            responseCodeProcess(code, message, true)

            if (data.children_list == null) {
                alert("잘못된 접근입니다.")
                window.location.href = '/';
                return;
            }

            let list = [];
            for (let i = 0; i < data.children_list.length; i++) {
                if (i === 0) {
                    childrenIdx.set(data.children_list[i].idx);
                }
                list[i] = {
                    'value': data.children_list[i].idx,
                    'title': data.children_list[i].name
                }
            }

            userIdx.set(data.idx)
            childrenList.set(list);

            getItemList(get(childrenIdx), get(type), get(searchDate))
        },
        (error) => {
            console.log(error);
        }
    );
}

export async function getItemList(childrenIdx, type, searchDate) {
    if (type === 'all') {
        type = '';
    }
    await axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/items/list',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            user_idx: get(userIdx),
            children_idx: childrenIdx,
            type: type,
            search_date: searchDate,
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message
            let data = apiRes.data

            responseCodeProcess(code, message)
            // console.log(data);
            let milkPowderSum = 0;
            let babyFoodSum = 0;
            let milkTimeSum = 0;
            let napTimeSum = 0;
            let sleepTimeSum = 0;
            if (data !== null) {
                for (let i = 0; i < data.length; i++) {
                    let etc2Num = 0;
                    if (data[i].etc2 != null) {
                        etc2Num = parseInt(data[i].etc2);
                    }
                    switch (data[i].type) {
                        case 'A' :
                            milkTimeSum += parseInt(changeBetweenDateMicroTime(data[i].start_time, data[i].end_time));
                            break;
                        case 'B' :
                            milkPowderSum += etc2Num;
                            break;
                        case 'C' :
                            babyFoodSum += etc2Num;
                            break;
                        case 'F' :
                            napTimeSum += parseInt(changeBetweenDateMicroTime(data[i].start_time, data[i].end_time));
                            break;
                        case 'G' :
                            sleepTimeSum += parseInt(changeBetweenDateMicroTime(data[i].start_time, data[i].end_time));
                            break;
                        default :
                            break;
                    }
                }
            }

            milkPowder.set(milkPowderSum + 'ml');
            babyFood.set(babyFoodSum + 'ml');
            milkTime.set(changeMicroTimeToDateTime(milkTimeSum, "0시간 0분"));
            napTime.set(changeMicroTimeToDateTime(napTimeSum, "0시간 0분"));
            sleepTime.set(changeMicroTimeToDateTime(sleepTimeSum, "0시간 0분"));

            itemList.set(data);
        },
        (error) => {
            console.log(error);
        }
    );
}

// select option 초기 로딩 문제로인해 selectbox용 export 함수 생성
export function changeChildrenItemList() {
    getItemList(get(childrenIdx), get(type), get(searchDate)).then(r => {})
}

export function insertItem(e) {
    let itemType = e.target.dataset.type;
    let endTime = null;
    if (itemType !== 'A' && itemType !== 'F' && itemType !== 'G') {
        endTime = dateformatYmd('now', true);
    }
    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/items/insert',
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
        data: JSON.stringify({
            user_idx: get(userIdx),
            children_idx: get(childrenIdx),
            type: itemType,
            start_time: dateformatYmd('now', true),
            end_time: endTime
        })
    }).then(
        (response) => {
            let apiRes = response.data
            let code = apiRes.code
            let message = apiRes.message

            responseCodeProcess(code, message)

            getItemList(get(childrenIdx), get(type), get(searchDate)).then(r => {});
        },
        (error) => {
            console.log(error);
        }
    );
}

export function modifyItem(idx, startDateTime, endDateTime) {
    const etc1 = document.querySelector('input[name=etc1_' + idx + ']:checked');
    const etc2 = document.querySelector('input[name=etc2_' + idx + ']');
    const etc3 = document.querySelector('input[name=etc3_' + idx + ']:checked');
    // console.log(etc1.value);
    // return false;
    let etc1Value = null;
    let etc2Value = null;
    let etc3Value = null;
    if (etc1 != null) etc1Value = etc1.value;
    if (etc2 != null) etc2Value = etc2.value;
    if (etc3 != null) etc3Value = etc3.value;

    if (confirm("수정 하시겠습니까?")) {
        axios({
            method: 'POST',
            url: API_URL + API_SERVICE_URI + '/items/modify',
            headers: {
                Authorization: 'Bearer ' + getCookie('token'),
            },
            data: JSON.stringify({
                idx: idx,
                etc1: etc1Value,
                etc2: etc2Value,
                etc3: etc3Value,
                start_time: startDateTime,
                end_time: endDateTime,
            })
        }).then(
            (response) => {
                let apiRes = response.data
                let code = apiRes.code
                let message = apiRes.message

                responseCodeProcess(code, message)

                getItemList(get(childrenIdx), get(type), get(searchDate)).then(r => {});
            },
            (error) => {
                console.log(error);
            }
        );
    }
}

export function completeItem(idx) {
    axios({
        method: 'POST',
        url: API_URL + API_SERVICE_URI + '/items/complete',
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

            responseCodeProcess(code, message)

            getItemList(get(childrenIdx), get(type), get(searchDate)).then(r => {});
        },
        (error) => {
            console.log(error);
        }
    );
}

export function deleteItem(idx) {
    if (confirm("삭제 하시겠습니까?")) {
        axios({
            method: 'POST',
            url: API_URL + API_SERVICE_URI + '/items/delete',
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

                responseCodeProcess(code, message)

                getItemList(get(childrenIdx), get(type), get(searchDate)).then(r => {});
            },
            (error) => {
                console.log(error);
            }
        );
    }
}