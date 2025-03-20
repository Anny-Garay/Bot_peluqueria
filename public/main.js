document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que se recargue la página

    const datos = {
        nombre: this.nombre.value.trim(),
        apellido: this.apellido.value.trim(),
        celular: this.celular.value.trim(),
        dni: this.dni.value.trim(),
        email: this.email.value.trim()
    };

    fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (response.ok) {
            alert('¡Cliente agregado correctamente! 🎉✨');
            this.reset(); // Limpia el formulario
            setTimeout(() => {
                window.location.href = 'clientes.html'; // Redirige a la lista de clientes
            }, 500); // Pequeño delay suavecito
        } else {
            alert('Ocurrió un error al registrar al cliente 😥');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema de conexión 😔');
    });
});
