<script>
    import {onMount} from "svelte";
    import SelectBox from "../../components/common/SelectBox.svelte";
    import RadioButtonGray from "../../components/common/RadioButton-Gray.svelte";
    import InputType2 from "../../components/common/InputType2.svelte";
    import ChangeDateModal from "../../components/modal/ChangeDateModal.svelte";
    import {
        getChildrenList,
        getItemList,
        changeChildrenItemList,
        insertItem,
        modifyItem,
        deleteItem,
        childrenList,
        searchDate,
        type,
        itemList,
        userIdx,
        childrenIdx,
        napTime,
        sleepTime,
        milkPowder,
        milkTime,
        babyFood,
        lastFoodTime,
        lastSleepTime,
        lastPharmacyTime,
        sDate,
        eDate,
        sTime,
        eTime,
        itemIdx
    } from "../../store/items.js";
    import {
        changeDateFormat,
        dateformatYmd
    } from "../../js/utils/Utils.js";
    import {get, writable} from "svelte/store";

    let itemTypes = [
        {class: 'all', name: '전체', icon: null},
        {class: 'A', name: '모유', icon: '/images/icon/icon-A.png'},
        {class: 'B', name: '분유', icon: '/images/icon/icon-B.png'},
        {class: 'C', name: '이유식', icon: '/images/icon/icon-C.png'},
        {class: 'H', name: '약', icon: '/images/icon/icon-H.png'},
        {class: 'D', name: '소변', icon: '/images/icon/icon-D.png'},
        {class: 'E', name: '대변', icon: '/images/icon/icon-E.png'},
        {class: 'F', name: '낮잠', icon: '/images/icon/icon-F.png'},
        {class: 'G', name: '밤잠', icon: '/images/icon/icon-G.png'},
    ]

    let etc1Buttons = [
        {name: '왼쪽', key: '왼쪽'},
        {name: '오른쪽', key: '오른쪽'},
        {name: '양쪽', key: '양쪽'},
    ]

    let etc3Buttons = [
        {name: '경구투여', key: '경구투여'},
        {name: '연고', key: '연고'}
    ]

    let showModal = false;
    $: sDate

    onMount(() => {
        getChildrenList();
    })

    function searchItemParams(getChildrenIdx, getType, getDate) {
        childrenIdx.set(getChildrenIdx);
        type.set(getType);
        searchDate.set(getDate);

        getItemList($childrenIdx, $type, $searchDate);

        return false;
    }

    const toggleModal = (day1, day2, idx) => {
        if (typeof idx != 'undefined' && idx !== null) {
            let sDaySplit = day1.split(" ");
            let eDaySplit = day2.split(" ");
            sDate.set(sDaySplit[0]);
            sTime.set(sDaySplit[1]);
            eDate.set(eDaySplit[0]);
            eTime.set(eDaySplit[1]);
            itemIdx.set(idx);
        }
        showModal = !showModal;
    }
</script>

<ChangeDateModal {showModal} on:click={toggleModal} />
<div class="content">
    <div class="header-div">
        <table class="top-tbl">
            <tr>
                <td style="width: 15%"></td>
                <td style="width: 70%; text-align: center;">
                    <SelectBox options={$childrenList} bold="true" bind:value={$childrenIdx} eventOnChange={changeChildrenItemList}/>
                </td>
                <td style="width: 15%; text-align: right;">
                    <button type="button" class="move-info" onclick="window.location.href='/#/user/info'" >
                        <img src="/images/icon/setting.svg" alt="내 정보" />
                    </button>
                </td>
            </tr>
        </table>
        <table class="middle-tbl">
            <tr>
                <td style="width: 65%">
                    <span class="total-data">
                        낮잠: {$napTime}<br>
                        밤잠: {$sleepTime}<br>
                        분유: {$milkPowder}<br>
                        모유: {$milkTime}<br>
                        이유식: {$babyFood}
                    </span>
                </td>
                <td class="right-date-area" style="width: 35%; text-align: right;">
                    <input type="date" class="search-date" bind:value={$searchDate} on:change={searchItemParams($childrenIdx, $type, $searchDate)} />
                    <p>마지막 식사: {$lastFoodTime}</p>
                    <p>마지막 잠: {$lastSleepTime}</p>
                    <p>마지막 약: {$lastPharmacyTime}</p>
                </td>
            </tr>
        </table>
        <div class="category-btn-area">
            <ul>
                {#each itemTypes as li}
                    <li>
                        {#if $type === li.class}
                            <button class="{li.class} selected">{li.name}</button>
                        {:else}
                            <button class="{li.class}" on:click={searchItemParams($childrenIdx, li.class, $searchDate)}>{li.name}</button>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="item-list-area">
        {#if $itemList !== null}
            {#each $itemList as item}
                <div class="item-div">
                    <table class="item-tbl">
                        <tr>
                            <td style="width: 20%; white-space: normal;">
                                <div class="icon-{item.type}">
                                    <img src="/images/icon/icon-{item.type}.png" alt="{item.name}" style="width: 30px;" />
                                </div>
                                <div class="item-date-time">
                                    <span>{changeDateFormat(item.start_time, null, 'dateTime')} 전</span>
                                </div>
                            </td>
                            <td style="width: 80%;">
                                {#if item.end_time === null}
                                    <div class="item-head item-head-ing">
                                        <span>{item.start_time}</span>
                                        <button on:click={deleteItem(item.idx)}><img src="/images/icon/icon-delete-white.png" alt="삭제"></button>
                                    </div>
                                    <div class="item-content item-content-ing">
                                        <div class="item-content-inner">
                                            <span class="complete-span">{item.name}</span>
                                            <div style="margin-top: 10px;">
                                                {#if item.type === 'A'}
                                                    <RadioButtonGray name="etc1_{item.idx}" title="선택:" buttons={etc1Buttons} bind:value={item.etc1} />
                                                    <button class="item-complete-button" on:click={modifyItem(item.idx, item.start_time, dateformatYmd('now', true))}>완료</button>
                                                {:else if item.type === 'F'}
                                                    <button class="item-complete-button" on:click={modifyItem(item.idx, item.start_time, dateformatYmd('now', true))}>완료</button>
                                                {:else if item.type === 'G'}
                                                    <button class="item-complete-button" on:click={modifyItem(item.idx, item.start_time, dateformatYmd('now', true))}>완료</button>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                {:else}
                                    <div class="item-head item-head-complete">
                                        <span on:click={toggleModal(item.start_time, item.end_time, item.idx)}>{item.start_time}</span>
                                        <button on:click={deleteItem(item.idx)}><img src="/images/icon/icon-delete-white.png" alt="삭제"></button>
                                    </div>
                                    <div class="item-content item-content-complete">
                                        <div class="item-content-inner">
                                            <span class="complete-span">{item.name}</span>
                                            {#if item.end_time != null && item.start_time !== item.end_time}
                                                <span class="small-span-gray">{changeDateFormat(item.start_time, item.end_time, 'dateTime', '1분')}</span>
                                            {/if}
                                            {#if item.etc2 != null}
                                                <span class="small-span-gray">{item.etc2}ml</span>
                                            {/if}
                                            <div style="margin-top: 10px;">
                                                {#if item.type === 'A'}
                                                    <RadioButtonGray name="etc1_{item.idx}" title="선택:" buttons={etc1Buttons} bind:value={item.etc1} />
                                                    <button class="item-modify-button" on:click={modifyItem(item.idx)}>수정</button>
                                                {:else if item.type === 'H'}
                                                    <RadioButtonGray name="etc3_{item.idx}" title="선택:" buttons={etc3Buttons} bind:value={item.etc3} />
                                                    <button class="item-modify-button" on:click={modifyItem(item.idx)}>수정</button>
                                                {:else if item.type === 'B'}
                                                    <InputType2 title="먹은 양:" name="etc2_{item.idx}" bind:value={item.etc2} numberOnly="Y" unit="ml" />
                                                    <button class="item-modify-button" on:click={modifyItem(item.idx)}>수정</button>
                                                {:else if item.type === 'C'}
                                                    <InputType2 title="먹은 양:" name="etc2_{item.idx}" bind:value={item.etc2} numberOnly="Y" unit="ml" />
                                                    <button class="item-modify-button" on:click={modifyItem(item.idx)}>수정</button>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </td>
                        </tr>
                    </table>
                </div>
            {/each}
        {/if}
    </div>
    {#if (dateformatYmd('now') === $searchDate)}
        <div class="bottom-btn-area">
            <ul>
                {#each itemTypes as li}
                    {#if li.icon !== null}
                        <li>
                            <button class="item-add-{li.class}" on:click={insertItem} data-type="{li.class}"><img src="{li.icon}" data-type="{li.class}" alt="{li.name}" style="width:30px;" /></button>
                            <div style="text-align: center;"><span style="font-size: 12px;">{li.name}</span></div>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style>
    .content {
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        margin: 0;
    }

    .top-tbl, .middle-tbl {
        width: 100%
    }

    .top-tbl td, .middle-tbl td {
        vertical-align: center;
    }

    .move-info {
        background-color: #ffffff;
        border: none;
    }

    .total-data {
        font-size: 14px;
    }

    .search-date {
        width: 140px;
        border: none;
    }

    .right-date-area {
        width: 35%;
        text-align: right;
    }

    .right-date-area p {
        font-size: 12px;
        margin: 3px 0;
    }

    .category-btn-area ul::-webkit-scrollbar{
        /*display: none;*/
    }

    .category-btn-area ul {
        padding: 0 0 10px;
        list-style: none;
        white-space: nowrap;
        overflow: auto;
    }

    .category-btn-area ul li {
        display: inline-block;
    }

    .category-btn-area ul li:not(:last-child) {
        margin-right: 10px;
    }

    .category-btn-area button {
        padding: 5px 12px;
        font-size: 12px;
        border-radius: 10px;
    }

    .category-btn-area ul li .selected {
        color: #ffffff;
        border: 1px solid #2da6cc;
        background-color: #2da6cc;
    }

    .item-div:not(:last-child) {
        margin-bottom: 20px;
    }

    .item-tbl {
        width: 100%;
    }

    .item-tbl td {
        vertical-align: center;
    }

    .item-tbl div[class^='icon'] {
        margin: 0 auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .item-tbl div[class^='icon'] img {
        position: relative;
        top: 15px;
        left: 15px;
    }

    .item-date-time {
        margin-top: 5px;
        text-align:center;
    }

    .item-date-time span {
        font-size: 10px;
    }

    .item-tbl .icon-A, .bottom-btn-area .item-add-A {
        background-color: #e39292;
    }

    .item-tbl .icon-B, .bottom-btn-area .item-add-B {
        background-color: #e8b497;
    }

    .item-tbl .icon-C, .bottom-btn-area .item-add-C {
        background-color: #d6baf4;
    }

    .item-tbl .icon-D, .bottom-btn-area .item-add-D {
        background-color: #efd985;
    }

    .item-tbl .icon-E, .bottom-btn-area .item-add-E {
        background-color: #c5a26d;
    }

    .item-tbl .icon-F, .bottom-btn-area .item-add-F {
        background-color: #cafafa;
    }

    .item-tbl .icon-G, .bottom-btn-area .item-add-G {
        background-color: #563df8;
    }

    .item-tbl .icon-H, .bottom-btn-area .item-add-H {
        background-color: #cff393;
    }

    .item-tbl .item-head {
        position: relative;
        height: 25px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .item-tbl .item-head span {
        position: relative;
        top: 3px;
        font-size: 12px;
        margin-left: 10px;
        color: #ffffff;
    }

    .item-tbl .item-head button {
        position: absolute;
        margin: 0;
        padding: 0;
        top: 4px;
        right: 10px;
        background: none;
        border: none;
    }

    .item-tbl .item-head button img {
        width: 17px;
        height: 17px;
    }

    .item-tbl .item-head-ing {
        background-color: #2da6cc;
        border: 1px solid #2da6cc;
    }

    .item-tbl .item-content-ing {
        border: 1px solid #2da6cc;
    }

    .item-tbl .item-head-complete {
        background-color: #cccccc;
        border: 1px solid #cccccc;
    }

    .item-tbl .item-content-complete {
        border: 1px solid #cccccc;
    }

    .item-tbl .item-content {
        position: relative;
        min-height: 75px;
        max-height: 100px;
    }

    .item-tbl .item-content .item-content-inner {
        margin: 10px;
    }

    .item-content-inner .complete-span {
        font-size: 20px;
        color: #aaaaaa;
        margin-right: 3px;
    }

    .item-list-area {
        flex-grow: 1;
        height:32%;
        white-space: nowrap;
        overflow: auto;
    }

    .bottom-btn-area {
        background-color: #ffffff;
    }

    .bottom-btn-area ul::-webkit-scrollbar{
        /*display: none;*/
    }

    .bottom-btn-area ul {
        padding: 0 0 10px;
        list-style: none;
        white-space: nowrap;
        overflow: auto;
    }

    .bottom-btn-area ul li {
        display: inline-block;
    }

    .bottom-btn-area ul li:not(:last-child) {
        margin-right: 10px;
    }

    .bottom-btn-area button[class^='item-add-'] {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0;
        border: none;
    }

    .small-span-gray {
        font-size: 12px;
        color: #aaaaaa;
    }

    .item-complete-button {
        color: #2da6cc;
        border-radius: 5px;
        right: 6px;
    /* float: right; */
        bottom: 10px;
        position: absolute;
        background: #ffffff;
        font-size: 12px;
        width: 45px;
        height: 45px;
        border-color: #2da6cc;
    }

    .item-modify-button {
        color: #aaaaaa;
        border-radius: 5px;
        right: 6px;
        /* float: right; */
        bottom: 10px;
        position: absolute;
        background: #ffffff;
        font-size: 12px;
        width: 45px;
        height: 45px;
        border-color: #aaaaaa;
    }
</style>