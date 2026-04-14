document.addEventListener("DOMContentLoaded", paginaCargada);

const patrones = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/,
    telefono: /^(?:\+504\s?)?\d{4}-?\d{4}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    seleccion: /^.+$/,
    texto: /^[\s\S]{10,}$/
};

function paginaCargada() {
    let btnMenu = document.getElementById("btnMenu");
    let menuPrincipal = document.getElementById("menuPrincipal");

    if (btnMenu != null && menuPrincipal != null) {
        btnMenu.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            menuPrincipal.classList.toggle("mostrar");
        });
    }

    registrarFormulario(
        "formVoluntariado",
        [
            {
                id: "txtNombreVoluntario",
                patron: patrones.nombre,
                ayuda: "Formato: nombre completo. Ejemplo: María López",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe solo letras y espacios. Mínimo 3 caracteres."
            },
            {
                id: "txtTelefonoVoluntario",
                patron: patrones.telefono,
                ayuda: "Formato: 9999-9999 o +504 9999-9999",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un teléfono válido."
            },
            {
                id: "txtCorreoVoluntario",
                patron: patrones.correo,
                ayuda: "Formato: nombre@correo.com",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un correo válido."
            },
            {
                id: "slcAreaApoyo",
                patron: patrones.seleccion,
                ayuda: "Selecciona el área donde deseas apoyar.",
                mensajeVacio: "Debes seleccionar una opción.",
                mensajeError: "Debes seleccionar una opción."
            },
            {
                id: "slcDisponibilidad",
                patron: patrones.seleccion,
                ayuda: "Selecciona tu disponibilidad.",
                mensajeVacio: "Debes seleccionar una opción.",
                mensajeError: "Debes seleccionar una opción."
            },
            {
                id: "txtMotivoVoluntario",
                patron: patrones.texto,
                ayuda: "Mínimo 10 caracteres.",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe al menos 10 caracteres."
            }
        ],
        "mensajeVoluntariado",
        "Tu solicitud fue enviada correctamente.",
        "Revisa los campos marcados e inténtalo de nuevo."
    );

    registrarFormulario(
        "formContacto",
        [
            {
                id: "txtNombreContacto",
                patron: patrones.nombre,
                ayuda: "Formato: nombre completo. Ejemplo: Juan Pérez",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe solo letras y espacios. Mínimo 3 caracteres."
            },
            {
                id: "txtTelefonoContacto",
                patron: patrones.telefono,
                ayuda: "Formato: 9999-9999 o +504 9999-9999",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un teléfono válido."
            },
            {
                id: "txtCorreoContacto",
                patron: patrones.correo,
                ayuda: "Formato: nombre@correo.com",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un correo válido."
            },
            {
                id: "slcAsuntoContacto",
                patron: patrones.seleccion,
                ayuda: "Selecciona el asunto del mensaje.",
                mensajeVacio: "Debes seleccionar una opción.",
                mensajeError: "Debes seleccionar una opción."
            },
            {
                id: "txtMensajeContacto",
                patron: patrones.texto,
                ayuda: "Mínimo 10 caracteres.",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe al menos 10 caracteres."
            }
        ],
        "mensajeContacto",
        "Tu mensaje fue enviado correctamente.",
        "Revisa los campos marcados e inténtalo de nuevo."
    );

    registrarFormulario(
        "formDonaciones",
        [
            {
                id: "txtNombreDonante",
                patron: patrones.nombre,
                ayuda: "Formato: nombre completo. Ejemplo: Ana Ramírez",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe solo letras y espacios. Mínimo 3 caracteres."
            },
            {
                id: "txtTelefonoDonante",
                patron: patrones.telefono,
                ayuda: "Formato: 9999-9999 o +504 9999-9999",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un teléfono válido."
            },
            {
                id: "txtCorreoDonante",
                patron: patrones.correo,
                ayuda: "Formato: nombre@correo.com",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Ingresa un correo válido."
            },
            {
                id: "txtComentarioDonacion",
                patron: patrones.texto,
                ayuda: "Mínimo 10 caracteres.",
                mensajeVacio: "Este campo es obligatorio.",
                mensajeError: "Escribe al menos 10 caracteres."
            }
        ],
        "mensajeDonacion",
        "La información de tu donación fue enviada correctamente.",
        "Revisa los campos marcados e inténtalo de nuevo."
    );

    iniciarCarruselGaleria();
    iniciarFAQ();
}

function registrarFormulario(idFormulario, campos, idMensaje, mensajeExito, mensajeError) {
    let formulario = document.getElementById(idFormulario);

    if (formulario == null) {
        return;
    }

    let i = 0;

    while (i < campos.length) {
        prepararCampo(campos[i], idMensaje);
        i = i + 1;
    }

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        let esValido = validarFormulario(campos, true);

        mostrarMensajeFormulario(idMensaje, esValido, mensajeExito, mensajeError);

        if (esValido) {
            formulario.reset();
            limpiarCamposFormulario(campos);
        }
    });
}

function prepararCampo(campo, idMensaje) {
    let control = document.getElementById(campo.id);

    if (control == null) {
        return;
    }

    let grupo = obtenerGrupoFormulario(control);

    if (grupo == null) {
        return;
    }

    let ayuda = grupo.querySelector(".texto-ayuda");
    let error = grupo.querySelector(".texto-error");

    if (ayuda == null) {
        ayuda = document.createElement("small");
        ayuda.className = "texto-ayuda";
        ayuda.style.display = "block";
        ayuda.style.marginTop = "6px";
        ayuda.style.fontSize = "0.88rem";
        ayuda.style.color = "#7a7a7a";
        grupo.appendChild(ayuda);
    }

    if (error == null) {
        error = document.createElement("small");
        error.className = "texto-error";
        error.style.display = "none";
        error.style.marginTop = "6px";
        error.style.fontSize = "0.88rem";
        error.style.color = "#c62828";
        error.style.fontWeight = "bold";
        grupo.appendChild(error);
    }

    ayuda.textContent = campo.ayuda;

    let eventoPrincipal = "input";

    if (control.tagName.toLowerCase() === "select") {
        eventoPrincipal = "change";
    }

    control.addEventListener(eventoPrincipal, function () {
        if (control.dataset.tocado === "si") {
            validarCampo(campo, false);
        }

        limpiarMensajeFormulario(idMensaje);
    });

    control.addEventListener("blur", function () {
        control.dataset.tocado = "si";
        validarCampo(campo, false);
    });
}

function validarFormulario(campos, forzarMensajes) {
    let esValido = true;
    let i = 0;

    while (i < campos.length) {
        let control = document.getElementById(campos[i].id);

        if (control != null) {
            control.dataset.tocado = "si";
        }

        if (validarCampo(campos[i], forzarMensajes) === false) {
            esValido = false;
        }

        i = i + 1;
    }

    return esValido;
}

function validarCampo(campo, forzarMensajes) {
    let control = document.getElementById(campo.id);

    if (control == null) {
        return false;
    }

    let valor = control.value.trim();
    let grupo = obtenerGrupoFormulario(control);
    let error = null;

    if (grupo != null) {
        error = grupo.querySelector(".texto-error");
    }

    limpiarError(control, error);

    if (valor === "") {
        if (forzarMensajes || control.dataset.tocado === "si") {
            marcarError(control, error, campo.mensajeVacio);
        }

        return false;
    }

    if (campo.patron.test(valor) === false) {
        if (forzarMensajes || control.dataset.tocado === "si") {
            marcarError(control, error, campo.mensajeError);
        }

        return false;
    }

    return true;
}

function marcarError(control, error, mensaje) {
    control.classList.add("error");

    if (error != null) {
        error.textContent = mensaje;
        error.style.display = "block";
    }
}

function limpiarError(control, error) {
    control.classList.remove("error");

    if (error != null) {
        error.textContent = "";
        error.style.display = "none";
    }
}

function limpiarCamposFormulario(campos) {
    let i = 0;

    while (i < campos.length) {
        let control = document.getElementById(campos[i].id);

        if (control != null) {
            control.dataset.tocado = "";
            let grupo = obtenerGrupoFormulario(control);
            let error = null;

            if (grupo != null) {
                error = grupo.querySelector(".texto-error");
            }

            limpiarError(control, error);
        }

        i = i + 1;
    }
}

function obtenerGrupoFormulario(control) {
    return control.closest(".grupo-formulario");
}

function mostrarMensajeFormulario(idMensaje, esValido, mensajeExito, mensajeError) {
    let mensaje = document.getElementById(idMensaje);

    if (mensaje == null) {
        return;
    }

    mensaje.style.fontWeight = "bold";
    mensaje.style.marginTop = "10px";

    if (esValido) {
        mensaje.textContent = mensajeExito;
        mensaje.style.color = "#2e7d32";
    } else {
        mensaje.textContent = mensajeError;
        mensaje.style.color = "#c62828";
    }
}

function limpiarMensajeFormulario(idMensaje) {
    let mensaje = document.getElementById(idMensaje);

    if (mensaje != null) {
        mensaje.textContent = "";
    }
}

function iniciarCarruselGaleria() {
    let visor = document.getElementById("franjaVisor");
    let track = document.getElementById("franjaTrack");
    let btnAnterior = document.getElementById("btnAnterior");
    let btnSiguiente = document.getElementById("btnSiguiente");
    let contenedorIndicadores = document.getElementById("carruselIndicadores");

    if (visor == null || track == null) {
        return;
    }

    let items = track.querySelectorAll(".franja-item");

    if (items.length === 0) {
        return;
    }

    let posicion = 0;
    let intervalo = null;

    function construirIndicadores() {
        if (contenedorIndicadores == null) {
            return;
        }

        contenedorIndicadores.innerHTML = "";

        let i = 0;

        while (i < items.length) {
            let indicador = document.createElement("span");
            indicador.className = "indicador";

            if (i === posicion) {
                indicador.classList.add("activo");
            }

            indicador.addEventListener("click", function () {
                posicion = i;
                mostrarItem();
                iniciarAuto();
            });

            contenedorIndicadores.appendChild(indicador);
            i = i + 1;
        }
    }

    function actualizarIndicadores() {
        if (contenedorIndicadores == null) {
            return;
        }

        let indicadores = contenedorIndicadores.querySelectorAll(".indicador");
        let i = 0;

        while (i < indicadores.length) {
            indicadores[i].classList.remove("activo");
            i = i + 1;
        }

        if (indicadores[posicion] != null) {
            indicadores[posicion].classList.add("activo");
        }
    }

    function mostrarItem() {
        items[posicion].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });

        actualizarIndicadores();
    }

    function siguiente() {
        posicion = posicion + 1;

        if (posicion >= items.length) {
            posicion = 0;
        }

        mostrarItem();
    }

    function anterior() {
        posicion = posicion - 1;

        if (posicion < 0) {
            posicion = items.length - 1;
        }

        mostrarItem();
    }

    function iniciarAuto() {
        detenerAuto();

        intervalo = setInterval(function () {
            siguiente();
        }, 4000);
    }

    function detenerAuto() {
        if (intervalo != null) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }

    if (btnAnterior != null) {
        btnAnterior.addEventListener("click", function () {
            anterior();
            iniciarAuto();
        });
    }

    if (btnSiguiente != null) {
        btnSiguiente.addEventListener("click", function () {
            siguiente();
            iniciarAuto();
        });
    }

    visor.addEventListener("mouseenter", detenerAuto);
    visor.addEventListener("mouseleave", iniciarAuto);

    window.addEventListener("resize", function () {
        mostrarItem();
    });

    construirIndicadores();
    mostrarItem();
    iniciarAuto();
}

function iniciarFAQ() {
    let preguntas = document.querySelectorAll(".faq-pregunta");

    if (preguntas.length === 0) {
        return;
    }

    let i = 0;

    while (i < preguntas.length) {
        preguntas[i].addEventListener("click", function () {
            let respuesta = this.nextElementSibling;
            let icono = this.querySelector("span");

            if (respuesta.classList.contains("mostrar")) {
                respuesta.classList.remove("mostrar");
                this.classList.remove("activa");

                if (icono != null) {
                    icono.textContent = "+";
                }
            } else {
                respuesta.classList.add("mostrar");
                this.classList.add("activa");

                if (icono != null) {
                    icono.textContent = "−";
                }
            }
        });

        i = i + 1;
    }
}