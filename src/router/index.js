/*
 * @name: 
 * @param: 
 * @return: 
 */
/*
 * @name: 
 * @param: 
 * @return: 
 */
/*
 * @name: 
 * @param: 
 * @return: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/list',
    name: 'question-list',
    component: () => import('../views/question/list.vue')
  },
  {
    path: '/add',
    name: 'add-question',
    component: () => import('../views/question/add.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit-question',
    component: () => import('../views/question/edit.vue')
  },
  {
    path: '/question/:id',
    name: 'question-detail',
    component: () => import('../views/question/question.vue')
  },
  {
    path: '/learnEnglish',
    name: 'learn-english',
    component: () => import('../views/english/list.vue')
  },
  {
    path: '/addWord',
    name: 'add-word',
    component: () => import('../views/english/add.vue')
  },
  {
    path: '/studyPlan',
    name: 'study-plan',
    component: () => import('../views/plan/list.vue')
  },
  {
    path: '/addPlan',
    name: 'add-plan',
    component: () => import('../views/plan/add.vue')
  },
  {
    path: '/editPlan/:id',
    name: 'edit-plan',
    component: () => import('../views/plan/edit.vue')
  },
  {
    path: '/planDetail/:id',
    name: 'plan-detail',
    component: () => import('../views/plan/detail.vue')
  },
  {
    path: '/user',
    name: 'user-center',
    component: () => import('../views/user.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
