<template>
  <div class="container" style="color:white">
    <h1 style="text-align:center; color:white; font-size:bold">{{polls.title}}</h1>
    <div class="funkyradio" v-if="!voted">
        <div class="funkyradio-success"  v-for="(poll,i) in polls.options" :key="poll.id">
            <input type="radio" name="radio" :id="'radio'+poll.name" @click="useVote(i,poll.voteCount, poll.name)" />
            <label :for="'radio'+poll.name">{{poll.name}}</label> <i>{{poll.voteCount}}</i>
        </div>
    </div>
    <div  v-for="vote in votes" :key="vote.id" v-else>
      {{vote.name}} 
      <div class="progress md-progress" style="height: 20px">
          <div class="progress-bar" role="progressbar" :style="'width: '+vote.total+'%; height: 20px'" :aria-valuenow="vote.total" aria-valuemin="0" aria-valuemax="100">{{vote.total}}%</div>
      </div>
    </div>
          <p>Toplam Oy : {{totalCount}}</p>
  </div>
</template>

<script>
import fire from '../firebase'
export default {
  data(){
    return{
      polls:[],
      totalCount:0,
      votes:[],
      voted:false,
      ref:null
    }
  },
  methods : {
    useVote(i,count,name){
      let id = '-'+this.$route.params.id
      let storage = localStorage.getItem('key'+id)
      if(storage==id){
        alert('zaten oy kullanmışsınız')
        this.voted=true
      }else{
        this.voted=true
        let ref=fire.database().ref("polls/"+id+"/options/")
        count++
        ref.child(i).set({name:name,voteCount:count})
        localStorage.setItem('key'+id,id)
      }
    }
  },
  mounted(){
    let viewPolls = this
    const itemsRef = fire.database().ref("polls")
    itemsRef.on("value", snapshot => {
      let data = snapshot.val()
      let polls = []
      let paramsID = '-'+this.$route.params.id
      Object.keys(data).forEach(key => {
        if(paramsID==key){
          polls.push({
          id: key,
          options: data[key].options,
          title: data[key].title
        })
        }
      })
       viewPolls.polls = polls[0]
       let arr  =polls[0].options
        this.totalCount=0
        this.votes=[]
        for (let i=0; i<arr.length; i++) {
          this.totalCount+=arr[i].voteCount
        }
        let total=0
        for (let i=0; i<arr.length; i++) {
          total+=arr[i].voteCount
        }
        for (let i = 0; i < arr.length; i++) {
          this.votes.push({"name":arr[i].name,"total":Math.round((parseInt(arr[i].voteCount)*100)/total)})
        }
    })
  },
  created(){
    let id = '-'+this.$route.params.id
    let storage = localStorage.getItem('key'+id)
    if(storage==id){
      this.voted=true
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.0/css/bootstrap.min.css');
.funkyradio div {
  clear: both;
  overflow: hidden;
}

.funkyradio label {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #D1D3D4;
  font-weight: normal;
}

.funkyradio input[type="radio"]:empty,
.funkyradio input[type="checkbox"]:empty {
  display: none;
}

.funkyradio input[type="radio"]:empty ~ label,
.funkyradio input[type="checkbox"]:empty ~ label {
  position: relative;
  line-height: 2.5em;
  text-indent: 3.25em;
  margin-top: 2em;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.funkyradio input[type="radio"]:empty ~ label:before,
.funkyradio input[type="checkbox"]:empty ~ label:before {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  content: '';
  width: 2.5em;
  background: #D1D3D4;
  border-radius: 3px 0 0 3px;
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label {
  color: #888;
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label:before,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #C2C2C2;
}

.funkyradio input[type="radio"]:checked ~ label,
.funkyradio input[type="checkbox"]:checked ~ label {
  color: #777;
}

.funkyradio input[type="radio"]:checked ~ label:before,
.funkyradio input[type="checkbox"]:checked ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #333;
  background-color: #ccc;
}

.funkyradio input[type="radio"]:focus ~ label:before,
.funkyradio input[type="checkbox"]:focus ~ label:before {
  box-shadow: 0 0 0 3px #999;
}

.funkyradio-default input[type="radio"]:checked ~ label:before,
.funkyradio-default input[type="checkbox"]:checked ~ label:before {
  color: #333;
  background-color: #ccc;
}

.funkyradio-primary input[type="radio"]:checked ~ label:before,
.funkyradio-primary input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #337ab7;
}

.funkyradio-success input[type="radio"]:checked ~ label:before,
.funkyradio-success input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5cb85c;
}

.funkyradio-danger input[type="radio"]:checked ~ label:before,
.funkyradio-danger input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #d9534f;
}

.funkyradio-warning input[type="radio"]:checked ~ label:before,
.funkyradio-warning input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #f0ad4e;
}

.funkyradio-info input[type="radio"]:checked ~ label:before,
.funkyradio-info input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5bc0de;
}
</style>