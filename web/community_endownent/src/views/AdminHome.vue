<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<span>智慧社区养老管理系统</span>
			</div>
			<el-button type="info" @click="loginout">退出</el-button>
		</el-header>
		<el-container>
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div class="toggle-buttn" @click="toggleCollapse">|||</div>
				<!-- 侧边栏菜单 -->
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409eff"
					unique-opened
					:collapse="isCollapse"
					:collapse-transition="false"
					router
					:default-active="activePath"
				>
					<!-- 一级菜单 -->
					<el-submenu
						:index="item._id + ''"
						v-for="item in menulist"
						:key="item._id"
					>
						<!-- 一级菜单模板区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconsObj[item.icon]"></i>
							<!-- 文本 -->
							<span>
								{{ item.authName }}
							</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item
							:index="subItem.path"
							v-for="subItem in item.children"
							:key="subItem._id"
							@click="saveNavState(subItem.path)"
						>
							<i class="el-icon-menu"></i>
							<span>
								{{ subItem.authName }}
							</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main><router-view></router-view></el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {
	created() {
		this.getMenuList()
		this.activePath = window.sessionStorage.getItem('activePath')
	},
	data() {
		return {
			// 菜单数据
			menulist: [],
			iconsObj: {
				'101': 'el-icon-s-custom',
				'202': 'el-icon-turn-off',
				'303': 'el-icon-s-goods',
				'404': 'el-icon-s-order',
			},
			//是否折叠
			isCollapse: false,
			//被激活的链接地址
			activePath: '',
		}
	},
	methods: {
		async getMenuList() {
			const { data: res } = await this.$http.get('/menus')
			this.menulist = res.data
		},
		toggleCollapse() {
			this.isCollapse = !this.isCollapse
		},
		//保存链接的激活状态
		saveNavState(activePath) {
			window.sessionStorage.setItem('activePath', activePath)
			this.activePath = activePath
		},
		loginout() {
			window.sessionStorage.removeItem('token')
			window.sessionStorage.removeItem('Authorer')
			this.$router.push('/login')
		},
	},
}
</script>
<style lang="less" scoped>
.home-container {
	height: 100%;
}
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	align-items: center;
	color: #fff;
	font-size: 20px;
	> div {
		display: flex;
		align-items: center;
	}
	span {
		margin-left: 15px;
	}
}
.el-aside {
	background-color: #333744;
}
.toggle-buttn {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
}
</style>
