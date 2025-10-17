<template>
	<div class="flex gap-2">
		<pre>{{ useUserSession().user.value }}</pre>
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
