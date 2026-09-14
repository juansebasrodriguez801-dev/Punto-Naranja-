

function mostrarSeccion(seccion) {

    document.getElementById("inicio").style.display = "none";

    document.getElementById(seccion).style.display = "block";

}

// function  crear funciones y los bloques de codigo //

//let sirve para declarar las variables //
function iniciarSesion() {

    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;
    let rol = document.getElementById("rol").value;

    // Administrador
    if (usuario === "admin" && contrasena === "1234" && rol === "administrador") {

        localStorage.setItem("rol", "administrador");

        window.location.href = "inventario.html";

    }

    // Empleado
    else if (usuario === "empleado" && contrasena === "5678" && rol === "empleado") {

        localStorage.setItem("rol", "empleado");

        window.location.href = "inventario.html";

    }

    // Cliente
    else if (usuario === "usuario" && contrasena === "0000" && rol === "usuario") {

        localStorage.setItem("rol", "usuario");

        window.location.href = "compras.html";

    }

    // Datos incorrectos
    else {

        document.getElementById("mensaje").textContent =
        "Usuario, contraseña o rol incorrecto";

    }
}

let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

function agregarProducto() {

    let nombre = document.getElementById("producto").value;
    let precio = Number(document.getElementById("precio").value);
    let cantidad = Number(document.getElementById("cantidad").value);

    inventario.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });

    localStorage.setItem("inventario", JSON.stringify(inventario));

    mostrarInventario();
}


// inventario //

function mostrarInventario() {

    let lista = document.getElementById("listaInventario");

    if (!lista) return;

    lista.innerHTML = "";

    inventario.forEach(function(producto) {

        lista.innerHTML += `
            <p>
                ${producto.nombre} |
                Precio: $${producto.precio} |
                Cantidad: ${producto.cantidad}
            </p>
        `;
    });
}

mostrarInventario();

// ventas //

function cargarProductosVenta() {

    let select = document.getElementById("productoVenta");

    if (!select) return;

    inventario.forEach(function(producto, indice) {

        select.innerHTML += `
            <option value="${indice}">
                ${producto.nombre}
            </option>
        `;
    });
}

function realizarVenta() {

    let indice = document.getElementById("productoVenta").value;
    let cantidad = Number(document.getElementById("cantidadVenta").value);

    let producto = inventario[indice];

    if (cantidad > producto.cantidad) {
        document.getElementById("resultadoVenta").textContent =
        "No hay suficiente inventario";
        return;
    }

    let total = producto.precio * cantidad;

    producto.cantidad -= cantidad;

    let ventas = Number(localStorage.getItem("ventas")) || 0;

    ventas += total;

    localStorage.setItem("ventas", ventas);
    localStorage.setItem("inventario", JSON.stringify(inventario));

    document.getElementById("resultadoVenta").textContent =
    "Venta realizada. Total: $" + total;
}

cargarProductosVenta();

// finanzas //

function mostrarFinanzas() {

    let ingresos = Number(localStorage.getItem("ventas")) || 0;
    let gastos = Number(localStorage.getItem("gastos")) || 0;

    document.getElementById("ingresos").textContent =
    "$" + ingresos;

    document.getElementById("ganancia").textContent =
    "$" + (ingresos - gastos);
}

function guardarGastos() {

    let gastos = Number(document.getElementById("gastos").value);

    localStorage.setItem("gastos", gastos);

    mostrarFinanzas();
}

mostrarFinanzas();

// compras //

function cargarProductosCompra() {

    let select = document.getElementById("productoCompra");

    if (!select) return;

    inventario.forEach(function(producto, indice) {

        select.innerHTML += `
            <option value="${indice}">
                ${producto.nombre} - $${producto.precio}
            </option>
        `;
    });
}

function calcularCompra() {

    let indice = document.getElementById("productoCompra").value;
    let cantidad = Number(document.getElementById("cantidadCompra").value);

    let producto = inventario[indice];

    let total = producto.precio * cantidad;

    document.getElementById("resultadoCompra").textContent =
    "Total de la compra: $" + total;
}

cargarProductosCompra();
