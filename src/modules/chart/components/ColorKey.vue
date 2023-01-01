<template>
  <div id="key">
    <div class="color-box amalgam-fill"></div>
    <p>Amalgam</p>
    <div class="color-box caries-fill"></div>
    <p>Caries</p>
    <div class="color-box composite-fill"></div>
    <p>Composite</p>
    <div class="color-box gic-fill"></div>
    <p>GIC</p>
    <div class="color-box temporary-fill"></div>
    <p>Temporary</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#key {
  display: flex;
  align-items: center;
  padding: 1em;
  border-radius: var(--border-radius-medium);
  background-color: var(--color-surface-el-2);
  margin-top: 2em;

  p {
    margin: auto 0;
    font-size: 0.9em;

    @media only screen and (min-width: 768px) {
      font-size: 1em;
    }
  }
}

#key p {
  font: var(--label-large);
  margin: auto 0;
  vertical-align: middle;

  @media only screen and (max-width: 992px) {
    font: var(--label-medium);
  }
}

.color-box {
  height: 1em;
  width: 1em;
  margin-right: 0.5em;
  border: 1px solid var(--color-outline);

  &:not(:first-child) {
    margin-left: 2em;
  }
}

.color-box.caries-fill {
  background-color: #c0504d;
}

.color-box.amalgam-fill {
  background-color: #a6a6a6;
}
.color-box.composite-fill {
  background-color: #ffff00;
}

.color-box.gic-fill {
  background-color: #92d050;
}

.color-box.temporary-fill {
  background-color: #7030a0;
}
</style>
