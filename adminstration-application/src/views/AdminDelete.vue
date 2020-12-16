<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12" max-height="550" min-height="500">
              <v-toolbar dark color="primary">
                <v-toolbar-title>List of Admins</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div>
                  <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    item-key="id"
                    class="elevation-1"
                    :search="search"
                    :custom-filter="customerFilter"
                    :loading="admins.length === 0"
                    loading-text="Loading... Please wait"
                    :footer-props="footerProps"
                  >
                    <template v-slot:top>
                      <v-text-field
                        v-model="search"
                        label="Search"
                        class="mx-4"
                      ></v-text-field>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        v-if="item.email !== null"
                        small
                        @click="deleteAdmin(item.email)"
                        >mdi-delete</v-icon
                      >
                    </template>
                  </v-data-table>
                  <v-alert
                    v-if="isAdminDeleted"
                    border="bottom"
                    dismissible
                    elevation="5"
                    type="success"
                    @click="closeAlert()"
                    >An admin has been deleted!
                  </v-alert>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AdminDelete",
  data() {
    return {
      search: "",
      admins: [
        {
          id: 1,
          email: "test@bankster.com",
        },
        {
          id: 2,
          email: "johnDoe@bankster.com",
        },
        {
          id: 3,
          email: "jane.Doe@bankster.com",
        },
        {
          id: 4,
          email: "admin@bankster.com",
        },
        {
          id: 5,
          email: "perlten@bankster.com",
        },
        {
          id: 6,
          email: "jezper@bankster.com",
        },
        {
          id: 7,
          email: "duen@bankster.com",
        },
        {
          id: 8,
          email: "webadmin@bankster.com",
        },
        {
          id: 9,
          email: "domainadmin@bankster.com",
        },
        {
          id: 10,
          email: "serveradmin@bankster.com",
        },
        {
          id: 11,
          email: "marketing@bankster.com",
        },
        {
          id: 12,
          email: "sales@bankster.com",
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          align: "end",
          sortable: true,
          value: "id",
          width: 100,
        },
        {
          text: "EMAIL",
          align: "start",
          sortable: true,
          value: "email",
          width: 500,
        },
        {
          text: "ACTIONS",
          align: "center",
          sortable: false,
          value: "actions",
        },
      ];
    },
    footerProps() {
      return {
        showFirstLastPage: true,
        firstIcon: "mdi-arrow-collapse-left",
        lastIcon: "mdi-arrow-collapse-right",
        prevIcon: "mdi-arrow-left",
        nextIcon: "mdi-arrow-right",
        itemsPerPageOptions: [5],
      };
    },
    items() {
      const newAdmins = [...this.admins];
      const missingRows = 5 - (newAdmins.length % 5);
      for (let i = 0; i < missingRows; i++) {
        const empty = {
          id: null,
          email: null,
        };
        newAdmins.push(empty);
      }
      return newAdmins;
    },
    isAdminDeleted() {
      return this.$store.getters.isAdminDeleted;
    },
  },
  methods: {
    customerFilter(value, search) {
      if (value !== null && search !== null) {
        if (typeof value === "number") {
          return value === parseInt(search);
        } else if (typeof value === "string") {
          return (
            value.toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
          );
        }
      }
      return false;
    },
    deleteAdmin(email) {
      console.log(email);
      this.$store.dispatch("adminDelete", {
        email,
      });
    },
    closeAlert() {
      this.$store.dispatch("resetSuccessMessages");
    },
  },
};
</script>

<style scoped></style>
