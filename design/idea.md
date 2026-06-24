# My website idea — ByBO

Notes for building the site. Following the guide steps.

## 1. Topic

- A company website.
- The product helps you build your own website, step by step.
- It only uses free tools.
- For: total beginners. No coding needed.
- Goal: explain the product, then send people to the guide.
- Be honest. No fake numbers. No fake sponsors. No promises we don't keep.

## 2. Name

- Name: ByBO
- Means: Build your Brand Online.
- Write it like this: ByBO.
- Short. Easy to say. Easy to type.
- Tagline: Build Your Brand Online.

## 3. Colors

- Dark background.
- One bright color: cyan (#00d4ff).
- Background: #0a0e1a
- Cards: #1a2236
- Text: white.
- Use cyan only for highlights, links and buttons.
- CUNEF logo goes on a white box (it's orange).

## 4. Style

- Modern. Clean. Minimal. A bit techy.
- Font: Inter. One font for everything.
- Lots of space. Not crowded.
- Rounded corners.
- Small animations:
  - Navbar blurs, then turns solid when you scroll.
  - Things fade in as you scroll.
  - Numbers count up.
  - Cards lift a little on hover.
- Must work on phones too.
- Click to open things (not just hover).

## 5. Pages

- Plain HTML, CSS and JS. No framework.
- Files:
  - index.html → home
  - guide.html → the guide (the main part)
  - faq.html → questions
  - style.css → all the styles
  - script.js → all the code
  - resources/ → images

- Every page: top navbar + bottom footer.
- Navbar links: About, Features, How It Works, Guide, FAQ.

- Home page sections:
  1. Hero (big title + 2 buttons).
  2. About ByBO (+ 3 numbers: 9 steps, 3 languages, 100% free).
  3. What You Get (3 cards).
  4. How It Works (3 small steps).
  5. The project (CUNEF logo).

- Guide page (9 steps):
  - List of steps on the left.
  - Click one → it opens on the right.
  - On phone → it turns into an accordion.
  - Each step also lists the tools you can use.
  - Last two steps: upload to GitHub (no terminal) + publish with GitHub Pages.

- FAQ page:
  - A few simple questions and answers.

## 6. Content rules

- Tell the truth.
- ByBO is a guide, not a hosting service.
- Numbers must be real.
- Short sentences. Friendly. No hype.
- Buttons say: Start the Guide, Open the Full Guide.

## 7. How to work on it

- Open the folder in VS Code.
- Preview with Live Server, or run: python3 -m http.server 8000
- Keep it tidy. Use the color variables, don't hardcode colors.

## 8. Put it online

- Upload to GitHub (no terminal — website upload or GitHub Desktop).
- Use GitHub Pages. It's free.
- Add a .nojekyll file.
- Netlify / Vercel only later, if a server is needed.

## Still to decide

- Fix the guide step 6 copy ("no coding required" promises too much).
- How much to talk about AI in the guide.
- Maybe add a small page with free learning links.
