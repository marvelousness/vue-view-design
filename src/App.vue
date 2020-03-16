<template>
	<div>
		<h1>Hello Vue!</h1>
		<p><img src="~/statics/images/logo.jpg" />{{author}}</p>
		<p>{{url}}</p>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				author: "marvelousness@foxmail.com",
				url: "https://github.com/marvelousness/vue-view-design"
			}
		}
	}
</script>

<style>
	p>img {
		width: 2em;
		vertical-align: middle;
	}
</style>