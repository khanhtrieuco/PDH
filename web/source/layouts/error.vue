
<template>
  <section>
    <div>
      <div class="text-center d-flex align-items-center justify-content-center">
          <h3>
            {{
              this.error.statusCode === 404
                ? "Xin lỗi, trang bạn đang tìm kiếm không tồn tại!"
                : "Có lỗi xảy ra, vui lòng thử lại"
            }}
          </h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["error"]
}
</script>
<style lang="scss" scoped>
.text-center{
  width: 100%;
  height: 100vh;
}
</style>
