<template>
	<div>
	
	<Card class="card">
		<h1 slot="title">Hello Vue!</h1>
		<a href="#" slot="extra" @click.prevent="handleExtraClick">say hi to me!</a>
	
		<p><img src="~/statics/images/logo.jpg" /><a :href="'mailto:' + author">{{author}}</a></p>
		<p><a :href="url" target="_blank">{{url}}</a></p>
	</Card>
	
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				author: "marvelousness@foxmail.com",
				url: "https://github.com/marvelousness/vue-view-design"
			}
		},
		methods: {
			handleExtraClick: function() {
				this.$Message.info("Hi");
			}
		}
	}
</script>

<style>
	.card {
		width:350px;
		margin: 50px auto 0px auto;
	}
	.card p {
		margin: 10px 0px;
	}
	p>img {
		width: 2em;
		vertical-align: middle;
		margin-right: 1em;
	}
</style>