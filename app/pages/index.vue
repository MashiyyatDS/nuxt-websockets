<template>
	<div class="chat">
		<div class="chat-header">
			<div class="flex" style="height: 100%">
				<span class="self-center ml-3">Chat App</span>
			</div>
		</div>

		<div ref="chatBody" class="chat-body gap-1">
			<Message
				v-for="(message, key) in messages"
				:key="key"
				:message="message"
				:user-id="userId"
				:previous-message="messages[key + 1]" />
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

		<UModal
			v-model:open="modal"
			title="Enter your username"
			description="Please enter your username, please"
			:close="false"
			:dismissible="false">
			<template #body>
				<UInput
					v-model="username"
					placeholder="Please enter your username"
					class="w-full" />
			</template>

			<template #footer>
				<UButton label="Save Username" block :disabled="!username" @click="modal = false" />
			</template>
		</UModal>
	</div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useWebSocket } from '@vueuse/core'

const messages = ref<{ userId: string; message: string; username: string }[]>([])
const messageInput = ref('')
const userId = uuidv4()

const modal = ref(true)
const username = ref('')

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
		username: username.value,
		message: messageInput.value,
	})

	send(
		JSON.stringify({
			userId,
			username: username.value,
			message: messageInput.value,
		})
	)

	messageInput.value = ''
	scrollToBottom()
}
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
		height: calc(100% - 50px - 50px);
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
