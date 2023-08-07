<script>
    export let next = '';
    export let prev = '';
    export let onClick = '';

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
    <button class="prev" style="display:{prevDisplay}" >{prev}</button>
    <button class="next" style="display:{nextDisplay}" on:click={onClick}>{next}</button>
</div>

<style>
    .button-div {
        top: 50px;
        height: 100%;
        position: relative;
    }

    .prev {
        width:150px;
        height:50px;
        border-radius: 4px;
        background-color: #f4f4f4;
        position: absolute;
    }

    .next {
        width:150px;
        height:50px;
        border-radius: 4px;
        background-color: #2da6cc;
        position: absolute;
        color: #ffffff;
        right: 0;
    }
</style>
