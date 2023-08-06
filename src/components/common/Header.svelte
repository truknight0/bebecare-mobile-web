<script>
    export let title = '';
    export let description = '';
</script>

<div class="header-m-div">
    <h1>{title}</h1>
    <p>{@html description}</p>
</div>

<style>
    .header-m-div {
        margin-top: 50px;
    }

    .header-m-div p {
        line-height: 30px;
    }
</style>