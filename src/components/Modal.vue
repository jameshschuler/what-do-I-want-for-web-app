<template>
	<div class="modal" :class="{ 'is-active': isVisible }">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Modal title</p>
				<button class="delete" @click="close" aria-label="close"></button>
			</header>
			<section class="modal-card-body">
				<!-- Content ... -->
			</section>
			<footer class="modal-card-foot">
				<button class="button is-success">Save changes</button>
				<button class="button" @click="close">Cancel</button>
			</footer>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { ref, watch } from 'vue';

export default defineComponent({
	props: ['isActive'],
	setup(props) {
		const isVisible = ref(false);

		watch(
			() => props.isActive,
			(newValue, prevValue) => {
				isVisible.value = newValue;
			}
		);

		return { isVisible };
	},
	methods: {
		close() {
			this.isVisible = false;
			// TODO: need to emit event here so parent knows to update it's showingModal state
		},
	},
});
</script>
