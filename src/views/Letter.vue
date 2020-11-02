<template>
  <div class="content">
    <letter :id="letter" :letter="letter" :lesson="lesson" />
  </div>
</template>

<script>
import Letter from "@/components/Letter.vue";
import malayalam from "../assets/malayalam.json";

export default {
  name: "Home",
  components: {
    Letter,
  },
   computed :{
     lesson(){
       return malayalam.lessons[this.letter];
     }
   },
   props: ["letter"],
};
</script>
