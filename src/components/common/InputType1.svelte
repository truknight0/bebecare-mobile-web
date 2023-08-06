<script>
    export let name = '';
    export let title = '';
    export let description = '';
    export let value = '';
</script>

<div>
    <p>{title}</p>
    <input type="text" autocomplete="off" name={name} placeholder={description} value={value}>
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