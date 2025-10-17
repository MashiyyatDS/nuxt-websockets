export default defineNuxtRouteMiddleware(async () => {
	const { user, loggedIn } = useUserSession()

	const tokenExpired = Date.now() > user.value?.expires_at

	if (tokenExpired || !loggedIn.value) {
		//return await navigateTo('/')
	}
})
