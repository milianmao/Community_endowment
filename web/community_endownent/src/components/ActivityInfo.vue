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
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getActivityList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getActivityList"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="goAdd"
						>添加活动信息</el-button
					>
				</el-col>
			</el-row>
			<el-table :data="activityList" style="width: 100%">
				<!-- 展开行 -->
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-form
							label-position="left"
							inline
							class="demo-table-expand"
						>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column
					prop="act_name"
					label="活动名称"
					width="180"
				></el-table-column>
				<el-table-column prop="act_status" label="活动状态">
					<template slot-scope="scope">
						<el-tag v-show="!scope.row.act_status">预活动</el-tag>
						<el-tag type="danger" v-show="scope.row.act_status"
							>过期活动</el-tag
						>
					</template>
				</el-table-column>
				<el-table-column prop="created" label="创建时间">
					<template slot-scope="scope">
						{{ scope.row.created | dateFormat }}
					</template></el-table-column
				>
				<el-table-column prop="act_time[0]" label="活动开始时间">
					<template slot-scope="scope">
						{{ scope.row.act_time[0] | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<!-- 修改 -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="goEdit(scope.row._id)"
						></el-button>
						<!-- 删除 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeActivityInfo(scope.row._id)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
export default {
	created() {
		this.getActivityList()
	},
	data() {
		return {
			queryInfo: {
				query: '',
			},
			activityList: [],
		}
	},
	methods: {
		async getActivityList() {
			const { data: res } = await this.$http.get('/activity')
			console.log(res)
			if (res.meta.status !== 200)
				return this.$message.error('获取活动信息列表失败')
			this.activityList = res.data
		},
		goAdd() {
			this.$router.push('/Edit')
		},
		goEdit(id) {
			this.$router.push('/Edit/' + id)
		},
		async removeActivityInfo(id) {
			const confirmResult = await this.$confirm(
				'此操作将永久删除该用户, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).catch((err) => err)
			if (confirmResult !== 'confirm') {
				return this.$message.info('已经取消删除用户')
			}
			//删除用户
			const { data: res } = await this.$http.delete('/activity/' + id)
			if (res.meta.status !== 200) {
				return this.$message.error('删除活动失败')
			}
			this.getActivityList()
			this.$message.success('删除成功')
		},
	},
}
</script>
