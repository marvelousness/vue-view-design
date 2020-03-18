<template>
	<div>
	
	<Card class="card">
		<h1 slot="title">Hello World!</h1>
		<a href="#" slot="extra" @click.prevent="handleExtraClick">say hi to me!</a>
		<div class="container">
			<Tabs :value="tab.value" @on-click="handleTabClick">
				<TabPane label="简述" name="intro">
					<div class="intro">
						<p>前端涉猎的内容有：</p>
						<ol>
							<li>webpack</li>
							<li>vue</li>
							<li>view-design(前身是 iview)</li>
							<li>axios+mockjs</li>
						</ol>
						<p>后端涉猎的内容有：</p>
						<ol>
							<li>springboot</li>
						</ol>
					</div>
				</TabPane>
				<TabPane label="接口测试" name="api">
					<Tooltip content="点击此处刷新列表" placement="top" transfer>
						<Button type="primary" icon="ios-refresh" @click="handleRefresh"></Button>
					</Tooltip>
					<Tooltip content="点击此处测试表单数据提交" placement="top" transfer>
						<Button type="primary" @click="modal.visible = true">POST</Button>
					</Tooltip>
					<div class="table-container">
						<Spin size="large" fix v-if="table.loading">加载中...</Spin>
						<Table border :columns="table.columns" :data="table.data"></Table>
					</div>
				</TabPane>
			</Tabs>
			<div class="aboutme">
				<div class="description">该项目为简单的示例项目仅供学习！</div>
				<p><img src="~/statics/images/logo.jpg" /><a :href="'mailto:' + author">{{author}}</a></p>
				<p><a :href="url" target="_blank">{{url}}</a></p>
			</div>
		</div>
	</Card>
    <Modal v-model="modal.visible" width="60%" title="模拟表单数据提交">
		<div class="modal-form-container">
			<Form ref="formDynamic" :model="modal.form" :label-width="90">
				<FormItem v-for="(item, index) in modal.form.items" :key="index" :label="'field-' + index" :prop="'items.' + index" :rules="modal.rules">
					<Row>
						<Col span="10">
							<Input type="text" v-model="item.key" placeholder="enter key here..." @on-enter="handleSubmit">
								 <span slot="prepend">Key:</span>
							</Input>
						</Col>
						<Col span="10" offset="1">
							<Input type="text" v-model="item.value" placeholder="enter value here..." @on-enter="handleSubmit">
								<span slot="prepend">Value:</span>
							</Input>
						</Col>
						<Col span="3" style="text-align:center">
							<Button size="small" @click="handleRemoveModalFormItem(index)">Delete</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="24">
							<Button type="dashed" long @click="handleAddModalFormItem" icon="md-add">Add item</Button>
						</Col>
					</Row>
				</FormItem>
			</Form>
		</div>
	
		<div slot="footer" style="text-align:center">
			<Button type="primary" @click="handleSubmit" :loading="modal.pending">提交</Button>
			<Button @click="modal.visible = false">取消</Button>
		</div>
    </Modal>
	</div>
</template>

<script>
	import API from "api";
	
	export default {
		data() {
			return {
				tab: {
					value: "intro"
				},
				table:{
					loading: false,
					columns:[{
						key: "boolean",
						title: "boolean"
					}, {
						key: "double",
						title: "double"
					}, {
						key: "float",
						title: "float"
					}, {
						key: "integer",
						title: "integer"
					}, {
						key: "long",
						title: "long"
					}, {
						key: "uuid",
						title: "string"
					}],
					data:[]
				},
				modal: {
					form: {
						items: [{
							key: null,
							value: null
						}]
					},
					rules: [{
						required: true,
						message: "此项不允许为空"
					}, {
						required: true,
						validator(rule, value, callback) {
							if(value) {
								if(value.key) {
									if(!/^([a-zA-Z]*)$/i.test(value.key)) {
										callback(new Error("key必须全部是字母"));
									}
								} else {
									callback(new Error("key为必填项"));
								}
							}
							callback();
						}
					}],
					pending: false,
					visible: false
				},
				author: "marvelousness@foxmail.com",
				url: "https://github.com/marvelousness/vue-view-design"
			}
		},
		computed: {
			length: {
				get() {
					return this.modal.form.items.length;
				}
			}
		},
		mounted() {
		},
		methods: {
			handleExtraClick() {
				this.$Message.info("Hi");
			},
			handleTabClick(value) {
				if(value == "api") {
					this.handleRefresh();
				} else {
					this.table.data = [];
				}
			},
			handleAddModalFormItem() {
				if(this.length > 9) {
					this.$Message.error("已达上限！");
					return;
				}
				this.modal.form.items.push({
					value: null
				});
			},
			handleRemoveModalFormItem(index) {
				if(!(index > -1 && index < this.length)) {
					return;
				}
				this.modal.form.items.splice(index, 1);
			},
			handleRefresh() {
				let that = this;
				
				that.table.data = [];
				that.table.loading = true;
				API.getDataList({
					size: 100
				}).then((response) => {
					that.table.data = response.data;
					that.table.loading = false;
				}).catch((err) => {
					if(err) {
						if(err.response && err.response.data) {
							that.$Message.error(err.response.data);
						} else if(err.message) {
							that.$Message.error(err.message);
						} else {
							that.$Message.error("发生未经处理的异常！");
						}
					} else {
						that.$Message.error("服务器异常！");
					}
					that.table.loading = false;
				});
			},
			handleSubmit() {
				let that = this;
				if(that.modal.pending) {
					that.$Message.info("数据正在处理中，请稍后再试！");
					return;
				}
				this.$refs.formDynamic.validate((valid) => {
					if(!valid) {
						that.$Message.error("表单信息异常!");
						return;
					}
					let data = {};
					let items = that.modal.form.items;
					for(let i = 0; i < items.length; i++) {
						let key = items[i].key;
						let value = items[i].value;
						if(/^([a-zA-Z]*)$/i.test(key) && value) {
							data[key] = value;
						}
					}
					
					that.modal.pending = true;
					API.postData(data).then((response) => {
						if(response && response.data == "success") {
							that.$Message.success("操作成功！");
						} else {
							that.$Message.warning("操作失败！");
						}
						that.modal.pending = false;
					}).catch((err) => {
						if(err) {
							if(err.response && err.response.data) {
								that.$Message.error(err.response.data);
							} else if(err.message) {
								that.$Message.error(err.message);
							} else {
								that.$Message.error("发生未经处理的异常！");
							}
						} else {
							that.$Message.error("服务器异常！");
						}
						that.modal.pending = false;
					});
				});
			}
		}
	};
</script>

<style>
	.card {
		width: 80%;
		margin: 50px auto 0px auto;
	}
	.intro {
		margin: 0px 20px;
	}
	.intro ol {
		list-style-position: inside;
	}
	.aboutme {
		text-align: center;
		border-top: solid 2px #ccc;
		margin-top: 30px;
		padding-top: 10px;
	}
	.aboutme .description {
	}
	.aboutme>p>img {
		width: 2em;
		vertical-align: middle;
		margin-right: 1em;
	}
	
	.table-container {
		margin-top: 10px;
		position: relative;
	}
	
	.modal-form-container {
		max-height: 300px;
		overflow-y: auto;
	}
</style>