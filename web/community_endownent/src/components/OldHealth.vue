<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/home' }"
				>首页</el-breadcrumb-item
			>
			<el-breadcrumb-item>老人信息档案</el-breadcrumb-item>
			<el-breadcrumb-item>老人健康信息管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getOldManHealthList"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="sreach"
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible = true"
						>添加老人健康档案</el-button
					>
				</el-col>
			</el-row>
			<el-table :data="oldManHealthoData" style="width: 100%">
				<!-- 展开行 -->
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-form
							label-position="left"
							inline
							class="demo-table-expand"
						>
							<el-form-item label="姓名：">
								<span>{{ scope.row.real_name }}</span>
							</el-form-item>
							<el-form-item label="性别">
								<span>{{ scope.row.male }}</span>
							</el-form-item>
							<el-form-item label="年龄">
								<span>{{ scope.row.age }}</span>
							</el-form-item>
							<el-form-item label="身高">
								<span>{{ scope.row.om_height }}</span>
							</el-form-item>
							<el-form-item label="体重">
								<span>{{ scope.row.om_weight }}</span>
							</el-form-item>
							<el-form-item label="疾病">
								<span>{{ scope.row.om_weight }}</span>
							</el-form-item>
							<el-form-item label="常用药品">
								<span>{{ scope.row.drug }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="real_name" label="姓名">
				</el-table-column>
				<el-table-column prop="male" label="性别"> </el-table-column>
				<el-table-column prop="age" label="年龄"> </el-table-column>
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
							@click="removeOldMan(scope.row._id)"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 添加老人健康信息对话框 -->
		<el-dialog
			title="添加老人信息"
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
				<el-form-item label="姓名" prop="real_name">
					<el-input v-model="addForm.real_name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="male">
					<el-select v-model="addForm.male" placeholder="请选择">
						<el-option
							v-for="item in MaleOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="addForm.age"></el-input>
				</el-form-item>
				<el-form-item label="身高" prop="om_height">
					<el-input v-model="addForm.om_height"></el-input>
				</el-form-item>
				<el-form-item label="体重" prop="om_weight">
					<el-input v-model="addForm.om_weight"></el-input>
				</el-form-item>
				<el-form-item label="疾病" prop="illness">
					<el-input v-model="addForm.illness"></el-input>
				</el-form-item>
				<el-form-item label="常用药" prop="drug">
					<el-input v-model="addForm.drug"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="ID_card_number">
					<el-input v-model="addForm.ID_card_number"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOldManHealth"
					>确 定</el-button
				>
			</span>
		</el-dialog>
		<!-- 修改老人健康信息对话框 -->
		<el-dialog
			title="修改老人信息"
			:visible.sync="editDialogVisible"
			width="30%"
			:close-on-click-modal="false"
		>
			<!-- 内容主体区域 -->
			<el-form
				:model="editForm"
				:rules="editRules"
				ref="editFormRef"
				label-width="70px"
			>
				<el-form-item label="姓名" prop="real_name">
					<el-input v-model="editForm.real_name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="male">
					<el-select
						v-model="editForm.male"
						placeholder="请选择"
						disabled
					>
						<el-option
							v-for="item in MaleOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model="editForm.age"></el-input>
				</el-form-item>
				<el-form-item label="身高" prop="om_height">
					<el-input v-model="editForm.om_height"></el-input>
				</el-form-item>
				<el-form-item label="体重" prop="om_weight">
					<el-input v-model="editForm.om_weight"></el-input>
				</el-form-item>
				<el-form-item label="疾病" prop="illness">
					<el-input v-model="editForm.illness"></el-input>
				</el-form-item>
				<el-form-item label="常用药" prop="drug">
					<el-input v-model="editForm.drug"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="ID_card_number">
					<el-input
						v-model="editForm.ID_card_number"
						disabled
					></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editOldManHealth"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	created() {
		this.getOldManHealthList()
	},
	data() {
		return {
			queryInfo: {
				query: '',
			},
			oldManHealthoData: [],
			addForm: {
				real_name: '',
				male: '',
				age: '',
				om_height: '',
				om_weight: '',
				illness: '',
				drug: '',
				ID_card_number: '',
			},
			addRules: {},
			addDialogVisible: false,
			MaleOptions: [
				{
					value: '男',
					lable: '男',
				},
				{
					value: '女',
					lable: '女',
				},
			],
			editForm: {},
			editDialogVisible: false,
			editRules: {},
		}
	},
	methods: {
		// 获取老人健康信息列表
		async getOldManHealthList() {
			const { data: res } = await this.$http.get('oldhealth/list')
			if (res.meta.status !== 200)
				return this.$message.error('获取老人健康信息列表失败')
			// 处理数组
			console.log(res.data)
			for (var i in res.data) {
				res.data[i].illness = res.data[i].illness.toString()
				res.data[i].drug = res.data[i].drug.toString()
			}
			this.oldManHealthoData = res.data
		},
		// 关闭对话框时重置表单
		addDialogClose() {
			this.$refs.addFormRef.resetFields()
		},
		// 添加老人健康信息
		addOldManHealth() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'/oldhealth/add',
					this.addForm
				)
				if (res.meta.status !== 201)
					return this.$message.error('添加失败')
				this.$message.success('添加成功')
				this.addDialogVisible = false
				this.getOldManHealthList()
			})
		},
		// 展示修改老人健康信息对话框
		showEditDialog(row) {
			this.editForm = row
			this.editDialogVisible = true
		},
		// 编辑老人健康信息业务
		editOldManHealth() {
			this.$refs.editFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.put(
					'/oldhealth/' + this.editForm._id,
					this.editForm
				)
				console.log(res)
				if (res.meta.status !== 200)
					return this.$message.error('修改失败')
				this.$message.success('修改成功')
				this.getOldManHealthList()
				this.editDialogVisible = false
			})
		},
		//删除老人健康信息业务
		async removeOldMan(id) {
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
			const { data: res } = await this.$http.delete('oldhealth/' + id)
			if (res.meta.status !== 200) {
				return this.$message.error('删除用户失败')
			}
			this.getOldManHealthList()
			this.$message.success('删除用户成功')
		},
		async sreach() {
			const { data: res } = await this.$http.get('oldhealth/sreach', {
				params: { sreachKey: this.queryInfo.query },
			})
			if (res.meta.status !== 200) return this.$message.error('查询失败')
			this.oldManHealthoData = res.data
			this.$message.success('查询成功')
		},
	},
}
</script>
<style lang="less" scoped></style>
