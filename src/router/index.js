import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/bleeding",
      name: 'bleeding',
      component: () => import('../modules/plaque-bleeding-scores/BleedingScoreView.vue')
    },
    {
      path: "/plaque",
      name: 'plaque',
      component: () => import('../modules/plaque-bleeding-scores/PlaqueScoreView.vue')
    },
    {
      path: "/charting",
      name: 'charting',
      component: () => import('../modules/chart/ChartingView.vue')
    },
  ],
});

export default router;
