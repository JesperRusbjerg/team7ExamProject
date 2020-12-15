<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">{{ menuList.title }}</v-btn>
    </template>
    <v-list>
      <template v-for="(option, index) in menuList.options">
        <v-list-item :key="index">
          <v-btn text :to="option.to">{{ option.subTitle }}</v-btn>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "AppNavigation",
  props: {
    menuList: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
