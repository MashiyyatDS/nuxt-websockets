<template>
	<div class="flex justify-center h-screen">
		<UCard
			v-if="!loggedIn"
			class="self-center w-[500px]"
			:ui="{
				header: 'sm:p-3 p-3 flex justify-center',
				body: 'sm:p-3 p-3',
				footer: 'sm:p-3 p-3',
			}">
			<template #header>
				<span class="text-[25px] font-bold">Login</span>
			</template>

			<UFormField label="Email" class="my-3">
				<UInput placeholder="Enter your email" class="w-full" />
			</UFormField>

			<UFormField label="Password" class="my-3">
				<UInput placeholder="Enter your password" type="password" class="w-full" />
			</UFormField>

			<template #footer>
				<UButton label="Login" block />

				<USeparator class="my-3" label="Login with" />

				<div class="flex justify-center gap-1">
					<UButton
						v-for="(oAuth, key) in oAuths"
						:key="key"
						size="xl"
						variant="ghost"
						:icon="`mdi:${oAuth}`"
						class="cursor-pointer rounded-full"
						external
						:to="`/api/auth/${oAuth}`" />
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

const oAuths = ref(['github', 'google'])

definePageMeta({
	middleware: 'guest',
})
</script>
