export default defineOAuthGitHubEventHandler({
	config: {
		emailRequired: true,
	},
	async onSuccess(event, { user, tokens }) {
		await setUserSession(event, {
			user: {
				githubId: user.id,
				avatar: user.avatar_url,
				name: user.name,
				expires_at: Date.now() + 60 * 60 * 1000,
			},
		})
		console.log(`User ${user.email} logged in`)

		return sendRedirect(event, '/home')
	},
	onError(event, error) {
		console.error('GitHub OAuth error:', error)
		return sendRedirect(event, '/error')
	},
})
