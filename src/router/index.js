import Vue from 'vue'
import Router from 'vue-router'
import cart from '@/components/cart'
import products from '@/components/products'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
    	//显示[products组件]这个根目录就是网址[http://localhost:8080]
      path: '/',
      component: products
    },
    {
    	path: '/cart',
    	component: cart
    }
  ]
})
