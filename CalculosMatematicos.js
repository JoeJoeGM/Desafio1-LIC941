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
});

//Finaliza codigo de pruebas

function actualizarResumen() {
    document.getElementById("total-ingresos").textContent = "$" + totalIngresos().toFixed(2);
    document.getElementById("total-egresos").textContent = "$" + totalEgresos().toFixed(2);
    document.getElementById("porcentaje-gastos").textContent = calcularPorcentaje() + "%";
    
    // Llamada a la función de la Parte 5 para que se actualicen las listas de abajo
    actualizarListasDetalles();
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

/* =========================================================
   LÓGICA DE LA PARTE 5 (DETALLES Y PESTAÑAS)
   ========================================================= */

// Función para alternar entre pestañas
function mostrarTab(tab) {
    document.getElementById('tab-ingresos').style.display = 'none';
    document.getElementById('tab-egresos').style.display = 'none';
    document.getElementById('btn-ingresos').classList.remove('activo');
    document.getElementById('btn-egresos').classList.remove('activo');
    
    document.getElementById(`tab-${tab}`).style.display = 'block';
    document.getElementById(`btn-${tab}`).classList.add('activo');
}

// Función principal para renderizar las listas usando los datos de AppState
function actualizarListasDetalles() {
    const contenedorIngresos = document.getElementById('lista-ingresos');
    const contenedorEgresos = document.getElementById('lista-egresos');
    
    // Obtenemos el total de ingresos usando la función que ya hicieron en la parte de cálculos
    let totalIng = totalIngresos();

    // 1. Renderizar Ingresos
    contenedorIngresos.innerHTML = '';
    AppState.ingresos.forEach(ingreso => {
        contenedorIngresos.innerHTML += `
            <li>
                <span>${ingreso.descripcion || 'Ingreso'}</span>
                <span class="monto-ingreso">+ ${ingreso.valor.toFixed(2)}</span>
            </li>
        `;
    });

    // 2. Renderizar Egresos
    contenedorEgresos.innerHTML = '';
    AppState.egresos.forEach(egreso => {
        // Fórmula del porcentaje
        let porcentaje = totalIng > 0 ? (egreso.valor * 100) / totalIng : 0;
        
        contenedorEgresos.innerHTML += `
            <li>
                <span>${egreso.descripcion || 'Egreso'}</span>
                <div>
                    <span class="monto-egreso">- ${egreso.valor.toFixed(2)}</span>
                    <span class="badge-porcentaje">${porcentaje.toFixed(2)}%</span>
                </div>
            </li>
        `;
    });
}