<template>
	<div>ListDetail</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
	setup() {},
	mounted() {
		const route = useRoute();
		const id = route.params.id;

		console.log(+id);
	},
});
</script>
<style lang="scss"></style>
