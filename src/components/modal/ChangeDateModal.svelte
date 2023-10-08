<script>
    import {eDate, eTime, itemIdx, modifyItem, sDate, sTime} from "../../store/items.js";

    export let showModal = true;

    function modifyTime() {
        let updateStartTime = document.querySelector('input[name=start_date]').value + ' ' + document.querySelector('input[name=start_time]').value
        let updateEndTime = document.querySelector('input[name=end_date]').value + ' ' + document.querySelector('input[name=end_time]').value

        // console.log(updateStartTime, updateEndTime);
        modifyItem($itemIdx, updateStartTime, updateEndTime);
        showModal = false;
    }

</script>

{#if showModal}
    <div class="backdrop" on:click|self>
        <div class="modal">
            <div>
                <span>시작: </span>
                <input type="date" name="start_date" value={$sDate}/>
                <input type="time" name="start_time" value={$sTime}/>
            </div>
            <div>
                <span>종료: </span>
                <input type="date" name="end_date" value={$eDate}/>
                <input type="time" name="end_time" value={$eTime}/>
            </div>
            <div class="button-area">
                <button on:click={modifyTime}>수정</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        z-index: 100;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .modal {
        padding: 10px;
        border-radius: 10px;
        max-width: 96%;
        margin: 10% auto;
        text-align: center;
        background: white;
    }

    .button-area {
        text-align: right;
        padding-right: 30px;
        padding-top: 20px;
    }

    .button-area button {
        border-color: #2da6cc;
        background-color: #2da6cc;
        color: #ffffff;
        border-radius: 5px;
        width: 80px;
    }
</style>