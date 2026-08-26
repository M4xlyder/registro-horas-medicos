// ============================================================
// IMPORTACIÓN DE DATOS
// ============================================================

import {
    departments,
    specialties,
    employees
} from "./data.js";


// ============================================================
// ELEMENTO PRINCIPAL
// ============================================================

const app = document.getElementById("app");


// ============================================================
// ICONOS SVG PROFESIONALES
// ============================================================

const icons = {

    dashboard: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    `,

    documents: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M6 3h9l4 4v14H6z"/>
            <path d="M14 3v5h5"/>
            <path d="M9 13h6"/>
            <path d="M9 17h6"/>
        </svg>
    `,

    calendar: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="16" rx="2"/>
            <path d="M16 3v4"/>
            <path d="M8 3v4"/>
            <path d="M3 10h18"/>
            <path d="M8 14h2"/>
            <path d="M14 14h2"/>
            <path d="M8 18h2"/>
        </svg>
    `,

    calendarCheck: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="4" width="18" height="17" rx="2"/>
            <path d="M16 2v4"/>
            <path d="M8 2v4"/>
            <path d="M3 9h18"/>
            <path d="m8 14 2 2 4-4"/>
        </svg>
    `,

    reports: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M4 20V10"/>
            <path d="M10 20V4"/>
            <path d="M16 20v-7"/>
            <path d="M22 20H2"/>
        </svg>
    `,

    settings: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.6h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h2.6v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 .3 1.9 1.7 1.7 0 0 0 1.6 1.3z"/>
        </svg>
    `,

    search: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-4-4"/>
        </svg>
    `,

    download: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M12 3v12"/>
            <path d="m7 10 5 5 5-5"/>
            <path d="M4 21h16"/>
        </svg>
    `,

    printer: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M6 9V3h12v6"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <path d="M6 14h12v7H6z"/>
        </svg>
    `,

    user: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/>
        </svg>
    `,

    building: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M3 21h18"/>
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
            <path d="M9 7h2"/>
            <path d="M13 7h2"/>
            <path d="M9 11h2"/>
            <path d="M13 11h2"/>
            <path d="M9 15h2"/>
            <path d="M13 15h2"/>
            <path d="M10 21v-3h4v3"/>
        </svg>
    `,

    headset: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M4 14v-2a8 8 0 0 1 16 0v2"/>
            <path d="M4 14h3v5H5a1 1 0 0 1-1-1z"/>
            <path d="M20 14h-3v5h2a1 1 0 0 0 1-1z"/>
        </svg>
    `,

    shield: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6z"/>
            <path d="m9 12 2 2 4-4"/>
        </svg>
    `,

    chevronDown: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
            <path d="m6 9 6 6 6-6"/>
        </svg>
    `,

    chevronLeft: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
        </svg>
    `,

    chevronRight: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6"/>
        </svg>
    `,

    trash: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8">
            <path d="M4 7h16"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
            <path d="M6 7l1 14h10l1-14"/>
            <path d="M9 7V4h6v3"/>
        </svg>
    `,

    close: `
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12"/>
            <path d="M18 6L6 18"/>
        </svg>
    `

};


// ============================================================
// ESTADO DE LA APLICACIÓN
// ============================================================

let selectedDepartment = null;
let selectedSpecialty = null;
let selectedEmployee = null;

let calendarDate = new Date(2026, 7, 1);

const selectedDates = new Set();

const schedules = [];

let selectedFile = null;
let selectedFileUrl = null;

const MAX_FILE_SIZE = 5 * 1024 * 1024;


// ============================================================
// CONFIGURACIÓN DEL CALENDARIO
// ============================================================

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const weekDays = [
    "Dom",
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb"
];


// ============================================================
// TIPOS DE TURNO
// ============================================================

const shiftStyles = {

    GD: {
        label: "GD",
        className: "shift-gd"
    },

    GN: {
        label: "GN",
        className: "shift-gn"
    },

    TD: {
        label: "TD",
        className: "shift-td"
    },

    TN: {
        label: "TN",
        className: "shift-tn"
    },

    M: {
        label: "M",
        className: "shift-m"
    },

    T: {
        label: "T",
        className: "shift-t"
    },

    MC: {
        label: "MC",
        className: "shift-mc"
    },

    TC: {
        label: "TC",
        className: "shift-tc"
    },

    MSOP: {
        label: "MSOP",
        className: "shift-msop"
    },

    TP: {
        label: "TP",
        className: "shift-tp"
    }

};


// ============================================================
// ESTRUCTURA PRINCIPAL
// ============================================================

app.innerHTML = `

<div class="app">

    <!-- ========================================================
         SIDEBAR
    ========================================================= -->

    <aside class="sidebar">

        <div class="sidebar-logo">

            <div class="logo-icon">
                HG
            </div>

            <div class="logo-text">

                <strong>
                    HOSPITAL HUARAL
                </strong>

                <span>
                    Registro y Control
                </span>

            </div>

        </div>


        <nav class="nav-menu">

            <!-- DASHBOARD -->

            <a href="#" class="nav-item">

                <span class="nav-icon">
                    ${icons.dashboard}
                </span>

                <span>
                    Dashboard
                </span>

            </a>


            <!-- DOCUMENTOS -->

            <a href="#" class="nav-item">

                <span class="nav-icon">
                    ${icons.documents}
                </span>

                <span>
                    Gestión de documentos
                </span>

            </a>


            <!-- PROGRAMACIÓN -->

            <div class="nav-section">

                <div class="nav-section-title active">

                    <span class="nav-icon">
                        ${icons.calendar}
                    </span>

                    <span>
                        Programación
                    </span>

                    <span class="arrow">
                        ${icons.chevronDown}
                    </span>

                </div>


                <div class="nav-submenu">

                    <a
                        href="#"
                        class="nav-subitem active"
                    >
                        Programación
                    </a>

                </div>

            </div>


            <!-- REPORTES -->

            <a href="#" class="nav-item">

                <span class="nav-icon">
                    ${icons.reports}
                </span>

                <span>
                    Reportes
                </span>

            </a>


            <!-- CONFIGURACIÓN -->

            <a href="#" class="nav-item">

                <span class="nav-icon">
                    ${icons.settings}
                </span>

                <span>
                    Configuración
                </span>

            </a>

        </nav>

    </aside>


    <!-- ========================================================
         MAIN
    ========================================================= -->

    <main class="main">


        <!-- HEADER -->

        <header class="header">

            <div class="header-left">

                <span class="hospital-name">

                    <span class="icon">
                        ${icons.building}
                    </span>

                    Hospital San Juan Bautista de Huaral

                </span>


                <span class="header-divider">
                    /
                </span>


                <span class="header-module">
                    Programación
                </span>

            </div>


            <div class="header-right">

                <button
                    type="button"
                    class="header-button"
                >

                    <span class="icon">
                        ${icons.headset}
                    </span>

                    Soporte

                </button>


                <button
                    type="button"
                    class="header-button"
                >

                    <span class="icon">
                        ${icons.user}
                    </span>

                    Usuario

                    <span class="icon">
                        ${icons.chevronDown}
                    </span>

                </button>


                <button
                    type="button"
                    class="header-button admin-button"
                >

                    <span class="icon">
                        ${icons.shield}
                    </span>

                    ADMIN

                    <span class="icon">
                        ${icons.chevronDown}
                    </span>

                </button>


                <div class="user-avatar">
                    MA
                </div>

            </div>

        </header>


        <!-- ====================================================
             CONTENIDO
        ===================================================== -->

        <section class="content">


            <!-- TÍTULO -->

            <div class="page-title">

                <div>

                    <h1>
                        Programación de Personal
                    </h1>

                    <p>
                        Registro y control de la
                        programación horaria del
                        personal sanitario.
                    </p>

                </div>


                <div class="page-actions">

                    <button
                        type="button"
                        class="secondary-button"
                    >

                        <span class="icon">
                            ${icons.download}
                        </span>

                        Exportar

                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                    >

                        <span class="icon">
                            ${icons.printer}
                        </span>

                        Imprimir

                    </button>

                </div>

            </div>


            <!-- =================================================
                 PROGRAMACIÓN
            ================================================== -->

            <div class="programming-layout">


                <!-- =================================================
                     FILTROS
                ================================================== -->

                <aside class="filters-panel">


                    <!-- DEPARTAMENTO -->

                    <div class="filter-group">

                        <label>
                            Departamento
                        </label>


                        <div
                            class="custom-select"
                            id="departmentSelect"
                        >

                            <button
                                type="button"
                                class="select-button"
                            >

                                <span>
                                    Seleccione una opción
                                </span>

                                <span class="icon">
                                    ${icons.chevronDown}
                                </span>

                            </button>


                            <div
                                class="select-dropdown"
                                id="departmentDropdown"
                            >

                                <div class="select-search">

                                    <input
                                        type="text"
                                        id="departmentSearch"
                                        placeholder="Buscar..."
                                    >

                                </div>


                                <div
                                    class="select-options"
                                    id="departmentOptions"
                                ></div>

                            </div>

                        </div>

                    </div>


                    <!-- ESPECIALIDAD -->

                    <div class="filter-group">

                        <label>
                            Especialidad
                        </label>


                        <div
                            class="custom-select"
                            id="specialtySelect"
                        >

                            <button
                                type="button"
                                class="select-button"
                            >

                                <span>
                                    Seleccione una opción
                                </span>

                                <span class="icon">
                                    ${icons.chevronDown}
                                </span>

                            </button>


                            <div
                                class="select-dropdown"
                                id="specialtyDropdown"
                            >

                                <div class="select-search">

                                    <input
                                        type="text"
                                        id="specialtySearch"
                                        placeholder="Buscar..."
                                    >

                                </div>


                                <div
                                    class="select-options"
                                    id="specialtyOptions"
                                ></div>

                            </div>

                        </div>

                    </div>


                    <!-- PERSONAL -->

                    <div class="employees-header">

                        <div>

                            <span class="employees-title">
                                Personal
                            </span>

                            <span
                                class="employees-count"
                                id="employeeCount"
                            >
                                0
                            </span>

                        </div>


                        <label class="active-switch">

                            <span>
                                Activos
                            </span>

                            <input
                                type="checkbox"
                                id="activeFilter"
                                checked
                            >

                            <span class="switch-slider"></span>

                        </label>

                    </div>


                    <!-- BUSCADOR -->

                    <div class="employee-search">

                        <span class="icon">
                            ${icons.search}
                        </span>

                        <input
                            type="text"
                            id="employeeSearch"
                            placeholder="Buscar personal..."
                        >

                    </div>


                    <!-- LISTA DE PERSONAL -->

                    <div
                        class="employees-list"
                        id="employeesList"
                    ></div>

                </aside>


                <!-- =================================================
                     CALENDARIO
                ================================================== -->

                <section class="calendar-panel">

                    <div class="calendar-header">

                        <div>

                            <h2>
                                Agosto 2026
                            </h2>

                            <p>
                                Seleccione un personal para
                                visualizar su programación.
                            </p>

                        </div>


                        <div class="calendar-actions">

                            <button
                                type="button"
                                title="Mes anterior"
                            >

                                <span class="icon">
                                    ${icons.chevronLeft}
                                </span>

                            </button>


                            <button
                                type="button"
                                title="Ir a hoy"
                            >

                                <span class="icon">
                                    ${icons.calendar}
                                </span>

                                Hoy

                            </button>


                            <button
                                type="button"
                                title="Mes siguiente"
                            >

                                <span class="icon">
                                    ${icons.chevronRight}
                                </span>

                            </button>

                        </div>

                    </div>


                    <div
                        class="calendar-container"
                        id="calendar"
                    ></div>

                </section>

            </div>

        </section>

    </main>

</div>


<!-- ============================================================
     MODAL DE PROGRAMACIÓN
============================================================= -->

<div
    id="scheduleModal"
    class="modal-overlay hidden"
>

    <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="scheduleModalTitle"
    >


        <!-- HEADER DEL MODAL -->

        <div class="modal-header">

            <div>

                <h2 id="scheduleModalTitle">
                    Registrar programación
                </h2>

                <p>
                    Registre el turno para las fechas seleccionadas.
                </p>

            </div>


            <button
                type="button"
                class="modal-close"
                id="closeScheduleModal"
                aria-label="Cerrar"
                title="Cerrar"
            >

                <span class="icon">
                    ${icons.close}
                </span>

            </button>

        </div>


        <!-- BODY -->

        <div class="modal-body">


            <!-- PERSONAL -->

            <div class="form-section">

                <div class="form-section-title">
                    Personal
                </div>


                <div
                    id="selectedEmployeeInfo"
                    class="selected-employee"
                ></div>

            </div>


            <!-- FECHAS -->

            <div class="form-section">

                <div class="form-section-title">

                    Fechas seleccionadas

                    <span
                        id="modalDateCount"
                        class="form-count"
                    >
                        0
                    </span>

                </div>


                <div
                    id="selectedDatesList"
                    class="selected-dates"
                ></div>

            </div>


            <!-- TIPO DE TURNO -->

            <div class="form-section">

                <label
                    for="shiftType"
                    class="form-label"
                >
                    Tipo de turno
                </label>


                <select
                    id="shiftType"
                    class="form-control"
                >

                    <option value="">
                        Seleccione un turno
                    </option>

                    <option value="GD">
                        GD — Guardia Diurna
                    </option>

                    <option value="GN">
                        GN — Guardia Nocturna
                    </option>

                    <option value="TD">
                        TD — Turno Día
                    </option>

                    <option value="TN">
                        TN — Turno Noche
                    </option>

                    <option value="M">
                        M — Mañana
                    </option>

                    <option value="T">
                        T — Tarde
                    </option>

                    <option value="MC">
                        MC — Mañana Consultorio
                    </option>

                    <option value="TC">
                        TC — Tarde Consultorio
                    </option>

                    <option value="MSOP">
                        MSOP — Mañana Sala de Operaciones
                    </option>

                    <option value="TP">
                        TP — Turno Procedimiento
                    </option>

                </select>

            </div>


            <!-- HORARIO -->

            <div class="form-section">

                <div class="form-label">
                    Horario
                </div>


                <div class="time-grid">

                    <div>

                        <label
                            for="startTime"
                            class="form-label-small"
                        >
                            Hora de entrada
                        </label>


                        <input
                            type="time"
                            id="startTime"
                            class="form-control"
                        >

                    </div>


                    <div>

                        <label
                            for="endTime"
                            class="form-label-small"
                        >
                            Hora de salida
                        </label>


                        <input
                            type="time"
                            id="endTime"
                            class="form-control"
                        >

                    </div>

                </div>

            </div>


            <!-- OBSERVACIONES -->

            <div class="form-section">

                <label
                    for="scheduleNotes"
                    class="form-label"
                >
                    Observaciones
                </label>


                <textarea
                    id="scheduleNotes"
                    class="form-control textarea"
                    rows="3"
                    placeholder="Ingrese alguna observación..."
                ></textarea>

            </div>


            <!-- ARCHIVO -->

            <div class="form-section">

                <label
                    for="scheduleFile"
                    class="form-label"
                >
                    Archivo adjunto
                </label>


                <div class="file-upload">

                    <label
                        for="scheduleFile"
                        class="file-upload-button"
                    >

                        <span class="icon">
                            ${icons.documents}
                        </span>

                        Seleccionar archivo

                    </label>


                    <input
                        type="file"
                        id="scheduleFile"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    >

                </div>


                <div
                    id="selectedFileInfo"
                    class="selected-file-info"
                >
                    No se ha seleccionado ningún archivo.
                </div>


                <small class="file-help">
                    PDF, Word, Excel o imágenes.
                    Tamaño máximo: 5 MB.
                </small>

            </div>

        </div>


        <!-- FOOTER -->

        <div class="modal-footer">

            <button
                type="button"
                class="modal-button secondary"
                id="cancelScheduleModal"
            >
                Cancelar
            </button>


            <button
                type="button"
                class="modal-button primary"
                id="saveSchedule"
            >
                Guardar programación
            </button>

        </div>

    </div>

</div>

`;


// ============================================================
// ELEMENTOS DEL DOM
// ============================================================

const departmentSelect =
    document.getElementById(
        "departmentSelect"
    );

const specialtySelect =
    document.getElementById(
        "specialtySelect"
    );

const departmentOptions =
    document.getElementById(
        "departmentOptions"
    );

const specialtyOptions =
    document.getElementById(
        "specialtyOptions"
    );

const departmentSearch =
    document.getElementById(
        "departmentSearch"
    );

const specialtySearch =
    document.getElementById(
        "specialtySearch"
    );

const employeesList =
    document.getElementById(
        "employeesList"
    );

const employeeCount =
    document.getElementById(
        "employeeCount"
    );

const employeeSearch =
    document.getElementById(
        "employeeSearch"
    );

const activeFilter =
    document.getElementById(
        "activeFilter"
    );

const calendarElement =
    document.getElementById(
        "calendar"
    );

const calendarTitle =
    document.querySelector(
        ".calendar-header h2"
    );


// ============================================================
// ELEMENTOS DEL MODAL
// ============================================================

const scheduleModal =
    document.getElementById(
        "scheduleModal"
    );

const closeScheduleModal =
    document.getElementById(
        "closeScheduleModal"
    );

const cancelScheduleModal =
    document.getElementById(
        "cancelScheduleModal"
    );

const saveSchedule =
    document.getElementById(
        "saveSchedule"
    );

const scheduleFile =
    document.getElementById(
        "scheduleFile"
    );

const selectedFileInfo =
    document.getElementById(
        "selectedFileInfo"
    );


// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function formatDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function formatDisplayDate(date) {

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${day}/${month}/${year}`;
}


function generateId() {

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {

        return crypto.randomUUID();

    }

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    );
}


function getSelectedEmployee() {

    if (!selectedEmployee) {
        return null;
    }

    return employees.find(
        employee =>
            employee.id ===
            selectedEmployee
    ) || null;
}


function getSpecialtyName(
    specialtyId
) {

    const specialty =
        specialties.find(
            item =>
                item.id ===
                specialtyId
        );

    return specialty
        ? specialty.name
        : "Sin especialidad";
}


function getShiftLabel(
    shiftType
) {

    const labels = {

        GD: "Guardia Diurna",
        GN: "Guardia Nocturna",
        TD: "Turno Día",
        TN: "Turno Noche",
        M: "Mañana",
        T: "Tarde",
        MC: "Mañana Consultorio",
        TC: "Tarde Consultorio",
        MSOP: "Mañana Sala Operaciones",
        TP: "Turno Procedimiento"

    };

    return labels[shiftType] ||
        shiftType;
}


function calculateShiftHours(
    startTime,
    endTime
) {

    if (
        !startTime ||
        !endTime
    ) {

        return 0;

    }


    const [
        startHour,
        startMinute
    ] =
        startTime
            .split(":")
            .map(Number);


    const [
        endHour,
        endMinute
    ] =
        endTime
            .split(":")
            .map(Number);


    let startMinutes =
        startHour * 60 +
        startMinute;


    let endMinutes =
        endHour * 60 +
        endMinute;


    if (
        endMinutes <=
        startMinutes
    ) {

        endMinutes +=
            24 * 60;

    }


    const totalMinutes =
        endMinutes -
        startMinutes;


    return Number(
        (
            totalMinutes / 60
        ).toFixed(2)
    );
}


function isToday(date) {

    const today =
        new Date();

    return (

        date.getFullYear() ===
        today.getFullYear()

        &&

        date.getMonth() ===
        today.getMonth()

        &&

        date.getDate() ===
        today.getDate()

    );
}


// ============================================================
// FILTROS
// ============================================================

function renderDepartments(
    searchText = ""
) {

    const text =
        searchText
            .toLowerCase()
            .trim();


    const filtered =
        departments.filter(
            department =>
                department.name
                    .toLowerCase()
                    .includes(text)
        );


    departmentOptions.innerHTML =
        "";


    filtered.forEach(
        department => {

            const option =
                document.createElement(
                    "div"
                );


            option.className =
                "select-option";


            option.textContent =
                department.name;


            option.addEventListener(
                "click",
                () => {

                    selectedDepartment =
                        department.id;

                    selectedSpecialty =
                        null;


                    departmentSelect
                        .querySelector(
                            ".select-button span"
                        )
                        .textContent =
                        department.name;


                    specialtySelect
                        .querySelector(
                            ".select-button span"
                        )
                        .textContent =
                        "Seleccione una opción";


                    departmentSelect
                        .classList
                        .remove(
                            "open"
                        );


                    renderSpecialties();

                    renderEmployees();

                }
            );


            departmentOptions
                .appendChild(
                    option
                );

        }
    );
}


function renderSpecialties(
    searchText = ""
) {

    const text =
        searchText
            .toLowerCase()
            .trim();


    let filtered =
        specialties.filter(
            specialty =>
                !selectedDepartment ||
                specialty.departmentId ===
                selectedDepartment
        );


    filtered =
        filtered.filter(
            specialty =>
                specialty.name
                    .toLowerCase()
                    .includes(text)
        );


    specialtyOptions.innerHTML =
        "";


    filtered.forEach(
        specialty => {

            const option =
                document.createElement(
                    "div"
                );


            option.className =
                "select-option";


            option.textContent =
                specialty.name;


            option.addEventListener(
                "click",
                () => {

                    selectedSpecialty =
                        specialty.id;


                    specialtySelect
                        .querySelector(
                            ".select-button span"
                        )
                        .textContent =
                        specialty.name;


                    specialtySelect
                        .classList
                        .remove(
                            "open"
                        );


                    renderEmployees();

                }
            );


            specialtyOptions
                .appendChild(
                    option
                );

        }
    );
}


function renderEmployees() {

    const searchText =
        employeeSearch
            .value
            .toLowerCase()
            .trim();


    const onlyActive =
        activeFilter.checked;


    const filtered =
        employees.filter(
            employee => {

                if (
                    onlyActive &&
                    !employee.active
                ) {

                    return false;

                }


                if (
                    selectedDepartment &&
                    employee.departmentId !==
                    selectedDepartment
                ) {

                    return false;

                }


                if (
                    selectedSpecialty &&
                    employee.specialtyId !==
                    selectedSpecialty
                ) {

                    return false;

                }


                const fullName =
                    `${employee.firstName} ${employee.lastName}`
                        .toLowerCase();


                return fullName.includes(
                    searchText
                );

            }
        );


    employeeCount.textContent =
        filtered.length;


    employeesList.innerHTML =
        "";


    if (
        filtered.length === 0
    ) {

        employeesList.innerHTML = `

            <div class="calendar-empty">

                <p>
                    No se encontraron resultados.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(
        employee => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "employee-item";


            if (
                selectedEmployee ===
                employee.id
            ) {

                item.classList.add(
                    "selected"
                );

            }


            const initials =
                (
                    employee.firstName[0] +
                    employee.lastName[0]
                ).toUpperCase();


            const specialty =
                specialties.find(
                    specialty =>
                        specialty.id ===
                        employee.specialtyId
                );


            item.innerHTML = `

                <div class="employee-avatar">
                    ${initials}
                </div>


                <div class="employee-info">

                    <span class="employee-name">
                        ${employee.firstName}
                        ${employee.lastName}
                    </span>


                    <span class="employee-specialty">
                        ${
                            specialty
                                ? specialty.name
                                : "Sin especialidad"
                        }
                    </span>

                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectedEmployee =
                        employee.id;


                    selectedDates.clear();


                    renderEmployees();

                    renderCalendar();

                }
            );


            employeesList.appendChild(
                item
            );

        }
    );
}


// ============================================================
// CALENDARIO
// ============================================================

function createCalendarDay(
    dayNumber,
    otherMonth,
    date
) {

    const cell =
        document.createElement(
            "div"
        );


    cell.className =
        "calendar-day";


    if (otherMonth) {

        cell.classList.add(
            "other-month"
        );

    }


    if (
        date &&
        date.getDay() === 0
    ) {

        cell.classList.add(
            "sunday",
            "weekend"
        );

    }


    if (
        date &&
        date.getDay() === 6
    ) {

        cell.classList.add(
            "weekend"
        );

    }


    const number =
        document.createElement(
            "div"
        );


    number.className =
        "day-number";


    number.textContent =
        dayNumber;


    cell.appendChild(
        number
    );


    const content =
        document.createElement(
            "div"
        );


    content.className =
        "day-content";


    cell.appendChild(
        content
    );


    if (
        date &&
        isToday(date)
    ) {

        cell.classList.add(
            "today"
        );

    }


    // ========================================================
    // MOSTRAR TURNOS
    // ========================================================

    if (
        date &&
        selectedEmployee
    ) {

        const dateKey =
            formatDate(date);


        const daySchedules =
            schedules.filter(
                schedule =>
                    schedule.employeeId ===
                        selectedEmployee &&
                    schedule.date ===
                        dateKey
            );


        daySchedules.forEach(
            schedule => {

                const scheduleItem =
                    document.createElement(
                        "div"
                    );


                const style =
                    shiftStyles[
                        schedule.shiftType
                    ] || {

                        label:
                            schedule.shiftType,

                        className:
                            "shift-default"

                    };


                scheduleItem.className =
                    `day-schedule ${style.className}`;


                scheduleItem.innerHTML = `

                    <div class="schedule-code">
                        ${style.label}
                    </div>


                    <div class="schedule-name">
                        ${getShiftLabel(
                            schedule.shiftType
                        )}
                    </div>


                    <div class="schedule-time">

                        ${
                            schedule.fileName
                                ? `
                                    <div class="schedule-file">
                                        ${icons.documents}
                                        <span>
                                            Documento
                                        </span>
                                    </div>
                                `
                                : ""
                        }


                        ${
                            schedule.startTime &&
                            schedule.endTime
                                ? `
                                    ${schedule.startTime}
                                    -
                                    ${schedule.endTime}
                                `
                                : "Horario no definido"
                        }

                    </div>

                `;


                content.appendChild(
                    scheduleItem
                );

            }
        );

    }


    // ========================================================
    // SELECCIÓN
    // ========================================================

    if (date) {

        const dateKey =
            formatDate(date);


        if (
            selectedDates.has(
                dateKey
            )
        ) {

            cell.classList.add(
                "selected"
            );

        }


        cell.addEventListener(
            "click",
            () => {

                selectCalendarDate(
                    dateKey
                );

            }
        );

    }


    return cell;
}


function renderCalendar() {

    const year =
        calendarDate.getFullYear();


    const month =
        calendarDate.getMonth();


    calendarTitle.textContent =
        `${monthNames[month]} ${year}`;


    calendarElement.innerHTML =
        "";


    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "calendar-grid";


    // CABECERA

    weekDays.forEach(
        (day, index) => {

            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "calendar-weekday";


            header.textContent =
                day;


            if (
                index === 0
            ) {

                header.classList.add(
                    "sunday"
                );

            }


            grid.appendChild(
                header
            );

        }
    );


    // PRIMER DÍA

    const firstDay =
        new Date(
            year,
            month,
            1
        );


    const firstWeekDay =
        firstDay.getDay();


    // MES ANTERIOR

    const previousMonthLastDay =
        new Date(
            year,
            month,
            0
        ).getDate();


    for (
        let i =
            firstWeekDay - 1;

        i >= 0;

        i--
    ) {

        grid.appendChild(
            createCalendarDay(
                previousMonthLastDay - i,
                true,
                null
            )
        );

    }


    // MES ACTUAL

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let day = 1;

        day <= daysInMonth;

        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        grid.appendChild(
            createCalendarDay(
                day,
                false,
                date
            )
        );

    }


    // MES SIGUIENTE

    const totalCells =
        42;


    const usedCells =
        firstWeekDay +
        daysInMonth;


    const remaining =
        totalCells -
        usedCells;


    for (
        let day = 1;

        day <= remaining;

        day++
    ) {

        grid.appendChild(
            createCalendarDay(
                day,
                true,
                null
            )
        );

    }


    calendarElement.appendChild(
        grid
    );


    // ========================================================
    // BARRA DE SELECCIÓN
    // ========================================================

    const selectionBar =
        document.createElement(
            "div"
        );


    selectionBar.className =
        "calendar-legend";


    selectionBar.innerHTML = `

        <div class="selection-bar">

            <div class="selection-info">

                <span class="selection-icon">
                    ${icons.calendarCheck}
                </span>


                <span class="selection-count">
                    ${selectedDates.size}
                </span>


                <span>
                    ${
                        selectedDates.size === 1
                            ? "día seleccionado"
                            : "días seleccionados"
                    }
                </span>

            </div>


            <div class="selection-actions">

                <button
                    type="button"
                    class="selection-button"
                    id="clearSelection"
                    ${
                        selectedDates.size === 0
                            ? "disabled"
                            : ""
                    }
                >

                    <span class="icon">
                        ${icons.trash}
                    </span>

                    Limpiar

                </button>


                <button
                    type="button"
                    class="selection-button primary"
                    id="registerSchedule"
                    ${
                        selectedDates.size === 0 ||
                        !selectedEmployee
                            ? "disabled"
                            : ""
                    }
                >

                    <span class="icon">
                        ${icons.calendarCheck}
                    </span>

                    Registrar turno

                </button>

            </div>

        </div>

    `;


    calendarElement.appendChild(
        selectionBar
    );


    // LIMPIAR

    document
        .getElementById(
            "clearSelection"
        )
        ?.addEventListener(
            "click",
            () => {

                selectedDates.clear();

                renderCalendar();

            }
        );


    // REGISTRAR

    document
        .getElementById(
            "registerSchedule"
        )
        ?.addEventListener(
            "click",
            openScheduleModal
        );

}


// ============================================================
// SELECCIONAR FECHA
// ============================================================

function selectCalendarDate(
    dateKey
) {

    if (!selectedEmployee) {

        alert(
            "Primero seleccione un miembro del personal."
        );

        return;

    }


    if (
        selectedDates.has(
            dateKey
        )
    ) {

        selectedDates.delete(
            dateKey
        );

    } else {

        selectedDates.add(
            dateKey
        );

    }


    renderCalendar();

}


// ============================================================
// MODAL
// ============================================================

function openScheduleModal() {

    if (!selectedEmployee) {

        alert(
            "Primero seleccione un miembro del personal."
        );

        return;

    }


    if (
        selectedDates.size === 0
    ) {

        alert(
            "Seleccione al menos un día."
        );

        return;

    }


    document.getElementById(
        "scheduleModalTitle"
    ).textContent =
        "Registrar programación";


    resetScheduleForm();

    populateScheduleModal();


    scheduleModal
        .classList
        .remove(
            "hidden"
        );

}


function closeScheduleModalWindow() {

    scheduleModal
        .classList
        .add(
            "hidden"
        );

}


function resetScheduleForm() {

    document.getElementById(
        "shiftType"
    ).value = "";


    document.getElementById(
        "startTime"
    ).value = "";


    document.getElementById(
        "endTime"
    ).value = "";


    document.getElementById(
        "scheduleNotes"
    ).value = "";


    scheduleFile.value =
        "";


    selectedFile =
        null;


    selectedFileUrl =
        null;


    selectedFileInfo.textContent =
        "No se ha seleccionado ningún archivo.";

}


function populateScheduleModal() {

    const employee =
        getSelectedEmployee();


    if (!employee) {
        return;
    }


    document.getElementById(
        "selectedEmployeeInfo"
    ).innerHTML = `

        <div>

            <div class="selected-employee-name">

                ${employee.firstName}
                ${employee.lastName}

            </div>


            <div class="selected-employee-specialty">

                ${getSpecialtyName(
                    employee.specialtyId
                )}

            </div>

        </div>

    `;


    const dates =
        Array.from(
            selectedDates
        ).sort();


    document.getElementById(
        "modalDateCount"
    ).textContent =
        dates.length;


    document.getElementById(
        "selectedDatesList"
    ).innerHTML =
        dates
            .map(
                dateKey => {

                    const date =
                        new Date(
                            `${dateKey}T00:00:00`
                        );


                    return `

                        <span class="selected-date">
                            ${formatDisplayDate(date)}
                        </span>

                    `;

                }
            )
            .join("");

}


// ============================================================
// ARCHIVO
// ============================================================

scheduleFile.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) {
            return;
        }


        if (
            file.size >
            MAX_FILE_SIZE
        ) {

            alert(
                "El archivo supera el tamaño máximo permitido de 5 MB."
            );

            scheduleFile.value =
                "";

            return;
        }


        const allowedExtensions = [

            ".pdf",
            ".doc",
            ".docx",
            ".xls",
            ".xlsx",
            ".jpg",
            ".jpeg",
            ".png"

        ];


        const fileName =
            file.name.toLowerCase();


        const validExtension =
            allowedExtensions.some(
                extension =>
                    fileName.endsWith(
                        extension
                    )
            );


        if (!validExtension) {

            alert(
                "Tipo de archivo no permitido."
            );

            scheduleFile.value =
                "";

            return;
        }


        selectedFile =
            file;


        selectedFileUrl =
            URL.createObjectURL(
                file
            );


        const sizeMB =
            (
                file.size /
                (1024 * 1024)
            ).toFixed(2);


        selectedFileInfo.innerHTML = `

            <strong>
                ${file.name}
            </strong>

            <span>
                ${sizeMB} MB
            </span>

        `;

    }
);


// ============================================================
// GUARDAR PROGRAMACIÓN
// ============================================================

saveSchedule.addEventListener(
    "click",
    () => {

        const employee =
            getSelectedEmployee();


        if (!employee) {

            alert(
                "No se encontró el personal seleccionado."
            );

            return;

        }


        const shiftType =
            document.getElementById(
                "shiftType"
            ).value;


        const startTime =
            document.getElementById(
                "startTime"
            ).value;


        const endTime =
            document.getElementById(
                "endTime"
            ).value;


        const notes =
            document.getElementById(
                "scheduleNotes"
            ).value.trim();


        if (!shiftType) {

            alert(
                "Seleccione el tipo de turno."
            );

            return;

        }


        if (
            !startTime ||
            !endTime
        ) {

            alert(
                "Debe ingresar la hora de entrada y salida."
            );

            return;

        }


        const hours =
            calculateShiftHours(
                startTime,
                endTime
            );


        const dates =
            Array.from(
                selectedDates
            );


        dates.forEach(
            date => {

                const schedule = {

                    id:
                        generateId(),

                    employeeId:
                        employee.id,

                    employeeName:
                        `${employee.firstName} ${employee.lastName}`,

                    specialtyId:
                        employee.specialtyId,

                    specialtyName:
                        getSpecialtyName(
                            employee.specialtyId
                        ),

                    date,

                    shiftType,

                    startTime,

                    endTime,

                    hours,

                    notes,

                    fileName:
                        selectedFile
                            ? selectedFile.name
                            : null,

                    fileType:
                        selectedFile
                            ? selectedFile.type
                            : null,

                    fileSize:
                        selectedFile
                            ? selectedFile.size
                            : null,

                    fileUrl:
                        selectedFileUrl || null

                };


                const existingIndex =
                    schedules.findIndex(
                        item =>
                            item.employeeId ===
                                employee.id &&
                            item.date ===
                                date
                    );


                if (
                    existingIndex >= 0
                ) {

                    schedules[
                        existingIndex
                    ] =
                        schedule;

                } else {

                    schedules.push(
                        schedule
                    );

                }

            }
        );


        closeScheduleModalWindow();

        selectedDates.clear();

        renderCalendar();


        alert(
            `${dates.length} programación(es) registrada(s) correctamente.`
        );

    }
);


// ============================================================
// CERRAR MODAL
// ============================================================

closeScheduleModal.addEventListener(
    "click",
    closeScheduleModalWindow
);


cancelScheduleModal.addEventListener(
    "click",
    closeScheduleModalWindow
);


scheduleModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            scheduleModal
        ) {

            closeScheduleModalWindow();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !scheduleModal.classList.contains(
                "hidden"
            )
        ) {

            closeScheduleModalWindow();

        }

    }
);


// ============================================================
// EVENTOS DE FILTROS
// ============================================================

departmentSearch.addEventListener(
    "input",
    event => {

        renderDepartments(
            event.target.value
        );

    }
);


specialtySearch.addEventListener(
    "input",
    event => {

        renderSpecialties(
            event.target.value
        );

    }
);


employeeSearch.addEventListener(
    "input",
    () => {

        renderEmployees();

    }
);


activeFilter.addEventListener(
    "change",
    () => {

        renderEmployees();

    }
);


// ============================================================
// SELECTS
// ============================================================

departmentSelect
    .querySelector(
        ".select-button"
    )
    .addEventListener(
        "click",
        () => {

            departmentSelect
                .classList
                .toggle(
                    "open"
                );


            specialtySelect
                .classList
                .remove(
                    "open"
                );

        }
    );


specialtySelect
    .querySelector(
        ".select-button"
    )
    .addEventListener(
        "click",
        () => {

            specialtySelect
                .classList
                .toggle(
                    "open"
                );


            departmentSelect
                .classList
                .remove(
                    "open"
                );


            renderSpecialties();

        }
    );


document.addEventListener(
    "click",
    event => {

        if (
            !departmentSelect.contains(
                event.target
            )
        ) {

            departmentSelect
                .classList
                .remove(
                    "open"
                );

        }


        if (
            !specialtySelect.contains(
                event.target
            )
        ) {

            specialtySelect
                .classList
                .remove(
                    "open"
                );

        }

    }
);


// ============================================================
// NAVEGACIÓN DEL CALENDARIO
// ============================================================

const calendarButtons =
    document.querySelectorAll(
        ".calendar-actions button"
    );


calendarButtons[0].addEventListener(
    "click",
    () => {

        calendarDate =
            new Date(
                calendarDate.getFullYear(),
                calendarDate.getMonth() - 1,
                1
            );


        selectedDates.clear();

        renderCalendar();

    }
);


calendarButtons[1].addEventListener(
    "click",
    () => {

        const today =
            new Date();


        calendarDate =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        selectedDates.clear();

        renderCalendar();

    }
);


calendarButtons[2].addEventListener(
    "click",
    () => {

        calendarDate =
            new Date(
                calendarDate.getFullYear(),
                calendarDate.getMonth() + 1,
                1
            );


        selectedDates.clear();

        renderCalendar();

    }
);


// ============================================================
// INICIALIZACIÓN
// ============================================================

renderDepartments();

renderSpecialties();

renderEmployees();

renderCalendar();


console.log(
    "Sistema de Registro y Control iniciado correctamente."
);