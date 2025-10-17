export default defineNuxtRouteMiddleware(async () => {
	const { user, loggedIn } = useUserSession()

	const tokenExpired = Date.now() > user.value?.expires_at

	if (tokenExpired || !loggedIn.value) {
		const nuxtStateCookie = useCookie('nuxt-auth-state')
		nuxtStateCookie.value = ''

		const nuxtSessionCookie = useCookie('nuxt-auth-state')
		nuxtSessionCookie.value = ''

		return await navigateTo('/')
	}
})
