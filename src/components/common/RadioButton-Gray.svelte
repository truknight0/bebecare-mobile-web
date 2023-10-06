<script>
    export let title = '';
    export let name = '';
    export let value = '';
    export let position = '';
    export let buttons = [];

    let radioPositionClass = "radio-pos-left";
    if (position === "right") {
        radioPositionClass = "radio-pos-right";
    }

</script>

<div>
    <span class="title">{title}</span>
    <div class={radioPositionClass}>
        {#each buttons as button}
            <label class="radio-label">
                <input type="radio" name={name} value={button.key} bind:group={value}>
                <span>{button.name}</span>
            </label>
        {/each}
    </div>
</div>

<style>
    .title {
        font-size: 12px;
        color: #aaaaaa;
    }

    .radio-pos-left {
        display: inline;
    }

    .radio-pos-right {
        float: right;
        position: relative;
        bottom: 5px;
    }

    .radio-label {
        display: inline-flex;
        margin-left: 5px;
    }

    .radio-label input[type="radio"] {
        display: none;
    }

    .radio-label input[type="radio"] + span {
        font-size: 12px;
        padding: 4px 10px;
        border: 1px solid #dfdfdf;
        border-radius: 5px;
        background-color: #ffffff;
        color: #aaaaaa;
        text-align: center;
        cursor: pointer;
    }

    .radio-label input[type="radio"]:checked + span {
        background-color: #2da6cc;
        color: #ffffff;
    }
</style>