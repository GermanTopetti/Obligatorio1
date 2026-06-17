let userConectado = null;
let contadorAdmin=0; 
let contadorUsuario=0;
let JOB_OFFER_nroAutoincremental= 0;
class Sistema{
    constructor(){
        this._listaUsuarios = []
        this._listaAdmins = []
        this._listaOfertas = []
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
    constructor(nombreUsuario, pass, nombre, experiencia, area){
        this.id=contadorUsuario++
        this.nombreUsuario=nombreUsuario;
        this.pass=pass;
        this.nombre=nombre;
        this.experiencia=experiencia;
        this.area=area;
    }
}

class Administrador{
    constructor(nombreUsuario, pass){
        this.id=contadorAdmin++
        this.nombreUsuario=nombreUsuario
        this.pass=pass
    }
}

class Oferta{
    constructor(titulo, nombreEmpresa, descripcion, nivelRequerido, area, limite, vacantes, destacada, activa){
        this.id=JOB_OFFER_nroAutoincremental;
        this.titulo=titulo;
        this.nombreEmpresa=nombreEmpresa;
        this.descripcion=descripcion;
        this.nivelRequerido=nivelRequerido;
        this.area=area;
        this.limite=limite;
        this.vacantes=vacantes;
        this.destacada=destacada;   
        this.activa=activa;     
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
    document.querySelector("#btnIrLogin").addEventListener("click", mostrarLogin);
    document.querySelector("#btnCrearOfertasLaborales").addEventListener("click", mostrarCrearOfertas);
    document.querySelector("#btnGuardarOferta").addEventListener("click", crearOferta);
    document.querySelector("#btnEditarCerrarOfertas").addEventListener("click", mostrarOfertasEditar);
}

function ocultarTodo(){   
        document.querySelector("#divLogin").style.display="none"
        document.querySelector("#divPostulante").style.display = "none";
        document.querySelector("#divAdmin").style.display = "none";
        document.querySelector("#divRegistrar").style.display = "none";
        document.querySelector("#divCrearOferta").style.display = "none";
        document.querySelector("#divEditarCerrarOferta").style.display="none";
}

function contadores(nombreUsuario, pass){
       
let uContMay = 0;
let uContMin = 0;
let pContMay = 0;
let pContMin= 0;

    for(let i = 0; i < nombreUsuario.length; i++){
    if(nombreUsuario[i] == nombreUsuario[i].toLowerCase() && nombreUsuario[i] != nombreUsuario[i].toUpperCase()){
        uContMin++;
    } else if(nombreUsuario[i] != nombreUsuario[i].toLowerCase() && nombreUsuario[i] == nombreUsuario[i].toUpperCase()){
        uContMay++;
    }
}

for(let i = 0; i < pass.length; i++){
    if(pass[i] == pass[i].toLowerCase() && pass[i] != pass[i].toUpperCase()){
        pContMin++;
    } else if(pass[i] != pass[i].toLowerCase() && pass[i] == pass[i].toUpperCase()){
        pContMay++;
    }
}

 return {
        uContMay: uContMay,
        uContMin: uContMin,
        pContMay: pContMay,
        pContMin: pContMin,
    }
}

function precargarDatos(){

    let u1= new Usuario("German","1034","German", "senior", "Desarrollo Web");
    miSistema._listaUsuarios.push(u1);

    let a1= new Administrador("Joaquin","0805");
    miSistema._listaAdmins.push(a1);

     let u2= new Usuario("Fausto","soyfausto","Fausto", "junior", "Desarrollo de Software");
    miSistema._listaUsuarios.push(u2);

    let a2= new Administrador("Federico martin serres zunino peña bonilla basino villar cabrera","cerrillosNoma");
    miSistema._listaAdmins.push(a2);
}

function mostrarLogin(){
    ocultarTodo()
        document.querySelector("#divLogin").style.display="block";

}
 function mostrarCrearOfertas(){
    ocultarTodo();
        document.querySelector("#divCrearOferta").style.display = "block";
}

function mostrarRegister(){
    ocultarTodo();
    document.querySelector("#divRegistrar").style.display = "block";
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
    ocultarTodo();
    document.querySelector("#divLogin").style.display="block";
    usuarioConectado=null;

}



function hacerRegister(){

    let nombreUsuario = document.querySelector("#txtNombreUser").value;
    let pass = document.querySelector("#txtPass").value;
    let nombre = document.querySelector("#txtNombre").value;
    let experiencia = document.querySelector("#slcNivel").value;
    let area = document.querySelector("#slcArea").value;

    let resultado = contadores(nombreUsuario, pass);

    for(let usuario of miSistema._listaUsuarios){

        if(usuario.nombreUsuario.toLowerCase() === nombreUsuario.toLowerCase() && nombreUsuario.length < 5 && resultado.uContMay < 1 || resultado.uContMin < 1 && pass.length < 5 && resultado.pContMay < 1 || resultado.pContMin < 1  ){

            let u = new Usuario(nombreUsuario, pass, nombre, experiencia, area);
            miSistema._listaUsuarios.push(u);

    alert("Usuario registrado correctamente");
        }


    }

    
}

function crearOferta(){

   let titulo= document.querySelector("#txtTituloTrabajo").value;
   let nombreEmpresa= document.querySelector("#txtNombreEmpresa").value;
   let area= document.querySelector("#slcAreaOferta").value;
   let descripcion= document.querySelector("#txtDescripcionOferta").value;
   let nivel= document.querySelector("#slcNivelRequerido").value;
   let limite = document.querySelector("#txtLimite").value;
   let vacantes = document.querySelector("#txtVacantes").value;
   let chekDestacada= document.querySelector("#checkboxDestacada").checked;
   let activa= "Activa";
   if(limite>=vacantes){
       let of= new Oferta(titulo, nombreEmpresa, descripcion,nivel, area,  limite,vacantes,chekDestacada, activa);
    miSistema._listaOfertas.push(of);
    console.log(miSistema._listaOfertas);
 }else{
        alert("error");
    }

}

function mostrarOfertasEditar(){
    
}