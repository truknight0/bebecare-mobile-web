<script>
    export let next = '';
    export let prev = '';
    export let nextOnClick = '';
    export let prevOnClick = '';

    let nextDisplay = 'none';
    let prevDisplay = 'none';

    if (next !== '') {
        nextDisplay = 'block';
    }
    if (prev !== '') {
        prevDisplay = 'block';
    }

</script>

<div class="button-div">
    <button class="prev" style="display:{prevDisplay}" on:click={prevOnClick}>{prev}</button>
    <button class="next" style="display:{nextDisplay}" on:click={nextOnClick}>{next}</button>
</div>

<style>
    .button-div {
        position : relative;
        padding-bottom: 80px;
    }

    .prev {
        width: 45%;
        height: 50px;
        border-radius: 4px;
        background-color: #f4f4f4;
        position: absolute;
    }

    .next {
        width: 45%;
        height: 50px;
        border-radius: 4px;
        background-color: #2da6cc;
        position: absolute;
        color: #ffffff;
        right: 0;
    }
</style>
