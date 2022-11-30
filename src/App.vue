<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col>
        <h1>CRUD Application Using Vue.js, Bootstrap-Vue and Graphql</h1>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col lg="8">
        <b-table striped hover :items="contacts" :fields="fields" :busy="isBusy">
          <template #table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner variant="primary" class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template #cell(actions)="row">
            <b-button variant="success" class="m-2" @click="selectContact(row.item)" id="selectBtn">Select</b-button>
            <b-button variant="danger" @click="deleteContact(row.item.id)" id="deleteBtn">Delete</b-button>
          </template>
        </b-table>
        <br>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4">
        <b-form>
          <b-form-group label="First Name" label-for="firstName" description="Input your first name">
            <b-form-input id="firstName" v-model="firstName" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label="Last Name" label-for="lastName" description="Input your last name">
            <b-form-input id="lastName" v-model="lastName" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email" description="Input your email">
            <b-form-input id="email" v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-button variant="primary" class="m-2" v-if="!id"
            @click="createContact(firstName, lastName, email)">Add</b-button>
          <b-button variant="info" class="m-2" v-if="id"
            @click="updateContact(id, firstName, lastName, email)">Update</b-button>
          <b-button variant="warning" @click="clearForm()">Clear</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { gql } from "graphql-tag";

export default {
  name: "App",
  data() {
    return {
      isBusy: false,
      fields: ['firstName', 'lastName', 'email', 'actions'],
      id: null,
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  apollo: {
    contacts: gql`
      query {
        contacts {
          id
          firstName
          lastName
          email
        }
      }
    `,
  },
  methods: {
    createContact(firstName, lastName, email) {
      this.isBusy = !this.isBusy;
      this.$apollo.mutate({
        mutation: gql`
          mutation createContact(
            $firstName: String!,
            $lastName: String!,
            $email: String!,
          ) {
            createContact(
              firstName: $firstName,
              lastName: $lastName,
              email: $email,
            ) {
              id,
              firstName,
              lastName,
              email,
            }
          }
        `,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      setTimeout(()=>{location.reload()},500);
    },
    updateContact(id, firstName, lastName, email) {
      this.isBusy = !this.isBusy;
      this.$apollo.mutate({
        mutation: gql`mutation updateContact($id:ID!,$firstName: String!,$lastName: String!,$email: String!) {
        updateContact(id:$id, firstName: $firstName, lastName: $lastName, email: $email)}`,
        variables: {
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      });
      setTimeout(()=>{location.reload()},500);
    },
    deleteContact(id) {
      this.isBusy = !this.isBusy;
      this.$apollo.mutate({
        mutation: gql`mutation deleteContact($id: ID!){
        deleteContact(id:$id)}`,
        variables: {
          id: id,
        }
      });
      setTimeout(()=>{location.reload()},500);

    },
    selectContact(contact) {
      this.id = contact.id;
      this.firstName = contact.firstName;
      this.lastName = contact.lastName;
      this.email = contact.email;
    },
    clearForm() {
      this.id = null;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#deleteBtn {
  background-color: red;
}

#selectBtn {
  background-color: blue;
}
</style>
