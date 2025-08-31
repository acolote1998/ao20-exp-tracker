# AO20 – Experience Tracker

_A daily performance tracker for Argentum Online 20 guild members._

**AO20 – Experience Tracker** is a frontend application built with **React and TypeScript** that helps monitor and visualize the daily progress of a selected group of players in the MMORPG **Argentum Online 20**.

The app fetches data from the official server’s **REST API**, with daily updates handled by a scheduled workflow job that stores the information in a database. The frontend then displays this data in a clear and engaging way through **character cards**.

Live App: https://acolote1998.github.io/ao20-exp-tracker/

### Character Cards

Each character’s daily performance is summarized with:

- **Experience gained**
- **% of level gained**
- **NPCs killed**
- **Player kills**
- **Deaths**
- **K/D ratio**
- **Faction points earned**
- **Experience bar visualization** – showing total progress in red, and the portion gained during the last day in green
- **Level-up projection** – an estimate of how many days it would take to reach the next level if the same daily progress continues

### Medals & Achievements

To make tracking more fun and competitive, the app also awards **daily medals** based on performance:

- 🏹 Most NPCs killed for the day
- ⚔️ Most experience gained for the day
- ☠️ Most player kills for the day
- 🛡️ Most faction points for the day
- 🎯 Best K/D ratio of the day

Medals are stored in the database and accumulate over time. As players earn the same medal repeatedly, the medal upgrades through tiers:

- 🥉 Bronze
- 🥈 Silver
- 🥇 Gold
- 💎 Diamond
- 👑 Master

### Purpose

The project was built to **track and celebrate the daily growth** of guild members, making it easy to see both individual contributions and group progress. It transforms raw game data into an engaging, competitive experience for the community.

This repository contains the **frontend component** of the project, which fetches, displays, and visualizes the data in an intuitive way.
