<script>
    export let name = '';
    export let title = '';
    export let description = '';
    export let value = '';
</script>

<div>
    <p>{title}</p>
    <span>{description}</span>
    <input type="date" name={name} bind:value={value} />
<!--    <input type="time" bind:value={value} />-->
</div>

<style>
    input {
        position: relative;
        bottom: 15px;
        float: right;
        width: 35%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #cccccc;
        padding: 0;
    }

    p {
        margin: 10px 0;
        font-size: 14px;
    }

    span {
        color: #cccccc;
        font-size: 12px;
    }
</style>