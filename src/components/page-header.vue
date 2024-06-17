<template>
  <div
    class="page-header full-width d-flex justify-content-between align-items-center pl-4 pr-4"
  >
    <span class="text-white fs-3">T<span style="color: red" class="fs-3 fw-7">!</span>an</span>
    <ul class="list-style-none" id="pc-links">
      <li
        v-for="(item, index) in HEADER_LINKS"
        :key="index"
        class="d-inline-block"
      >
        <router-link
          :to="item.link"
          class="text-decoration-none text-white p-2"
          >{{ item.name }}</router-link
        >
      </li>
    </ul>
    <el-dropdown id="mobile-links">
      <span class="el-dropdown-link">
        <i class="el-icon-s-grid el-icon--right text-white"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in HEADER_LINKS" :key="index"
          ><router-link :to="item.link"
            >{{ item.name }}
          </router-link></el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
  
<script>
import { HEADER_LINKS } from "@/constants";
export default {
  name: "PageHeader",
  data() {
    return {
      HEADER_LINKS,
      activeIndex: "0",
    };
  },
  methods: {
    handleSelect(key) {
      if (key == this.activeIndex) return;
      this.activeIndex = key;
      this.$router.push(HEADER_LINKS[key].link);
    },
  },
};
</script>
  