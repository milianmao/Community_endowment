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
									<el-form>
										<el-form-item>
											<el-cascader
												placeholder="请选择服务类型"
												v-model="value"
												:options="options"
												:props="{
													expandTrigger: 'hover',
												}"
												@change="handleChange"
											></el-cascader>
										</el-form-item>
										<el-form-item label="备注：">
											<el-input
												:rows="8"
												type="textarea"
												placeholder="请输入内容"
												v-model="textarea"
											>
											</el-input>
										</el-form-item>
									</el-form>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-card class="feedback-card">
							<div slot="header" class="clearfix">
								<span>反馈栏</span>
							</div>
							<div>
								<el-form>
									<el-form-item>
										<el-cascader
											placeholder="请选择反馈类型"
											v-model="value"
											:options="options1"
											@change="handleChange"
										></el-cascader>
									</el-form-item>
									<el-form-item label="备注：">
										<el-input
											:rows="8"
											type="textarea"
											placeholder="请输入内容"
											v-model="textarea"
										>
										</el-input>
									</el-form-item>
								</el-form>
							</div>
						</el-card>
					</el-col>
				</el-row>
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
export default {
	components: {
		Nav,
	},
	created() {
		this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
		console.log(this.userInfo)
		this.getBoardInfo()
	},
	data() {
		return {
			userInfo: [],
			value: [],
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
					value: '0',
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
		}
	},
	methods: {
		async getBoardInfo() {
			const { data: res } = await this.$http.get('/activity')
			if (res.meta.status !== 200) return this.$message.error('获取失败')
			res.data.forEach((item) => {
				if (this.boardInfo.length <= 4 && item.act_status === 0) {
					this.boardInfo.push(item)
				}
			})
			console.log(this.boardInfo)
		},
		handleChange() {},
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
.el-from {
}
</style>
