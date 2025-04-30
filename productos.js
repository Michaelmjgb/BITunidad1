document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

function cargarProductos() {
    // Obtener productos guardados en localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Seleccionar el contenedor
    const contenedor = document.getElementById('productos-container');

    // crear su tarjeta
    productosGuardados.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('product-card', 'text-center', 'p-3');

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.classList.add('img-fluid', 'mb-2');
        img.style.maxHeight = '150px';
        img.style.objectFit = 'contain';

        const nombre = document.createElement('div');
        nombre.classList.add('product-name', 'mb-2');
        nombre.textContent = producto.nombre;

        const precio = document.createElement('div');
        precio.classList.add('product-price', 'mb-2');
        precio.textContent = `$${producto.precio.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.classList.add('btn', 'btn-primary', 'btn-sm');
        botonAgregar.textContent = 'Agregar al carrito';

        // para agregar al carrito
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        // Estructura de la tarjeta
        card.appendChild(img);
        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(botonAgregar);
        col.appendChild(card);
        contenedor.appendChild(col);
    });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`¡${producto.nombre} agregado al carrito!`);
}