<template>
	<div class="chat">
		<div ref="chatBody" class="chat-body gap-1">
			<UChatMessage
				v-for="(message, key) in messages"
				:id="`msg-${key}`"
				:key="key"
				role="user"
				:ui="{
					container: 'pb-1 sm:pb-1 bg',
					content: [
						message.userId === userId ? 'bg-green-600' : 'bg-blue-600',
						'text-sm',
					],
				}"
				:avatar="{ src: user.avatar }"
				variant="soft"
				:side="message.userId === userId ? 'right' : 'left'"
				:parts="[{ type: 'text', text: message.message }]" />
		</div>

		<div class="chat-actions">
			<form @submit.prevent="sendMessage">
				<UInput
					v-model="messageInput"
					:ui="{ trailing: 'p-[2px]' }"
					class="w-full"
					placeholder="Send Message"
					@enter="sendMessage">
					<template #trailing>
						<UButton
							class="cursor-pointer"
							icon="material-symbols:send"
							size="sm"
							variant="ghost"
							@click="sendMessage" />
					</template>
				</UInput>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
const { user } = useUserSession()

const messages = ref<{ userId: string; message: string; username: string }[]>([])
const messageInput = ref('')
const userId = user.value.githubId

const { send, data } = useWebSocket(`/ws/chat`, {
	async onMessage() {
		const dataReceived = await data.value.text()

		const { message, userId, username } = JSON.parse(dataReceived)

		messages.value.push({ message, userId, username })
		scrollToBottom()
	},
})

const chatBody = ref<HTMLDivElement>()
function scrollToBottom() {
	if (chatBody.value) {
		nextTick(() => {
			chatBody.value?.scrollTo({
				top: chatBody.value.scrollHeight,
				behavior: 'smooth',
			})
		})
	}
}

function sendMessage() {
	messages.value.push({
		userId,
		username: user.value?.name,
		message: messageInput.value,
	})

	send(
		JSON.stringify({
			userId,
			username: user.value?.name,
			message: messageInput.value,
		})
	)

	messageInput.value = ''
	scrollToBottom()
}

definePageMeta({
	middleware: ['auth-middleware'],
	layout: 'dashboard-layout',
})

useHead({
	title: 'Chat',
})
</script>

<style scoped lang="scss">
.chat {
	height: 100vh;

	&-header {
		height: 50px;
		padding: 2px;
		border-bottom: 0.5px solid rgb(41, 41, 41);
	}

	&-body {
		height: calc(100% - 63.99px - 50px);
		padding: 10px;
		overflow: auto;
	}

	&-actions {
		border-top: 0.5px solid rgb(41, 41, 41);
		height: 50px;
		padding: 5px;
	}
}
</style>
