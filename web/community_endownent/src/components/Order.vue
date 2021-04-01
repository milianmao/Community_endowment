<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/home' }"
				>首页</el-breadcrumb-item
			>
			<el-breadcrumb-item>老人信息档案</el-breadcrumb-item>
			<el-breadcrumb-item>老人基本信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<!-- 搜索区域 -->
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getOrderList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="search"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-select
						v-model="status"
						clearable
						placeholder="请选择"
						@clear="getOrderList"
						@change="handleChange"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-table :data="orderListTable" style="width:100%;">
				<el-table-column
					prop="real_name"
					label="姓名"
					width="180"
				></el-table-column>
				<el-table-column
					prop="home_address"
					label="家庭住址"
					width="400"
				></el-table-column>
				<el-table-column prop="post_type" label="服务类型">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.post_type === 0">{{
							scope.row.msg_main
						}}</el-tag>
						<el-tag
							v-else-if="scope.row.post_type === 1"
							type="success"
							>药品需求</el-tag
						>
						<el-tag
							v-else-if="scope.row.post_type === 2"
							type="info"
							>社会保障</el-tag
						>
						<el-tag
							v-else-if="scope.row.post_type === 3"
							type="danger"
							>投诉</el-tag
						>
						<el-tag v-else type="warning">建议</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.status === '0'" type="danger"
							>未处理</el-tag
						>
						<el-tag v-else-if="scope.row.status === '1'"
							>正在处理</el-tag
						>
						<el-tag v-else type="success">已处理</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template slot-scope="scope">
						<!-- 查看详情 -->
						<el-button
							type="success"
							icon="el-icon-info"
							size="mini"
							@click="showInfo(scope.row)"
						></el-button>
						<!-- 修改 -->
						<el-button
							type="primary"
							icon="el-icon-setting"
							size="mini"
							@click="showEditDialog(scope.row)"
						></el-button>
						<!-- 删除 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeOrder(scope.row._id)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 查看详细信息 -->
		<el-dialog
			title="详细信息"
			:visible.sync="InfoDialogVisible"
			width="50%"
			:before-close="handleClose"
		>
			<el-row :gutter="30" style="margin-bottom:15px;">
				<el-col :span="10" style="padding-right: 0px"
					><span>姓名：</span>{{ singeInfo.real_name }}</el-col
				>
				<el-col :span="10" style="padding: 0px"
					><span>住址：</span>{{ singeInfo.home_address }}</el-col
				>
			</el-row>
			<el-row style="margin-bottom:15px;">
				<el-col :span="10">
					<span style="margin-right:8px">服务类型：</span>
					<el-tag v-if="singeInfo.post_type === 0">{{
						singeInfo.msg_main
					}}</el-tag>
					<el-tag v-else-if="singeInfo.post_type === 1" type="success"
						>药品需求</el-tag
					>
					<el-tag v-else-if="singeInfo.post_type === 2" type="info"
						>社会保障</el-tag
					>
					<el-tag v-else-if="singeInfo.post_type === 3" type="danger"
						>投诉</el-tag
					>
					<el-tag v-else type="warning">建议</el-tag>
				</el-col>
				<el-col :span="10">
					<span style="margin-right:8px">状态:</span>
					<el-tag v-if="singeInfo.status === '0'" type="danger"
						>未处理</el-tag
					>
					<el-tag v-else-if="singeInfo.status === '1'"
						>正在处理</el-tag
					>
					<el-tag v-else type="success">已处理</el-tag>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<span>备注：</span>
					<span>{{ singeInfo.msg_note || 'null' }}</span>
				</el-col>
			</el-row>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="InfoDialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
		<!-- 修改工单状态 -->
		<el-dialog
			title="修改工单状态"
			:visible.sync="editDialogVisible"
			width="50%"
			:before-close="handleClose"
		>
			<el-select v-model="editStatus" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="eidtOrderStatus"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	created() {
		this.getOrderList()
	},
	data() {
		return {
			// 单个详细信息
			singeInfo: {},
			eidtInfo: {},
			InfoDialogVisible: false,
			editDialogVisible: false,
			queryInfo: {
				query: '',
			},
			orderListTable: [],
			status: '',
			editStatus: '',
			options: [
				{
					value: '0',
					label: '未处理',
				},
				{
					value: '1',
					label: '正在处理',
				},
				{
					value: '2',
					label: '已处理',
				},
			],
		}
	},
	methods: {
		async getOrderList() {
			const { data: res } = await this.$http.get('/order/list')
			if (res.meta.status !== 200) return this.$message(res.meta.msg)
			console.log(res)
			this.orderListTable = res.data
		},
		async search() {
			const { data: res } = await this.$http.get('order/sreach', {
				params: { sreachKey: this.queryInfo.query },
			})
			console.log(res)
			if (res.meta.status !== 200) return this.$message.error('查询失败')
			this.orderListTable = res.data
			this.$message.success('查询成功')
		},
		async handleChange(value) {
			const { data: res } = await this.$http.get('order/findByStatus', {
				params: { status: value },
			})
			console.log(res)
			if (res.meta.status !== 200) return this.$message.error('查询失败')
			this.orderListTable = res.data
			this.$message.success('查询成功')
		},
		showInfo(row) {
			this.singeInfo = row
			this.InfoDialogVisible = true
		},
		handleClose() {
			this.singeInfo = {}
		},
		showEditDialog(row) {
			this.eidtInfo = row
			this.editDialogVisible = true
		},
		async eidtOrderStatus() {
			console.log(this.editStatus)
			const { data: res } = await this.$http.put(
				'/order/' + this.eidtInfo._id,
				{ status: this.editStatus }
			)
			if (res.meta.status !== 200)
				return this.$message.error(res.meta.msg)
			this.eidtInfo = {}
			this.editStatus = ''
			this.getOrderList()
			this.$message.success(res.meta.msg)
			this.editDialogVisible = false
		},
		async removeOrder(id) {
			const confirmResult = await this.$confirm(
				'此操作将永久删除, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).catch((err) => err)
			if (confirmResult !== 'confirm') {
				return this.$message.info('已经取消删除')
			}
			//删除用户
			const { data: res } = await this.$http.delete('order/' + id)
			if (res.meta.status !== 200) {
				return this.$message.error('删除失败')
			}
			this.getOrderList()
			this.$message.success('删除成功')
		},
	},
}
</script>
