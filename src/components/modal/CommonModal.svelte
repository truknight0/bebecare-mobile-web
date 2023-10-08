<script>
    export let showModal = true;
    export let isPromo = true;
    export let title = '';
    export let content = '';
</script>

{#if showModal}
    <div class="backdrop" class:promo={isPromo}>
        <div class="modal">
            <h1>{title}</h1>
            <span>{content}</span>
        </div>
    </div>
{/if}

<style>
    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .modal {
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;
        text-align: center;
        background: white;
    }

    .promo .modal {
        background: crimson;
        color: white;
    }
</style>