// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt', 'nuxt-auth-utils'],
	css: ['~/assets/main.css'],
	nitro: {
		experimental: {
			websocket: true,
		},
	},
	runtimeConfig: {
		authSecret: 'nuxt-app-secret',
		oauth: {
			github: {
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
			},
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			},
		},
	},
	auth: {
		webAuthn: true,
	},
})
