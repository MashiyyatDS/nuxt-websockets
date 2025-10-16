<template>
	<UDashboardGroup>
		<UDashboardSidebar
			collapsible
			resizable
			:ui="{ footer: 'border-t border-default', header: 'border-default border-b' }">
			<template #header>
				<UAvatar :src="user?.avatar" size="xl" class="self-center" />

				<span class="self-center">{{ user?.name }}</span>
			</template>

			<template #default="{ collapsed }">
				<UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />

				<UNavigationMenu
					:collapsed="collapsed"
					:items="items[1]"
					orientation="vertical"
					class="mt-auto" />
			</template>

			<template #footer>
				<UButton label="Logout" block class="cursor-pointer" @click="logout" />
			</template>
		</UDashboardSidebar>

		<div class="w-full h-full">
			<slot />
		</div>
	</UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { user, clear } = useUserSession()

async function logout() {
	await clear()

	const stateCookies = useCookie('nuxt-auth-state')
	stateCookies.value = ''

	navigateTo('/', { replace: true })
}

const items: NavigationMenuItem[][] = [
	[
		{
			label: 'Home',
			icon: 'i-lucide-house',
			to: '/home',
		},
		{
			label: 'Chat',
			icon: 'i-lucide-inbox',
			to: '/chat',
		},
	],
]
</script>
