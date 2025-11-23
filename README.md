# Conan Exiles Stat Calculator (Updated)

Made for use with the video game [Conan Exiles](https://www.conanexiles.com/).

Interactive sandbox for manipulating your character's level, stats and attributes in a simple web app.  
Re-allocate all your points with ease and experiment with different builds for your exile.

> **This is an updated / modernized version of the original project by  
> [CoreyKovalik](https://github.com/CoreyKovalik/conan-stat-calc) (a.k.a. Immotal).  
> All credit for the original idea, calculations and assets goes to them.**

---

## What’s new in this fork

This version keeps the spirit of the original calculator but updates it for a more modern layout and the newer attribute system.

- ✅ New attribute layout (Strength, Agility, Vitality, Authority, Grit, Expertise)
- ✅ Fully rewritten layout using **flexbox** (no more tables)
- ✅ Progress bar reworked:
  - the perk track still uses tier images (`teir0–4`)
  - a semi-transparent overlay animates smoothly as you spend points
- ✅ Cleaner, more maintainable **CSS** and **JavaScript**
- ✅ Responsive design – behaves better on different resolutions
- ✅ Small UX tweaks (auto-select perks when enough points are invested, clearer perk choices, etc.)

> This is an unofficial fan project and is not affiliated with Funcom.  
> All Conan Exiles images, icons and trademarks are property of Funcom.

---

## Original project

The original, now outdated, calculator can be found here:

- GitHub: <https://github.com/CoreyKovalik/conan-stat-calc>

It also references:

- [thrallbrowser GitHub](https://github.com/Immotal/thrallbrowser)
- [ServerThrall GitHub](https://github.com/nullsoldier/serverthrall) – Conan Exiles server management software

If you like this tool, please consider checking out and supporting the original author.

---

## Usage

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Use the `+` / `-` / `Max` buttons to change attribute points.
4. Perks are automatically applied when you cross the 5 / 10 / 15 / 20 point thresholds.  
   For tiers with two choices, select the desired perk using the radio buttons.

Everything runs client-side – no server or build step required.

---

## Contributing / Forking

I don’t plan to actively maintain or evolve this project.

If you find bugs, incorrect calculations or have ideas for improvements, **feel free to:**

- fork the repository,
- modify the code however you like,
- publish your own improved version.

You don’t need to ask for permission. A small mention of the original author and this fork is always appreciated, but not required.

Enjoy breaking (and fixing) it as much as you want 🙂
