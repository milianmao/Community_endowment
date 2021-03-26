<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }"
				>首页</el-breadcrumb-item
			>
			<el-breadcrumb-item>活动信息档案</el-breadcrumb-item>
			<el-breadcrumb-item>编辑活动信息</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<!-- 提示区域 -->
			<el-alert
				title="添加活动信息"
				type="info"
				center
				show-icon
				:closable="false"
			>
			</el-alert>
			<!-- 步骤条区域 -->
			<el-steps
				:space="200"
				:active="activeIndex - 0"
				finish-status="success"
				align-center
			>
				<el-step title="基本信息"></el-step>
				<el-step title="活动内容"></el-step>
				<el-step title="活动图片"></el-step>
				<el-step title="活动人员"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<el-form
				:model="addForm"
				:rules="addFormRules"
				ref="addFormRef"
				label-width="100px"
				label-position="top"
			>
				<el-tabs
					v-model="activeIndex"
					:tab-position="'left'"
					:before-leave="beforeTabLeave"
				>
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="活动名称" prop="act_name">
							<el-input v-model="addForm.act_name"></el-input>
						</el-form-item>
						<el-form-item label="活动时间" prop="act_time">
							<el-date-picker
								v-model="addForm.act_time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="活动地点" prop="act_address">
							<el-input v-model="addForm.act_address"></el-input>
						</el-form-item>
						<el-form-item label="活动状态" prop="act_status">
							<el-select
								v-model="addForm.act_status"
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
					</el-tab-pane>
					<el-tab-pane label="活动内容" name="1">
						<quill-editor
							v-model="addForm.act_des"
							ref="qeditor"
						></quill-editor>
					</el-tab-pane>
					<el-tab-pane label="活动图片" name="2">
						<!-- 图片 -->
						<template>
							<el-row :gutter="16">
								<el-col
									:span="4"
									:key="index"
									v-for="(item, index) in addForm.act_pics"
								>
									<div>
										<div @click="hanleClick(index)"></div>
										<img :src="item.act_pic" />
									</div>
								</el-col>
							</el-row>
						</template>
						<el-upload
							:action="uploadURL"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							list-type="picture"
							:headers="headerObj"
							:on-success="handleSuccess"
						>
							<el-button size="small" type="primary"
								>点击上传</el-button
							>
						</el-upload>
					</el-tab-pane>
					<el-tab-pane label="活动人员" name="3">
						<el-form-item label="主负责人" prop="act_main">
							<el-input v-model="act_main"></el-input>
						</el-form-item>
						<el-form-item label="工作人员" prop="act_secondary">
							<el-input v-model="act_secondary"></el-input>
						</el-form-item>
						<el-button
							type="primary"
							class="btnAdd"
							@click="add"
							v-show="mode"
						>
							确认
						</el-button>
						<el-button
							type="primary"
							class="btnEdit"
							@click="eidt"
							v-show="!mode"
						>
							确认
						</el-button>
					</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-card>
		<!-- 图片预览 -->
		<el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
			<img :src="previewPath" alt="" class="previewImg" />
		</el-dialog>
	</div>
</template>
<script>
import _ from 'lodash'
export default {
	created() {
		// 判断当前是否为编辑模式
		if (this.$route.params.id === undefined) {
			this.mode = true
		} else {
			this.getActivityInfo(this.$route.params.id)
		}
	},
	data() {
		return {
			mode: '',
			activeIndex: '0',
			addForm: {
				act_name: '',
				act_time: '',
				act_address: '',
				act_status: '',
				act_des: '',
				act_pics: [],
				act_organizers: [],
			},
			act_main: '',
			act_secondary: '',
			addFormRules: {
				act_name: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur',
					},
				],
				act_time: [
					{
						required: true,
						message: '请选择活动时间',
						trigger: 'blur',
					},
				],
				act_address: [
					{
						required: true,
						message: '请输入活动地点',
						trigger: 'blur',
					},
				],
				act_status: [
					{
						required: true,
						message: '请输入活动状态',
						trigger: 'blur',
					},
				],
			},
			options: [
				{
					value: 0,
					label: '预活动',
				},
				{
					value: 1,
					label: '过期活动',
				},
			],
			uploadURL: 'http://127.0.0.1:3000/api/private/v1/upload',
			// 图片上传组件的headers请求头对象
			headerObj: {
				Authorization: window.sessionStorage.getItem('token'),
			},
			previewPath: '',
			previewVisible: false,
			validation: false,
		}
	},
	methods: {
		async getActivityInfo(id) {
			const { data: res } = await this.$http.get('activity/find/' + id)
			this.addForm = res.data
			this.act_main = res.data.act_organizers[0].act_main
			this.act_secondary = res.data.act_organizers[0].act_secondary
			console.log(this.addForm)
		},
		// tabs判断是否切换下一页
		beforeTabLeave(activeName, oldActiveName) {
			this.$refs.addFormRef.validate((valid) => {
				if (!valid) {
					this.validation = true
					return
				}
			})
			console.log(this.validation)
			if (oldActiveName === '0' && this.validation) {
				this.$message.error('请填写基本信息')
				this.validation = false
				return false
			}
		},
		// 处理图片预览效果
		handlePreview(file) {
			console.log(file)
			this.previewPath = file.response.data.url
			this.previewVisible = true
		},
		// 处理移除图片的操作
		handleRemove(file) {
			// 1. 获取将要删除的图片的临时路径
			const filePath = file.response.data.tmp_path
			// 2. 从 pics 数组中，找到这个图片对应的索引值
			const i = this.addForm.act_pic.findIndex((x) => x.pic === filePath)
			// 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
			this.addForm.act_pic.splice(i, 1)
			console.log(this.addForm)
		},
		// 监听图片上传成功的事件
		handleSuccess(response) {
			const picInfo = { act_pic: response.data.tmp_path }
			console.log(response.data.url)
			this.addForm.act_pics.push(picInfo)
			console.log(this.addForm)
		},
		// 处理数据
		ProcessData() {
			// 处理数据
			const form = _.cloneDeep(this.addForm)
			const organizers = {
				act_main: this.act_main,
				act_secondary: this.act_secondary,
			}
			form.act_organizers[0] = organizers
			return form
		},
		add() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post(
					'/activity',
					this.ProcessData()
				)
				if (res.meta.status !== 201)
					return this.$message.error('添加活动信息失败！')
				this.$message.success('添加活动信息成功！')
				this.$router.push('/ActivityInfo')
			})
		},
		eidt() {
			let id = this.$route.params.id

			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.put(
					'/activity/' + id,
					this.ProcessData()
				)
				if (res.meta.status !== 200)
					return this.$message.error('修改活动信息失败！')
				this.$message.success('修改活动信息成功！')
				this.$router.push('/ActivityInfo')
			})
		},
	},
}
</script>
<style lang="less" scoped>
.el-steps {
	margin: 15px auto;
}
.el-step__title {
	font-size: 13px;
}
/deep/.ql-container {
	min-height: 300px;
}
.previewImg {
	width: 100%;
}
.btnAdd {
	margin-top: 15px;
}
</style>
