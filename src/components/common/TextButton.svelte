<script>
    export let title = '';
    export let description = '';
    export let eventOnClick = '';
</script>

<div class="text-button" on:click={eventOnClick}>
    <span class="title">{title}</span>
    <br>
    <span class="description">{description}</span>
</div>

<style>
    .text-button {
        padding: 5px 0;
        width: 100%;
        margin-bottom: 10px;
    }

    .description {
        font-size: 10px;
        color: #999999;
    }
</style>