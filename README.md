# 🛡️ RiskWatch Frontend

**RiskWatch** es una aplicación web desarrollada con **Angular (última versión)** y **TypeScript** que permite **gestionar proveedores** y **verificar su nivel de riesgo**.  
La aplicación se conecta a una **API externa** que proporciona los datos de las entidades y resultados del proceso de *screening*.

---

## 🚀 Tecnologías principales

| Área | Tecnología | Descripción |
|------|-------------|--------------|
| Framework | **Angular 20+** | Frontend moderno basado en componentes. |
| Lenguaje | **TypeScript** | Tipado estático y escalabilidad. |
| UI | **Bootstrap / Angular Material** | Interfaz moderna y responsiva. |
| Comunicación | **HttpClient (Angular)** | Consumo de la API REST del backend. |
| Build | **Vite / Angular CLI** | Entorno rápido de desarrollo y build optimizado. |

---

## 📁 Estructura del proyecto



## ⚙️ Configuración de entorno

En el archivo `environment.development.ts` configura la **URL base de la API**:

```typescript
export const environment = {
  production: false,
  serverBasePath: 'http://localhost:5076/api/v1' // URL de la API backend
};
````

Así podrás consumir los endpoints usando servicios Angular:

```typescript
this.http.get(`${environment.serverBasePath}/suppliers`);
```

---

## 🧩 Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/tuusuario/riskwatch-frontend.git
cd riskwatch-frontend
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor de desarrollo

```bash
ng serve
```



---

## 💡 Características principales

✅ **Gestión de proveedores:** lista, registro y detalle de cada proveedor.
🔍 **Consulta de riesgo:** muestra coincidencias obtenidas desde la API.
🌐 **Conexión a API REST:** integración simple mediante `HttpClient`.
🎨 **Diseño responsive:** adaptado para pantallas de escritorio y móviles.
🧱 **Arquitectura modular:** separación por *features* y *shared components*.

---

## 📚 Scripts útiles

| Comando    | Descripción                                     |
| ---------- | ----------------------------------------------- |
| `ng serve` | Ejecuta la app en modo desarrollo.              |
| `ng build` | Genera los archivos para producción en `/dist`. |
| `ng test`  | Ejecuta los tests unitarios (si los hay).       |

---

## 📦 Ejemplo de servicio para consumir la API

```typescript
// src/app/core/services/suppliers-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Supplier } from '../../shared/models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SuppliersApiService {
  private apiUrl = `${environment.serverBasePath}/suppliers`;

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }
}
```

---

## 🧑‍💻 Autor

**Alison Arrieta**
📧 [alisonarrieta06@gmail.com](mailto:alisonarrieta06@gmail.com)


---




