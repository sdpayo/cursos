# 🔧 GUÍA DE DEBUGGING - Formulario a Google Sheets

## ✅ PASO 1: Verificar el Apps Script

1. **Abre tu Google Sheet** https://docs.google.com/spreadsheets/d/14mNbegHaK-A8LCcE8m_U3wmZPVEsB3RKBga3PzLzIOI/edit?gid=1609907489#gid=1609907489

2. Ve a **Extensiones → Apps Script**

3. **BORRA TODO** el código que esté ahí

4. Copia y pega el código completo de `APPS_SCRIPT_CODIGO.js` (incluye la función doOptions para CORS)

5. Guarda el proyecto (Ctrl+S)

6. **IMPORTANTE - Ejecuta la función de prueba:**
   - En el menú superior, selecciona la función `testDoPost`
   - Haz clic en ▶️ Ejecutar
   - Autoriza los permisos si te los pide
   - Verifica que aparezca una nueva hoja llamada "Test" con datos de prueba

7. Si la prueba funciona, procede al Paso 2

---

## ✅ PASO 2: Redesplegar el Web App

**MUY IMPORTANTE:** Cada vez que cambias el código, debes redesplegar.

1. En Apps Script, haz clic en **Implementar → Nueva implementación**

2. Configuración:
   - Tipo: Aplicación web
   - Descripción: "Formulario TP v2" (o cualquier nombre nuevo)
   - Ejecutar como: **Yo** (tu cuenta)
   - Quién tiene acceso: **Cualquier persona** (o "Cualquier persona con enlace de la organización")

3. Haz clic en **Implementar**

4. **COPIA LA NUEVA URL** que te da (es diferente a la anterior)

5. La URL debe terminar en `/exec` (NO en `/dev`)

---

## ✅ PASO 3: Actualizar la URL en el código local

1. Abre el archivo `src/scripts/script.js`

2. Busca esta línea (línea ~495):
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby...';
   ```

3. Reemplázala con la NUEVA URL que copiaste en el Paso 2

4. Guarda el archivo

---

## ✅ PASO 4: Probar el formulario

1. Abre `src/tp-c_a.html` en tu navegador
   - Usa un servidor local: `python -m http.server 5500` en PowerShell
   - O abre con Live Server de VS Code

2. Abre las Herramientas de Desarrollador (F12)
   - Ve a la pestaña **Console**

3. Completa el formulario y envía

4. En la consola deberías ver:
   ```
   Enviando datos: {sheetName: "Cadena Acustica", nombre: "...", ...}
   Respuesta del servidor: {ok: true, message: "Datos guardados"}
   ```

5. Verifica en Google Sheets que aparezca una nueva hoja "Cadena Acustica" con tus datos

---

## 🐛 Si NO funciona:

### A) Si en la consola ves un error CORS:
- Ve a Apps Script
- Verifica que en "Quién tiene acceso" está configurado como "Cualquier persona"
- Redesplega y copia la NUEVA URL

### B) Si en la consola no ves "Enviando datos...":
- Verifica que `src/scripts/script.js` se esté cargando
- Abre el archivo HTML y verifica que tenga:
  ```html
  <script src="scripts/script.js"></script>
  ```

### C) Si el formulario se resetea pero no se guarda:
- Abre Apps Script
- Ve a **Ejecuciones** (icono de reloj ⏱️ en el menú izquierdo)
- Verifica si hay ejecuciones y qué errores tienen
- Revisa los logs con Logger.log

### D) Si todo parece funcionar pero no hay datos:
- Verifica que el Apps Script esté asociado al Sheet correcto
- En Apps Script, arriba dice "Proyecto sin título" - debe estar vinculado a tu Sheet

---

## 📝 ESTRUCTURA ESPERADA DEL PAYLOAD

El formulario envía esto:
```json
{
  "sheetName": "Cadena Acustica",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "carrera": "Prof. Ed. Sup de Música con Orientación Instrumentos - ESM 6003",
  "carrera_corta": "ESM Instrumentos",
  "pregunta1": "Respuesta 1...",
  "pregunta2": "Respuesta 2...",
  "pregunta3": "Respuesta 3...",
  "timestamp": "29/12/2025 10:43:41"
}
```

---

## ✨ Para crear más TPs:

Solo necesitas duplicar el archivo HTML y cambiar:

```html
<form id="tpForm" class="tp-form-container" data-sheet-name="NOMBRE_DE_LA_CLASE">
```

Por ejemplo:
- `data-sheet-name="Movimiento Armonico"`
- `data-sheet-name="Cuerdas"`
- `data-sheet-name="Propagacion Acustica"`

Cada uno creará automáticamente su propia pestaña en el Google Sheet.
