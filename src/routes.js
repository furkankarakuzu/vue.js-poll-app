import createPoll from './components/createPoll.vue'
import results from './components/results.vue'

export const routes = [
    {path:"/", component:createPoll},
    {path:"/result/:id", component:results},
    {path:"*", component:createPoll}
]