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

// Función editar + modal
async function editarCliente(id) {
    try {
        const response = await fetch(`http://localhost:3001/clientes/${id}`);
        const cliente = await response.json();

        document.getElementById('editar-id').value = cliente.id;
        document.getElementById('editar-nombre').value = cliente.nombre;
        document.getElementById('editar-apellido').value = cliente.apellido;
        document.getElementById('editar-celular').value = cliente.celular;
        document.getElementById('editar-dni').value = cliente.dni;
        document.getElementById('editar-email').value = cliente.email;

        document.getElementById('modal-editar').style.display = 'flex';

    } catch (error) {
        alert('Error al obtener datos del cliente 😥');
        console.error(error);
    }
}

//Guarda los cambios del formulario
const formEditar = document.getElementById('form-editar');

formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editar-id').value;
    const clienteActualizado = {
        nombre: document.getElementById('editar-nombre').value,
        apellido: document.getElementById('editar-apellido').value,
        celular: document.getElementById('editar-celular').value,
        dni: document.getElementById('editar-dni').value,
        email: document.getElementById('editar-email').value,
    };

    try {
        await fetch(`http://localhost:3001/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteActualizado),
        });
        alert('Cambios guardados ✅');
        document.getElementById('modal-editar').style.display = 'none';
        location.reload(); // Actualiza la tabla
    } catch (error) {
        alert('Error al guardar cambios 😥');
    }
});

//Cierra el modal si le dan en X
const cerrarModalBtn = document.querySelector('.cerrar');

cerrarModalBtn.addEventListener('click', () => {
    document.getElementById('modal-editar').style.display = 'none';
});

//Cierra el modal si hacen clic fuera de él
window.addEventListener('click', (e) => {
    const modalEditar = document.getElementById('modal-editar');
    if (e.target == modalEditar) {
        modalEditar.style.display = 'none';
    }
});