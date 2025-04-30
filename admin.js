// cargar productos en el listado
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productList = document.getElementById('productList');

    if (productos.length === 0) {
        productList.innerHTML = '<p class="text-muted">No hay productos registrados.</p>';
        return;
    }

    productList.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card mb-3';

card.innerHTML = `
<div class="row g-0">
    <div class="col-md-4">
        <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p class="card-text"><strong>Categoría:</strong> ${producto.categoria}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-warning btn-sm" onclick="abrirModalEdicion(${producto.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    </div>
</div>
`;
        productList.appendChild(card);
    });
}

// eliminar producto
function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

// Capturar el formulario y agrego
document.getElementById('addProductForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = this.nombre.value;
    const precio = parseFloat(this.precio.value);
    const categoria = this.categoria.value;
    const imagenInput = this.imagen;

    if (imagenInput.files.length === 0) {
        alert('Por favor selecciona una imagen.');
        return;
    }

    // Convertir imagen
    const imagenBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(imagenInput.files[0]);
    });

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio,
        categoria,
        imagen: imagenBase64
    };

    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.push(nuevoProducto);

    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    this.reset();
    document.getElementById('vistaPrevia').innerHTML = '';

    mostrarProductos();
});

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);