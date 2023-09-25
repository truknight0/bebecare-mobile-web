<script>
    export let title = '';
    export let description = '';
    export let subDescription = '';
</script>

<div class="header-m-div">
    <h1>{title}</h1>
    <p>{@html description}</p>
    <span class="sub-desc">{@html subDescription}</span>
</div>

<style>
    .header-m-div {
        margin-top: 30px;
    }

    .header-m-div p {
        line-height: 30px;
    }

    .sub-desc {
        font-size: 12px;
        color: #999999;
    }
</style>