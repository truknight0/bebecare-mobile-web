<script>
    import CommonHeader from '../../components/common/Header.svelte'
    import InputType1 from "../../components/common/InputType1.svelte";
    import BottomButton from "../../components/common/BottomButton.svelte";
    import {onMount} from "svelte";
    import {
        loginUser,
        name,
        phone,
        role,
        termsAgree
    } from "../../store/Login.js";
    import {getCookie} from "../../js/utils/Utils.js";

    let headerTitle = "환영합니다!";
    let headerDescription = "베베케어를 시작하기 전에<br>가입 정보 입력 및 약관 동의를 해주세요.";

    onMount(() => {
        // console.log(getCookie('token'))
    })
</script>

<div class="content">
    <div class="header-div">
        <CommonHeader title={headerTitle} description={headerDescription} />
    </div>
    <div class="input-div">
        <InputType1 name="phone" title="전화번호" numberOnly="Y" bind:value={$phone} description="-을 제외하고 입력"/>
    </div>
    <div class="input-div">
        <InputType1 name="name" title="닉네임" bind:value={$name} description="양육자의 이름 또는 별명"/>
    </div>
    <div class="input-div">
        <InputType1 name="role" title="역할" bind:value={$role} description="아이와 양육자간의 관계"/>
    </div>
    <div class="input-div terms">
<!--        <p>약관 동의</p>-->
        <!--        <label for="agree1">-->
        <!--            <span>이용 약관 동의 →</span>-->
        <!--            <input type="checkbox" id="agree1" on:change={() => {agree1 = !agree1}}>-->
        <!--        </label>-->
<!--        <label for="agree1">-->
<!--            <span>개인정보 수집 및 이용 동의 →</span>-->
<!--            <input type="checkbox" id="agree1" name="terms" on:change={() => {$termsAgree = !$termsAgree}}>-->
<!--        </label>-->
    </div>
</div>
<BottomButton next="다음" nextOnClick="{loginUser}" />

<style>
    .input-div {
        margin-top: 40px;
    }

    .terms label span {
        color: #cccccc;
        font-size: 14px;
    }

    input[type="checkbox"] {
        -moz-appearance: none;
        -webkit-appearance: none;
        -o-appearance: none;
        margin: 0;
        position: absolute;
        right: 30px;
        display: inline-block;
        width: 10px;
        border:1px solid #cccccc;
    }

    input[type="checkbox"]:checked {
        margin: 0;
        position: absolute;
        right: 30px;
        display: inline-block;
        width: 10px;
        border:1px solid #cccccc;
        background-color: #333333;
    }

    .terms label {
        margin: 10px 0;
    }

    p, span {
        font-size: 14px;
    }
</style>