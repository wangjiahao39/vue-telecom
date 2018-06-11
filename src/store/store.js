import Vue from 'vue'
import Vuex from 'vuex'
import {instance as http} from '@/utils/http'
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        menu:[],
        group:[],
        table:[]
    },
    mutations:{//通过commit来触发一个mutation
        updateMenu(state,data){
            state.menu = data.data
        },
        updateGroup(state,payload){
            state.group = payload
        },
        updateTable(state,payload){
            state.table = payload
        },
        deleteItem(state,payload,cb){
            let tmp = [...state.table];
            let idx;
            tmp.forEach((item,index)=>{
                if(item.code == payload){
                    idx = index
                }
            })
            tmp.splice(idx,1)
            state.table = tmp;
            payload.cb()
        }
    },
    actions:{//通过dispatch来触发一个action
        fetMenu({commit}){
            http.get('/static/server/data.json').then(res=>{
                setTimeout(()=>{
                    commit('updateMenu',res)
                },1000)
            })
        },
        fetGroup({commit,state},cb){
            if(state.group.length>0){
                cb()
            }
            http.get('/static/server/group.json').then(res=>{
                setTimeout(()=>{
                    commit('updateGroup',res.orgs)
                    cb()
                },1000)
            })
        },
        fetTable({commit,state},payload){
            http.get('/static/server/user.json').then(res=>{
                setTimeout(()=>{
                    commit('updateTable',res.userList)
                    payload()
                },1000)
            })
        },
        deleteItem({commit},payload){
            commit('deleteItem',payload)
        }
    },
    getters:{
        filterGroup(state){
            return (filter)=>{
                if(filter){
                    let res =  state.group.filter((item)=>{
                        return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                    })
                    return res
                }else{
                    return state.group
                }
                
            }
        }
    },
    modules:{}
})
console.log(store)

export default store