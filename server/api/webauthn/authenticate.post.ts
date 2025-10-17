const users: { id: string; email: string; password: string; name: string; avatar: string }[] = [
	{
		id: '1',
		avatar: '',
		email: 'delossantos.mash@gmail.com',
		name: 'Mashiyyat Delos Santos',
		password: 'SuperPassword',
	},
]

export default defineWebAuthnAuthenticateEventHandler({
	async allowCredentials(event, credentials: { email: string; password: string }) {
		const [user] = users.filter(
			(u) => u.email === credentials.email && u.password === credentials.password
		)

		return user
	},
	async getCredential(event, credentialId) {
		return ''
	},
	async onSuccess(event, { credential, authenticationInfo }) {
		// Set the user session
		await setUserSession(event, {
			user: {
				id: user.id,
			},
			loggedInAt: Date.now(),
		})
	},
})
