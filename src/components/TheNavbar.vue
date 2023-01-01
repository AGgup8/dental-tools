<template>
  <div class="nav navrail">
    <router-link class="nav-item" to="/charting">
      <div class="nav-icon-frame">
        <img class="nav-icon" src="../assets/images/charting-icon.svg" />
      </div>
      <p class="nav-text">Charting</p>
    </router-link>

    <router-link class="nav-item" to="/plaque">
      <div class="nav-icon-frame">
        <img class="nav-icon" src="../assets/images/plaque-icon.svg" />
      </div>
      <p class="nav-text">Plaque</p>
    </router-link>

    <router-link class="nav-item" to="/bleeding">
      <div class="nav-icon-frame">
        <img class="nav-icon" src="../assets/images/bleeding-icon.svg" />
      </div>
      <p class="nav-text">Bleeding</p>
    </router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 5em;
  padding: 0.5em;

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

.router-link-active.nav-item .nav-icon-frame {
  background-color: var(--color-secondary-container);
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
