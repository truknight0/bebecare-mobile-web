<script>
    import CommonHeader from "../../components/common/Header.svelte";
    import InputType1 from "../../components/common/InputType1.svelte";
    import InputType2 from "../../components/common/InputType2.svelte";
    import InputDateTime from "../../components/common/InputDateTime.svelte";
    import RadioButtons from "../../components/common/RadioButton.svelte";
    import BottomButton from "../../components/common/BottomButton.svelte";
    import {goBack} from "../../js/utils/Utils.js";
    import {
        childrenAdd,
        name,
        birthday,
        gender,
        weight,
        tall,
        headSize
    } from "../../store/children.js";

    let headerTitle = "아이 정보";
    let headerDescription = "양육할 아이의 정보를 입력해주세요.<br>아이 정보는 내정보에서 변경할 수 있습니다.";
    let buttons = [
        {name: '남자', key: 'M'},
        {name: '여자', key: 'F'}
    ]
</script>

<div class="content">
    <div class="header-div">
        <CommonHeader title={headerTitle} description={headerDescription} />
    </div>
    <div class="input-div">
        <InputType1 name="name" title="이름" description="이름 또는 별명" bind:value={$name} />
    </div>
    <div class="input-div">
        <InputDateTime name="birthday" title="생년월일" description="출생일 혹은 출생예정일" bind:value={$birthday} />
    </div>
    <div class="input-div">
        <RadioButtons name="gender" title="성별" position="right" buttons={buttons} bind:value={$gender} />
    </div>
    <div class="empty-area"></div>
    <div class="sub-title">
        <span>추가 정보</span>
    </div>
    <div class="input2-div">
        <InputType2 name="weight" position="right" title="몸무게(kg)" unit="kg" bind:value={$weight} />
    </div>
    <div class="input2-div">
        <InputType2 name="tall" position="right" title="키(cm)" unit="cm" bind:value={$tall} />
    </div>
    <div class="input2-div">
        <InputType2 name="head_size" position="right" title="머리둘레(cm)" unit="cm" bind:value={$headSize} />
    </div>
</div>
<BottomButton prev="이전" prevOnClick="{goBack}" next="시작하기" nextOnClick="{childrenAdd}" />

<style>
    .empty-area {
        height: 50px;
    }

    .sub-title {
        height: 30px;
        margin-bottom: 10px;
    }

    .sub-title span {
        font-size: 14px;
    }

    .input-div {
        margin-top: 30px;
    }

    .input2-div {
        margin-top: 5px;
    }
</style>