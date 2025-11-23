const EXP_ARRAY = [
  0, 275, 1325, 3675, 7825, 14325, 23675, 36400, 53000, 74000, 99925, 131300,
  168625, 212450, 263275, 321600, 387975, 462900, 546900, 640475, 744175,
  858500, 983975, 1121100, 1270400, 1432400, 1607625, 1796600, 1999825, 2217825,
  2451125, 2700225, 2965650, 3247925, 3547575, 3865100, 4201025, 4555875,
  4930175, 5324425, 5739150, 6174875, 6632125, 7111400, 7613225, 8138125,
  8686600, 9259175, 9856375, 10478725, 11126725, 11800925, 12501825, 13229925,
  13985775, 14769875, 15582750, 16424900, 17296850, 18199150, 19132275,
];

var stats = {
  characterLevel: 1,
  unspentPoints: 1,
  spentPoints: 0,
  lifetimePoints: 1,
  availableFeats: 0,
  currentExperience: "0 / 275",
  allStats: [
    "strength",
    "agility",
    "vitality",
    "authority",
    "grit",
    "expertise",
  ],

  strength: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null, // "combo-master" oppure "second-skin"
    perk20: null, // "blood-mad-berserker" oppure "crushing-swings"
  },
  agility: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null,
    perk20: null,
  },
  vitality: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null,
    perk20: null,
  },
  authority: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null,
    perk20: null,
  },
  grit: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null,
    perk20: null,
  },
  expertise: {
    value: 0,
    _5: false,
    _10: false,
    _15: false,
    _20: false,
    perk10: null,
    perk20: null,
  },

  playerStats: {
    health: {
      value: 200,
      base: 200,
    },
    stamina: {
      value: 100,
      base: 100,
    },
    encumbrance: {
      value: 70,
      base: 70,
    },
    melee: {
      value: 100,
      base: 100,
    },
    ranged: {
      value: 100,
      base: 100,
    },
    armor: {
      value: 0,
      base: 0,
    },
    damageResistance: {
      value: 0,
      base: 0,
    },
  },
};

function resetAll() {
  // livello e punti
  stats.characterLevel = 1;
  stats.unspentPoints = 1; // 1 punto al livello 1
  stats.spentPoints = 0;
  stats.lifetimePoints = 1;
  stats.availableFeats = 0;
  stats.currentExperience = "0 / 275";

  // reset di tutte le attributi moderni
  stats.allStats.forEach(function (attr) {
    stats[attr].value = 0;
    stats[attr]._5 = false;
    stats[attr]._10 = false;
    stats[attr]._15 = false;
    stats[attr]._20 = false;
    stats[attr].perk10 = null;
    stats[attr].perk20 = null;
  });

  // player stats tornano ai valori base
  stats.playerStats.health.value = stats.playerStats.health.base;
  stats.playerStats.stamina.value = stats.playerStats.stamina.base;
  stats.playerStats.encumbrance.value = stats.playerStats.encumbrance.base;
  stats.playerStats.melee.value = stats.playerStats.melee.base;
  stats.playerStats.ranged.value = stats.playerStats.ranged.base;
  stats.playerStats.armor.value = stats.playerStats.armor.base;
  stats.playerStats.damageResistance.value =
    stats.playerStats.damageResistance.base;

  // deseleziona tutte le scelte di perk
  ["strength", "agility", "vitality", "authority", "grit", "expertise"].forEach(
    function (attr) {
      [10, 20].forEach(function (lvl) {
        var selector = 'input[name="' + attr + "-" + lvl + '"]';
        document.querySelectorAll(selector).forEach(function (radio) {
          radio.checked = false;
        });
      });
    }
  );

  // aggiorna UI
  update();
}

function resetAttributes() {
  stats.allStats.forEach(function (attribute) {
    resetAttribute(attribute);
  });
}

function resetAttribute(attribute) {
  while (stats[attribute].value > 0) {
    statDown(attribute);
  }
}

function maxOutLevel() {
  while (stats.characterLevel < 60) {
    levelUp();
  }
}

function maxOutAttribute(attribute) {
  while (stats[attribute].value < 20) {
    if (stats.unspentPoints <= 0) return false;
    statUp(attribute);
  }
}

function setCurrentExperience(currentlevel) {
  stats.currentExperience =
    EXP_ARRAY[currentlevel - 1].toLocaleString() +
    " / " +
    EXP_ARRAY[currentlevel].toLocaleString();
  return EXP_ARRAY[currentlevel - 1];
}

// Ogni punto attributo costa sempre 1 AP
function getAttrCost(/* currentlevel */) {
  return 1;
}

// Ogni livello dà 1 punto attributo (da lv 1 a 60 -> totale 60 AP)
function adjustAttrPoints(/* currentlevel */) {
  return 1;
}

function adjustFeatPoints(currentlevel) {
  let i = 0,
    x = 1;
  let comparelvl = 0;
  let featPoints = 0;
  while (i < 13) {
    if (currentlevel < comparelvl + 5) {
      featPoints++;
      while (x < 7) {
        if (currentlevel == x * 10) return featPoints * 3;
        x++;
      }
      return featPoints;
    } else i++, featPoints++, (comparelvl += 5);
  }
}

//Checks current attributes and determines attribute bonuses @ lvls 10,20,30,40,50

function adjustBonuses(statString) {
  if (statString == null) return false;

  const thresholds = [5, 10, 15, 20];
  const keys = ["_5", "_10", "_15", "_20"];

  thresholds.forEach(function (lvl, index) {
    const key = keys[index];
    stats[statString][key] = stats[statString].value >= lvl;
  });
}

//Math calculations for playerStats based on attributes and certain bonus perks

// Calcolo playerStats secondo il sistema moderno di Conan Exiles
function calcPlayerStats() {
  // Health: base 200 + 20 per punto di Vitality
  stats.playerStats.health.value =
    stats.playerStats.health.base + 20 * stats.vitality.value;

  // Stamina: base 100 + 1 per Agility + 3 per Grit
  stats.playerStats.stamina.value =
    stats.playerStats.stamina.base +
    1 * stats.agility.value +
    3 * stats.grit.value;

  // Carry weight: base 70 + 3 per Strength + 15 per Expertise
  stats.playerStats.encumbrance.value =
    stats.playerStats.encumbrance.base +
    3 * stats.strength.value +
    15 * stats.expertise.value;

  // Danno con armi Strength-based (melee)
  // 100% base + 5% per Strength + 0.5% per Agility
  stats.playerStats.melee.value =
    stats.playerStats.melee.base +
    5 * stats.strength.value +
    0.5 * stats.agility.value;

  // Danno con armi Agility-based (nel layout è chiamato Ranged)
  // 100% base + 5% per Agility + 0.5% per Strength
  stats.playerStats.ranged.value =
    stats.playerStats.ranged.base +
    5 * stats.agility.value +
    0.5 * stats.strength.value;

  // Armor: base 0 + 8 per punto di Grit
  stats.playerStats.armor.value =
    stats.playerStats.armor.base + 8 * stats.grit.value;

  // Riduzione danno (stessa formula di prima)
  stats.playerStats.damageResistance.value =
    stats.playerStats.armor.value * 0.003 * 100;
}

// Ritorna quale perk è selezionato (0 = primo, 1 = secondo, -1 = nessuno)
function getPerkChoiceIndex(attr, lvl) {
  var selector = 'input[name="' + attr + "-" + lvl + '"]';
  var radios = document.querySelectorAll(selector);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return i; // 0 = scelta in alto, 1 = in basso
  }
  return -1;
}

// Cambia l'immagine di sfondo della barra in base ai punti e alla scelta
function updateProgressBarBackground(statString) {
  var progressBar = document.getElementsByClassName(
    "progress-bar " + statString
  )[0];
  if (!progressBar) return;

  var v = stats[statString].value;
  var img = "teir0.png";

  if (v >= 5 && v < 10) {
    // 5 punti -> prima tacca
    img = "teir1.png";
  } else if (v >= 10 && v < 15) {
    // 10–14 punti -> seconda tacca, dipende da perk 10 scelto
    var idx10 = ensurePerkChoiceIndex(statString, 10); // 0 o 1
    if (idx10 === 1) {
      img = "teir2_2.png"; // seconda scelta (in basso)
    } else {
      img = "teir2_1.png"; // default o prima scelta (in alto)
    }
  } else if (v >= 15 && v < 20) {
    img = "teir3.png";
  } else if (v >= 20) {
    // 20+ punti -> barra piena, dipende da perk 10 e perk 20
    var idx10 = ensurePerkChoiceIndex(statString, 10); // 0 o 1
    var idx20 = ensurePerkChoiceIndex(statString, 20); // 0 o 1

    if (idx10 === 0 && idx20 === 0) {
      img = "teir4_1_1.png";
    } else if (idx10 === 1 && idx20 === 0) {
      img = "teir4_2_1.png";
    } else if (idx10 === 0 && idx20 === 1) {
      img = "teir4_1_2.png";
    } else if (idx10 === 1 && idx20 === 1) {
      img = "teir4_2_2.png";
    }
  }

  // imposta l'immagine della barra
  progressBar.style.backgroundImage = "url('./images/" + img + "')";

  // ===== COPERTURA SCURA SOPRA L'IMMAGINE =====
  var cover = progressBar.getElementsByClassName("progress")[0];
  if (!cover) return;

  var max = 20;

  // 0 punti  -> 100% coperto
  // 20 punti -> 0% coperto
  var percentCover = 100 - Math.max(0, Math.min(100, (v / max) * 100));

  cover.style.width = percentCover + "%";
}

// Restituisce sempre 0 o 1 (se possibile).
// Se nessun radio è selezionato, seleziona il primo (indice 0).
function ensurePerkChoiceIndex(statString, tier) {
  var idx = getPerkChoiceIndex(statString, tier); // 0 / 1 / -1

  if (idx === -1) {
    // costruiamo il name, es: "strength-10", "expertise-20", ecc.
    var name = statString + "-" + tier;

    var radios = document.querySelectorAll(
      'input[type="radio"][name="' + name + '"]'
    );

    if (radios.length > 0) {
      // selezioniamo la prima scelta (value "0" / prima opzione)
      radios[0].checked = true;
      idx = 0;
    }
  }

  return idx;
}

function adjustProgress(statString) {
  if (statString == null) return false;

  // Aggiorna prima la grafica della barra
  updateProgressBarBackground(statString);

  // 4 tier: 5, 10, 15, 20
  var keys = ["_5", "_10", "_15", "_20"];

  for (var i = 1; i <= 4; i++) {
    var key = keys[i - 1];

    var icon = document.getElementsByClassName(
      "bonus-icon bonus-teir" + i + " " + statString
    )[0];

    if (!icon) continue;

    // Tier non sbloccato: icona "spenta"
    if (!stats[statString][key]) {
      icon.setAttribute("src", "./images/t" + i + ".png");
      continue;
    }

    // Tier sbloccato -> icone "accese"
    if (i === 1) {
      // 5 punti: glow semplice
      icon.setAttribute("src", "./images/t1-glow.png");
    } else if (i === 3) {
      // 15 punti: glow semplice
      icon.setAttribute("src", "./images/t3-glow.png");
    } else if (i === 2) {
      // 10 punti: doppia scelta
      var idx10 = getPerkChoiceIndex(statString, 10); // 0/1/-1
      if (idx10 === 0) {
        icon.setAttribute("src", "./images/t2-glow_1.png"); // prima scelta (alto)
      } else if (idx10 === 1) {
        icon.setAttribute("src", "./images/t2-glow_2.png"); // seconda scelta (basso)
      } else {
        icon.setAttribute("src", "./images/t2.png"); // nessuna scelta
      }
    } else if (i === 4) {
      // 20 punti: doppia scelta
      var idx20 = getPerkChoiceIndex(statString, 20); // 0/1/-1
      if (idx20 === 0) {
        icon.setAttribute("src", "./images/t4-glow_1.png"); // prima scelta
      } else if (idx20 === 1) {
        icon.setAttribute("src", "./images/t4-glow_2.png"); // seconda scelta
      } else {
        icon.setAttribute("src", "./images/t4.png");
      }
    }
  }
}
