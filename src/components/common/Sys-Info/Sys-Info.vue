<template>
	<div class="sys-info">
		<p class="log-out-in" v-if="message">{{message}}</p>	
	</div>
</template>

<script>
	export default {
		props:['message']
	}
</script>

<style scoped lang="scss">
	.sys-info {
		font-size: 10px;
		font-weight: 100;
		color: #ccc;
		text-align: center;
	}
</style>