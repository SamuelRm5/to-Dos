import { Todo } from "./todo.class";

const divTodoList      = document.querySelector('.todo-list');

export class TodoList {

    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ) {

        this.todos.push( todo );
        this.guardarLocalStorage();

    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {
        
        for( const todo of this.todos ){

            if ( todo.id == id ){

                todo.completado =! todo.completado;
                this.guardarLocalStorage();
                break;

            }

        }

    }

    eliminarCompletado() {

        this.todos = this.todos.filter( todo => ! todo.completado );
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos) );

    }

    cargarLocalStorage(){

        this.todos = ( localStorage.getItem('todo' ) )
                        ? JSON.parse( localStorage.getItem('todo') ) 
                        : [];
        this.todos = this.todos.map( Todo.fromJson );
    }

    pendientes(){
        let pendientes = 0;
        for( let i = divTodoList.children.length-1; i >= 0; i-- ){

            const elemento = divTodoList.children[i];

            if ( !elemento.classList.contains('completed') ) {
                
                pendientes = pendientes + 1;
                document.querySelector('strong').innerText = pendientes;

    
            }
    
        }

    }
}