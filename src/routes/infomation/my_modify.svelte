<script>
    import CommonHeader from '../../components/common/Header.svelte'
    import CommonHeader2 from '../../components/common/Header2.svelte'
    import InputType1 from "../../components/common/InputType1.svelte";
    import BottomButton from "../../components/common/BottomButton.svelte";
    import {onMount} from "svelte";
    import {
        getUserInfo, modifyUserInfo,
        name,
        phone,
        role
    } from "../../store/infomation.js";

    onMount(() => {
        getUserInfo()
    })

</script>

<div class="content">
    <div class="header-div">
        <CommonHeader2 title="내 정보 수정하기" />
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
</div>
<BottomButton next="수정하기" nextOnClick={modifyUserInfo} />

<style>
    .input-div {
        margin-top: 40px;
    }

    p, span {
        font-size: 14px;
    }
</style>