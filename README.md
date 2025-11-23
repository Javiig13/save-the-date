# Save the Date — Javier & Ana

Sitio estático, elegante y con temática mágica sutil para anunciar la boda de Javier y Ana.

## Estructura
- `index.html`: contenido principal y secciones (Hero, Mensaje, Cuenta atrás, Historia, Ubicación, Alojamiento, RSVP).
- `styles.css`: estilos, paleta Hogwarts sutil, responsive y microinteracciones.
- `script.js`: lógica de UI (menú, cuenta atrás, tabs del mapa, reveal del cupón, link a Typeform).
- `config.js`: configuración editable (URL del Typeform, textos hero, nav, timeline, hoteles, labels de mapa).
- `build/`: scripts de minificación (csso y terser).
- `sw.js`: Service Worker para cache estático y soporte offline.

## Editar contenidos
- **Nombres/fecha/hora/lugar**: en `config.js` (propiedades `couple`, `event`, `venue`).
- **Cupón descuento**: en `config.js` dentro del array `hotels` (hotel La Caminera tiene `coupon.code`).
- **Typeform**: cambia `typeformUrl` en `config.js` por la URL final de tu formulario.
- **Hero**: editar `event.dateDayText`, `event.timeText`, `venue.name` y nombres en `couple`.
- **Navegación**: textos en `nav`.
- **Timeline**: elementos en `story`.
- **Map labels**: en `mapLabels`.
- **Hoteles**: ajustar URLs y descripciones en el array `hotels`.
- **Mapa**: pestañas (La Caminera, Hotel Santa Cruz, Ruta) gestionadas por `script.js` usando datos de `config.js`.

## Desarrollo local

### Previsualización
1. Abre `index.html` directamente en tu navegador, o
2. Usa **Live Server** en VS Code para recarga automática:
   - Instala la extensión "Live Server"
   - Click derecho en `index.html` → "Open with Live Server"

### Minificación opcional (para probar)
Si quieres ver los archivos minificados localmente:

```bash
# Instalar dependencias (solo primera vez)
npm install

# Minificar CSS y JS
npm run build

# Limpiar archivos generados
npm run clean
```

**Nota**: No es necesario minificar localmente. GitHub Actions lo hace automáticamente al desplegar.

## Despliegue en GitHub Pages

### Configuración automática
El repositorio incluye un **GitHub Action** (`.github/workflows/deploy-pages.yml`) que:
1. ✅ Se ejecuta automáticamente con cada `git push` a la rama `main`
2. ✅ Instala dependencias (`npm ci`)
3. ✅ Minifica CSS y JS (`npm run build`)
4. ✅ Copia archivos minificados con nombres originales (evita 404)
5. ✅ Despliega en GitHub Pages

### Primera vez: Activar GitHub Pages
1. Ve a **Settings** → **Pages** en tu repo GitHub
2. En **Source**, selecciona: **GitHub Actions**
3. El workflow se ejecutará automáticamente en el próximo push

### Proceso de despliegue
```bash
# 1. Haz cambios en index.html, styles.css, script.js o config.js
# 2. Commit y push
git add .
git commit -m "Actualizar contenido"
git push origin main

# 3. GitHub Actions minifica y despliega automáticamente
# 4. La web estará disponible en: https://Javiig13.github.io/save-the-date/
```

### Ver el progreso
- En GitHub: pestaña **Actions** → verás el workflow ejecutándose
- El despliegue toma ~2-3 minutos
- Logs muestran estadísticas de minificación (tamaño original vs minificado)

## Optimizaciones implementadas

### Build
- ✅ **CSS**: Minificación con csso (restructure + media merge)
- ✅ **JS**: Minificación con terser (compresión + mangling)
- ✅ Los archivos `.min.css` y `.min.js` se ignoran en git (generados en CI/CD)

### Performance
- ✅ Countdown actualizado cada segundo
- ✅ Efectos condicionados (cursor trail desactivado en móvil y reduced-motion)
- ✅ Content-visibility en secciones pesadas
- ✅ Preload imagen hero
- ✅ Lazy loading de iframes de mapas
- ✅ Preconnect a Typeform al hover

### Accesibilidad
- ✅ Contraste WCAG AA
- ✅ Navegación por teclado
- ✅ Roles ARIA apropiados
- ✅ Respeto a prefers-reduced-motion

## Tecnologías

- **HTML5** semántico
- **CSS3** moderno (grid, custom properties, backdrop-filter)
- **JavaScript** vanilla (ES6+)
- **Google Maps** embebido (sin API key necesaria)
- **Service Worker** para cache offline
- **GitHub Actions** para CI/CD

## Notas técnicas

- **Mapa**: usa iframes de Google Maps por simplicidad. Si quieres pins personalizados migra a Maps JavaScript API.
- **SEO/OG**: incluye meta tags completos para compartir en redes sociales.
- **Sin cookies**: no hay banner de cookies (no tracking externo).
- **Offline-first**: Service Worker cachea assets para funcionamiento sin conexión.

## Comandos disponibles

```bash
npm run build        # Minifica CSS + JS
npm run build:css    # Solo minifica CSS
npm run build:js     # Solo minifica JS
npm run clean        # Elimina archivos generados
npm run dev          # Info para desarrollo local
```

## Licencia

© 2026 Javier & Ana - Proyecto privado

