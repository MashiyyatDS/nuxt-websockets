export default defineNuxtRouteMiddleware(async () => {
	const { loggedIn } = useUserSession()

	if (loggedIn.value) {
		return useRouter().push('/home')
	}
})
