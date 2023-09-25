<script>
    import {goBack} from "../../js/utils/Utils.js";

    export let title = '';
</script>

<div class="header-div">
    <table class="header-table">
        <tr>
            <td style="width: 10%">
                <img src="/images/icon/goback.png" onclick="history.back()" alt="뒤로가기"/>
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