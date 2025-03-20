fetch('http://localhost:3001/clientes')
    .then(response => response.json())
    .then(clientes => {
        const tabla = document.getElementById('tabla-clientes');
        clientes.forEach(cliente => {
            const fila = `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.celular}</td>
                    <td>${cliente.dni}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button class="btn editar" onclick="editarCliente(${cliente.id})">Editar</button>
                        <button class="btn eliminar" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    })
    .catch(error => console.error('Error al obtener clientes:', error));

// Función eliminar
function eliminarCliente(id) {
    if (confirm('¿Estás segura de eliminar este cliente? 😢')) {
        fetch(`http://localhost:3000/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente eliminado ✅');
                location.reload(); // Recarga la tabla
            } else {
                alert('Error al eliminar 😥');
            }
        });
    }
}

// Por ahora, solo aviso para la función editar
function editarCliente(id) {
    alert('La función editar se puede implementar después 😄✨');
}
