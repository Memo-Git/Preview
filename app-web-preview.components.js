    function appbar(title, sub, backable = true) {
      return `
        <div class="appbar">
          ${backable ? `<button class="back" data-back="1" aria-label="返回">‹</button>` : ""}
          <div style="flex:1">
            <strong>${title}</strong>
            <span>${sub}</span>
          </div>
          <div class="avatar">星</div>
        </div>
      `;
    }

    function wireHeader(title, backable = true) {
      return `
        <div class="wire-header">
          ${backable ? `<button class="wire-back" data-back="1" aria-label="返回">‹</button>` : ""}
          <strong>${title}</strong>
        </div>
      `;
    }

    function wireOption(label, attrs = "") {
      return `<div class="wire-option" ${attrs}><strong>${label}</strong></div>`;
    }

    function hero(title, desc, chips = []) {
      return `
        <div class="hero">
          <div>
            <h1>${title}</h1>
            <p>${desc}</p>
            <div class="chips">${chips.map(item => chip(item.text, item.type || "", item.attrs || "")).join("")}</div>
          </div>
          <div class="hero-art"><span class="pin"></span></div>
        </div>
      `;
    }

    function section(title, action = "全部", attrs = "") {
      const safeAttrs = attrs || `data-action="section:${title}"`;
      return `<div class="section"><h2>${title}</h2><button ${safeAttrs}>${action}</button></div>`;
    }

    function icon(name) {
      return `<svg class="ui-icon" aria-hidden="true"><use href="icons/spark-medical-icons.svg#${name}"></use></svg>`;
    }

    function glyphContent(glyph) {
      const key = iconNames.has(glyph) ? glyph : glyphAliases[glyph];
      return key ? icon(key) : `<span>${glyph}</span>`;
    }

    function chip(label, type = "", attrs = "") {
      return `<span class="chip ${type}" ${attrs}>${label}</span>`;
    }

    function entry(label, desc, glyph, attrs, cls = "") {
      return `<div class="entry ${cls}" ${attrs}><div class="glyph">${glyphContent(glyph)}</div><h3>${label}</h3><p>${desc}</p></div>`;
    }

    function stat(value, label) {
      return `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`;
    }

    function list(label, desc, tag, attrs = "", glyph = "医") {
      return `<div class="list" ${attrs}><div class="glyph">${glyphContent(glyph)}</div><div><strong>${label}</strong><span>${desc}</span></div><span class="tag">${tag}</span></div>`;
    }

    function card(title, desc, attrs = "") {
      return `<div class="card" ${attrs}><div class="photo"></div><h3 style="margin-top:10px">${title}</h3><p>${desc}</p></div>`;
    }

    function choice(label, meta, active, action) {
      return `<button class="choice ${active ? "active" : ""}" data-action="${action}">${label}<span>${meta}</span></button>`;
    }

    function timeline(items) {
      return `<div class="timeline">${items.map((item, index) => `<div class="timeline-item"><div class="dot">${index + 1}</div><div><strong>${item.title}</strong><p>${item.desc}</p></div></div>`).join("")}</div>`;
    }

    function summaryRow(label, value) {
      return `<div class="summary-row"><div class="dot">✓</div><div><strong>${label}</strong><p>${value}</p></div></div>`;
    }

