// Arreglos globales para almacenar las transacciones
let listaIngresos = [];
let listaEgresos = [];

// 1. GESTIÓN DINÁMICA DE PESTAÑAS (TABS)
// Esta función es llamada desde los botones en el HTML (onclick="cambiarTab(...)")
function cambiarTab(tab) {
    const panelIngresos = document.getElementById('panelIngresos');
    const panelEgresos = document.getElementById('panelEgresos');
    const btnIngresos = document.getElementById('boton-ingresos');
    const btnEgresos = document.getElementById('boton-egresos');

    if (tab === 'ingresos') {
        panelIngresos.style.display = 'block';
        panelEgresos.style.display = 'none';
        btnIngresos.classList.add('activo');
        btnEgresos.classList.remove('activo');
    } else if (tab === 'egresos') {
        panelIngresos.style.display = 'none';
        panelEgresos.style.display = 'block';
        btnEgresos.classList.add('activo');
        btnIngresos.classList.remove('activo');
    }
}

// 2. EVENTO DEL BOTÓN "AGREGAR" Y VALIDACIONES
document.getElementById('transacciones').addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Capturar los valores de los inputs usando los IDs del HTML
    const tipo = document.getElementById('tipo-movimiento').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const monto = parseFloat(document.getElementById('monto').value);

    // Validación de campos: El monto debe ser un número válido y mayor a 0
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto numérico mayor a 0.");
        return;
    }
    
    if (descripcion === "") {
        alert("Por favor, ingrese una descripción.");
        return;
    }

    // Crear la nueva transacción
    const nuevaTransaccion = {
        descripcion: descripcion,
        monto: monto
    };

    // Agregar al arreglo correspondiente
    if (tipo === 'ingresos') {
        listaIngresos.push(nuevaTransaccion);
    } else {
        listaEgresos.push(nuevaTransaccion);
    }

    // Limpiar los campos del formulario
    document.getElementById('descripcion').value = '';
    document.getElementById('monto').value = '';

    // Llamar a la función para actualizar la interfaz
    pintarDatos();
});

// 3. PINTAR DATOS ACTUALIZADOS Y MANIPULACIÓN DEL DOM
function pintarDatos() {
    let totalIngresos = 0;
    let totalEgresos = 0;

    const ulIngresos = document.getElementById('listado-ingresos');
    const ulEgresos = document.getElementById('listado-egresos');

    // Limpiar las listas antes de volver a pintarlas
    ulIngresos.innerHTML = '';
    ulEgresos.innerHTML = '';

    // Pintar Ingresos y sumar el total
    listaIngresos.forEach(ingreso => {
        totalIngresos += ingreso.monto;
        const li = document.createElement('li');
        li.innerHTML = `${ingreso.descripcion} <span style="float: right;">+ $${ingreso.monto.toFixed(2)}</span>`;
        ulIngresos.appendChild(li);
    });

    // Pintar Egresos, sumar el total y calcular su porcentaje individual
    listaEgresos.forEach(egreso => {
        totalEgresos += egreso.monto;
        
        let porcentajeDetalle = 0;
        if (totalIngresos > 0) {
            // Fórmula solicitada: %DetalleEgreso = (MontoEgreso * 100) / TotalIngresos 
            porcentajeDetalle = (egreso.monto * 100) / totalIngresos;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            ${egreso.descripcion} 
            <span style="float: right;">
                - $${egreso.monto.toFixed(2)} 
                <span style="background-color: #264653; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 10px;">
                    ${porcentajeDetalle.toFixed(0)}%
                </span>
            </span>`;
        ulEgresos.appendChild(li);
    });

    // Actualizar los datos del cuadro resumen principal
    document.getElementById('total-ingresosPrev').textContent = totalIngresos.toFixed(2);
    document.getElementById('total-egresosPrev').textContent = totalEgresos.toFixed(2);
    
    const montoDisponible = totalIngresos - totalEgresos;
    document.getElementById('monto-disponible').textContent = montoDisponible.toFixed(2);

    // Calcular y actualizar el porcentaje total de gastos
    let porcentajeTotal = 0;
    if (totalIngresos > 0) {
        porcentajeTotal = (totalEgresos * 100) / totalIngresos;
    }
    document.getElementById('porcentaje-gastos').textContent = porcentajeTotal.toFixed(2) + "%";
}

// 4. FUNCIONES AUXILIARES SOLICITADAS POR EL HTML
// El script al final del index.html llama a estas funciones al cargar la página
function tituloFecha() {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const fechaActual = new Date();
    return `Presupuesto de ${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
}

function calcularPorcentaje() {
    return 0; // Valor inicial al cargar la página
}