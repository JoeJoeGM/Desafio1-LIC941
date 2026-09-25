/*
    ENTREGA DE DESAFIO 1
    INTEGRANTES:

    Cristel Michelle Figueroa Romero - FR232950
    Joel Ernesto Granados Mejia - GM251189
    Carlos Eduardo Saavadra Vega - SV253275
    Alexis Ernesto Hernández Monge - HM253055
    Fidel Alexander Blanco Ayala - BA220792


*/



const AppState = { //Estara almacenando todas las transacciones cada ves que se agregan se realiza un push a ingresos y egresos
    ingresos: [], egresos: []
};


//Al dar clic en agregar se capturan los datos y se almacenan en AppState
document.getElementById('transacciones').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const tipoMovimiento = document.getElementById('tipo-movimiento').value; //Toma el tipo de movimiento que se realiza

    // Captura valores de los inputs
    const descripcion=document.getElementById('descripcion').value;
    const valor = parseFloat(document.getElementById('monto').value);

    if (tipoMovimiento === 'ingresos'){ //Si el tipo de movimiento es ingreso se hace push a AppState.ingresos

        AppState.ingresos.push({descripcion, valor});
        

    }else if (tipoMovimiento === 'egresos') { //Si el tipo de movimiento es egresos se hace push a AppState.egresos
       AppState.egresos.push({descripcion, valor});
        
    } 
    this.reset(); //Borra el formulario
    document.getElementById('total-ingresosPrev').textContent = totalIngresos().toFixed(2);
    document.getElementById('total-egresosPrev').textContent = totalEgresos().toFixed(2);
    document.getElementById("porcentaje-gastos").textContent = calcularPorcentaje().toFixed(2) + "%";
    document.getElementById("monto-disponible").textContent = totalDisponible().toFixed(2);
    listasTab(); //Agrega los elementos al correspondiente tab
});



//Codigo para las TABS

function listasTab(){
    const ulIngresos = document.getElementById('listado-ingresos');
    ulIngresos.innerHTML = ''; //Limpia las listas 

    AppState.ingresos.forEach((ingresos)=> { //Con el ForEach se revisa cada dato almacenado y lo va agregando a la lista
       const li = document.createElement('li');
       li.textContent = `${ingresos.descripcion} --- $${ingresos.valor.toFixed(2)}`;
       ulIngresos.appendChild(li);
       
    });

    const ulEgresos = document.getElementById('listado-egresos');
    ulEgresos.innerHTML = '';

    AppState.egresos.forEach((egresos)=> {
       const li = document.createElement('li');
       li.textContent = `${egresos.descripcion} --- $${egresos.valor.toFixed(2)}`;
       ulEgresos.appendChild(li);
       
    });
}
function cambiarTab(tipoMov){ //Dependiendo del dato que se le da a tipoMov controla los paneles y botones para los tabs
    const panelIngreso = document.getElementById('panelIngresos');
    const panelEgresos = document.getElementById('panelEgresos');
    const botonIngresos = document.getElementById('boton-ingresos');
    const botonEgresos = document.getElementById('boton-egresos');

    if (tipoMov === 'ingresos'){
        panelIngreso.style.display ='block';
        panelEgresos.style.display = 'none';
        botonIngresos.classList.add('activo');
        botonEgresos.classList.remove('activo');
    }else if(tipoMov === 'egresos'){
        panelIngreso.style.display ='none';
        panelEgresos.style.display = 'block';
        botonIngresos.classList.remove('activo');
        botonEgresos.classList.add('activo');
    }
}


function tituloFecha(){ //Se obtiene el titulo sacando el mes y año de la funcion Date()
    const fechaHoy=new Date();
    const mes = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    const mesNombre= mes[fechaHoy.getMonth()];
    const anio = fechaHoy.getFullYear();

    return `Presupuesto de ${mesNombre} ${anio}`; // retorna el titulo ya convertido
}

function totalIngresos(){
    return AppState.ingresos.reduce((totalAcumulado, ingreso) => totalAcumulado + ingreso.valor, 0 ); //Realiza el calculo utilizando el arreglo almacenado en AppState sumando el ingreso actual

}
function totalEgresos(){
    return AppState.egresos.reduce((totalAcumulado, egreso) => totalAcumulado + egreso.valor, 0 );//Realiza el calculo utilizando el arreglo almacenado en AppState

}
// Se saca el monto total desiponible en el mes, la suma de los ingresos menos la suma de los egresos
function totalDisponible(){ 
    return totalIngresos() - totalEgresos(); // Calcula el total disponible realizando la resta con los totales de ingreso y de egreso

}
function calcularPorcentaje(){
    const totIngreso = totalIngresos();
    const totEgresos = totalEgresos();

    if (totIngreso === 0) return 0;

    return (totEgresos*100)/ totIngreso; //Se utiliza la formula %Egreso = (totalEgresos * 100) / totalIngresos
}
