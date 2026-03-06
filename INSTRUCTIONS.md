# 🚀 Portfolio StomaDev - Guide d'utilisation

## 📁 Structure des fichiers

```
portfolio/
├── index.html          # Structure HTML
├── style.css           # Styles et design
├── script.js           # Animations et interactions
├── audio/              # Dossier pour la musique
│   ├── README.md       # Instructions pour la musique
│   └── baltringue.mp3  # Ton fichier audio (à ajouter)
└── image/              # Tes images existantes
```

## 🎵 Ajouter la musique de fond

1. Télécharge la musique "Baltringue" de Damso (ou toute autre musique)
2. Convertis-la en MP3 si nécessaire
3. Renomme le fichier en `baltringue.mp3`
4. Place-le dans le dossier `portfolio/audio/`

**Alternative** : Si tu veux utiliser un autre fichier, modifie cette ligne dans `script.js` :
```javascript
bgMusic.src = 'audio/ton-fichier.mp3';
```

## ✨ Fonctionnalités

### Modal de bienvenue
- S'affiche automatiquement à l'ouverture
- Message personnalisé
- Option pour activer/désactiver le son
- Animation d'entrée fluide

### Bouton retour en haut
- Apparaît après 500px de scroll
- Animation fluide
- Toujours accessible

### Mode clair/sombre
- Toggle en haut à droite
- Sauvegarde automatique de la préférence
- Transition douce entre les modes

### Responsive
- Optimisé pour mobile, tablette et desktop
- Menu hamburger sur mobile
- Pas de collision entre les boutons

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `style.css` :
```css
:root {
  --primary-color: #00bcd4;    /* Cyan principal */
  --secondary-color: #0097a7;  /* Cyan foncé */
  --accent-color: #00ffff;     /* Cyan clair */
}
```

### Volume de la musique
Dans `script.js` :
```javascript
bgMusic.volume = 0.3; // 0 = muet, 1 = volume max
```

### Message de bienvenue
Modifie le texte dans `index.html` :
```html
<h2>🎨 Bienvenue dans l'univers StomaDev</h2>
<p>Ton message personnalisé ici...</p>
```

## 🐛 Résolution de problèmes

### La musique ne se lance pas
- Vérifie que le fichier `baltringue.mp3` est bien dans `portfolio/audio/`
- Certains navigateurs bloquent l'autoplay, c'est normal
- L'utilisateur doit interagir (cliquer sur "Entrer") pour lancer la musique

### Collision des boutons sur mobile
- C'est maintenant corrigé ! Le bouton mode est décalé vers la gauche
- Le menu hamburger reste à droite

### Les animations ne fonctionnent pas
- Vérifie que `script.js` est bien chargé
- Ouvre la console (F12) pour voir les erreurs éventuelles

## 📱 Test sur mobile

Pour tester sur mobile :
1. Ouvre le fichier avec un serveur local (pas en double-cliquant)
2. Utilise les DevTools de Chrome (F12) et active le mode mobile
3. Ou utilise ton téléphone en accédant à l'IP locale de ton PC

## 🎯 Prochaines étapes

- [ ] Ajouter la musique dans le dossier audio
- [ ] Tester sur différents navigateurs
- [ ] Tester sur mobile réel
- [ ] Optimiser les images si nécessaire
- [ ] Déployer sur un hébergement

## 💡 Astuces

- Le portfolio fonctionne hors ligne une fois chargé
- Toutes les préférences (mode clair/sombre) sont sauvegardées
- Le code est commenté pour faciliter les modifications
- Les animations sont optimisées pour les performances

## 🇨🇮 Fait avec passion en Côte d'Ivoire

Bon courage avec ton portfolio ! 🚀
