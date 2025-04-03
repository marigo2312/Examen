document.addEventListener("DOMContentLoaded", function () {
    agregarExtras();
    agregarBebidas();
});

function agregarExtras() {
    const extras = ["Queso extra", "Salsa especial", "Sin cebolla"];
    const extrasContainer = document.getElementById("extras-container");

    const label = document.createElement("p");
    label.textContent = "Extras:";
    extrasContainer.appendChild(label);

    extras.forEach(extra => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = "20"; // Cada extra cuesta $20

        const label = document.createElement("label");
        label.textContent = ` ${extra}`;

        extrasContainer.appendChild(checkbox);
        extrasContainer.appendChild(label);
        extrasContainer.appendChild(document.createElement("br"));
    });
}

function agregarBebidas() {
    const bebidas = [
        { nombre: "Chica", precio: 0 },
        { nombre: "Mediana", precio: 10 },
        { nombre: "Grande", precio: 20 }
    ];
    const bebidaContainer = document.getElementById("bebida-container");

    const label = document.createElement("p");
    label.textContent = "Tamaño de la bebida:";
    bebidaContainer.appendChild(label);

    bebidas.forEach(bebida => {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "bebida";
        radio.value = bebida.precio;

        const label = document.createElement("label");
        label.textContent = ` ${bebida.nombre}`;

        bebidaContainer.appendChild(radio);
        bebidaContainer.appendChild(label);
        bebidaContainer.appendChild(document.createElement("br"));
    });

    // Seleccionar "Chica" por defecto
    bebidaContainer.querySelector("input").checked = true;
}

function calcularTotal() {
    const platillo = document.getElementById("platillo").value;
    const cantidad = parseInt(document.getElementById("cantidad").value) || 1;

    const precios = {
        hamburguesa: 150,
        pizza: 200,
        ensalada: 120
    };

    let total = precios[platillo] * cantidad;

    // Sumar extras seleccionados
    document.querySelectorAll("#extras-container input:checked").forEach(extra => {
        total += parseInt(extra.value);
    });

    // Sumar precio de la bebida seleccionada
    const bebidaSeleccionada = document.querySelector("input[name='bebida']:checked");
    total += parseInt(bebidaSeleccionada.value);

    // Mostrar resumen
    const resumenTexto = `Platillo: ${platillo}\nCantidad: ${cantidad}\nExtras: ${
        document.querySelectorAll("#extras-container input:checked").length
    }\nTamaño de bebida: ${bebidaSeleccionada.nextSibling.textContent.trim()}\nTotal: $${total.toFixed(2)}`;

    document.getElementById("resumen").textContent = resumenTexto;
    document.getElementById("resumen-container").classList.remove("hidden");
}

function limpiarPedido() {
    document.getElementById("cantidad").value = 1;
    document.querySelectorAll("#extras-container input").forEach(extra => (extra.checked = false));
    document.querySelector("input[name='bebida']").checked = true;
    document.getElementById("resumen-container").classList.add("hidden");
}
