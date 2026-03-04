// ===================================================
// CÓDIGO PARA GOOGLE APPS SCRIPT
// TRABAJOS PRÁCTICOS - ACÚSTICA MUSICAL
// ===================================================
// Este código maneja MÚLTIPLES trabajos prácticos:
// - Cadena Acústica
// - Relación Físico Perceptual
// - MAS (y más a futuro)
// Cada TP crea su propia HOJA dentro del mismo archivo
// ===================================================

function doPost(e) {
  try {
    Logger.log('Evento completo: ' + JSON.stringify(e));
    if (!e) throw new Error('No se recibió evento (e es undefined)');

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

    // Usa el ID de tu archivo de Google Sheets
    // Reemplaza 'TU_ID_DE_SHEET' por el ID real de tu archivo (lo encuentras en la URL entre /d/ y /edit)
    const ss = SpreadsheetApp.openById('14mNbegHaK-A8LCcE8m_U3wmZPVEsB3RKBga3PzLzIOI');
    const sheetName = data.sheetName || 'Respuestas';

    // Dispatcher: agrega aquí tus TPs
    switch (sheetName) {
      case 'Relacion Fisico Perceptual':
        return handleRelacionFisicoPerceptual(ss, data, sheetName);
      case 'Cadena Acustica':
        return handleCadenaAcustica(ss, data, sheetName);
      case 'MAS':
        return handleMAS(ss, data, sheetName);
      // Agrega más TPs aquí
      default:
        return handleDefaultTP(ss, data, sheetName);
    }
  } catch (err) {
    Logger.log('ERROR: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handler para Relación Físico Perceptual
function handleRelacionFisicoPerceptual(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = [
      'Timestamp', 'Nombre', 'Email', 'Carrera Corta', 'Total Correctas',
      'ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6', 'ex7', 'ex8', 'ex9', 'ex10',
      'ex11', 'ex11b', 'ex12', 'ex12b', 'ex13', 'ex13b', 'ex14', 'ex14b',
      'ex15', 'ex15b', 'ex16', 'ex16b', 'ex17', 'ex17b', 'ex18', 'ex18b',
      'ex19', 'ex19b', 'ex20', 'ex20b'
    ];
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  const rowData = [
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || '',
    data.total_correctas || 0
  ];
  for (let i = 1; i <= 10; i++) {
    const key = 'ex' + i;
    const value = data[key];
    rowData.push(value == 1 || value === '1' ? 1 : 0);
  }
  const exercises3tone = ['ex11', 'ex12', 'ex13', 'ex14', 'ex15', 'ex16', 'ex17', 'ex18', 'ex19', 'ex20'];
  exercises3tone.forEach(ex => {
    const value1 = data[ex];
    const value2 = data[ex + 'b'];
    rowData.push(value1 == 1 || value1 === '1' ? 1 : 0);
    rowData.push(value2 == 1 || value2 === '1' ? 1 : 0);
  });
  sheet.appendRow(rowData);
  Logger.log('Datos guardados en hoja: ' + sheetName);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados exitosamente' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handler para Cadena Acústica (ejemplo, personaliza según tus preguntas)
function handleCadenaAcustica(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp', 'Nombre', 'Email', 'Carrera Corta',
      'Pregunta1', 'Pregunta2', 'Pregunta3', 'Pregunta4', 'Pregunta5'
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 9);
  }
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || '',
    data.Pregunta1 || '',
    data.Pregunta2 || '',
    data.Pregunta3 || '',
    data.Pregunta4 || '',
    data.Pregunta5 || ''
  ]);
  Logger.log('Datos guardados en hoja: ' + sheetName);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handler para MAS (personaliza según tus preguntas)
function handleMAS(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp', 'Nombre', 'Email', 'Carrera Corta',
      'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'Total Correctas'
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 16);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 16);
  }
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || '',
    data.P1 || '',
    data.P2 || '',
    data.P3 || '',
    data.P4 || '',
    data.P5 || '',
    data.P6 || '',
    data.P7 || '',
    data.P8 || '',
    data.P9 || '',
    data.P10 || '',
    data.P11 || '',
    data.P12 || '',
    data.total_correctas || 0
  ]);
  Logger.log('Datos guardados en hoja: ' + sheetName);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados exitosamente' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handler default para TPs antiguos o no especificados
function handleDefaultTP(ss, data, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'Timestamp', 'Nombre', 'Email', 'Carrera Corta'
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 4);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#a38f84');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 4);
  }
  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.email || '',
    data.carrera_corta || ''
  ]);
  Logger.log('Datos guardados en hoja: ' + sheetName);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Datos guardados' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handler OPTIONS para CORS
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
