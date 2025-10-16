<template>
	<div class="flex justify-center h-screen">
		<UCard
			v-if="!loggedIn"
			class="self-center w-[500px]"
			:ui="{
				header: 'sm:p-3 p-3',
				body: 'sm:p-3 p-3',
				footer: 'sm:p-3 p-3',
			}">
			<template #header>Login</template>

			<UFormField label="Email" class="my-3">
				<UInput placeholder="Enter your email" class="w-full" />
			</UFormField>

			<UFormField label="Password" class="my-3">
				<UInput placeholder="Enter your password" type="password" class="w-full" />
			</UFormField>

			<template #footer>
				<UButton label="Login" block />

				<USeparator class="my-3" label="Or login with" />

				<div class="flex justify-center gap-1">
					<UButton
						icon="mdi:github"
						class="cursor-pointer"
						external
						to="/api/auth/github" />

					<UButton
						icon="mdi:google"
						class="cursor-pointer"
						external
						to="/api/auth/google" />
				</div>
			</template>
		</UCard>

		<pre class="self-center">
			{{ user }}
		</pre
		>
	</div>
</template>

<script setup lang="ts">
const { loggedIn, user } = useUserSession()

definePageMeta({
	middleware: 'guest',
})
</script>
