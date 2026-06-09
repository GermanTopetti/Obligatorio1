


class Sistema{
    constructor(){
       this._listaUsuarios
       this._listaAdmins 
    }
    
}

class Postulante{
    constructor(nombre, contra){
        this.nombre=nombre;
        this.contra=contra;
    }
}

inicio()

function inicio(){
    ocultarTodo();
}

function ocultarTodo(){
        document.querySelector("#secPostulante").style.display = "none";
        document.querySelector("#secAdmin").style.display = "none";
        document.querySelector("#secRegistrar").style.display = "none";
      
}

function mostrarLogin(){

}