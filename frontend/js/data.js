export const departments = [
    {
        id: 1,
        name: "Cirugía"
    },
    {
        id: 2,
        name: "Medicina"
    },
    {
        id: 3,
        name: "Ginecología y Obstetricia"
    },
    {
        id: 4,
        name: "Anestesiología"
    },
    {
        id: 5,
        name: "Traumatología"
    }
];


export const specialties = [
    {
        id: 1,
        name: "Cirugía General",
        departmentId: 1
    },
    {
        id: 2,
        name: "Cirugía Pediátrica",
        departmentId: 1
    },
    {
        id: 3,
        name: "Medicina Interna",
        departmentId: 2
    },
    {
        id: 4,
        name: "Ginecología",
        departmentId: 3
    },
    {
        id: 5,
        name: "Obstetricia",
        departmentId: 3
    },
    {
        id: 6,
        name: "Anestesiología",
        departmentId: 4
    },
    {
        id: 7,
        name: "Traumatología",
        departmentId: 5
    }
];


export const employees = [
    {
        id: 1,
        firstName: "Marcelo",
        lastName: "Pérez",
        dni: "70481231",
        departmentId: 1,
        specialtyId: 1,
        active: true
    },
    {
        id: 2,
        firstName: "Juan",
        lastName: "García",
        dni: "72345678",
        departmentId: 1,
        specialtyId: 2,
        active: true
    },
    {
        id: 3,
        firstName: "Carlos",
        lastName: "Zafra",
        dni: "71456329",
        departmentId: 4,
        specialtyId: 6,
        active: true
    },
    {
        id: 4,
        firstName: "Ambar",
        lastName: "Barriga",
        dni: "73652148",
        departmentId: 3,
        specialtyId: 4,
        active: true
    },
    {
        id: 5,
        firstName: "Kian",
        lastName: "Okuhama",
        dni: "70231456",
        departmentId: 2,
        specialtyId: 3,
        active: true
    },
    {
        id: 6,
        firstName: "César",
        lastName: "Dávila",
        dni: "74651230",
        departmentId: 4,
        specialtyId: 6,
        active: false
    }
];