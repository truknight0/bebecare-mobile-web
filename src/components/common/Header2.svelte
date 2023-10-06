<script>
    import {goBack, pageRedirect} from "../../js/utils/Utils.js";

    export let title = '';
    export let moveUrl = '';
</script>

<div class="header-div">
    <table class="header-table">
        <tr>
            <td style="width: 10%">
                {#if moveUrl === ''}
                    <img src="/images/icon/goback.png" on:click={goBack} alt="뒤로가기"/>
                {:else}
                    <img src="/images/icon/goback.png" on:click={pageRedirect(moveUrl)} alt="페이지이동"/>
                {/if}
            </td>
            <td style="width: 80%; text-align: center;">
                <b>{title}</b>
            </td>
            <td style="width: 10%">
                &nbsp;
            </td>
        </tr>
    </table>
</div>

<style>
    .header-table {
        width: 100%;
    }
</style>