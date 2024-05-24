<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {slide, scale} from "svelte/transition";

    import { Button } from "../components";
    import {type Poll} from "../database";

    onMount(() => {
        console.log("Create Poll is mounted");

        return () => {
            console.log("Create Poll is unmounted");
        }
    })

    const dispatch = createEventDispatcher();
    let formstate = {
        question: "",
        optionA: "",
        optionB: ""
    }
    let errors = {
        question: "",
        optionA: "",
        optionB: ""
    }

    $: {
        if(formstate.question?.trim() === "" || formstate.question?.trim()?.length < 6){
            errors.question = "Invalid question length";
        }else errors.question = "";
        if(formstate.optionA?.trim() === ""){
            errors.optionA = "Option A is required";
        }else errors.optionA = "";
        if(formstate.optionB?.trim() === ""){
            errors.optionB = "Option B is required";
        }else errors.optionB = "";

    };

    $: inValid = Object.values(errors).some(s => s.trim() !== "");

    function submitHandler(){
        if(inValid) return;
        let newPoll: Omit<Poll, "id"> = {
            ...formstate,
            voteA: 0,
            voteB: 0,
            created_at: new Date()
        }
        dispatch("createPoll", newPoll);
    }

</script>

<div class="create__poll" out:slide={{axis: 'x'}} in:scale={{duration:500}}>
    <h2>Create new poll</h2>
    <form on:submit|preventDefault={submitHandler}>
        <div class="form__container" 
        >
            <label for="question">Question</label>
            <input type="text" id="question" class:error={!!errors.question} placeholder="Enter Question" bind:value={formstate.question} />
            {#if errors.question}
                <i>{errors.question}</i>
            {/if}
        </div>
        <div class="form__container"
        >
            <label for="optionA">Option A</label>
            <input type="text" id="optionA" class:error={!!errors.optionA} placeholder="Enter Option A" bind:value={formstate.optionA} />
            {#if errors.optionA}
                <i>{errors.optionA}</i>
            {/if}
        </div>
        <div class="form__container"
        >
            <label for="optionB">Option B</label>
            <input type="text" id="optionB" class:error={!!errors.optionB} placeholder="Enter Option B" bind:value={formstate.optionB} />
            {#if errors.optionB}
                <i>{errors.optionB}</i>
            {/if}
        </div>

        <div class="form__container">
            <Button disabled={inValid}>Create Poll</Button>
        </div>
    </form>
</div>



<style lang="scss">
    .create__poll {
        width: 100%;
        padding: 30px;

        > h2 {
            text-align: center;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: var(--color);
        }
        
        > form {
            width: min(100% - 0.25rem, 500px);
            margin-inline: auto;
            display: flex;
            flex-direction: column;
            gap: 25px;

            > .form__container {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 5px;

                > label {
                    color: var(--color);
                }

                > input {
                    outline: none;
                    padding: 8px;
                    line-height: 2;
                    color: var(--color);
                    border: 1px solid var(--shadow);
                    background-color: var(--bg-header);
                    border-radius: 8px;

                    &.error {
                        border-color: var(--color) !important;
                    }
                }

                > i {
                    font-size: 0.6rem;
                    color: var(--error);
                    margin-top: 5px;
                }
            }

            .focus {
                > label {
                    color: var(--primary);
                    font-weight: 600;
                }

                > input {
                    border: 2px solid var(--primary);
                }
            }
        }
    }
</style>