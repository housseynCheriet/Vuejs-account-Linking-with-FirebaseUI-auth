<template>
  <div>
  <div v-if="!auth">
  <div id="firebaseui-container"></div>  
  </div>
  <div v-else>
  <User fromLogin="1" />
 </div>
</div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

 import User from './User'
export default {
  name: "Login",
  components:{
    User
  },
    data () {
      return {
        auth:false,
        uid:""
      }
    },
    methods: {
      logout(e){
         e.preventDefault(); 
            firebase.auth().signOut().then(() => {
        this.$router.go("/login");
            });
         },
          callThis(){

         var user;
           
if (firebase.auth().currentUser) {
  user=firebase.auth().currentUser.ac;
          this.auth=true;
          this.uid=user.uid;
             this.userInfo = JSON.stringify({
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                accessToken: user.accessToken,
                providerData: user.providerData
              }, null, '  ');

  console.log(this.userInfo);

       }   
        }
     },
  mounted() {
    console.log("..")

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    const uiConfig = {

      signInOptions: [
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
        'email'
      ]
    },{
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'email'
      ]
    },
             firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.callThis
      }
    };
    ui.start("#firebaseui-container", uiConfig);

  }
};
</script>



