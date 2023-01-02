<template>
  <div class="nav navbar">
    <router-link class="nav-item" to="/charting" v-slot="{ isActive }">
      <div class="nav-icon-frame">
        <IconNotebook v-if="isActive" class="nav-icon" />
        <IconNotebookOutline v-else class="nav-icon" />
      </div>
      <p class="nav-text">Charting</p>
    </router-link>

    <router-link class="nav-item" to="/plaque" v-slot="{ isActive }">
      <div class="nav-icon-frame">
        <IconBacteria v-if="isActive" class="nav-icon" />
        <IconBacteriaOutline v-else class="nav-icon" />
      </div>
      <p class="nav-text">Plaque</p>
    </router-link>

    <router-link class="nav-item" to="/bleeding" v-slot="{ isActive }">
      <div class="nav-icon-frame">
        <IconWater v-if="isActive" class="nav-icon" />
        <IconWaterOutline v-else class="nav-icon" />
      </div>
      <p class="nav-text">Bleeding</p>
    </router-link>
  </div>
</template>

<script setup>
import {
  IconBacteria,
  IconBacteriaOutline,
  IconNotebook,
  IconNotebookOutline,
  IconWater,
  IconWaterOutline,
} from "@iconify-prerendered/vue-mdi";
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5em;
  padding: 0.25em;

  @media only screen and (min-width: 992px) {
    width: 5.5em;
  }

  &.navbar {
    background-color: var(--color-surface-el-2);
  }

  &.navrail {
    background-color: var(--color-bg);
  }
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.75em 0;
}

.router-link-active.nav-item {
  .nav-icon-frame {
    background-color: var(--color-secondary-container);
  }

  .nav-icon {
    color: var(--color-on-secondary-container);
  }
}

.navrail,
.navbar {
  .nav-item.router-link-active:hover {
    .nav-icon-frame {
      background-color: #cdd2e8;
    }
  }
}

.nav-icon-frame {
  display: flex;
  padding: 0.3em 1em;
  margin-bottom: 0.1em;
  border-radius: var(--border-radius-full);
  transition: var(--transition-standard-short);
}

.nav-icon {
  width: 1.5em;
  height: auto;
  color: var(--color-on-surface-variant);
}

.navbar .nav-item:hover {
  .nav-icon-frame {
    background-color: #e0e1ea;
  }
}

.navrail .nav-item:hover {
  .nav-icon-frame {
    background-color: #f0f0f1;
  }
}

.router-link-active .nav-text {
  color: var(--color-on-surface);
}

.nav-text {
  color: var(--color-on-surface-variant);
  font: var(--label-medium);
  text-align: center;
}
</style>
