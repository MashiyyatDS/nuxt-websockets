export type User = {
	name: string
	id: string
	status: string
	messages: Message[]
}

export type Message = {
	message: string
	created_at: string
	id: string
	user: User
	reactions: MessageReaction[]
}

export type MessageReaction = {
	type: 'happy' | 'angry' | 'sad' | 'love' | 'like'
	id: string
	message: Message
	user: User
}

declare module '#auth-utils' {
	interface User {
		oAuthId: string
		name: string
		avatar: string
		expires_at: string
	}
}
