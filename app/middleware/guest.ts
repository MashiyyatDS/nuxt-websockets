export default defineNuxtRouteMiddleware(async () => {
	const { loggedIn, user } = useUserSession()

	const tokenExpired = Date.now() > user.value?.expires_at

	//return await navigateTo(loggedIn && !tokenExpired ? '/' : '/home')

	return true
})
