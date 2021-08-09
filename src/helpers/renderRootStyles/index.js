const renderRootStyles = renderer => {
  renderer.renderFont('Nunito', ['/assets/fonts/nunito-700.woff2'], {
    fontDisplay: 'swap',
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  })

  renderer.renderFont('Nunito', ['/assets/fonts/nunito-900.woff2'], {
    fontWeight: 'bold',
    fontDisplay: 'swap',
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  })

  renderer.renderStatic(`
  :root {
    scroll-padding-top: 2em;

    /* Game colors */
    --beige: rgb(226, 215, 175);
    --dark-beige: rgb(155, 142, 112);
    --light-blue: rgb(46, 86, 98);
    --dark-blue: rgb(32, 53, 63);
    --green: rgb(54, 120, 109);
    --black: rgb(16, 31, 38);
    --white: rgb(245, 242, 229);
    --yellow: rgb(208, 184, 76);

    /* Faction colors */
    --swarm: rgb(96, 72, 48);
    --ironclad: rgb(130, 70, 72);
    --shadowfen: rgb(48, 101, 93);
    --winter: rgb(64, 84, 119);
    --light-swarm: rgb(184, 149, 113);
    --light-ironclad: rgb(182, 120, 122);
    --light-shadowfen: rgb(86, 175, 161);
    --light-winter: rgb(102, 128, 173);

    /* Card colors */
    --affordable: rgb(107, 231, 156);
    --upgradable: rgb(231, 209, 70);

    /* Battle sim colors */
    --player-red: rgb(203, 43, 67);
    --player-blue: rgb(25, 93, 156);
    --poison: rgb(112, 4, 112);
    --freeze: rgb(96, 173, 199);
    --confused: rgb(197, 153, 72);
    --vitalised: rgb(36, 224, 113);
    --disabled: rgb(165, 32, 134);

    /* League colors */
    --starter: currentcolor;
    --iron: #d3d1cc;
    --bronze: #e2c3b7;
    --silver: #d6d9e2;
    --gold: #f1e0be;
    --platinum: #c0e0cf;
    --diamond: #c8c0df;
    --heroes: #caf9ff;
  }

  * {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url('/assets/images/background.png') repeat var(--black);
    color: var(--white);
  }

  html {
    min-height: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  input,
  select,
  button {
    font: inherit;
  }

  html,
  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  [hidden] {
    display: none !important;
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  a {
    color: currentColor;
    text-decoration-skip: skip;
    text-decoration-skip-ink: auto;
  }

  a:not([class]) {
    transition: 250ms;
  }

  a:not([class]):active,
  a:not([class]):hover {
    color: var(--beige);
  }

  /**
   * This will hide the focus indicator if the element receives focus via the mouse,
   * but it will still show up on keyboard focus.
   */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  hr {
    width: 50%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--dark-beige), transparent);
    border: 0;
    margin: 3em auto;
  }

  input[type='text'],
  input[type='search'],
  input[type='url'],
  input[type='number'],
  select {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    padding: 0.65em;
    border-radius: 0.3em;
    background-color: transparent;
    border: 1px solid rgba(222, 215, 164, 0.5);
    color: var(--white);
  }

  input[type='radio'] {
    width: 1.8em;
    height: 1.8em;
    transform: translateY(4px);
  }

  input[type='search']:disabled,
  input[type='text']:read-only,
  input[type='text']:disabled,
  input[type='url']:disabled,
  input[type='number']:disabled,
  select:disabled {
    opacity: 0.5;
  }

  option {
    color: var(--black);
  }

  label,
  legend {
    text-transform: uppercase;
    font-size: 90%;
    color: var(--beige);
    display: inline-block;
    margin-bottom: 0.25em;
  }

  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
  }

  .VisuallyHidden {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }

  .ButtonAsLink {
    background-color: transparent;
    border: 0;
    padding: 0;
    color: inherit;
    font: inherit;
    display: inline;
    text-decoration: underline;
    text-decoration-skip: skip;
    text-decoration-skip-ink: auto;
    cursor: pointer;
    transition: 250ms;
  }

  .ButtonAsLink:not(:disabled):hover {
    color: var(--beige);
  }

  .ButtonAsLink[disabled] {
    opacity: 0.7;
    filter: grayscale(1);
    cursor: default;
  }

  .Highlight {
    color: var(--beige);
    font-weight: normal;
  }

  code {
    color: var(--beige);
    font-size: 110%;
  }

  abbr[title] {
    border-bottom: 1px dotted;
    text-decoration: none;
    cursor: help;
  }

  img {
    aspect-ratio: attr(width) / attr(height);
  }

  summary {
    cursor: pointer;
    border-bottom: 1px solid transparent;
    display: inline-block;
    transition: 250ms;
  }

  summary:hover {
    color: var(--beige);
    border-bottom-color: currentColor;
  }

  .EditorialContent p:not([class]) strong,
  .EditorialContent li:not([class]) strong {
    color: var(--beige);
  }

  .EditorialContent .Info + .Info {
    margin-top: 0;
  }

  .EditorialContent h3:not([class]) {
    color: var(--beige);
    margin-top: 2em;
  }

  .EditorialContent video:not([class]) {
    margin: 2em auto;
    display: block;
    height: auto;
    max-width: 100%;
  }

  .EditorialContent ol ul:not([class]) {
    margin-top: 0.5em;
    margin-bottom: 0;
  }

  .EditorialContent ol:not([class]),
  .EditorialContent ul:not([class]) {
    padding: 0;
    list-style-position: inside;
    margin-bottom: 2em;
  }

  .EditorialContent li:not([class]) {
    padding-left: 1.4em;
    text-indent: -1.4em;
    margin-bottom: 0.5em;
  }

  .EditorialContent li ul {
    margin-top: 0.5em;
    margin-bottom: 0;
  }
`)
}

export default renderRootStyles
