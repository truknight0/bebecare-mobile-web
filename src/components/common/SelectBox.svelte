<script>
    export let defaultOption = '';
    export let options = [];
    export let bold = "false";
    export let value = '';
    export let eventOnChange = '';

    let boldStyle = '';
    if (bold === "true") {
        boldStyle = "font-weight:bold;";
    }
</script>

<select class="c-select" style={boldStyle} bind:value={value} on:change={eventOnChange} >
    {#if defaultOption !== ''}
        <option>{defaultOption}</option>
    {/if }
    {#each options as option}
        <option value={option.value}>{option.title}</option>
    {/each}
</select>

<style>
    .c-select {
        border: none;
    }
</style>