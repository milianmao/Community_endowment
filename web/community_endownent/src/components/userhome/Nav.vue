<template>
	<div class="nav-container">
		<div class="nav-left">
			<span>智慧社区</span>
		</div>
		<div class="nav-right">
			<span>欢迎用户：{{ userInfo.rel_name }}</span>
			<el-button type="danger" size="mini" @click="loginout"
				>登出</el-button
			>
		</div>
	</div>
</template>
<script>
export default {
	props: ['userInfo'],
	data() {
		return {}
	},
	methods: {
		loginout() {
			window.sessionStorage.removeItem('token')
			window.sessionStorage.removeItem('userInfo')
			window.sessionStorage.removeItem('Authorer')
			this.$router.push('/login')
		},
	},
}
</script>
<style lang="less" scoped>
.nav-container {
	height: 100%;
	width: 100%;
	font-family: 'Hiragino Sans GB, MicroSoft YaHei';
	color: #333;
	position: relative;
	font-size: 16px;
}

.nav-left {
	position: absolute;
	display: inline-block;
	margin-left: 20%;
	top: 50%;
	transform: translateY(-50%);
	font-size: 24px;
}
.nav-right {
	position: absolute;
	display: inline-block;
	margin-right: 20%;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	span {
		margin-right: 10px;
	}
}
</style>
