<script>
    import CommonHeader from "../../components/common/Header.svelte";
    import {goBack} from "../../js/utils/Utils.js";
    import {joinInviteCode, inviteCode} from "../../store/Login.js";
    import BottomButton from "../../components/common/BottomButton.svelte";

    let headerTitle = "초대 코드";
    let headerDescription = "전달받은 초대 코드 6자리를 입력하여<br>공동양육을 시작해보세요.";
    let subDescription = "(초대 코드는 이전 페이지에서 아이 등록 후 생성 가능합니다.)";

    function checkCode() {

    }
</script>

<div class="content">
    <div class="header-div">
        <CommonHeader title={headerTitle} description={headerDescription} subDescription={subDescription} />
    </div>
    <div class="empty-area"></div>
<!--    <div>-->
<!--        <ul>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" onclick="" maxlength="1"/>-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" maxlength="1"/>-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" maxlength="1"/>-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" maxlength="1"/>-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" maxlength="1"/>-->
<!--            </li>-->
<!--            <li>-->
<!--                <input type="text" class="set-code" maxlength="1"/>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </div>-->
    <div class="invite-code">
        <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="6" bind:value={$inviteCode}/>
    </div>
</div>
<BottomButton prev="이전" prevOnClick="{goBack}" next="시작하기" nextOnClick="{joinInviteCode}" />

<style>
    .empty-area {
        height: 30px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        float: left;
    }
    li:not(:last-child) {
        margin-right: 11px;
    }

    li input {
        border-radius: 4px;
        text-align: center;
        height: 65px;
        font-size: 28px;
        font-weight: bold;
        width: 45px;
    }

    .invite-code {
        text-align: center;
    }

    .invite-code input {
        width: 80%;
        border: none;
        border-bottom: 1px solid #ccc;
        text-align: center;
        height: 65px;
        font-size: 28px;
        font-weight: bold;
    }
</style>