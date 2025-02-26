<script lang="ts">
	import '../styles/app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>👨‍💻 Learning Programming</title>
</svelte:head>

{@render children()}
