<template>
	<div class="loader-wrapper">
		<div class="lds-dual-ring"></div>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss">
$color: hsl(204, 86%, 53%);

.loader-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
}

.lds-dual-ring {
	display: inline-block;
	width: 80px;
	height: 80px;
}
.lds-dual-ring:after {
	content: ' ';
	display: block;
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid $color;
	border-color: $color transparent $color transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
