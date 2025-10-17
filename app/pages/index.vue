<template>
	<div class="flex justify-center h-screen">
		<UCard
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
				<UInput
					v-model="credentials.email"
					placeholder="Enter your email"
					class="w-full"
					size="xl" />
			</UFormField>

			<UFormField label="Password" class="my-3">
				<UInput
					v-model="credentials.password"
					placeholder="Enter your password"
					type="password"
					class="w-full"
					size="xl">
					<template #trailing>
						<UButton
							:icon="
								showPassword
									? 'material-symbols:visibility-off-outline-rounded'
									: 'material-symbols:visibility-outline'
							"
							class="rounded-full cursor-pointer"
							variant="ghost"
							@click="showPassword = !showPassword" />
					</template>
				</UInput>
			</UFormField>

			<template #footer>
				<UButton label="Login" block @click="signIn" />

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
	</div>
</template>

<script setup lang="ts">
const { loggedIn, user, fetch: fetchUserSession } = useUserSession()

const { authenticate: authenticateUser } = useWebAuthn({
	authenticateEndpoint: '/api/webauthn/authenticate',
})

const credentials = reactive({
	email: '',
	password: '',
})

async function signIn() {
	const response = await authenticateUser('Mashiyyat')

	console.log(response)
}

const oAuths = ref(['github', 'google'])
const showPassword = ref(false)

definePageMeta({
	middleware: 'guest',
})

useHead({
	title: 'Nuxt Labs',
})
</script>
