let userConectado = null;
let contadorAdmin=0; 
let contadorUsuario=0;
class Sistema{
    constructor(){
        this._listaUsuarios = []
        this._listaAdmins = []
    }

    devolverUsuarioConectado(nombreUsuario){
        for (let u of this._listaUsuarios){
            if (u.nombreUsuario==nombreUsuario) return u
        }

        for (let a of this._listaAdmins){
            if (a.nombreUsuario==nombreUsuario) return a
        }
        return null
    }
    
    
}

class Usuario{
    constructor(nombreUsuario, pass){
        this.id=contadorUsuario++
        this.nombreUsuario=nombreUsuario;
        this.pass=pass;
    }
}

class Administrador{
    constructor(nombreUsuario, pass){
        this.id=contadorAdmin++
        this.nombreUsuario=nombreUsuario
        this.pass=pass
    }
}

let miSistema = new Sistema()

inicio()

function inicio(){
    ocultarTodo();
    precargarDatos();
    mostrarLogin();
    document.querySelector("#btnLogin").addEventListener("click",hacerLogin)
    document.querySelector("#btnIrRegistrar").addEventListener("click", mostrarRegister);
    document.querySelector("#btnIrLogin").addEventListener("click", mostrarLogin)
}

function ocultarTodo(){
    
    document.querySelector("#divLogin").style.display="none"
        document.querySelector("#divPostulante").style.display = "none";
        document.querySelector("#divAdmin").style.display = "none";
        document.querySelector("#divRegistrar").style.display = "none";
      
}

function precargarDatos(){

    let u1= new Usuario("German","1034");
    miSistema._listaUsuarios.push(u1);

    let a1= new Administrador("Joaquin","0805");
    miSistema._listaAdmins.push(a1);

     let u2= new Usuario("Fausto","soyfausto");
    miSistema._listaUsuarios.push(u2);

    let a2= new Administrador("Federico martin serres zunino peña bonilla basino villar cabrera","cerrillosNoma");
    miSistema._listaAdmins.push(a2);
}

function mostrarLogin(){
    ocultarTodo()
        document.querySelector("#divLogin").style.display="block";

}

function hacerLogin(){

    let nombreUsuario = document.querySelector("#txtLogUser").value;
    let pass = document.querySelector("#txtLogPass").value;
    let encontre = false

    for(let usuario of miSistema._listaUsuarios){
        if(usuario.nombreUsuario == nombreUsuario && usuario.pass == pass){
            ocultarTodo()
            document.querySelector("#divPostulante").style.display= "block"
            encontre = true
            userConectado = miSistema.devolverUsuarioConectado(nombreUsuario)
            console.log(userConectado)

        }
    }

    if(!encontre){
        for(let administrador of miSistema._listaAdmins){
            if(administrador.nombreUsuario==nombreUsuario && administrador.pass == pass){
                ocultarTodo()
                document.querySelector("#divAdmin").style.display="block"
                
                encontre = true
                userConectado = miSistema.devolverUsuarioConectado(nombreUsuario)
                console.log(usuarioConectado)
            }
        }

    }

if(!encontre) alert ("Datos Incorrectos")
    document.querySelector("#txtLogUser").value=""
    document.querySelector("#txtLogPass").value=""

}

function cerrarSesion(){
    ocultarTodo()
    document.querySelector("#divLogin").style.display="block"
    usuarioConectado=null

}

function mostrarRegister(){
    ocultarTodo()
    document.querySelector("#divRegistrar").style.display = "block"
}

function hacerRegister(){
    
}