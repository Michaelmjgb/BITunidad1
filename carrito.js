document.addEventListener("DOMContentLoaded", () => {
    const carritoContainer = document.getElementById("carrito-container");
  
    function cargarCarrito() {
      carritoContainer.innerHTML = "";
  
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
      if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
      }
  
      // Mostrar producto
      carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(div);
      });
    }
  
    // Eliminar producto por su posición
    window.eliminarProducto = function(index) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.splice(index, 1); // Quita el producto en esa posición
      localStorage.setItem("carrito", JSON.stringify(carrito));
      cargarCarrito(); // Vuelve a cargar los productos
    };
  
    cargarCarrito();
  });
  