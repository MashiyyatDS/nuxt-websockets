export default defineNuxtRouteMiddleware(async (to, from) => {
	const { user, loggedIn } = useUserSession()

	const tokenExpired = Date.now() > user.value?.expires_at

	if (tokenExpired || !loggedIn.value) {
		return await navigateTo('/')
	}
})
