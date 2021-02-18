<template>
	<navbar />
	<div class="columns">
		<div class="column is-10 is-offset-1 is-12-mobile">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
	components: {
		Navbar,
	},
};
</script>

<style lang="scss"></style>
