<template>
  <div class="nav-layout">
    <TheNavbar />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <button
      id="privacy-policy-btn"
      class="btn btn-secondary"
      @click="showPrivacyModal = true"
    >
      <img src="./assets/images/gdpr.svg" />
    </button>
    <AppModal
      v-if="showPrivacyModal"
      :text-left="true"
      @outside-click="showPrivacyModal = false"
    >
      <template v-slot:header>
        <h2>Privacy Policy</h2>
      </template>
      <template v-slot:body>
        <h3>We don't collect any "personal data"</h3>
        <p>
          If patient data isn't collected, it can't be stolen, demanded, leaked
          or abused. All information is stored temporarily on your device and
          never leaves it.
        </p>
        <h3>How we define "personal data"</h3>
        <p>
          Our definition of "personal data" is based on the privacy laws and
          regulations of the EU, including the General Data Protection
          Regulation (GDPR). These are widely regarded as the strongest privacy
          protections in the world. We consider any information about you or
          your behaviour that can be traced back to you as personal data.
        </p>
        <h3>Information we don't collect</h3>
        <ul>
          <li>We don't record your IP address</li>
          <li>We do not track how you use our website</li>
          <li>We don’t serve any tracking or identifying cookies</li>
        </ul>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import AppModal from "./components/AppModal.vue";
import TheNavbar from "./components/TheNavbar.vue";

const showPrivacyModal = ref(false);
</script>

<style lang="scss" scoped>
.nav-layout {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: var(--grid-spacing);
  height: 100%;

  @media only screen and (max-width: 992px) {
    grid-template-columns: min-content min-content;
    grid-gap: var(--grid-spacing-small);
  }
}

#privacy-policy-btn {
  position: absolute;
  right: 5em;
  top: 3em;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 992px) {
    right: 2.5em;
    top: 1.5em;
  }
}
</style>
