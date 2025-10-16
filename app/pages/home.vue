<template>
	<div class="flex gap-2">
		<small>
			<pre>{{ useUserSession() }}</pre>
		</small>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['auth-middleware'],
	layout: 'dashboard-layout',
})

useHead({
	title: 'Home',
})
</script>
