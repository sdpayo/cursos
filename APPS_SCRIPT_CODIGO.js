// ===================================================
// CÓDIGO PARA GOOGLE APPS SCRIPT
// TRABAJOS PRÁCTICOS - ACÚSTICA MUSICAL
// ===================================================
// Este código maneja MÚLTIPLES trabajos prácticos:
// - Cadena Acústica
// - Relación Físico Perceptual
// - (Agregar más según necesites)
// 
// Cada TP crea su propia HOJA dentro del mismo archivo
// ===================================================

function doPost(e) {
  try {
    // Log para debugging
    Logger.log('Evento completo: ' + JSON.stringify(e));
    
    // Verificar que e existe
    if (!e) {
      throw new Error('No se recibió evento (e es undefined)');
    }
    
    Logger.log('Tipo de postData: ' + (e.postData ? e.postData.type : 'No hay postData'));
    Logger.log('Contenido postData: ' + (e.postData ? e.postData.contents : 'No hay postData'));
    Logger.log('Parámetros: ' + JSON.stringify(e.parameter));

    // Soportar JSON (application/json) y x-www-form-urlencoded
    var data;
    if (e.postData && e.postData.type && e.postData.type.indexOf('application/json') !== -1) {
      try {
        data = JSON.parse(e.postData.contents || '{}');
      } catch (parseErr) {
        Logger.log('Fallo al parsear JSON, usando parámetros: ' + parseErr);
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = data.sheetName || 'Respuestas';
    
    Logger.log('Guardando en hoja: ' + sheetName);
    
    // Detectar tipo de TP y crear hoja correspondiente
    if (sheetName === 'Relacion Fisico Perceptual') {
      return handleRelacionFisicoPerceptual(ss, data, sheetName);
    } else {
      // Trabajos prácticos antiguos (Cadena Acústica, etc.)
      return handleOtherTP(ss, data, sheetName);
    }
    
  } catch (err) {
    Logger.log('ERROR: ' + err.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Maneja TP: Relación Físico Perceptual
function handleRelacionFisicoPerceptual(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    // Agregar encabezados
    const headers = [
      'Timestamp',
      'Nombre',
      'Email',
      'Carrera Corta',
      'Total Correctas',
      // Ejercicios 1-10 (2 tonos)
      'ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6', 'ex7', 'ex8', 'ex9', 'ex10',
      // Ejercicios 11-20 (3 tonos, 2 preguntas cada uno)
      'ex11', 'ex11b', 'ex12', 'ex12b', 'ex13', 'ex13b', 'ex14', 'ex14b',
      'ex15', 'ex15b', 'ex16', 'ex16b', 'ex17', 'ex17b', 'ex18', 'ex18b',
      'ex19', 'ex19b', 'ex20', 'ex20b'
    ];
    
    sheet.appendRow(headers);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  // Preparar fila de datos
  const rowData = [
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || '',
    data.total_correctas || 0
  ];
  
  // Agregar respuestas de ejercicios 1-10
  for (let i = 1; i <= 10; i++) {
    const key = 'ex' + i;
    const value = data[key];
    rowData.push(value == 1 || value === '1' ? 1 : 0);
  }
  
  // Agregar respuestas de ejercicios 11-20 (con 'b')
  const exercises3tone = ['ex11', 'ex12', 'ex13', 'ex14', 'ex15', 'ex16', 'ex17', 'ex18', 'ex19', 'ex20'];
  exercises3tone.forEach(ex => {
    const value1 = data[ex];
    const value2 = data[ex + 'b'];
    rowData.push(value1 == 1 || value1 === '1' ? 1 : 0);
    rowData.push(value2 == 1 || value2 === '1' ? 1 : 0);
  });

  // Agregar fila a la hoja
  sheet.appendRow(rowData);
  Logger.log('Datos guardados en hoja: ' + sheetName);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados exitosamente' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Maneja otros TPs (Cadena Acústica, etc.)
function handleOtherTP(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Agregar encabezados
    sheet.appendRow([
      'Timestamp',
      'Nombre',
      'Email',
      'Carrera Corta',
      'Espantapajaros_Girondo',
      'Cronicas_Ferreteras',
      'Ni_una_sola_palabra_de_amor'
    ]);
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 7);
  }

  // Agregar fila con datos
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || '',
    data.Espantapajaros_Girondo || '',
    data.Cronicas_Ferreteras || '',
    data.Ni_una_sola_palabra_de_amor || ''
  ]);

  Logger.log('Datos guardados en hoja: ' + sheetName);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función de prueba para Relación Físico Perceptual
function testRelacionFisicoPerceptual() {
  const testData = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        sheetName: 'Relacion Fisico Perceptual',
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        carrera_corta: 'ESM Instrumentos',
        total_correctas: 25,
        ex1: 1, ex2: 1, ex3: 0, ex4: 1, ex5: 1,
        ex6: 0, ex7: 1, ex8: 1, ex9: 1, ex10: 0,
        ex11: 1, ex11b: 1, ex12: 0, ex12b: 1,
        ex13: 1, ex13b: 0, ex14: 1, ex14b: 1,
        ex15: 0, ex15b: 1, ex16: 1, ex16b: 1,
        ex17: 1, ex17b: 0, ex18: 0, ex18b: 1,
        ex19: 1, ex19b: 1, ex20: 0, ex20b: 0
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log('Resultado test: ' + result.getContent());
}

// Función de prueba para otros TPs (Cadena Acústica, etc.)
function testDoPost() {
  const testData = {
    parameter: {
      sheetName: 'Test',
      nombre: 'Prueba',
      email: 'test@test.com',
      carrera_corta: 'ESM Instrumentos',
      Espantapajaros_Girondo: 'Respuesta 1',
      Cronicas_Ferreteras: 'Respuesta 2',
      Ni_una_sola_palabra_de_amor: 'Respuesta 3',
      timestamp: new Date().toLocaleString('es-AR')
    }
  };
  
  const result = doPost(testData);
  Logger.log('Resultado: ' + result.getContent());
}

// Función para manejar OPTIONS (CORS)
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
