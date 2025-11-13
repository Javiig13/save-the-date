# Save the Date — Javier & Ana

Sitio estático, elegante y con temática mágica sutil para anunciar la boda de Javier y Ana.

## Estructura
- `index.html`: contenido principal y secciones (Hero, Mensaje, Cuenta atrás, Historia, Ubicación, Alojamiento, SRC).
- `styles.css`: estilos, paleta Hogwarts sutil, responsive y microinteracciones.
- `script.js`: lógica de UI (menú, cuenta atrás, tabs del mapa, reveal del cupón, link a Typeform).
- `config.js`: configuración editable (URL del Typeform, textos hero, nav, timeline, hoteles, labels de mapa).
- `styles.min.css` / `script.min.js`: versión minificada tras ejecutar build (opcional para producción).
- `build/`: scripts de minificación (csso y terser).

## Editar contenidos
- Nombres/fecha/hora/lugar: dentro de `index.html` (Hero y Ubicación).
- Cupón: en `index.html` (sección Alojamiento) y su texto visible.
- Typeform: cambia `typeformUrl` en `config.js` por la URL final.
- Hero: editar `event.dateDayText`, `event.timeText`, `venue.name` y nombres en `couple`.
- Navegación: textos en `nav`.
- Timeline: elementos en `story`.
- Map labels: en `mapLabels`.
- Hoteles: URLs en las tarjetas de Alojamiento.
- Mapa: pestañas (La Caminera, Hotel Santa Cruz, Ruta) gestionadas por `script.js`.

## Previsualizar
Abre `index.html` en tu navegador. Para desarrollo con servidor local (opcional):
- En VS Code puedes usar la extensión "Live Server" o cualquier servidor estático.

## Despliegue
- GitHub Pages, Netlify, Vercel, Firebase Hosting o similar. Solo necesitas subir estos archivos.
	- Para usar versiones minificadas: ejecutar `npm install` y luego `npm run build`; sustituir referencias a `styles.css` y `script.js` por las minificadas si se desea.
	- Incluye `sw.js` (Service Worker) para cache estático básico y soporte offline. Si no lo quieres, elimina el archivo y la porción de registro en `script.js`.

## Notas
- Mapa: usa iframes de Google Maps para simplicidad sin API key. Si quieres pins personalizados o más control, se puede migrar a Maps JavaScript API.
- No incluye SEO/OG ni banner de cookies a petición.
- Accesibilidad y rendimiento priorizados (contraste, navegación por teclado, lazy iframe).
- Optimizaciones: countdown cada segundo, efectos condicionados (cursor trail desactivado en móvil y reduced-motion), content-visibility en secciones, preload imagen hero, minificado opcional.
