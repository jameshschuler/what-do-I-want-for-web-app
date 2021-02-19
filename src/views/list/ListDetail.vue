<template>
	<section class="section is-medium">
		<Loader v-if="loading" />
		<h1 class="title" v-if="!loading && list">{{ list.name }}</h1>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { List } from '../../models/list';
import { loadList } from '@/services/listService';
import { AppError, isAppError } from '@/models/error';
import Loader from '@/components/Loader.vue';

export default defineComponent({
	components: {
		Loader,
	},
	setup() {
		const loading = ref(true);
		const list = ref<List | null>(null);
		const error = ref<AppError | null>(null);

		const load = async () => {
			const route = useRoute();
			const response = await loadList(+route.params.id);
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
