<template>
  <div class="container">
    <h1 style="text-align:center; color:white; font-size:bold">OYLAMA UYGULAMASI</h1>
    <div style="margin-top:15%; width:65%; margin-left:auto; margin-right:auto">
          <br>
          <input class="form-control form-control-lg" type="text" v-model="title" placeholder="Başlığı giriniz..">
          <hr>
          <div class="form-group" v-for="(input,k) in inputs" :key="k">
            <div class="row">
              <div class="col-md-11">
              <input type="text" class="form-control" placeholder="Seçeneği giriniz.." v-model="input.name" @keypress.enter="add(k)">
              </div>
              <div class="col-md-1">
              <span class="float-left mt-2">
                  <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || ( !k && inputs.length > 1)"></i>
                  <i class="fas fa-plus-circle" @click="add()" v-show="k == inputs.length-1"></i>
              </span>
              </div>
            </div>
          </div>
          <button @click="sendToPoll()" class="btn btn-success"> Gönder</button>
    </div>
  </div>
</template>

<script>
import store from '../store'
import axios from 'axios'
export default {
  data(){
    return{
      inputs: [
          {
              name: '',
              voteCount:0
          }
      ],
      title:"",
      id: store.state.pollID
    }
  },
  methods : {
    sendToPoll(){
      let id=""
      axios.post("https://poll-app-40ba5-default-rtdb.europe-west1.firebasedatabase.app/polls.json",{"title":this.title, "options":this.inputs})
      .then(response=>{
        id = response.data.name.substr(1)
        store.dispatch("savePoll",id)
         this.$router.push("/result/"+id)
      })
    },
    add(){
      this.inputs.push({ name: '', voteCount:0 });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    }
  }
}
</script>

<style>
</style>
