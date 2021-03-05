<template>
	<section class="section is-small">
		<h1 class="title">New List</h1>
		<h2 class="subtitle mt-1">Enter a name for your list and click 'Create' to get started!</h2>
	</section>

	<section class="section is-small">
		<message v-if="validationError" messageType="is-danger" :message="validationError" title="Validation Error" />
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
						<label class="label">Created By *</label>
						<div class="control">
							<input v-model="list.createdBy" class="input" type="text" placeholder="Optional" />
						</div>
						<p v-if="errors.createdBy" class="help is-danger">{{ errors.createdBy }}</p>
					</div>
				</div>
			</div>
			<button :class="{ 'is-loading': loading }" type="submit" class="button is-medium is-primary">Create</button>
		</form>
	</section>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, ref } from 'vue';
import { createList } from '@/services/listService';
import { isAppError, ValidationError } from '@/models/error';
import Message from '@/components/Message.vue';
import { NewList } from '@/models/list';

export default defineComponent({
	components: {
		Message,
	},
	setup() {
		const loading = ref(false);
		const list = ref<NewList>({ name: '', createdBy: '' });
		const errors = ref({ name: '', createdBy: '' });
		const validationError = ref('');

		const onSubmit = async () => {
			errors.value.name = '';
			errors.value.createdBy = '';

			if (list.value.name === '') {
				errors.value.name = 'Name is required.';
				return;
			}

			if (list.value.createdBy === '') {
				errors.value.createdBy = 'Created By is required.';
				return;
			}

			loading.value = true;

			const response = await createList({ name: list.value.name, createdBy: list.value.createdBy });

			if (!isAppError(response)) {
				const segments = response.split('/');
				const id = segments[segments.length - 1];

				router.push({ name: 'EditList', params: { id } });
			} else {
				const error = response.errors[0];
				if (error) {
					validationError.value = error.message;
				}
			}

			loading.value = false;
		};

		return { errors, list, loading, validationError, onSubmit };
	},
});
</script>
