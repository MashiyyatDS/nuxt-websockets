export default defineOAuthGoogleEventHandler({
	config: {},
	async onSuccess(event, { user }) {
		await setUserSession(event, {
			user: {
				githubId: user.id,
				avatar: user.picture,
				name: user.name,
				expires_at: Date.now() + 60 * 60 * 1000,
			},
		})
		console.log(`User ${user.email} logged in`)

		return sendRedirect(event, '/home')
	},
	onError(event, error) {
		console.error('Google OAuth error:', error)
		return sendRedirect(event, '/error')
	},
})
