<template>
	<section class="section is-small">
		<Loader v-if="loading" />
		<div v-if="!loading && error">
			<message messageType="is-danger" :message="error.message" :title="error.statusText" hasHeader="true" />
		</div>
		<div v-if="!loading && !error">
			<div class="is-flex is-justify-content-space-between is-align-items-center mb-4">
				<h1 class="title mb-0">Edit List</h1>
				<div class="buttons">
					<button class="button is-info is-outlined">Share</button>
					<button v-if="!list.published" class="button is-warning" @click="publishList">Publish</button>
				</div>
			</div>

			<message v-if="validationError" messageType="is-danger" :message="validationError" title="Validation Error" />
			<form @submit.prevent="onSubmit">
				<div class="columns">
					<div class="column is-half is-full-mobile">
						<div class="field">
							<label class="label">Name *</label>
							<div class="control">
								<input v-model="list.name" class="input" type="text" placeholder="Required" />
							</div>
							<p v-if="formErrors.name" class="help is-danger">{{ formErrors.name }}</p>
						</div>
					</div>
					<div class="column is-half is-full-mobile">
						<div class="field">
							<label class="label">Created By</label>
							<div class="control">
								<input v-model="list.createdBy" class="input" type="text" readonly />
							</div>
						</div>
						<div class="field">
							<label class="label">Created</label>
							<div class="control">
								<input v-model="list.createdAt" class="input" type="text" readonly />
							</div>
						</div>
					</div>
				</div>
				<!-- <section v-if="!loading && list" class="section is-small">
					<h1 class="title">Items</h1>
					<message v-if="listItems && listItems.length === 0" messageType="is-info" message="No items found." title="Info" />
				</section> -->
				<button :class="{ 'is-loading': loading }" type="submit" class="button is-primary">Save</button>
			</form>
		</div>
		<modal :is-active="showingModal" />
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import Message from '@/components/Message.vue';
import Modal from '@/components/Modal.vue';
import { AppError, isAppError } from '@/models/error';
import { useRoute } from 'vue-router';
import { loadList, loadListItems, updateList } from '@/services/listService';
import { EditList, List } from '@/models/list';
import { ListItem } from '@/models/listItem';
import dayjs from 'dayjs';
import router from '@/router';

export default defineComponent({
	components: {
		Loader,
		Message,
		Modal,
	},
	setup() {
		const error = ref<AppError | null>(null);
		const formErrors = ref({ name: '' });
		const loading = ref(true);
		const list = ref<EditList>({ createdAt: '', createdBy: '', name: '', listItems: [], specialId: '', wantListId: 0 });
		const showingModal = ref(false);
		const validationError = ref('');

		const route = useRoute();

		const load = async () => {
			const response = await loadList(route.params.id.toString());
			if (isAppError(response)) {
				error.value = response;
			} else {
				if (response.published) {
					router.push({ name: 'ListDetail', params: { id: response.specialId } });
					return;
				}

				const listItemsResponse = await loadListItems(response.wantListId);
				if (!isAppError(listItemsResponse)) {
					const sorted = listItemsResponse.sort((a: ListItem, b: ListItem) => {
						let da = new Date(a.createdAt),
							db = new Date(b.createdAt);
						// @ts-ignore
						let result = db - da;
						return result;
					}) as ListItem[];

					list.value = {
						...response,
						createdAt: dayjs(response.createdAt)
							.format('MMMM DD, YYYY h:mm A')
							.toString(),
						listItems: sorted,
					};
				}
			}

			loading.value = false;
		};

		const onSubmit = async () => {
			formErrors.value.name = '';

			if (list.value.name === '') {
				formErrors.value.name = 'Name is required.';
				return;
			}

			loading.value = true;

			const response = await updateList(list.value.specialId, { name: list.value.name });

			if (!isAppError(response)) {
				load();
			} else {
				const error = response.errors[0];
				if (error) {
					validationError.value = error.message;
				} else {
					validationError.value = response.message;
				}
			}

			loading.value = false;
		};

		load();

		return { error, formErrors, list, loading, showingModal, validationError, onSubmit };
	},
	methods: {
		publishList() {
			console.log('ah!', this.showingModal);
			this.showingModal = true;
		},
	},
});
</script>
<style lang="scss"></style>
