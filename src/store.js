import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import {routes} from './routes'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        poll:[],
        pollID:"",
        useVoted:0,
        totalCount:0,
        votes:[]
    },
    mutations:{
        setPoll(state, pollObj){
            state.poll=[]
            state.poll.push(pollObj)
        },
        setPollID(state,id){
            state.pollID=id
        },
        setVoted(state){
            state.useVoted=1
        },
        setTotalCount(state,count){
            state.totalCount=count
        },
        setVotes(state,votes){
            state.votes=votes
        }
    },
    getters:{},
    actions:{
        savePoll({commit},pollObj){
            commit("setPollID",pollObj)
        },
        async getPoll({commit},pollID){
             axios.get("https://poll-app-40ba5-default-rtdb.europe-west1.firebasedatabase.app/polls/-"+pollID+".json")
            .then(response=>{
                commit("setPoll",response.data)
                let arr = response.data.options
                let totalCount=0
                for (let i=0; i<arr.length; i++) {
                    totalCount+=arr[i].voteCount
                }
                commit('setTotalCount',totalCount)

                let total=0
                let votes = []
                for (let i=0; i<arr.length; i++) {
                    total+=arr[i].voteCount
                }
                for (let i = 0; i < arr.length; i++) {
                    votes.push({"name":arr[i].name,"total":Math.round((parseInt(arr[i].voteCount)*100)/total)})
                }
                commit('setVotes',votes)   
            })
        },
        checkVote({commit}){
            let check = localStorage.getItem("used")
            if(check){
                commit("setVoted")
            }
        },
        useVote({commit}){
            localStorage.setItem("used",1)
            commit("setVoted")
        }
    }
})

export default store