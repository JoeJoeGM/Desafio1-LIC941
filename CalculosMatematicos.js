const AppState = {
    ingresos: [], egresos: []
};

class Ingreso {
    constructor(descripcion, valor) {
        this.descripcion = descripcion;
        this.valor = valor;
    }
}

class Egreso {
    constructor(descripcion, valor) {
        this.descripcion = descripcion;
        this.valor = valor;
    }
}

// Inicializar el título al cargar la página
window.onload = function() {
    document.getElementById("titulo-presupuesto").textContent = tituloFecha();
};

document.getElementById('transacciones').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recargar la página

    const tipoMovimiento = document.getElementById('tipo-movimiento').value;
    const descripcion = document.getElementById('descripcion').value;
    const valor = parseFloat(document.getElementById('monto').value);

    if (tipoMovimiento === 'ingresos'){
        AppState.ingresos.push(new Ingreso(descripcion, valor));
    } else if (tipoMovimiento === 'egresos') {
       AppState.egresos.push(new Egreso(descripcion, valor));
    } 
    
    this.reset(); // Limpia el formulario
    actualizarResumen(); // Llama a actualizar todo
});

function actualizarResumen() {
    document.getElementById("monto-disponible").textContent = "$" + totalDisponible().toFixed(2);
    document.getElementById("total-ingresos").textContent = "$" + totalIngresos().toFixed(2);
    document.getElementById("total-egresos").textContent = "$" + totalEgresos().toFixed(2);
    document.getElementById("porcentaje-gastos").textContent = calcularPorcentaje() + "%";
    
    // Llamada a tu función (Parte 5)
    actualizarListasDetalles();
}

function tituloFecha(){
    const fechaHoy = new Date();
    const mes = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
    const mesNombre = mes[fechaHoy.getMonth()];
    const anio = fechaHoy.getFullYear();
    return `Presupuesto de ${mesNombre} ${anio}`; 
}

function totalIngresos(){
    return AppState.ingresos.reduce((totalAcumulado, ingreso) => totalAcumulado + ingreso.valor, 0 );
}

function totalEgresos(){
    return AppState.egresos.reduce((totalAcumulado, egreso) => totalAcumulado + egreso.valor, 0 );
}

function totalDisponible(){ 
    return totalIngresos() - totalEgresos();
}

function calcularPorcentaje(){
    const totIngreso = totalIngresos();
    const totEgresos = totalEgresos();
    if (totIngreso === 0) return 0;
    const porcent = (totEgresos * 100) / totIngreso;
    return parseFloat(porcent.toFixed(2));
}

/* =========================================================
   LÓGICA DE LA PARTE 5 (DETALLES Y PESTAÑAS)
   ========================================================= */

function mostrarTab(tab) {
    document.getElementById('tab-ingresos').style.display = 'none';
    document.getElementById('tab-egresos').style.display = 'none';
    document.getElementById('btn-ingresos').classList.remove('activo');
    document.getElementById('btn-egresos').classList.remove('activo');
    
    document.getElementById(`tab-${tab}`).style.display = 'block';
    document.getElementById(`btn-${tab}`).classList.add('activo');
}

function actualizarListasDetalles() {
    const contenedorIngresos = document.getElementById('lista-ingresos');
    const contenedorEgresos = document.getElementById('lista-egresos');
    let totalIng = totalIngresos();

    contenedorIngresos.innerHTML = '';
    AppState.ingresos.forEach(ingreso => {
        contenedorIngresos.innerHTML += `
            <li>
                <span>${ingreso.descripcion}</span>
                <span class="monto-ingreso">+ ${ingreso.valor.toFixed(2)}</span>
            </li>
        `;
    });

    contenedorEgresos.innerHTML = '';
    AppState.egresos.forEach(egreso => {
        let porcentaje = totalIng > 0 ? (egreso.valor * 100) / totalIng : 0;
        contenedorEgresos.innerHTML += `
            <li>
                <span>${egreso.descripcion}</span>
                <div>
                    <span class="monto-egreso">- ${egreso.valor.toFixed(2)}</span>
                    <span class="badge-porcentaje">${porcentaje.toFixed(2)}%</span>
                </div>
            </li>
        `;
    });
}