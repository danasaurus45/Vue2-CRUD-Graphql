import '@babel/polyfill'
import 'mutationobserver-shim'

import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

const apolloClient = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

Vue.use(VueApollo);
  
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  apolloProvider,
}).$mount("#app");
