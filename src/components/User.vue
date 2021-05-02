<template>
	<div>
 
  <pre>
<code id="userInfo">
  <a v-if="auth" v-bind:href="'/user/'+uid">See this user</a>
   {{userInfo}}
   <button @click="logout">Logout</button>
 </code>
</pre>

</div>
</template>

<script>
	import firebase from "firebase/app";
export default {
  name: "user",
  props:["fromLogin"],
    data () {
      return {
      auth:false,
        userInfo:"",
        uid:""
      }
    }
    ,
    created: function (){
 // console.log(this.fromLogin);
  var user;
if (firebase.auth().currentUser) {
   user=firebase.auth().currentUser.ac;
            if(this.fromLogin!=1&&this.$route.params.uid!=user.uid)
              window.location.assign("/user/"+user.uid)

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

          } else {
            this.userInfo = "User is signed out.";
            
          }



    },
    methods: {
      logout(e){
         e.preventDefault(); 
            firebase.auth().signOut().then(() => {
        this.$router.go("/login");
            });
         },
         
}
};
</script>
<style  lang="scss" scoped>
	a {
    position: relative;
    top: -10px;
    background: blueviolet;
    padding: 10px;
    color: black;
    font-size: 1.6rem;
    font-weight: 700;
    border-radius: 10px;
}
button {
    background: red;
    font-size: 1.3rem;
}
</style>