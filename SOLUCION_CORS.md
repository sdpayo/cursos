# ⚠️ INSTRUCCIONES URGENTES - CORS SIGUE FALLANDO

## El problema:
El Apps Script NO tiene la función `doOptions()` o no se actualizó correctamente.

---

## ✅ SOLUCIÓN - HACER TODO DE NUEVO:

### PASO 1: Verifica el código en Apps Script

1. Abre tu Google Sheet
2. Extensiones → Apps Script
3. **Verifica que el código tenga ESTAS DOS FUNCIONES:**

```javascript
// Esta función DEBE estar al inicio (antes de doPost)
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  // ... resto del código
}
```

**Si NO está `doOptions()`:** Borra TODO y copia el contenido de `APPS_SCRIPT_CODIGO.js`

---

### PASO 2: BORRA la implementación actual

1. En Apps Script: **Implementar → Gestionar implementaciones**
2. Verás tu implementación actual
3. Haz clic en **Archivar** (icono de basurero 🗑️)
4. Confirma

---

### PASO 3: Crea una NUEVA implementación

1. **Implementar → Nueva implementación**
2. Haz clic en el engranaje ⚙️ junto a "Seleccionar tipo"
3. Selecciona **"Aplicación web"**
4. Configuración:
   - Descripción: "TP v3 - CORS Fixed"
   - **Ejecutar como: Yo**
   - **Quién tiene acceso: Cualquier persona**
5. Haz clic en **"Implementar"**

---

### PASO 4: Copia la NUEVA URL

Aparecerá una URL que termina en `/exec` - **CÓPIALA COMPLETA**

---

### PASO 5: Actualiza script.js

Pégame aquí la nueva URL para que yo actualice el archivo automáticamente.

O manualmente:
1. Abre `src/scripts/script.js`
2. Línea 500, cambia:
```javascript
const SCRIPT_URL = 'TU_NUEVA_URL_AQUI';
```

---

## 🔍 IMPORTANTE:

La función `doOptions()` es CRÍTICA para CORS. Sin ella, el navegador bloquea la petición.

Verifica que tu código en Apps Script tenga exactamente esto al inicio:

```javascript
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

Si no la tiene, copia TODO desde `APPS_SCRIPT_CODIGO.js` nuevamente.
