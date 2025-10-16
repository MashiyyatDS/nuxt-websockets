<template>
	<div class="flex gap-2">
		<h1>Home Page</h1>
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
