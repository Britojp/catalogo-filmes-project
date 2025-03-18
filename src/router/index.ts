/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import Index from '@/pages/index.vue';
import Films from '@/pages/films.vue';
import Series from '@/pages/series.vue';
import Liked from '@/pages/liked.vue';
import MoreDetails from '@/pages/moreDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes, 
    {
      path: '/moreDetails/:id', 
      name: 'moreDetails',
      component: MoreDetails,
    },
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/films',
      name: 'films',
      component: Films,
    }, 
    {
      path: '/series',
      name: 'series',
      component: Series,
    },
    {
      path: '/liked',
      name: 'liked',
      component: Liked,
    },
  ],
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
