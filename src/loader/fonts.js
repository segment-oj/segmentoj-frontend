/*
 * This file loads font for pages.
 * We use Fira Code for monospace font
 */

Promise.all([import('../assets/fonts/Fira_Code/fira_code.css')])
  .then(() => {
    import('../assets/fonts/fonts.css');
  });