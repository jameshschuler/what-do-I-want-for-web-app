<template>
	<nav class="navbar" role="navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item is-size-3 is-size-4-mobile" to="/">What do I want for...?</router-link>
		</div>

		<div class="navbar-menu is-active">
			<div class="navbar-end">
				<div class="navbar-item">
					<input class="input mr-2" type="text" placeholder="Search..." />
					<div class="buttons">
						<router-link to="/list/new" class="button is-primary">
							<strong>New List</strong>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Navbar extends Vue {}
</script>
