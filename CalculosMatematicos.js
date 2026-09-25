// Arreglos globales para almacenar los datos
let listaIngresos = [];
let listaEgresos = [];

// 1. GESTIÓN DINÁMICA DE PESTAÑAS (Llamada desde el HTML con onclick="mostrarTab('...')")
function mostrarTab(tab) {
    const tabIngresos = document.getElementById('tab-ingresos');
    const tabEgresos = document.getElementById('tab-egresos');
    const btnIngresos = document.getElementById('btn-ingresos');
    const btnEgresos = document.getElementById('btn-egresos');

    if (tab === 'ingresos') {
        tabIngresos.style.display = 'block';
        tabEgresos.style.display = 'none';
        btnIngresos.classList.add('activo');
        btnEgresos.classList.remove('activo');
    } else if (tab === 'egresos') {
        tabIngresos.style.display = 'none';
        tabEgresos.style.display = 'block';
        btnEgresos.classList.add('activo');
        btnIngresos.classList.remove('activo');
    }
}

// 2. EVENTO DEL BOTÓN "AGREGAR" Y VALIDACIONES
document.getElementById('transacciones').addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita recargar la página

    const tipo = document.getElementById('tipo-movimiento').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const monto = parseFloat(document.getElementById('monto').value);

    // Validar que el monto sea número y mayor a 0
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto numérico mayor a 0.");
        return;
    }
    
    // Validar que la descripción no esté vacía
    if (descripcion === "") {
        alert("Por favor, ingrese una descripción.");
        return;
    }

    // Crear el objeto y agregarlo a su lista
    const nuevaTransaccion = {
        descripcion: descripcion,
        monto: monto
    };

    if (tipo === 'ingresos') {
        listaIngresos.push(nuevaTransaccion);
    } else {
        listaEgresos.push(nuevaTransaccion);
    }

    // Limpiar los inputs
    document.getElementById('descripcion').value = '';
    document.getElementById('monto').value = '';

    // Pintar los datos actualizados
    pintarDatos();
});

// 3. PINTAR DATOS ACTUALIZADOS Y MANIPULACIÓN DEL DOM
function pintarDatos() {
    let totalIngresos = 0;
    let totalEgresos = 0;

    const ulIngresos = document.getElementById('lista-ingresos');
    const ulEgresos = document.getElementById('lista-egresos');

    // Limpiar las listas visuales
    ulIngresos.innerHTML = '';
    ulEgresos.innerHTML = '';

    // Pintar Ingresos
    listaIngresos.forEach(ingreso => {
        totalIngresos += ingreso.monto;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${ingreso.descripcion}</span> 
            <span class="monto-ingreso">+ $${ingreso.monto.toFixed(2)}</span>
        `;
        ulIngresos.appendChild(li);
    });

    // Pintar Egresos y calcular su porcentaje individual
    listaEgresos.forEach(egreso => {
        totalEgresos += egreso.monto;
        
        // Fórmula: (MontoEgreso * 100) / TotalIngresos[cite: 2]
        let porcentajeDetalle = 0;
        if (totalIngresos > 0) {
            porcentajeDetalle = (egreso.monto * 100) / totalIngresos;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${egreso.descripcion}</span> 
            <div>
                <span class="monto-egreso">- $${egreso.monto.toFixed(2)}</span>
                <span class="badge-porcentaje">${porcentajeDetalle.toFixed(0)}%</span>
            </div>
        `;
        ulEgresos.appendChild(li);
    });

    // 4. ACTUALIZAR EL RESUMEN PRINCIPAL
    const montoDisponible = totalIngresos - totalEgresos;
    document.getElementById('total-ingresos').textContent = `$${totalIngresos.toFixed(2)}`;
    document.getElementById('total-egresos').textContent = `$${totalEgresos.toFixed(2)}`;
    document.getElementById('monto-disponible').textContent = `$${montoDisponible.toFixed(2)}`;

    // Porcentaje total de gastos: (TotalEgresos * 100) / TotalIngresos[cite: 2]
    let porcentajeTotal = 0;
    if (totalIngresos > 0) {
        porcentajeTotal = (totalEgresos * 100) / totalIngresos;
    }
    document.getElementById('porcentaje-gastos').textContent = `${porcentajeTotal.toFixed(2)}%`;
}

// 5. INICIALIZAR EL TÍTULO CON LA FECHA ACTUAL[cite: 2]
window.onload = function() {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const fechaActual = new Date();
    document.getElementById('titulo-presupuesto').textContent = `Presupuesto de ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
};
