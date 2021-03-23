<template>
	<div class="modal" :class="{ 'is-active': isActive }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ title }}</p>
				<button class="delete" @click="close" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				<p>{{ message }}</p>
			</section>
			<footer class="modal-card-foot">
				<button class="button" @click="confirm" :class="actionButtonType">{{ actionButtonText }}</button>
				<button class="button" @click="close">Cancel</button>
			</footer>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
	props: {
		actionButtonText: String,
		actionButtonType: String,
		isActive: Boolean,
		message: String,
		title: String,
	},
	methods: {
		close() {
			this.$emit('close-modal');
		},
		confirm() {
			this.$emit('confirm');
		},
	},
});
</script>
