<script lang="ts">
    import {Icon} from "svelte-icons-pack";
    import {AiOutlineSun, AiOutlineMoon} from "svelte-icons-pack/ai"
    import {slide, fade} from "svelte/transition";
 
    import svelteLogo from "../assets/svelte.svg";
    import {theme} from "../stores";


    function toggleTheme(){
        theme.update(old => {
            return old === 'light' ? 'dark' : 'light';
        })
    }
</script>


<nav class="center">
    <img src={svelteLogo} alt="Svelte Logo" />
    <aside>
        <span class="center" on:click={toggleTheme}>
            <Icon src={$theme === 'light' ? AiOutlineMoon : AiOutlineSun} size="2rem" />
        </span>
    </aside>
</nav>



<style lang="scss">
    .center {
        display: flex;
        align-items: center;
    }
    nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 20px 40px;
        background-color: var(--bg-header);
        justify-content: space-between;


        > aside {
            >span {
                padding: 5px;
                border-radius: 50%;
                box-shadow: 1px 2px 3px var(--shadow);
                justify-content: center;
                cursor: pointer;
                transition: all 0.5s ease-out;
                color: var(--color);
                

                &:hover {
                    scale: 1.03;
                }
            }
        }
    }
</style>