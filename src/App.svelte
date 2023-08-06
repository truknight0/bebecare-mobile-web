<script>
	import Router from 'svelte-spa-router';
	import login from './components/login/Login.svelte'

	const routes = {
		'/': login,
	}
</script>

<main>
	<Router {routes} />
</main>


