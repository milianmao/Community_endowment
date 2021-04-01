<template>
	<el-container>
		<el-header><Nav :userInfo="userInfo"/></el-header>
		<el-scrollbar>
			<el-main>
				<el-row>
					<el-col>
						<div class="topImg"></div>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<!-- 轮播图 -->
						<div class="shuffling">
							<el-carousel :interval="5000" arrow="always">
								<el-carousel-item
									v-for="item in imges"
									:key="item.url"
								>
									<el-image
										style="width: 100%; height: 100%"
										:src="item.url"
										fit="cover"
									></el-image>
								</el-carousel-item>
							</el-carousel>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="board">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span class="boardspan">公示板</span>
								</div>
								<div
									v-for="item in boardInfo"
									:key="item._id"
									class="board-main"
								>
									<div>
										<span>{{ item.act_name }}</span>
										<div class="des">
											{{ item.act_des | describe }}
										</div>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<!-- 活动展示区域？ -->
				</el-row>
				<!-- 帮助区域 -->
				<el-row>
					<el-col>
						<div>
							<el-card class="help-card">
								<div slot="header" class="clearfix">
									<span>帮助栏</span>
								</div>
								<div>
									<el-form
										ref="helpFormRef"
										:model="helpForm"
										label-width="80px"
										:rules="helpFormRules"
									>
										<el-form-item
											prop="service"
											label="服务类型"
										>
											<el-cascader
												filterable
												v-model="helpForm.service"
												placeholder="请选择服务类型"
												:options="options"
												:props="{
													expandTrigger: 'hover',
												}"
												@change="handleChange"
											></el-cascader>
										</el-form-item>
										<el-form-item>
											<el-input
												placeholder="请输入家庭住址"
												v-model="helpForm.address"
											></el-input>
										</el-form-item>
										<el-form-item
											label="备注："
											prop="note
                                            "
										>
											<el-input
												:rows="8"
												type="textarea"
												placeholder="请输入内容"
												v-model="helpForm.note"
											>
											</el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="info" @click="help"
												>提交</el-button
											>
										</el-form-item>
									</el-form>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
				<!-- 反馈投诉区域 -->
				<el-row>
					<el-col>
						<el-card class="feedback-card">
							<div slot="header" class="clearfix">
								<span>反馈栏</span>
							</div>
							<div>
								<el-form
									ref="fbFormRef"
									:model="fbForm"
									label-width="80px"
									:rules="fbFormRules"
								>
									<el-form-item
										label="反馈类型"
										prop="service"
									>
										<el-cascader
											v-model="fbForm.service"
											placeholder="请选择反馈类型"
											:options="options1"
											@change="handleChange"
										></el-cascader>
									</el-form-item>
									<el-form-item label="备注：" prop="note">
										<el-input
											:rows="8"
											type="textarea"
											placeholder="请输入内容"
											v-model="fbForm.note"
										>
										</el-input>
									</el-form-item>
									<el-form-item>
										<el-button type="info" @click="feedback"
											>提交</el-button
										>
									</el-form-item>
								</el-form>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<!-- 完善信息区域 -->
				<el-dialog
					title="完善信息"
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
						label-width="80px"
					>
						<el-form-item label="姓名" prop="rel_name">
							<el-input
								v-model="this.userInfo.rel_name"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="male">
							<el-select
								v-model="addForm.male"
								placeholder="请选择"
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
							<el-input v-model="addForm.age"></el-input>
						</el-form-item>
						<el-form-item label="民族" prop="national">
							<el-select
								v-model="addForm.national"
								placeholder="请选择"
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
								v-model="this.userInfo.ID_card_number"
								disabled
							></el-input>
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
						<el-button @click="addDialogVisible = false"
							>取 消</el-button
						>
						<el-button type="primary" @click="addOldMan"
							>确 定</el-button
						>
					</span>
				</el-dialog>
			</el-main>
		</el-scrollbar>
	</el-container>
</template>
<script>
import Nav from '@/components/userhome/Nav'
import img1 from '../assets/png/1.jpg'
import img2 from '../assets/png/2.jpg'
import img3 from '../assets/png/3.png'
import img4 from '../assets/png/4.jpg'
import nationals from '../assets/national.json'
export default {
	components: {
		Nav,
	},
	created() {
		this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))

		this.getBoardInfo()
		this.getOldManInfo()
	},
	data() {
		return {
			addForm: {
				rel_name: '',
				male: '',
				age: '',
				national: '',
				ID_card_number: '',
				home_address: '',
				phone: '',
			},
			fbForm: {
				service: '',
				note: '',
			},
			addDialogVisible: false,
			infoStatus: false,
			userInfo: [],
			value: [],
			helpForm: {
				service: '',
				address: '',
				note: '',
			},
			fbFormRules: {
				service: [
					{
						type: 'array',
						required: true,
						message: '请选择反馈类型',
						trigger: 'change',
					},
				],
				note: [
					{
						required: true,
						message: '请填写意见',
						trigger: 'blur',
					},
				],
			},
			helpFormRules: {
				service: [
					{
						type: 'array',
						required: true,
						message: '请选择服务类型',
						trigger: 'change',
					},
				],
			},
			addRules: {
				male: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
				],
				age: [
					{ required: true, message: '请输入年龄', trigger: 'blur' },
				],
				national: [
					{
						required: true,
						message: '请选择民族',
						trigger: 'blur',
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
			imges: [
				{ id: '1', url: img1 },
				{ id: '2', url: img2 },
				{ id: '3', url: img3 },
				{ id: '4', url: img4 },
			],
			options: [
				{
					value: '0',
					label: '日常需求',
					children: [
						{
							value: '食品采购',
							label: '食品采购',
						},
						{
							value: '电器维修',
							label: '电器维修',
						},
						{
							value: '户外运动',
							label: '户外运动',
						},
					],
				},
				{
					value: '1',
					label: '药品需求',
				},
				{
					value: '2',
					label: '社会保障查询',
				},
			],
			textarea: '',
			options1: [
				{
					value: '3',
					label: '投诉',
				},
				{
					value: '4',
					label: '建议',
				},
			],
			boardInfo: [],
			NationalOptions: nationals.data,
		}
	},
	methods: {
		// 获取信息是否完整
		async getOldManInfo() {
			console.log(this.userInfo.ID_card_number)
			const { data: res } = await this.$http.get('oldman/sreach', {
				params: { sreachKey: this.userInfo.ID_card_number },
			})
			console.log(res)
			if (res.meta.status !== 200) {
				return
			}
			this.helpForm.address = res.data[0].home_address
			this.infoStatus = true
		},
		async getBoardInfo() {
			const { data: res } = await this.$http.get('/activity')
			if (res.meta.status !== 200) return this.$message.error('获取失败')
			res.data.forEach((item) => {
				if (this.boardInfo.length <= 4 && item.act_status === 0) {
					this.boardInfo.push(item)
				}
			})
		},
		handleChange(value) {
			console.log(value)
		},
		addOldMan() {
			this.$refs.addFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post('oldman/add', {
					rel_name: this.userInfo.rel_name,
					male: this.addForm.male,
					age: this.addForm.age,
					national: this.addForm.national,
					ID_card_number: this.userInfo.ID_card_number,
					home_address: this.addForm.home_address,
					phone: this.addForm.phone,
				})
				console.log(res)
				if (res.meta.status !== 201)
					return this.$message.error('完善信息失败')
				this.$message.success('完善成功')
				this.addDialogVisible = false
				this.$router.push('/userhome')
			})
		},
		addDialogClose() {
			this.$refs.addFormRef.resetFields()
		},
		help() {
			this.$refs.helpFormRef.validate(async (valid) => {
				if (!valid) return
				// 核对信息是否完善
				if (!this.infoStatus) {
					this.$message.error('请完善基本信息')
					this.addDialogVisible = true
				}
				console.log(this.helpForm)
				const { data: res } = await this.$http.post('/order', {
					real_name: this.userInfo.rel_name,
					home_address: this.helpForm.address,
					post_type: this.helpForm.service[0],
					msg_main: this.helpForm.service[1] || null,
					msg_note: this.helpForm.note,
				})
				if (res.meta.status !== 201) {
					return this.$message.error('请求失败')
				}
				this.$message.success('请求成功')
				this.helpForm = {
					service: '',
					address: '',
					note: '',
				}
			})
		},
		feedback() {
			this.$refs.fbFormRef.validate(async (valid) => {
				if (!valid) return
				const { data: res } = await this.$http.post('/order', {
					real_name: '匿名' || this.userInfo.rel_name,
					home_address: 'null',
					post_type: this.fbForm.service[0],
					msg_main: this.fbForm.service[1] || null,
					msg_note: this.fbForm.note,
				})
				console.log(res)
				if (res.meta.status !== 201)
					return this.$message.error(res.meta.msg)
				this.$message.success(res.meta.msg + '感谢您的反馈')
				this.fbForm.service = ''
				this.fbForm.note = ''
			})
		},
	},
}
</script>
<style lang="less" scoped>
.el-container {
	height: 100%;
	background-color: #fdfcf8 !important;
}
.el-header {
	width: 100%;
	padding: 0;
}
.el-main {
	width: 50%;
	height: 100%;
	position: relative;
	margin: 0 auto;
	padding-top: 0;
}
.shuffling {
	margin: 0 auto;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
.topImg {
	width: 100%;
	height: 250px;
	background: url(../assets/png/topimg.jpg) no-repeat;
	background-position: center;
	background-size: 100% 100%;
}
.el-row {
	margin-bottom: 20px;
}
.board {
	height: 100%;
	width: 100%;
	background-color: blue;
}
.box-card {
	width: 100%;
	height: 298px;
	.boardspan {
		display: block;
		text-align: center;
	}
	/deep/ .el-card__body {
		padding: 0;
	}
}

.board-main {
	width: 100%;
	span {
		display: block;
		color: #1260b3;
		font-size: 18px;
		margin-bottom: 5px;
	}
	:nth-child(1) {
		margin-top: 5px;
	}
	> div {
		margin-left: 20px;
		margin-bottom: 10px;
	}
	.des {
		font-size: 10px;
	}
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: '';
}
.clearfix:after {
	clear: both;
}
/deep/.el-scrollbar__wrap {
	overflow-x: hidden !important;
}
.help-card {
	width: 100%;
	height: 500px;
	span {
		display: block;
		text-align: center;
	}
}
.feedback-card {
	width: 100%;
	height: 500px;
	span {
		display: block;
		text-align: center;
	}
}
</style>
