<template>
	<section class="section is-small">
		<Loader v-if="loading" />
		<div v-if="!loading && list">
			<h1 class="title">{{ list.name }}</h1>

			<div class="is-flex is-justify-content-space-between is-align-items-center mb-2">
				<h2 class="subtitle mb-0">Created by {{ list.createdBy }}</h2>
				<span v-if="list.published" class="tag is-success is-light is-medium">Published</span>
			</div>
			<h2 class="subtitle">{{ createdAtFormatted }}</h2>
		</div>
	</section>
	<section v-if="!loading && list" class="section is-small">
		<h1 class="title">Items</h1>
		<message v-if="listItems && listItems.length === 0" messageType="is-info" message="No items found." title="Info" />
		<table class="table w-100" v-if="listItems && listItems.length !== 0">
			<thead>
				<tr>
					<th>Value</th>
					<th>Link</th>
					<th>Claimed</th>
					<th>Claimed By</th>
					<th>Created</th>
					<th>Disabled</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in listItems" :key="index">
					<td>{{ item.value }}</td>
					<td>
						<a v-if="item.link" v-bind:href="item.link" target="_blank" rel="noopener noreferrer">View Item</a>
					</td>
					<td>{{ item.isClaimed ? 'Yes' : 'No' }}</td>
					<td>{{ item.claimedBy }}</td>
					<td>
						{{ processDate(item.createdAt) }}
					</td>
					<td>{{ item.isDisabled ? 'Yes' : 'No' }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { List } from '../../models/list';
import { loadList, loadListItems } from '@/services/listService';
import { AppError, isAppError } from '@/models/error';
import Loader from '@/components/Loader.vue';
import dayjs from 'dayjs';
import Message from '@/components/Message.vue';
import { ListItem } from '@/models/listItem';

export default defineComponent({
	components: {
		Loader,
		Message,
	},
	computed: {
		createdAtFormatted(this: any) {
			return dayjs(this.list.createdAt)
				.format('MMMM DD, YYYY h:mm A')
				.toString();
		},
	},
	methods: {
		processDate(date: string) {
			return dayjs(date)
				.format('MMMM DD, YYYY h:mm A')
				.toString();
		},
	},
	setup() {
		const loading = ref(true);
		const list = ref<List | null>(null);
		const listItems = ref<ListItem[] | null>(null);
		const error = ref<AppError | null>(null);

		const load = async () => {
			const route = useRoute();
			const response = await loadList(route.params.id.toString());
			if (isAppError(response)) {
				error.value = response;
			} else {
				list.value = response;

				const listItemsResponse = await loadListItems(response.wantListId);
				if (!isAppError(listItemsResponse)) {
					const sorted = listItemsResponse.sort((a: ListItem, b: ListItem) => {
						let da = new Date(a.createdAt),
							db = new Date(b.createdAt);
						// @ts-ignore
						let result = db - da;
						return result;
					}) as ListItem[];
					listItems.value = sorted;
				}
			}

			loading.value = false;
		};

		load();

		return { error, list, listItems, loading };
	},
});
</script>
<style lang="scss">
.w-100 {
	width: 100%;
}
</style>
