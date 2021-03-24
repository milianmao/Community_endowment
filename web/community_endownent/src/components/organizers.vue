<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/home' }"
				>首页</el-breadcrumb-item
			>
			<el-breadcrumb-item>活动信息档案</el-breadcrumb-item>
			<el-breadcrumb-item>活动信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getOrganizersList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getOrganizersList"
						></el-button>
					</el-input>
				</el-col>
			</el-row>
			<el-table :data="organizersList" style="width: 100%">
				<el-table-column
					label="活动名称"
					prop="act_name"
				></el-table-column>
				<el-table-column label="姓名" prop="act_organizers">
					<template> </template>
				</el-table-column>
				<el-table-column label="职位">
					<template slot-scope="scope">
						<el-tag type="danger" v-show="scope.row.status === '0'"
							>活动主管</el-tag
						>
						<el-tag type="success" v-show="scope.row.status === '1'"
							>工作人员</el-tag
						>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
export default {
	created() {
		this.getOrganizersList()
	},
	data() {
		return {
			queryInfo: {
				query: '',
			},
			organizersList: [],
		}
	},
	methods: {
		async getOrganizersList() {
			const { data: res } = await this.$http.get('/activity')
			if (res.meta.status !== 200)
				return this.$message.error('获取活动信息列表失败')
			console.log(res)
			res.data.forEach((item) => {
				if (item.act_organizers[0].act_main) {
					this.organizersList.push({
						act_name: item.act_name,
						act_organizers: item.act_organizers[0].act_main,
						status: '0',
					})
				}
				if (item.act_organizers[0].act_secondary) {
					this.organizersList.push({
						act_name: item.act_name,
						act_organizers: item.act_organizers[0].act_secondary,
						status: '1',
					})
				}
			})
			this.$message.success(res.meta.msg)
		},
	},
}
</script>
