import Vue from 'vue'
import Vuex from 'vuex'

//注册了vuex，然后就可以在任何一个组件中使用this.$store
Vue.use(Vuex)

//数据	Model 状态
const state = {
	//【用于存储货物成品的数组】即【购物车数组】
	//products刚开始的时候，购物车是空的，所以products数组也应该是空的
	products: [
//		{
//			name: 'xx',
//			price: 'aa',
//			id: 'yy',
//			count: 1
//		}
	]
}
//同步	使用commit可以触发mutations中的方法
const mutations = {
	//添加到购物车功能
	ADD_STORE(state, item) {
		//准备一个商品模型
		var product = {
			name: item.name,
			price: item.price,
			id: item.id,
			count:1
		}
		//先拿到products数组
		var products = state.products
		//如果products数组的长度为0
		if(products.length == 0) {
			//则将products数组货物压到products数组中
			products.push(product);
			return;
		}
		//遍历products数组
		for(var i = 0; i < products.length; i++) {
			//如果中数组中已经有一个元素与想添加的物品的id相同
			//则将对应的产品的count++即可(说明该商品已经存在，不需要往数组中添加了)
			if(products[i].id == product.id) {
				products[i].count++;
				return;
			}
		}
		//默认是往products数组中添加产品product
		products.push(product);
	},
	//数目减少的功能
	DOWN(state, item){
		//如果产品的count为1的时候，就不然继续减少，因为减少就是0了，相当于删除了
		if(item.count == 1) {
			return;
		}
		var products = state.products;
		for(var i=0; i<products.length; i++) {
			if(products[i].id == item.id){
				//数目减少
				products[i].count--;
			}
		}
	},
	//数目增加的功能
	ADD(state, item){
		var products = state.products;
		for(var i=0; i<products.length; i++) {
			if(products[i].id == item.id){
				//数目增加
				products[i].count++;
			}
		}
	},
	//删除一个货物的功能
	DEL(state, item){
		var products = state.products;
		//遍历该购物车全部货物
		for(var i=0; i<products.length; i++) {
			//如果想要删除的产品的id 和购物车中的产品id相同，则删除
			if(products[i].id == item.id) {
				//【splice方法】从下标i处删除，删除1个元素
				products.splice(i, 1);
			}
		}
	}
}
//异步
const actions = {}
//计算属性(这是vuex的计算属性)
const getters = {
	//vuex中计算商品总数的计算属性
	sum(state) {
		//result代表商品总数
		var result = 0;
		//购物车中的商品总数
		var products = state.products;
		//遍历商品数组
		for(var i = 0; i < products.length; i++) {
			//计算商品总数
			//等价于 result = result + products[i].count
			result += Number(products[i].count);
		}  
		return result;
	},
	//返回购物车商品数组的方法
	products(state) {
		return state.products;
	},
	//计算总金额
	total(state) {
		//result代表总金额
		var result = 0;
		//直接使用products代表购物车中的products数组
		var products = state.products;
		//遍历products数组
		for(var i = 0; i < products.length; i++) {
			//总金额 += 商品数量 * 商品的价格
			result += products[i].count * products[i].price;
		}
		return result;
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
