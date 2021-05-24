<template>
  <div class="container-fluid ">
  	<div class="navbar navbar-inverse">
  		<!--<a class="navbar-brand" href="/">商店商品</a>-->
  		<!--传统 a 标签只有跳转功能，router-link 标签既有跳转功能也有传输数据功能-->
  		<router-link class="navbar-brand" to="/">商店商品</router-link>
  		<div class="navbar-right">
  			<div class="navbar-text">
  				<b>你的购物车</b>
  					{{ sum }}件，￥{{ total }}.00元
  			</div>
  			<!--<a href="/cart" class="btn btn-default navbar-btn">购物车</a>-->
  			<!--传统 a 标签只有跳转功能，router-link 标签既有跳转功能也有传输数据功能-->
  			<router-link to="/cart" class="btn btn-default navbar-btn">购物车</router-link>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  //计算属性中的方法可直接用于template模板中的{{}}中，会进行【双向关联】
  computed: {
  	//计算属性里面的方法
  	sum() {
  		//访问Store对象方法，计算总商品总数
  		return this.$store.getters.sum;
  	},
  	//计算总金额
  	total() {
  		return this.$store.getters.total;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
.navbar-right {
	float: right !important;
	margin-right: 5px;
}
.navbar-text {
	margin-right: 10px;
}
</style>
