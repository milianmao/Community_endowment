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
		<!-- 卡片区域 -->
		<el-card>
			<!-- 搜索与添加区域 -->
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getOldManList"
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
						>添加老人</el-button
					>
				</el-col>
			</el-row>
			<el-table :data="oldManInfoData" style="width: 100%">
				<el-table-column prop="rel_name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="male" label="性别"> </el-table-column>
				<el-table-column prop="age" label="年龄"> </el-table-column>
				<el-table-column prop="national" label="民族">
				</el-table-column>
				<el-table-column prop="ID_card_number" label="身份证号">
				</el-table-column>
				<el-table-column prop="home_address" label="住址">
				</el-table-column>
				<el-table-column prop="phone" label="电话"> </el-table-column>
				<el-table-column label="操作" width="180px">
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
		<!-- 添加老人信息提示框 -->
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
				<el-form-item label="姓名" prop="rel_name">
					<el-input v-model="addForm.rel_name"></el-input>
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
				<el-form-item label="民族" prop="national">
					<el-select v-model="addForm.national" placeholder="请选择">
						<el-option
							v-for="item in NationalOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号" prop="ID_card_number">
					<el-input v-model="addForm.ID_card_number"></el-input>
				</el-form-item>
				<el-form-item label="家庭住址" prop="home_address">
					<el-input v-model="addForm.home_address"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOldMan">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改老人信息提示框 -->
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
				<el-form-item label="姓名" prop="rel_name">
					<el-input v-model="editForm.rel_name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="male">
					<el-select v-model="editForm.male" placeholder="请选择">
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
				<el-form-item label="民族" prop="national">
					<el-select
						v-model="editForm.national"
						placeholder="请选择"
						disabled
					>
						<el-option
							v-for="item in NationalOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号" prop="ID_card_number">
					<el-input
						v-model="editForm.ID_card_number"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="家庭住址" prop="home_address">
					<el-input v-model="editForm.home_address"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editOldMan">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import nationals from '../assets/national.json'
export default {
	created() {
		this.getOldManList()
	},
	data() {
		return {
			oldManInfoData: [],
			queryInfo: {
				query: '',
			},
			addDialogVisible: false,
			editDialogVisible: false,
			addForm: {
				rel_name: '',
				male: '',
				age: '',
				national: '',
				ID_card_number: '',
				home_address: '',
				phone: '',
			},
			addRules: {
				rel_name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				male: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
				],
				age: [
					{ required: true, message: '请输入年龄', trigger: 'blur' },
				],
				ID_card_number: [
					{
						required: true,
						message: '请选择民族',
						trigger: 'blur',
					},
					{
						min: 18,
						max: 18,
						message: '请输入正确的身份证号',
						trigger: blur,
					},
				],
				home_address: [
					{
						required: true,
						message: '请输入家庭住址',
						trigger: 'blur',
					},
				],
				phone: [
					{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur',
					},
				],
			},
			editRules: {
				rel_name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				male: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
				],
				age: [
					{ required: true, message: '请输入年龄', trigger: 'blur' },
				],
				ID_card_number: [
					{
						required: true,
						message: '请选择民族',
						trigger: 'blur',
					},
					{
						min: 18,
						max: 18,
						message: '请输入正确的身份证号',
						trigger: blur,
					},
				],
				home_address: [
					{
						required: true,
						message: '请输入家庭住址',
						trigger: 'blur',
					},
				],
				phone: [
					{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur',
					},
				],
			},
			editForm: {},
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
			NationalOptions: nationals.data,
		}
	},
	methods: {
		async getOldManList() {
			const { data: res } = await this.$http.get('oldman/list')
			console.log(res)
			if (res.meta.status !== 200)
				return this.$message.error('获取用户列表失败')
			this.oldManInfoData = res.data
		},
		addOldMan() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'oldman/add',
					this.addForm
				)
				console.log(res)
				if (res.meta.status !== 200)
					return this.$message.error('添加老人失败')
				this.$message.success('添加成功')
				this.addDialogVisible = false
				this.getOldManList()
			})
		},
		addDialogClose() {
			this.$refs.addFormRef.resetFields()
		},
		showEditDialog(info) {
			this.editForm = info
			this.editDialogVisible = true
		},
		editOldMan() {
			console.log(this.editForm)
			this.$refs.editFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.put(
					'oldman/' + this.editForm._id,
					this.editForm
				)
				console.log(res)
				if (res.meta.status !== 200)
					return this.$message.error('修改失败')
				this.$message.success('修改成功')
				this.editDialogVisible = false
				this.getOldManList()
			})
		},
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
			const { data: res } = await this.$http.delete('oldman/' + id)
			if (res.meta.status !== 200) {
				return this.$message.error('删除用户失败')
			}
			this.getOldManList()
			this.$message.success('删除用户成功')
		},
		async search() {
			const { data: res } = await this.$http.get('oldman/sreach', {
				params: { sreachKey: this.queryInfo.query },
			})
			if (res.meta.status !== 200) return this.$message.error('查询失败')
			this.oldManInfoData = res.data
			this.$message.success('查询成功')
		},
	},
}
</script>
<style lang="less" scoped></style>
