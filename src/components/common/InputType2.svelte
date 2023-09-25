<script>
    export let name = '';
    export let title = '';
    export let value = '';
    export let unit = '';
    export let numberOnly = '';
    export let position = '';

    let onInputNum = '';
    if (numberOnly === 'Y') {
        onInputNum = "this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');";
    }

    let inputPositionClass = "input-pos-left";
    if (position === "right") {
        inputPositionClass = "input-pos-right";
    }
</script>

<div style="height: 35px;">
    <span>{title}</span>
    <div class={inputPositionClass}>
        <input type="text" oninput={onInputNum} autocomplete="off" name={name} bind:value={value} />
        <span>{unit}</span>
    </div>
</div>

<style>
    input {
        width: 30%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #cccccc;
        padding: 0;
        text-align: center;
    }

    span {
        margin: 10px 0;
        font-size: 12px;
        color: #999999;
    }

    .input-pos-left {
        display: inline;
    }

    .input-pos-right {
        text-align: right;
        position: relative;
        bottom: 35px;
    }
</style>