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
						@clear="getServerPersonnelInfo"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getServerPersonnelInfo"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible = true"
						>添加活动信息</el-button
					>
				</el-col>
			</el-row>
			<el-table :data="spInfoList" style="width: 100%">
				<!-- 展开行 -->
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-form
							label-position="left"
							inline
							class="demo-table-expand"
						>
							<el-form-item label="姓名：">
								<span>{{ scope.row.sp_name }}</span>
							</el-form-item>
							<el-form-item label="性别">
								<span>{{ scope.row.sp_male }}</span>
							</el-form-item>
							<el-form-item label="年龄">
								<span>{{ scope.row.sp_age }}</span>
							</el-form-item>
							<el-form-item label="身份号码">
								<span>{{ scope.row.sp_ID_card }}</span>
							</el-form-item>
							<el-form-item label="联系电话">
								<span>{{ scope.row.sp_phone }}</span>
							</el-form-item>
							<el-form-item label="组名">
								<span>{{ scope.row.sp_group }}</span>
							</el-form-item>
							<el-form-item label="职位">
								<span v-show="scope.row.sp_lead">组长</span>
								<span v-show="!scope.row.sp_lead">组员</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="sp_name" label="姓名"></el-table-column>
				<el-table-column prop="sp_age" label="年龄"></el-table-column>
				<el-table-column prop="sp_male" label="性别"></el-table-column>
				<el-table-column prop="sp_group" label="组名"></el-table-column>
				<el-table-column prop="sp_lead" label="职位">
					<template slot-scope="scope">
						<el-tag v-show="scope.row.sp_lead">组长</el-tag>
						<el-tag type="danger" v-show="!scope.row.sp_lead"
							>组员</el-tag
						>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 修改 -->
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="showEditDialog(scope.row)"
						></el-button>
						<!-- 删除 -->
						<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="removeSpInfo(scope.row._id)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 添加服务人员信息 -->
		<el-dialog
			title="添加服务人员信息"
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
				<el-form-item label="姓名" prop="sp_name">
					<el-input v-model="addForm.sp_name"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="sp_age">
					<el-input v-model="addForm.sp_age"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sp_male">
					<el-select
						v-model="addForm.sp_male"
						placeholder="请选择职位"
					>
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份号码" prop="sp_ID_card">
					<el-input v-model="addForm.sp_ID_card"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="sp_phone">
					<el-input v-model="addForm.sp_phone"></el-input>
				</el-form-item>
				<el-form-item label="小组名" prop="sp_group">
					<el-input v-model="addForm.sp_group"></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="sp_lead">
					<el-select
						v-model="addForm.sp_lead"
						placeholder="请选择职位"
					>
						<el-option label="组长" value="1"></el-option>
						<el-option label="组员" value="0"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="AddSP">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="修改服务人员信息"
			:visible.sync="editDialogVisible"
			width="30%"
			:close-on-click-modal="false"
		>
			<!-- 内容主体区域 -->
			<el-form
				:model="editForm"
				:rules="addRules"
				ref="editFormRef"
				label-width="70px"
			>
				<el-form-item label="姓名" prop="sp_name">
					<el-input v-model="editForm.sp_name"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="sp_age">
					<el-input v-model="editForm.sp_age"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sp_male">
					<el-select
						v-model="editForm.sp_male"
						placeholder="请选择职位"
					>
						<el-option label="男" value="男"></el-option>
						<el-option label="女" value="女"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份号码" prop="sp_ID_card">
					<el-input v-model="editForm.sp_ID_card"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="sp_phone">
					<el-input v-model="editForm.sp_phone"></el-input>
				</el-form-item>
				<el-form-item label="小组名" prop="sp_group">
					<el-input v-model="editForm.sp_group"></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="sp_lead">
					<el-select
						v-model="editForm.sp_lead"
						placeholder="请选择职位"
					>
						<el-option label="组长" value="1"></el-option>
						<el-option label="组员" value="0"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editSPInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	created() {
		this.getServerPersonnelInfo()
	},
	data() {
		return {
			queryInfo: {
				query: '',
			},
			spInfoList: [],
			addDialogVisible: false,
			editDialogVisible: false,
			addForm: {
				sp_name: '',
				sp_age: '',
				sp_male: '',
				sp_ID_card: '',
				sp_phone: '',
				sp_group: '',
				sp_lead: '',
			},
			editForm: {},
			addRules: {
				sp_name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				sp_male: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		// 获取服务人员信息列表
		async getServerPersonnelInfo() {
			const { data: res } = await this.$http.get('/servicePersonnel')
			console.log(res)
			if (res.meta.status !== 200) return this.$message.error('获取失败')
			this.spInfoList = res.data
			this.$message.success('获取列表成功')
		},
		// 添加服务人员业务
		AddSP() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'/servicePersonnel',
					this.addForm
				)
				console.log(res)
				if (res.meta.status !== 201)
					return this.$message.error(res.meta.msg)
				this.$message.success(res.meta.msg)
				this.addDialogVisible = false
				this.getServerPersonnelInfo()
			})
		},
		// 关闭添加服务人员对话框
		addDialogClose() {
			this.$refs.addFormRef.resetFields()
		},
		// 展示修改对话框
		showEditDialog(row) {
			this.editForm = row
			this.editDialogVisible = true
		},
		// 编辑服务人员信息
		editSPInfo() {
			this.$refs.editFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.put(
					'/servicePersonnel/' + this.editForm._id,
					this.editForm
				)
				console.log(res)
				if (res.meta.status !== 200)
					return this.$message.error('修改失败')
				this.$message.success('修改成功')
				this.getServerPersonnelInfo()
				this.editDialogVisible = false
			})
		},
		// 删除服务人员信息
		async removeSpInfo(id) {
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
				return this.$message.info('已经取消删除')
			}
			//删除用户
			const { data: res } = await this.$http.delete(
				'servicePersonnel/' + id
			)
			if (res.meta.status !== 200) {
				return this.$message.error('删除失败')
			}
			this.getServerPersonnelInfo()
			this.$message.success('删除成功')
		},
	},
}
</script>
