import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AgentsView from "@/views/AgentsView.vue";
import AccountSetupView from "@/views/AccountSetupView.vue";
import AgentInfoView from "@/views/AgentInfoView.vue";
import VaultInfoView from "@/views/VaultInfoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/agents",
      name: "agents",
      component: AgentsView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountSetupView,
    },
    {
      path: "/vaults/:id",
      name: "home-vault",
      component: VaultInfoView,
    },
    {
      path: "/agents/:id",
      name: "agents-agent",
      component: AgentInfoView,
    },
  ],
});

export default router;
