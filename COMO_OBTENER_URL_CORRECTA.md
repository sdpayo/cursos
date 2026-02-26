# 🎯 CÓMO OBTENER LA URL CORRECTA DEL WEB APP

## ⚠️ URL INCORRECTA (la que tienes ahora):
```
https://script.google.com/macros/library/d/1AefLGtmhXmiqklwLQMzuS0-f5bvi2GniUJKD_ggbqC8SDLgtrgTQX_9f/3
```
❌ Tiene "library" 
❌ Termina en "/3"
❌ Esta es la URL de desarrollo, NO la del Web App

---

## ✅ URL CORRECTA (la que necesitas):
Debe verse así:
```
https://script.google.com/macros/s/AKfycby...un_codigo_largo.../exec
```
✔️ Tiene "/macros/s/"
✔️ Termina en "/exec"
✔️ Esta SÍ es la URL del Web App desplegado

---

## 📋 PASOS PARA OBTENER LA URL CORRECTA:

### 1. Abre Apps Script
- Ve a tu Google Sheet
- Extensiones → Apps Script

### 2. Despliega como Aplicación Web
Haz clic en el botón azul **"Implementar"** (arriba a la derecha)

Selecciona **"Nueva implementación"**

### 3. Configura el despliegue
- **Tipo:** Haz clic en el engranaje ⚙️ y selecciona **"Aplicación web"**
- **Descripción:** "TP Formularios v1" (o cualquier nombre)
- **Ejecutar como:** **Yo (tu email)**
- **Quién tiene acceso:** **Cualquier persona** 

### 4. Haz clic en "Implementar"

### 5. COPIA LA URL
Aparecerá una ventana con:
```
Implementación de aplicación web
URL de aplicación web: https://script.google.com/macros/s/AKfycby.../exec
```

**ESA es la URL correcta** - cópiala completa (termina en `/exec`)

---

## 🔄 Si ya desplegaste antes:

1. En Apps Script, haz clic en **"Implementar"** → **"Gestionar implementaciones"**

2. Verás tu implementación existente con la URL correcta

3. Si dice "Tipo: Biblioteca" ❌ - **bórrala** y crea una nueva como "Aplicación web"

4. Si dice "Tipo: Aplicación web" ✅ - **copia la URL** de ahí

---

## 📝 Después de obtener la URL:

Actualiza el archivo `src/scripts/script.js` línea 500:

```javascript
const SCRIPT_URL = 'TU_NUEVA_URL_QUE_TERMINA_EN_/exec';
```

Guarda y prueba el formulario nuevamente.
