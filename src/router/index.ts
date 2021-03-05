import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Landing from '../views/Landing.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/list/new',
    name: 'NewList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/list/NewList.vue' )
  },
  {
    path: '/list/:id',
    name: 'ListDetail',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/list/ListDetail.vue' )
  },
  {
    path: '/list/edit/:id',
    name: 'ListEdit',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/list/EditList.vue' )
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes
} )

export default router
