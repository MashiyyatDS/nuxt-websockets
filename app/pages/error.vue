<template>
	<div>
		<pre>{{ useUserSession() }}</pre>
	</div>
</template>

<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>
