# ByBO — Build Your Brand Online

A small, hand-written static website used to teach students how to build and
publish their own website. It's intentionally built with **plain HTML, CSS and
JavaScript** (no framework, no build step) so every line is readable and easy
to learn from.

> Created for the **Summer School on AI** at [CUNEF Universidad](https://www.cunef.edu).

## What's inside

| File | Purpose |
| --- | --- |
| [`index.html`](index.html) | Landing page: hero, about, features, how it works, project origin |
| [`guide.html`](guide.html) | Interactive step-by-step guide (vertical stepper + detail panel) |
| [`faq.html`](faq.html) | Honest answers about what ByBO is and how to use it |
| [`style.css`](style.css) | All styling — a dark theme driven by CSS variables in `:root` |
| [`script.js`](script.js) | Navbar, scroll animations, animated counters, the guide stepper |
| [`resources/`](resources/) | Images and assets (e.g. the CUNEF logo) |

## Run it locally

It's a static site, so you only need a browser. The simplest options:

- **Just open the file** — double-click `index.html`.
- **Use a local server** (recommended, avoids path quirks):

  ```bash
  # Python 3 (built in on most machines)
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

  Or, in VS Code, install the **Live Preview** / **Live Server** extension and
  click *Go Live*.

## Publish with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
4. Choose the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait a minute — your site will be live at
   `https://<your-username>.github.io/<your-repo>/`.

The empty [`.nojekyll`](.nojekyll) file tells GitHub Pages to serve the files
as-is instead of running them through Jekyll.

## Customize it

This site is your starting point. Try changing:

- The colors — edit the variables at the top of [`style.css`](style.css):
  ```css
  :root {
    --color-accent: #00d4ff;
  }
  ```
- The text and steps in [`index.html`](index.html) and [`guide.html`](guide.html).
- Swap the logo image in [`resources/`](resources/).

Happy building! 🚀
