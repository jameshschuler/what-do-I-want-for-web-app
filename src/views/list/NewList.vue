<template>
	<section class="section is-small">
		<h1 class="title">New List</h1>
		<h2 class="subtitle mt-1">Enter a name for your list and click 'Create' to get started!</h2>
	</section>

	<section class="section is-small">
		<form>
			<div class="columns">
				<div class="column is-half is-full-mobile">
					<div class="field">
						<label class="label">Name *</label>
						<div class="control">
							<input class="input" type="text" placeholder="Required" />
						</div>
						<!-- <p class="help is-danger">This username is available</p> -->
					</div>
				</div>
				<div class="column is-half is-full-mobile">
					<div class="field">
						<label class="label">Created By</label>
						<div class="control">
							<input class="input" type="text" placeholder="Optional" />
						</div>
					</div>
				</div>
			</div>
			<button type="submit" class="button is-primary">Create</button>
		</form>
	</section>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class NewList extends Vue {}
</script>
