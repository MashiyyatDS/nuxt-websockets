<template>
	<div
		class="message-wrapper mb-1 flex flex-col w-full"
		:class="message.userId === userId ? 'justify-end' : 'justify-start'">
		<UCard
			:ui="{ body: 'sm:p-2 md:p-2 lg:p-2 p-2' }"
			:class="[
				message.userId === userId ? 'bg-blue-500 self-end' : 'bg-green-500 self-start',
				,
			]">
			<div class="flex flex-col">
				<span class="text-[14px]">{{ message.message }}</span>
			</div>
		</UCard>
		<span
			v-if="message.userId !== userId && previousMessage?.userId !== message.userId"
			class="text-gray-300 text-[11px]">
			{{ message.username }}
		</span>
	</div>
</template>

<script setup lang="ts">
type Message = {
	userId: string
	message: string
	username: string
}

withDefaults(
	defineProps<{ message: Message; userId: string; previousMessage: Message | undefined }>(),
	{}
)
</script>
