import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
	Tabs,
	TabPane,
	Button,
	Form,
	FormItem,
	Input,
	Message,
	Container,
	Header,
	Aside,
	Main,
	Menu,
	MenuItem,
	Submenu,
	Breadcrumb,
	BreadcrumbItem,
	Table,
	TableColumn,
	Card,
	Col,
	Row,
	Dialog,
	Select,
	Option,
	MessageBox,
	Step,
	Steps,
	Alert,
	DatePicker,
	Upload,
	Carousel,
	CarouselItem,
	Image,
} from 'element-ui'
Vue.use(Element)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Select)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Alert)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
