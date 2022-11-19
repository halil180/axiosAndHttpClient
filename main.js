import axios, {isCancel, AxiosError} from 'axios';


const url ="https://jsonplaceholder.typicode.com/todos"
const urlPosts ="https://jsonplaceholder.typicode.com/posts"
function getTodos(){
    axios.get(url,{
      params:{_limit:2}
    })
    .then((x) => console.log(x.data))
    .catch((err) => console.log(err))
}
// getTodos()


function addTodo() {
    axios.post(url,{
        title:"new todo",
        completed:false
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
}
// addTodo() 



////////////////////////////////////////////////
///put  => replaces the entire resource
//patch => updates it inclemently 
function updateTodoWithPut(){
    axios.put(url + "/1",{
        title:"updated todo",
        completed:true
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

}
// updateTodoWithPut()

function updateTodoWithPatch(){
    axios.patch(url + "/1",{
        title:"updated todo",
        completed:true
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

}
// updateTodoWithPatch()






function deleteTodo(){
    axios.delete(url + "/1")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

}
// deleteTodo()



///simultenous data

function getDatas(){
    axios.all([
        axios.get(url,{params:{_limit:1}}),
        axios.get(urlPosts,{params:{_limit:1}})
    ])
    // .then((res) => {
    //     console.log(res[0].data , "res 0")
    //     console.log(res[1].data , "res 1")
    // })

    .then(axios.spread((todos,posts) =>  {console.log(todos.data), console.log(posts.data)}))

    .catch((err) => console.log(err))
}
lol()
getDatas()





function lol() {
    axios.interceptors.request.use(
        config => {
            console.log(config.method.toUpperCase() + "request sent to " + config.url + new Date().getTime())
            return config
        },
        error => {
            return Promise.reject(error)
        }
        )
}