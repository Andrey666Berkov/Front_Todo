import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTodo=createAsyncThunk(
    '/spisok/fetchTodo',
    async function (_,{rejectWithValue}) {
        try {
            const response =await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')

            if(!response.ok){
                throw new Error(response.massage);                
            }

            const data=await response.json();

            return data;
                        
        } catch (error) {
            return rejectWithValue(error.massage)
        }        
    }
)

export const deleteFetch=createAsyncThunk(
    '/todo/deleteFetch',
    async function (id,{rejectWithValue,dispatch}) {
        try {
        const response=await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
            {method:'DELETE',
             headers:{
                'Content-type':'application/json'
             }
            })
            
            if(!response.ok){
                throw new Error("Can't delete");                
            }

            dispatch(removeTodo({id}))
        
            
        } catch (error) {
            return rejectWithValue(error.massage)
        }        
    }
)

export const newTodoFetch=createAsyncThunk(
    '/todo/newTodoFetch',
    async function (text,{rejectWithValue,dispatch}) {
        try {
            const todo={                
                title:text,
                userId:1,            
                completed:false
            }
            const response=await fetch('https://jsonplaceholder.typicode.com/todos',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(todo)
            })

            if(!response.ok){
                throw new Error(`Cant't much add todo id: ${todo.id}`);                
            }

            const data=await response.json();            
            
            dispatch(addTodo(data))
            console.log(data);
            
            
        } catch (error) {
            return rejectWithValue(error.massage)
        }
        
    }
)

export const toggleFecthTodos = createAsyncThunk(
    '/todos/toggleFetchTodos',
    async function (id, {rejectWithValue, dispatch, getState}) {
        console.log(id);
        
        const todo=getState().stateSpisok.spisok.find(todo=>todo.id===id);
        try {
            const  response =await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    completed:!todo.completed
                })                
            })     
            if(!response.ok) throw new Error("Can't change compeated toggleTodo");
            
            dispatch(togleTodo({id}))
        } catch (error) {
            return rejectWithValue(error.message)
        }        
    }
)

const setError=(state,action)=>{
    state.status='rejected';
    state.error=action.payload;
    console.log(action);
    
    
}

const todoSlice=createSlice({
    name:'todo',
    initialState:
    {
        spisok:[],
        error:null,
        status:null        
    },

    reducers:{
        addTodo(state,action){
                     
           state.spisok.push(action.payload)
                     
        },

        removeTodo(state,action){
            state.spisok=state.spisok.filter(c=>c.id!==action.payload.id)
        },

        togleTodo(state,action){                                            
            state.spisok=state.spisok.map(c=>{
                if(c.id===action.payload.id){                   
                    return {...c, checked:!c.checked}
                }                  
                return c;
            })
        }
    },   

    extraReducers:(builder)=>{

        builder.addCase(fetchTodo.pending, (state)=>{
            state.status='loading'
            state.error=null
        })

        builder.addCase(fetchTodo.fulfilled,(state,action)=>{
            state.spisok=action.payload
            state.error=null
            state.status="fulfill"
        })

        builder.addCase(fetchTodo.rejected,setError)
        builder.addCase(deleteFetch.rejected,setError)
        builder.addCase(toggleFecthTodos.rejected,setError)
        builder.addCase(newTodoFetch.rejected,setError)

    }
})

export const {addTodo,removeTodo,togleTodo}=todoSlice.actions

export default todoSlice.reducer