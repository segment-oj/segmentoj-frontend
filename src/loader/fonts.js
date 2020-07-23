/*
 * This file loads font for pages.
 * We use Fira Code for monospace font.
 * We use Fira Sans for normal font.
 */

Promise.all([
  import('../assets/fonts/Fira_Code/fira_code.css'),
  import('../assets/fonts/Fira_Sans/fira_sans.css')
])
  .then(() => {
    import('../assets/fonts/fonts.css');
  });