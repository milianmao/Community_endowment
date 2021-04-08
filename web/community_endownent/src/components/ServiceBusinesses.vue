<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/home' }"
				>首页</el-breadcrumb-item
			>
			<el-breadcrumb-item>服务人员档案</el-breadcrumb-item>
			<el-breadcrumb-item>服务商家信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getSBList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="search"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible = true"
						>添加商家信息</el-button
					>
				</el-col>
				<el-table :data="SBListTable" style="width:100%;">
					<el-table-column prop="name" label="名称"></el-table-column>
					<el-table-column
						prop="service_type"
						label="商家类型"
					></el-table-column>
					<el-table-column
						prop="phone"
						label="联系电话"
					></el-table-column>
					<el-table-column
						prop="address"
						label="商家地址"
					></el-table-column>
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
								icon="el-icon-edit"
								size="mini"
								@click="showEdit(scope.row)"
							></el-button>
							<!-- 删除 -->
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="mini"
								@click="removeSB(scope.row._id)"
							></el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
		</el-card>
		<!-- 添加服务商家信息 -->
		<el-dialog
			title="添加服务商家"
			:visible.sync="addDialogVisible"
			width="30%"
			@close="addDialogClose"
			:close-on-click-modal="false"
		>
			<!-- 内容主体区域 -->
			<el-form
				:model="addForm"
				:rules="addRules"
				ref="addFormRef"
				label-width="70px"
			>
				<el-form-item label="商家名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="商家地址" prop="address">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="商家类型" prop="service_type">
					<el-select
						v-model="addForm.service_type"
						placeholder="请选择"
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSBInfo">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改服务商家信息 -->
		<el-dialog
			title="修改服务商家信息"
			:visible.sync="editDialogVisible"
			width="30%"
			@close="eidtDialogClose"
			:close-on-click-modal="false"
		>
			<!-- 内容主体区域 -->
			<el-form
				:model="editForm"
				:rules="edittRules"
				ref="editFormRef"
				label-width="70px"
			>
				<el-form-item label="商家名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="商家地址" prop="address">
					<el-input v-model="editForm.address"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="商家类型" prop="service_type">
					<el-select
						v-model="editForm.service_type"
						placeholder="请选择"
						disabled
					>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务记录" prop="record">
					<el-input v-model="record"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="eidtSBInfo">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 服务记录 -->
		<el-dialog title="提示" :visible.sync="recordDialogVisible" width="30%">
			<el-card class="box-card">
				<div
					v-for="item in singeInfo"
					:key="item.index"
					class="text item"
				>
					{{ item }}
				</div>
			</el-card>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="recordDialogVisible = false"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	created() {
		this.getSBList()
	},
	data() {
		return {
			SBListTable: [],
			singeInfo: [],
			queryInfo: {
				query: '',
			},
			addDialogVisible: false,
			editDialogVisible: false,
			recordDialogVisible: false,
			addForm: {
				name: '',
				address: '',
				phone: '',
				service_type: '',
			},
			editForm: {},
			edittRules: {},
			addRules: {},
			options: [
				{
					value: '生活用品',
					label: '生活用品',
				},
				{
					value: '家用电器',
					label: '家用电器',
				},
				{
					value: '文化服务',
					label: '文化服务',
				},
				{
					value: '生活服务',
					label: '生活服务',
				},
			],
			record: '',
		}
	},
	methods: {
		async getSBList() {
			const { data: res } = await this.$http.get('/Businesses/list')
			if (res.meta.status !== 200)
				return this.$message.error(res.meta.msg)
			this.SBListTable = res.data
		},
		async search() {
			const { data: res } = await this.$http.get('Businesses/sreach', {
				params: { sreachKey: this.queryInfo.query },
			})
			if (res.meta.status !== 200) return this.$message.error('查询失败')
			this.SBListTable = res.data
			this.$message.success('查询成功')
		},
		addDialogClose() {
			this.$refs.addFormRef.resetFields()
		},
		eidtDialogClose() {
			this.$refs.editFormRef.resetFields()
		},

		addSBInfo() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'/Businesses',
					this.addForm
				)
				if (res.meta.status !== 201)
					return this.$message.error(res.meta.msg)
				this.$message.success(res.meta.msg)
				this.addDialogVisible = false
				this.getSBList()
			})
		},
		showEdit(row) {
			this.editForm = row
			this.editDialogVisible = true
		},
		showInfo(row) {
			this.singeInfo = row.service_record
			this.recordDialogVisible = true
		},
		eidtSBInfo() {
			this.$refs.editFormRef.validate(async (valid) => {
				if (!valid) return
				if (this.record !== '') {
					this.editForm.service_record.push(this.record)
				}
				const { data: res } = await this.$http.put(
					'/Businesses/' + this.editForm._id,
					this.editForm
				)
				if (res.meta.status !== 200)
					return this.$message.error(res.meta.msg)
				this.record = ''
				this.$message.success(res.meta.msg)
				this.editDialogVisible = false
				this.getSBList()
			})
		},
		async removeSB(id) {
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
			const { data: res } = await this.$http.delete('/Businesses/' + id)
			if (res.meta.status !== 200) {
				return this.$message.error('删除失败')
			}
			this.getSBList()
			this.$message.success('删除成功')
		},
	},
}
</script>
