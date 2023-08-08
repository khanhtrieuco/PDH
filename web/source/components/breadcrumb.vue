<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <slot name="name" />
    </ol>
  </nav>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
ol {
  margin: 0px;
  padding-left: 0px;
}
.breadcrumb {
  background-color: transparent;
  padding: 0rem 0rem 0rem 0rem;
  white-space: nowrap;
  margin-top: 1rem;
}
.breadcrumb-item {
  line-height: 1;
  a {
    font-weight: 600;
    font-size: 1rem;
    color: #231F20;
  }
  &.active {
    font-size: 1rem;
    color: #231F20;
  }
}
.breadcrumb-h1 {
  font-size: 1rem;
  margin-bottom: 0rem;
  line-height: 1;
}
</style>