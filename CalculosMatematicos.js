const AppState = { //Estara almacenando todas las transacciones cada ves que se agregan se realiza un push a ingresos y egresos
    ingresos: [], egresos: []
};
//Se crea la clases ingreso y egreso
class Ingreso {
    constructor(descripcion,valor) {
        this.descripcion = descripcion;
        this.valor = valor;
    }
}
class Egreso {
    constructor(descripcion,valor) {
        this.descripcion = descripcion;
        this.valor = valor;
    }
}

//Codigo para realizar pruebas

document.getElementById('transacciones').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recargar la página

    const tipoMovimiento = document.getElementById('tipo-movimiento').value;

    // Captura valores de los inputs
    const descripcion=document.getElementById('descripcion').value;
    const valor = parseFloat(document.getElementById('monto').value);

    if (tipoMovimiento === 'ingresos'){

        AppState.ingresos.push(new Ingreso(descripcion, valor));
        const total = totalIngresos();
        document.getElementById('total-ingresosPrev').textContent = total.toFixed(2);

    }else if (tipoMovimiento === 'egresos') {
       AppState.egresos.push(new Egreso(descripcion, valor));
        const total = totalEgresos();
        document.getElementById('total-egresosPrev').textContent = total.toFixed(2);
    } 
    this.reset();
    document.getElementById("porcentaje-gastos").textContent = calcularPorcentaje() + "%";
    document.getElementById("monto-disponible").textContent = totalDisponible().toFixed(2);
    listasTab();
});

//Finaliza codigo de pruebas

//Codigo para las TABS

function listasTab(){
    const ulIngresos = document.getElementById('listado-ingresos');
    ulIngresos.innerHTML = '';

    AppState.ingresos.forEach((ingresos)=> {
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
function cambiarTab(tipoMov){
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

function actualizarResumen() {        
            
            document.getElementById("total-ingresos").textContent = "$" + totalIngresos().toFixed(2);
            document.getElementById("total-egresos").textContent = "$" + totalEgresos().toFixed(2);
            document.getElementById("porcentaje-gastos").textContent = calcularPorcentaje() + "%";
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

    const porcent =(totEgresos*100)/ totIngreso; //Se utiliza la formula %Egreso = (totalEgresos * 100) / totalIngresos
    return parseFloat(porcent.toFixed(2)); //Se utiliza toFixed para redondear las cifras
}

