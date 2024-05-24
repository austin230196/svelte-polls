<script lang="ts">
    type ButtonType = 'primary' | 'secondary';
    export let flat: boolean = true;
    export let type: ButtonType = 'primary';
    export let outlined: boolean = true;
    export let rounded: boolean = true;
    export let disabled: boolean = false;
</script>



<button on:click disabled={disabled} class:flat={flat} class={type} class:outlined={outlined} style="border-radius: {rounded ? '8px' : '0px'}">
    <slot />
</button>


<style lang="scss">
    button {
        border: none;
        padding: 10px 36px;
        cursor: pointer;
        outline: none;
        background-color: var(--background);
        opacity: 1;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        &.primary {
            border-color: var(--primary);
            color: var(--primary);
        }

        &.secondary {
            border-color: var(--secondary);
            color: var(--secondary);
        }
    }

    .outlined {
        border-width: 2px;
        border-style: solid;
    }

</style>