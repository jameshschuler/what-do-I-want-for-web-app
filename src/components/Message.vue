<template>
	<article class="message" :class="messageType">
		<div v-if="hasHeader" class="message-header">
			<p>Info</p>
			<button v-if="isDismissable" class="delete" aria-label="delete"></button>
		</div>
		<div class="message-body">
			{{ message }}
		</div>
	</article>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['message', 'messageType', 'isDismissable', 'title', 'hasHeader'],
	setup(props) {},
});
</script>
