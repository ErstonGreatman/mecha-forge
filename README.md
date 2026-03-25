# Mecha Forge

A local-first, plugin-driven mecha design studio.

**Design a mech once. Interpret it across multiple systems.**

---

## ✨ What is this?

Mecha Forge is a tool for creating and managing mecha designs with a focus on **flexibility and system-agnostic design**.

Instead of locking you into a single ruleset, Mecha Forge separates:

* **Core Schematic** → the fictional identity of a mech
* **System Implementations** → how that mech works in specific systems (Mekton, Lightframe, etc.)

---

## 🧠 Core Idea

> A mech is more than its stats.

Create a single design, then build multiple interpretations:

* Mekton version
* Lancer version
* Future systems
* House rules

All tied to the same core concept.

---

## 🔌 Plugin-Based Architecture

Mecha Forge is built around plugins:

### System Plugins

Define how a mech works in a specific ruleset.

Examples:

* Mekton Z
* Lancer
* Custom/homebrew systems
* Lightframe (in development)

### Feature Plugins

Add tools and functionality.

Examples:

* PDF export
* Print layouts
* Comparison tools
* Asset management

---

## 💾 Local-First

Your data stays with you.

* Save projects as JSON files
* Open and edit locally
* Optional autosave via IndexedDB
* No account required

---

## 🚧 Status

Early development.

Expect:

* incomplete features
* breaking changes
* evolving architecture

This is currently a **foundation-first project**.

---

## 🛠️ Tech Stack

* SvelteKit
* Tailwind CSS
* shadcn-style components
* IndexedDB (planned for autosave)
* Plugin-based architecture

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourname/mecha-studio
cd hangar-studio
npm install
npm run dev
```

---

## 📦 Project Structure (high-level)

```
core/              → app state, document model, plugin system
plugins/           → system + feature plugins
components/        → UI primitives and layouts
```

---

## 🧩 Contributing

Contributions are welcome, but the project is still evolving.

If you're interested in contributing:

* check existing issues (if any)
* open a discussion before large changes
* expect APIs to change

Plugin contributions will be supported once the API stabilizes.

---

## 📜 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software, including for commercial purposes.

---

## 🤝 Philosophy

Mecha Forge is open source to encourage experimentation, learning, and community-driven extension.

If you build something on top of this project—whether it's a plugin, a fork, or a commercial product—you're welcome to do so.

That said, if this project provides value to you, consider:

* contributing improvements back upstream
* sharing plugins with the community
* helping grow the ecosystem

This project aims to be a foundation, not a walled garden.

---

## 🧭 Vision

This project aims to become:

* a **mecha design studio**
* a **cross-system conversion tool**
* a **platform for experimenting with mech systems**

---

## 💬 Why this exists

Most mech builders are tied to a single system.

This exists to answer:

> What if your mech design wasn’t?

---

## ⚠️ Disclaimer

This is a personal project and not affiliated with any existing TTRPG systems.

---

## 🙌 Acknowledgements

Inspired by:

* classic mecha TTRPGs
* modern system design tools
* the idea that systems should adapt to concepts, not the other way around
