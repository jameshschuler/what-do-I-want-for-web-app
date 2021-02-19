<template>
	<section class="section is-small">
		<h1 class="title">New List</h1>
		<h2 class="subtitle mt-1">Enter a name for your list and click 'Create' to get started!</h2>
	</section>

	<section class="section is-small">
		<form @submit.prevent="onSubmit">
			<div class="columns">
				<div class="column is-half is-full-mobile">
					<div class="field">
						<label class="label">Name *</label>
						<div class="control">
							<input v-model="list.name" class="input" type="text" placeholder="Required" />
						</div>
						<p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
					</div>
				</div>
				<div class="column is-half is-full-mobile">
					<div class="field">
						<label class="label">Created By</label>
						<div class="control">
							<input v-model="list.createdBy" class="input" type="text" placeholder="Optional" />
						</div>
					</div>
				</div>
			</div>
			<button :class="{ 'is-loading': loading }" type="submit" class="button is-primary">Create</button>
		</form>
	</section>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';

interface NewList {
	name: string;
	createdBy: string;
}

export default defineComponent({
	setup() {
		const loading = ref(false);
		const list = ref<NewList>({ name: '', createdBy: '' });
		const errors = ref({ name: '' });

		const onSubmit = () => {
			errors.value.name = '';

			if (list.value.name === '') {
				errors.value.name = 'Name is required.';
				return;
			}

			loading.value = true;

			setTimeout(() => {
				loading.value = false;
				console.log('submitted');
				router.push({ name: 'ListDetail', params: { id: '1' } });
			}, 1000);
		};

		return { errors, list, loading, onSubmit };
	},
});
</script>
