<script>
    export let name = '';
    export let title = '';
    export let description = '';
    export let value = '';
    export let numberOnly = '';

    let onInputNum = '';
    if (numberOnly === 'Y') {
        onInputNum = "this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');";
    }
</script>

<div>
    <p>{title}</p>
    <input type="text" oninput={onInputNum} autocomplete="off" name={name} placeholder={description} bind:value={value} />
</div>

<style>
    input {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #cccccc;
        padding: 0;
    }

    p {
        margin: 10px 0;
    }

    input::placeholder {
        color: #cccccc;
        font-size: 14px;
    }
</style>