<script>
    import CommonHeader2 from "../../components/common/Header2.svelte";
    import {onMount} from "svelte";
    import {
        getUserInfo,
        setInviteCode,
        deleteUser,
        disconnectUser,
        name,
        phone,
        role,
        userType,
        inviteCode,
        children,
        parents
    } from "../../store/infomation.js";
    import {changeDateFormat, changePhoneFormat, mailRedirect, pageRedirect} from "../../js/utils/Utils.js";
    import TextButton from "../../components/common/TextButton.svelte";

    getUserInfo()

</script>

<div class="content">
    <div class="header-div">
        <CommonHeader2 title="내 정보" moveUrl="/#/items" />
    </div>
    <div class="empty-area"></div>
    <div class="my-area">
        <p>
            <b>{$name}</b>
            <span class="role-span">{$role}</span>
            <button type="button" class="modify" on:click={() => pageRedirect('/#/user/modify')}>수정</button>
        </p>
        <span class="phone-span">{changePhoneFormat($phone)}</span>
    </div>
    <div class="empty-area"></div>
    {#if $children != null}
        {#each $children as child}
            <div class="child-area">
                <p>
                    <b>{child.name}</b>
                    <span class="birthday-span">{changeDateFormat(child.birthday, null, 'week')} / {changeDateFormat(child.birthday, null, 'month')}</span>
                    {#if $userType === 'M'}
                        <button type="button" class="modify" on:click={() => pageRedirect('/#/children/modify/' + child.idx)}>수정</button>
                    {/if}
                </p>
                <span class="sub-info-span">몸무게 {child.weight}kg / 키 {child.tall}cm / 머리둘레 {child.head_size}cm</span>
            </div>
        {/each}
    {/if}
    {#if $userType === 'M'}
        <div class="children-add-button">
<!--            <button type="button" onclick="location.href='/#/children/add?more'">아이 추가하기</button>-->
            <button type="button" on:click={() => pageRedirect('/#/children/add?more')}>아이 추가하기</button>
        </div>
    {/if}
    <div class="empty-area"></div>
    {#if $parents != null}
        <span class="sub-title">공동 양육자</span>
        {#each $parents as parent}
            <div class="parent-area">
                <span class="parent-name">{parent.name}</span>
                <span class="parent-role">{parent.role}</span>
                {#if parent.is_mine === true}
                    <span class="parent-me">본인</span>
                {/if}
                {#if $userType === 'M' && parent.is_mine === false}
                    <button type="button" class="disconnect" on:click={disconnectUser(parent.idx)}>연결끊기</button>
                {/if}
            </div>
        {/each}
    {/if}
    {#if $userType === 'M'}
        {#if $inviteCode == 0 || $inviteCode == null}
            <TextButton
                title="초대 코드 생성하기"
                description="공동 양육자를 추가하기 위한 6자리 초대 코드를 생성합니다."
                eventOnClick={setInviteCode}
            />
        {:else}
            <div>
                <table class="invite-code-tbl">
                    <tr>
                        <td class="invite-code-title">초대 코드</td>
                        <td class="invite-code-value">{$inviteCode}</td>
                    </tr>
                </table>
            </div>
        {/if}
    {/if}
    <div class="empty-area" style="height: 50px;"></div>
    <TextButton
            title="개발자에게 메일 보내기"
            description="더 나은 앱 사용을 위해 문의 사항을 메일로 보내주세요."
            eventOnClick={mailRedirect}
    />
    <TextButton
            title="다음에 이용하기"
            description="시스템에 등록된 내 정보를 삭제합니다."
            eventOnClick={deleteUser}
    />
</div>

<style>
    .empty-area {
        height: 30px;
    }

    .my-area p, .child-area p {
        margin-bottom: 0;
    }

    .my-area b {
        font-size: 32px;
    }

    .my-area span {
        font-size: 12px;
        color: #999999;
    }

    .role-span {
        margin-left: 10px;
    }

    .modify {
        margin-top: 10px;
        border-radius: 4px;
        width: 60px;
        text-align: center;
        float: right;
        color: #999999;
        font-size: 12px;
    }

    .child-area b {
        font-size: 24px;
    }

    .child-area span {
        font-size: 12px;
        color: #999999;
    }

    .children-add-button {
        margin-top: 30px;
    }

    .children-add-button button {
        border-radius: 4px;
        width: 120px;
        text-align: center;
        border: 1px solid #2da6cc;
        background-color: #2da6cc;
        color: #ffffff;
        font-size: 12px;
    }

    .sub-title {
        font-size: 12px;
        color: #999999;
        line-height: 40px;
    }

    .parent-area {
        height: 35px;
    }

    .parent-role {
        font-size: 12px;
        color: #999999;
        margin-left: 10px;
    }

    .parent-me {
        font-size: 12px;
        color: #f84646;
        margin-left: 10px;
    }

    .disconnect {
        border-radius: 4px;
        width: 60px;
        text-align: center;
        float: right;
        border: 1px solid #facaca;
        background-color: #facaca;
        color: #fa6666;
        font-size: 10px;
    }

    .invite-code-tbl {
        width: 100%;
    }

    .invite-code-tbl td {
        width: 50%;
        vertical-align: center;
    }

    .invite-code-value {
        text-align: right;
        font-weight: bold;
        font-size: 24px;
    }
</style>