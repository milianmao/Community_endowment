<template>
	<!-- 登录注册表单 -->
	<div class="login_container">
		<div class="login_box">
			<el-tabs
				v-model="activeName"
				type="card"
				@tab-click="handleClick"
				stretch
				class="tabs"
			>
				<!-- 登录表单 -->
				<el-tab-pane label="登录" name="first" class="login_tab">
					<template>
						<div class="login_form">
							<el-form
								ref="loginFormRef"
								:model="loginForm"
								label-width="70px"
								:rules="loginFormRules"
							>
								<el-form-item label="用户名">
									<el-input
										v-model="loginForm.username"
										prefix-icon="el-icon-user"
									></el-input>
								</el-form-item>
								<el-form-item label="密码">
									<el-input
										v-model="loginForm.password"
										prefix-icon="el-icon-lock"
									></el-input>
								</el-form-item>
								<el-form-item>
									<el-button
										type="primary"
										@click="login"
										round
										>登录</el-button
									>
									<el-button
										type="info"
										@click="resetLoginFrom"
										round
										>重置</el-button
									>
								</el-form-item>
							</el-form>
						</div>
					</template>
				</el-tab-pane>

				<!-- 注册表单 -->
				<el-tab-pane label="注册" name="second">注册</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
export default {
	created() {},
	data() {
		return {
			activeName: 'first',
			loginForm: {
				username: 'admin',
				password: '123456',
			},
			loginFormRules: {
				//验证用户名是否合法
				username: [
					//失去焦点时触发
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					},
					{
						min: 3,
						max: 10,
						message: '长度在 3 到 10 个字符',
						trigger: 'blur',
					},
				],
				//验证密码是否合法
				password: [
					{
						required: true,
						message: '请输入登录密码',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 15,
						message: '长度在 6 到 15 个字符',
						trigger: 'blur',
					},
				],
			},
		}
	},
	methods: {
		handleClick() {},
		login() {
			this.$refs.loginFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'/users/login',
					this.loginForm
				)
				if (res.meta.status !== 200) {
					return this.$message.error('登录失败')
				}
				this.$message.success('登录成功')
				// 保存token
				window.sessionStorage.setItem('token', res.data.token)
				if (res.data.level_id !== 0) {
					return this.$router.push('/userhome')
				}
				this.$router.push('/adminhome')
			})
		},
		//重置登录表单
		resetLoginFrom() {
			this.$refs.loginFormRef.resetFields()
		},
	},
}
</script>
<style lang="less" scoped>
.login_container {
	background-color: #2b4b6b;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.login_box {
	height: 550px;
	width: 400px;
	background-color: #fff;
	margin-right: 10%;
	border-radius: 2%;
}
/deep/.el-tabs__nav .el-tabs__item {
	height: 48px;
	line-height: 48px;
	font-size: 15px;
}
.login_form {
	margin: 150px 20px;
}
</style>
