<script>
	import Router from 'svelte-spa-router';
	import login from './routes/login/Login.svelte'
	import welcome from './routes/login/welcome.svelte'
	import invite from './routes/login/invite.svelte'
	import childrenAdd from './routes/children/add.svelte'
	import childrenModify from './routes/children/modify.svelte'
	import items from './routes/items/items.svelte'
	import myInfo from './routes/infomation/my_info.svelte'
	import myModify from './routes/infomation/my_modify.svelte'
	import {authToken} from "./js/utils/Utils.js";

	const routes = {
		'/': login,
		'/welcome': welcome,
		'/children/add': childrenAdd,
		'/children/modify/:idx': childrenModify,
		'/invite': invite,
		'/items': items,
		'/user/info': myInfo,
		'/user/modify': myModify,
	}

	// token check
	let currentUri = location.href.replace(location.origin, '');
	if (currentUri !== "" && currentUri !== "/") {
		// authToken()
	}
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		height: 100%;
		padding: 0;
		max-width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	:global(.content) {
		flex: 1;
		padding: 1em;
		margin-bottom: 50px;
		/*height: auto;*/
		/*min-height: 100%;*/
	}

	:global(.empty-area) {
		height: 100px;
	}
</style>
