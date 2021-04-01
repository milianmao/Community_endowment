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
						></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="true"
						>添加商家信息</el-button
					>
				</el-col>
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
					<el-select v-model="addForm.service_type" placeholder="请选择">
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
	</div>
</template>
<script>
export default {
	created() {},
	data() {
		return {
			queryInfo: {
				query: '',
			},
			addDialogVisible: false,
			addForm: {
				name: '',
				address: '',
				phone: '',
				service_type: '',
			},
			addRules: {},
            options:
            [0]
		}
	},
	methods: {
		getSBList() {},
		search() {},
		addDialogClose() {},
		addSBInfo() {},
	},
}
</script>
