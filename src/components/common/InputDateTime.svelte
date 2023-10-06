<script>
    export let name = '';
    export let title = '';
    export let description = '';
    export let value = '';
</script>

<div>
    {#if title !== ''}
        <p>{title}</p>
    {/if}
    {#if description !== ''}
        <span>{description}</span>
    {/if}
    <input type="date" name={name} bind:value={value} />
<!--    <input type="time" bind:value={value} />-->
</div>

<style>
    input {
        position: relative;
        bottom: 15px;
        float: right;
        width: 38%;
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