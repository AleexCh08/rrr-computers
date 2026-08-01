# RRR Computers ♻️💻

> **🚧 ESTADO DEL PROYECTO: EN DESARROLLO 🚧**
> 
> *Este proyecto se encuentra actualmente en fase de construcción activa. Algunas características, integraciones de pago y configuraciones de despliegue en producción aún están pendientes de implementación.*

## 📖 Descripción Global

**RRR Computers** (Reparar, Reusar y Reciclar) es una plataforma web integral dedicada a darle una segunda vida a los componentes electrónicos. El objetivo principal del sistema es proveer equipos a personas, institutos y organizaciones, reduciendo la basura electrónica mediante un modelo de economía circular.

El sistema funciona a través de dos frentes principales:
1. **Interfaz de Cliente (E-commerce & Servicios):** Permite a los usuarios explorar un catálogo de piezas, utilizar un ensamblador interactivo de computadoras (que valida la compatibilidad en tiempo real), realizar donaciones de equipos que ya no usan, y gestionar tickets de devolución o garantía.
2. **Panel de Administración (ERP):** Un sistema de gestión interno blindado donde el equipo directivo puede monitorear ingresos, aprobar/rechazar donaciones, gestionar el inventario, cambiar los estados logísticos de las órdenes y administrar a los usuarios y mensajes de contacto.

## 🛠️ Tecnologías Utilizadas

El proyecto está construido bajo una arquitectura cliente-servidor separada (Frontend / Backend).

### Frontend (Interfaz de Usuario)
* **Librería Core:** React (JavaScript)
* **Enrutamiento:** React Router DOM (Manejo de rutas y parámetros URL)
* **Animaciones:** Framer Motion (Transiciones fluidas y animaciones de entrada)
* **Iconografía:** React Icons (Feather Icons y Material Design)
* **Peticiones HTTP:** Axios (Comunicación con la API y manejo de tokens)
* **Gestión de Estado Global:** React Hooks (useState, useEffect) y `localStorage` para persistencia de sesión y carrito.

### Backend (Servidor y API)
* **Framework Core:** Django (Python)
* **Construcción de API:** Django REST Framework (DRF)
* **Autenticación y Seguridad:** SimpleJWT (JSON Web Tokens - Access & Refresh tokens)
* **Base de Datos:** SQLite3 (Entorno de desarrollo)
* **CORS:** Django Cors Headers (Comunicación cruzada con React)
* **Paginación & Filtros:** Paginación nativa de DRF (`PageNumberPagination`) y motores de búsqueda (`SearchFilter`, `OrderingFilter`).

## 📦 Dependencias Principales

### Backend (`requirements.txt` / Entorno Virtual)
* `django`
* `djangorestframework`
* `djangorestframework-simplejwt`
* `django-cors-headers`

### Frontend (`package.json`)
* `react` & `react-dom`
* `react-router-dom`
* `framer-motion`
* `react-icons`
* `axios`

## ⚙️ Características Actuales del Sistema

* **Autenticación Segura:** Registro e inicio de sesión encriptado mediante JWT.
* **Catálogo Dinámico:** Motor de búsqueda integrado en la URL, filtrado por categorías, tipos de componentes y rangos de precio.
* **Ensamblador de PC Inteligente:** Algoritmo de validación que alerta sobre incompatibilidades o ausencia de piezas críticas (CPU, RAM, Tarjeta Madre).
* **Carrito de Compras:** Persistente en el navegador y conectado a un flujo de Checkout simulado.
* **Gestión de Donaciones y Devoluciones:** Formularios dinámicos que permiten añadir múltiples componentes en una sola solicitud.
* **Dashboard Administrativo:** Panel con KPI's, gráficos de ingresos dinámicos e historial de actividad reciente.
* **Seguridad de Endpoints:** Rutas de la API protegidas a nivel de base de datos, garantizando que solo el rol `IsAdminUser` pueda mutar o leer datos sensibles de todo el sistema.

---
*Desarrollado por AleexCh.*