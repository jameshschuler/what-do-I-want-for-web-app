<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<h2 class="navbar-item">What</h2>
			<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<a class="navbar-item">
					Home
				</a>
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<input class="input mr-2" type="text" placeholder="Search..." />
					<div class="buttons">
						<a class="button is-primary">
							<strong>New List</strong>
						</a>
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
