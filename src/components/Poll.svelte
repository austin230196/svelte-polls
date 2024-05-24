<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {tweened} from "svelte/motion";
    import {Icon} from 'svelte-icons-pack';
    import {AiOutlineDelete} from 'svelte-icons-pack/ai';

    import { type Poll } from "../database";

    onMount(() => {
        console.log("Poll is mounted");
        console.log({poll});

        return () => {
            console.log("Poll is unmounted");
        }
    })

    const dispatch = createEventDispatcher();

    export let poll: Poll;

    
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);

    $: totalVotes = poll.voteA + poll.voteB;
    $: percentA = Math.round((poll.voteA / (totalVotes || 0)) * 100);
    $: percentB = Math.round((poll.voteB / (totalVotes || 0)) * 100);
    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);

    $: console.log({totalVotes, $tweenedA, $tweenedB});

    function voteHandler(option: 'a' | 'b'){
        dispatch("vote", {poll, option});
    }

    function deleteHandler(){
        dispatch("delete", poll.id);
    }

</script>



<div class="poll">
    <aside on:click={deleteHandler}>
        <Icon src={AiOutlineDelete} size="1.5rem" />
    </aside>
    <h2>{poll.question}</h2>
    <span>Total Votes: {totalVotes}</span>
    <section>
        <div class="answer option__a" on:click={() => voteHandler("a")}>
            <div class="percent" style="width: {$tweenedA}%;" ></div>
            <p>{poll.optionA} &nbsp; ({poll.voteA}) </p>
        </div>
        <div class="answer option__b" on:click={() => voteHandler("b")}>
            <div class="percent" style="width: {$tweenedB}%;" ></div>
            <p>{poll.optionB} &nbsp; ({poll.voteB}) </p>
        </div>
    </section>
</div>


<style lang="scss">
    .poll {
        box-shadow: 1px 2px 3px var(--shadow);
        padding: 20px;
        border-radius: 8px;
        position: relative;

        >aside {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
            color: var(--error);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-header);
            padding: 10px;

            &:hover {
                box-shadow: 1px 2px 3px var(--shadow);
            }
        }

        > h2 {
            font-size: 1rem;
            margin-bottom: 5px;
            color: var(--color);
        }

        > span {
            font-size: 0.8rem;
            color: var(--shadow);
        }

        > section {
            margin-top: 30px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5px;

            >.answer {
                width: 100%;
                background-color: var(--bg-header);
                cursor: pointer;
                position: relative;

                > .percent {
                    height: 100%;
                    position: absolute;
                    box-sizing: border-box;
                }

                
                &.option__a {
                    border-left: 3px solid var(--error);

                    > .percent {
                        background-color: var(--error-light)
                    }
                }

                &.option__b {
                    border-left: 3px solid var(--info);

                    > .percent {
                        background-color: var(--info-light)
                    }
                }

                > p {
                    color: var(--color);
                    padding: 10px;
                }
            }
        }
    }
</style>