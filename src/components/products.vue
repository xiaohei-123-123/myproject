<template>
	<div class="container-fluid">
		<div class="panel panel-default row">
			<div class="col-xs-3">
				<a class="btn btn-block btn-default btn-lg" href="###"
					@click="changeCategory('all')"
					v-bind:class="{active: selectedCategory == null}">所有商品</a>
				<a class="btn btn-block btn-default btn-lg" href="###"
					v-for="(item,index) in categorys"
					@click="changeCategory(item)"
					v-bind:class="{active: item == selectedCategory}">{{ item }}</a>
			</div>
			<div class="col-xs-9">
				<div class="well" v-for="(item,index) in nowProducts">
					<h3>
						<strong>{{ item.name}}</strong>
						<span class="pull-right label label-primary">￥{{ item.price }}.00</span>
					</h3>
					<div class="description">
						<span class="lead">{{ item.description}}</span>
						<button class="btn btn-success pull-right"
							@click="addStore(item)">添加到购物车</button>
					</div>
				</div>
				<!--=================-->
				<div class="pull-right btn-group">
					<a class="btn btn-default"
						v-for="(item,index) in pageNum"
						v-bind:class="{'btn-primary': item == activePage}"
						@click="changePage(item)">{{ item }}</a>
				</div>
			</div>
		</div>
	</div>
</template>
	
<script type="text/javascript">
	//，每页显示多少个商品
	var pageSize=3;
export default{
	data(){
		return {
		//商品数组
		products: [],
		//表示当前选择的类型
		selectedCategory: null,
		//用来保持【当前选择的页面】默认为1
		activePage:1
		}
	},
	//组件的数据源
	created(){
		this.$http.get("/products").then(jsonData => {
			this.products = jsonData.body;
			console.log(this.products);
		})
	},
	// 函数(或者说方法)可以没有返回值，这是函数和计算属性最大的区别
	methods: {
		//改变商品【类别】其中参数category是表示类别的值
		changeCategory(category){
			//默认传入的是all，即没有分类
			if(category == 'all'){
				this.selectedCategory = null;
			}else{
				this.selectedCategory = category;
			}
			//改变分类之后，要对这个activePage进行初始化
			//在切换页面之后，其它分类如果没有那一页的话，则会显示空白
			this.activePage = 1;
		},
		//点击改变页面数
		changePage(newPage) {
			//传入的页page成为新的当前页
			this.activePage = newPage;
		},
		//添加item到【购物车数组】中去
		addStore(item) {
			//仅仅只是做一个调用	只是调用vuex中的mutations中的方法
			this.$store.commit("ADD_STORE", item);
		}
	},
	//计算属性
	computed: {
		//显示类别的属性
		categorys(){
			//这个数组用来存储左边的分类名目：水果类、蔬菜类、肉类
			var results = []
			//定义这个keys对象的目的是用于过滤掉已经存在的商品类型，使商品类型不重复
			var keys = {}
			//遍历全部商品的数据
			for (var i = 0; i < this.products.length; i++) {
				var category = this.products[i]["category"];
				//如果keys对象中的没有当前category所代表的商品类型
				if(!keys.hasOwnProperty(category)){
					//那么就为keys新增这个【当前category】所代表的商品类型作为“键”
					//新增这个属性后顺便给这个属性赋个值(赋什么值不重要)
					keys[category] = true;
					results.push(category);
				}
			}
			//返回一个分类的商品数组
			return results;
		},
		//用于【返回根据分类选择的商品列表】
		//这个数组的长度即【需要显示的商品的数量】
		productList(){
			//如果没有进行特别的选择
			if(this.selectedCategory == null){
				//返回products数组(含全部商品)
				return this.products;
			}else{
				/*
				 * 这里是对products数组进行过滤，传入的参数是item
				 * 即某一件商品；返回的是满足【this。selectedCategory == item.category】
				 * 条件的商品的数组。【注意】这里返回的仍然是数组this.products。只不过是
				 * 经过过滤把不符合条件的元素都过滤掉。filter()是个过滤器，这个过滤器能够
				 * 从products数组中一个一个地去拿掉数据，拿掉的元素我们用形参item去表示。
				 * 如果满足【this.selectedCategory == item。category】条件，就保留在数组
				 * this.products中，否则就过滤掉。可见返回的也是一个数组。
				 */
				return this.products.filter(item => 
					this.selectedCategory == item.category);
					/*
					 * 【注意】item => 
					 * this.selectedCategory == item.category 是一个拉姆达表达式，也叫
					 * 箭头函数。这里不能写成{this.selectedCategory == item.category }
					 * 形式。不能写大括号.
					 */
			}
		},
		//返回【当前页的商品列表】
		nowProducts() {
			var startProduct = (this.activePage - 1) * pageSize;
			//slice()方法可【从已有的数组中返回选定的元素】
			//返回的任然是个数组。因为slic（）函数的参数是从下表0开始的
			//所以startProduct就是新的页面的元素的开始元素（不需要+1或者-1）
			//slice（）函数的特征是前闭后开，所以不会取到下标的startProduct + pageSize的元素
			return this.productList.slice(startProduct, startProduct + pageSize);
		},
		//计算页码的功能    10 / 3 = 3 % 1
		pageNum(){
			return Math.ceil(this.productList.length / pageSize);
		}
	}
}
</script>

<style type="text/css">
	.active{
		background-color: cyan !important;
	}
</style>