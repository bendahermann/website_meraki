#!/usr/bin/env node

/**
 * Script de inicialización rápida para nuevos proyectos basados en este Sitio Base.
 * Ejecución: npm run setup
 */

const fs = require('fs');
const path = require('path');

console.log('\n========================================================');
console.log('🚀  INICIALIZADOR DE PROYECTO (SITIO BASE HBData)');
console.log('========================================================\n');

// 1. Crear .env.local a partir de .env.example si no existe
const envExamplePath = path.join(__dirname, '..', '.env.example');
const envLocalPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envLocalPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Archivo .env.local creado exitosamente a partir de .env.example');
  } else {
    console.log('⚠️  No se encontró .env.example');
  }
} else {
  console.log('ℹ️  El archivo .env.local ya existe. Se mantiene intacto.');
}

console.log('\n--------------------------------------------------------');
console.log('📋  SIGUIENTES PASOS PARA PERSONALIZAR ESTE PROYECTO:');
console.log('--------------------------------------------------------');
console.log('1. Abre "src/config/site.ts" y define:');
console.log('   - Nombre de marca, slogan y descripción.');
console.log('   - Enlaces de contacto (WhatsApp, email, redes).');
console.log('   - Interruptores modulares en "features" (tienda, cursos, etc.).');
console.log('2. Agrega tus productos y cursos reales en:');
console.log('   - "src/data/mockData.ts" (o conecta tu base de datos / CMS).');
console.log('3. Inicia tu servidor de desarrollo con:');
console.log('   - npm run dev\n');
console.log('========================================================\n');
