import Vue from 'vue'
import Router from 'vue-router'
import OrderManage from '@/components/OrderManage'
// import CheckRule from '@/components/ruleManage/CheckRule'
// import AccountRule from '@/components/ruleManage/AccountRule'
import CheckRuleCorrect from '@/components/ruleManage/CheckRuleCorrect'
// import AccountRuleCorrect from '@/components/ruleManage/AccountRuleCorrect'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
          path: '*',
          redirect: '/orderManage'
      },
      {
          path: '/checkRuleCorrect',
          component: CheckRuleCorrect
      },
      {
          path: '/orderManage',
          component: OrderManage
      },

  ]
})
