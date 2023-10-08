<script>
    import CommonHeader from "../../components/common/Header.svelte";
    import {onMount} from "svelte";
    import {getUserInfo} from "../../store/infomation.js";

    let headerTitle = "처음이시군요?";
    let headerDescription = "베베케어에 처음이시군요?<br>아이를 직접 등록하거나 공동 양육자로부터 초대코드를 받아 베베케어를 시작해 볼 수 있어요.";

    onMount(() => {
        getUserInfo()
    })
</script>

<main>
    <div class="content">
        <div class="header-div">
            <CommonHeader title={headerTitle} description={headerDescription} />
        </div>
        <div class="empty-area"></div>
        <div class="right-link">
            <a href="/#/children/add">아이 등록하기 →</a>
        </div>
        <div class="right-link">
            <a href="/#/invite">초대코드 등록하기 →</a>
        </div>
    </div>
</main>

<style>
    .right-link {
        height:60px;
        text-align: right;
    }

    .right-link a {
        color: #999999;
        text-decoration-line: none;
    }
</style>