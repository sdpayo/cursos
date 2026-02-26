# Configuración de Google Sheets para TP - Relación Físico Perceptual

## ✅ IMPORTANTE: Usar el MISMO Google Sheets existente

**NO necesitas crear un nuevo Google Sheets.** Usa el mismo archivo que ya tienes configurado.

El código crea **hojas/pestañas diferentes** dentro del mismo archivo:
- 🔹 **Cadena Acústica** (u otros TPs)
- 🔹 **Relacion Fisico Perceptual** ← NUEVA
- 🔹 Futuros TPs

---

## Paso 1: Actualizar el código de Apps Script

1. Abre tu **Google Sheets existente**
2. Ve a **Extensiones → Apps Script**
3. **Reemplaza TODO** el código con el de: `APPS_SCRIPT_CODIGO.js`
4. Guarda (Ctrl + S)

## Paso 2: ¿Ya tienes implementación?

### ✅ Si ya tienes URL de Apps Script funcionando:
- **NO hagas nada más**
- Usa la **MISMA URL** en el HTML
- Los cambios ya están activos

### ⚙️ Si NO tienes implementación:
1. Apps Script → **"Implementar"** → **"Nueva implementación"**
2. Tipo: **"Aplicación web"**
3. Ejecutar como: **"Yo"**
4. Acceso: **"Cualquier persona"**
5. **Copia la URL** que te da

## Paso 3: Actualizar HTML

1. Abre: `src/trabajo-practico-relacion-fisico-perceptual.html`
2. Línea ~718, reemplaza:
```javascript
const scriptURL = 'YOUR_SCRIPT_ID';
```
Por:
```javascript
const scriptURL = 'https://script.google.com/macros/s/TU_URL_AQUI/exec';
```

## Paso 4: Probar

1. Abre el HTML en navegador
2. Completa el formulario
3. En Google Sheets verás la **nueva pestaña** "Relacion Fisico Perceptual"

---

## 📊 Estructura del Google Sheets

```
📄 TPs Acústica Musical
  ├── 📑 Cadena Acústica
  ├── 📑 Relacion Fisico Perceptual ← NUEVA
  └── 📑 (Futuros TPs)
```

### Columnas en "Relacion Fisico Perceptual" (35 total):
- **Timestamp** - Fecha/hora
- **Nombre** - Nombre completo
- **Email** - Email
- **Carrera** - Carrera
- **Porcentaje** - % aciertos (0-100)
- **ex1 a ex10** - TRUE/FALSE (10 columnas)
- **ex11, ex11b, ex12, ex12b... ex20, ex20b** - TRUE/FALSE (20 columnas)

---

## 🧪 Probar desde Apps Script

Ejecuta la función `testRelacionFisicoPerceptual()` para crear datos de prueba.

---

## ❓ Solución de problemas

### No llegan datos
- Verifica la URL en el HTML
- Apps Script → Ejecuciones (⏱️) para ver errores

### Error "No autorizado"
- Apps Script → Implementaciones → Editar
- Verifica "Acceso: Cualquier persona"

---

## 🎯 Ventajas

✅ Un solo archivo Google Sheets  
✅ Una sola URL para todos los TPs  
✅ Datos organizados por pestaña  
✅ Fácil comparación entre TPs
