<template>
	<section class="section is-medium">
		<Loader v-if="loading" />
		<div v-if="!loading && list">
			<h1 class="title">{{ list.name }}</h1>
			<h2 class="subtitle">{{ list.createdBy }}</h2>

			<div class="is-flex is-justify-content-space-between is-align-items-center">
				<h2 class="subtitle">{{ createdAtFormatted }}</h2>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { List } from '../../models/list';
import { loadList } from '@/services/listService';
import { AppError, isAppError } from '@/models/error';
import Loader from '@/components/Loader.vue';
import dayjs from 'dayjs';

export default defineComponent({
	components: {
		Loader,
	},
	computed: {
		createdAtFormatted(this: any) {
			return dayjs(this.list.createdAt)
				.format('MMMM DD, YYYY h:mm A')
				.toString();
		},
	},
	setup() {
		const loading = ref(true);
		const list = ref<List | null>(null);
		const error = ref<AppError | null>(null);

		const load = async () => {
			const route = useRoute();
			const response = await loadList(route.params.id.toString());
			if (isAppError(response)) {
				error.value = response;
			} else {
				list.value = response;
			}

			loading.value = false;
		};

		load();

		return { error, list, loading };
	},
});
</script>
<style lang="scss"></style>
