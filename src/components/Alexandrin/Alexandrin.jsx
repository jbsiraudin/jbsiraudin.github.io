import { useState, useRef, useCallback, useEffect } from "react";
import "../../css/Alexandrin.scss";

// ─── Syllable counting ────────────────────────────────────────────────────────

const VOWELS = 'aeiouyàâäéèêëîïôùûüœæ';
const isV = (c) => c && VOWELS.includes(c.toLowerCase());

function syllWord(word, nextWord) {
  if (!word) return 0;
  const nextV = nextWord && isV(nextWord[0]);

  let silentE = 0;
  if (/[^aeiouàâäéèêëîïôùûüœæ]es$/i.test(word)) {
    silentE = 1;
  } else if (/[^aeiouàâäéèêëîïôùûüœæ]e$/i.test(word) && word.length > 1) {
    silentE = 1;
  } else if (/[^aeiouàâäéèêëîïôùûüœæ]ent$/i.test(word)) {
    silentE = 1;
  }

  let count = 0;
  let i = 0;
  const w = word.toLowerCase();
  while (i < w.length) {
    if (isV(w[i])) {
      count++;
      const three = w.slice(i, i + 3);
      const two = w.slice(i, i + 2);
      if (/^eau/.test(three)) { i += 3; }
      else if (/^(ou|eu|au|ai|ei|oi|ui)/.test(two)) { i += 2; }
      else if (isV(w[i + 1])) { i += 1; }
      else { i += 1; }
    } else {
      i++;
    }
  }

  if (silentE) {
    if (nextV) count -= 1;
  }

  return Math.max(count, 1);
}

function countSyllabesRobust(line) {
  if (!line.trim()) return 0;

  let text = line.toLowerCase().trim();
  text = text.replace(/[«»[\]{}()\-–—.,;:!?…"""]/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  const rawWords = text.split(' ').filter((w) => w.length > 0);
  const words = [];
  for (const w of rawWords) {
    const m = w.match(/^([a-zà-ÿ]+)'(.+)$/);
    if (m) {
      words.push(m[1] + 'e');
      words.push(m[2]);
    } else {
      words.push(w);
    }
  }

  let total = 0;
  for (let wi = 0; wi < words.length; wi++) {
    total += syllWord(words[wi], words[wi + 1] || '');
  }

  return Math.max(total, line.trim().length > 0 ? 1 : 0);
}

function getLineClass(syl) {
  if (syl === 12) return 'perfect';
  if (syl >= 10 && syl <= 13) return 'close';
  return 'over';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Alexandrin() {
  const editorRef = useRef(null);
  const popupRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [copyLabel, setCopyLabel] = useState('Copier');

  const getCurrentLineIndex = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || !editorRef.current) return 0;
    const range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rects = range.getClientRects();
    if (!rects.length) return 0;
    const editorRect = editorRef.current.getBoundingClientRect();
    const relY = rects[0].top - editorRect.top;
    return Math.max(0, Math.floor(relY / 36));
  }, []);

  const updateEditor = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const text = editor.innerText || '';
    const rawLines = text.split('\n');
    if (rawLines.length > 1 && rawLines[rawLines.length - 1] === '') {
      rawLines.pop();
    }
    const parsed = rawLines.map((l) => ({
      text: l,
      syllables: l.trim() ? countSyllabesRobust(l) : null,
    }));
    setLines(parsed);
    setCurrentLineIdx(getCurrentLineIndex());
  }, [getCurrentLineIndex]);

  const handleInput = useCallback(() => {
    updateEditor();
  }, [updateEditor]);

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
      setTimeout(updateEditor, 0);
    },
    [updateEditor]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '  ');
      }
      setTimeout(updateEditor, 0);
    },
    [updateEditor]
  );

  const handleCesure = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const text = editor.innerText || '';
    const rawLines = text.split('\n');
    if (rawLines.length > 1 && rawLines[rawLines.length - 1] === '') rawLines.pop();
    const curIdx = getCurrentLineIndex();
    const line = rawLines[curIdx] || '';
    if (!line.trim()) return;

    const words = line.trim().split(/\s+/);
    let cumSyl = 0;
    let cesuraWordIdx = -1;

    for (let wi = 0; wi < words.length; wi++) {
      cumSyl += syllWord(words[wi].toLowerCase(), (words[wi + 1] || '').toLowerCase());
      if (cumSyl >= 6 && cesuraWordIdx === -1) {
        cesuraWordIdx = wi;
      }
    }

    if (cesuraWordIdx !== -1) {
      const firstHalf = words.slice(0, cesuraWordIdx + 1).join(' ');
      const secondHalf = words.slice(cesuraWordIdx + 1).join(' ');
      const syl = countSyllabesRobust(line);
      alert(
        `Vers (${syl} syl.) :\n\n« ${firstHalf} | ${secondHalf} »\n\nCésure suggérée après « ${words[cesuraWordIdx]} »`
      );
    }
  }, [getCurrentLineIndex]);

  const handleClear = useCallback(() => {
    if (confirm('Effacer tout le texte ?')) {
      editorRef.current.innerText = '';
      updateEditor();
    }
  }, [updateEditor]);

  const handleCopy = useCallback(() => {
    const text = editorRef.current?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopyLabel('Copié !');
      setTimeout(() => setCopyLabel('Copier'), 1500);
    });
  }, []);

  const handleGutterMouseOver = useCallback(
    (e) => {
      const cell = e.target.closest('.gutter-cell');
      if (!cell || !popupRef.current) return;
      const idx = parseInt(cell.dataset.idx, 10);
      if (isNaN(idx)) return;
      const syl = lines[idx]?.syllables;
      if (syl == null) return;
      popupRef.current.textContent = `${syl} syllabe${syl > 1 ? 's' : ''}`;
      popupRef.current.classList.add('visible');
      const rect = cell.getBoundingClientRect();
      popupRef.current.style.left = rect.right + 10 + 'px';
      popupRef.current.style.top = rect.top + rect.height / 2 - 16 + 'px';
    },
    [lines]
  );

  const handleGutterMouseOut = useCallback(() => {
    popupRef.current?.classList.remove('visible');
  }, []);

  // Stats
  const realLineCount = lines.filter((l) => l.text.trim()).length;
  const alexCount = lines.filter((l) => l.syllables === 12).length;
  const currentLine = lines[currentLineIdx];
  const currentSyl = currentLine?.syllables ?? null;

  const currentSylColor =
    currentSyl === null
      ? ''
      : currentSyl === 12
      ? 'var(--alex-perfect)'
      : currentSyl >= 10
      ? 'var(--alex-close)'
      : 'var(--alex-over)';

  const currentSylText = currentSyl !== null ? `${currentSyl} syl.` : '—';

  return (
    <div className="alexandrin-wrapper">
      <div className="max-w-2xl mx-auto px-5 pb-10 space-y-6 pt-5">
        {/* Card */}
        <div className="alex-card">
          {/* Toolbar */}
          <div className="alex-toolbar">
            <span className="toolbar-label">Légende</span>
            <div className="alex-legend">
              <div className="alex-legend-item">
                <div className="alex-legend-dot dot-perfect" />
                12 syllabes — parfait
              </div>
              <div className="alex-legend-item">
                <div className="alex-legend-dot dot-close" />
                10–11 / 13 — proche
              </div>
              <div className="alex-legend-item">
                <div className="alex-legend-dot dot-over" />
                Hors mesure
              </div>
            </div>
            <div className="toolbar-right">
              <button className="alex-btn" onClick={handleCesure}>Césure 6+6</button>
              <button className="alex-btn" onClick={handleClear}>Effacer</button>
              <button className="alex-btn" onClick={handleCopy}>{copyLabel}</button>
            </div>
          </div>

          {/* Editor area */}
          <div className="alex-editor-area">
            {/* Gutter */}
            <div
              className="alex-gutter"
              onMouseOver={handleGutterMouseOver}
              onMouseOut={handleGutterMouseOut}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  data-idx={i}
                  className={`gutter-cell${line.syllables !== null ? ' ' + getLineClass(line.syllables) : ''}`}
                >
                  {line.syllables !== null && <span>{line.syllables}</span>}
                </div>
              ))}
            </div>

            {/* Editor */}
            <div className="alex-editor-inner">
              <div
                className="current-line-bg"
                style={{ top: 20 + currentLineIdx * 36 + 'px' }}
              />
              <div
                ref={editorRef}
                className="alex-editor"
                contentEditable
                suppressContentEditableWarning
                spellCheck
                data-placeholder="Écrivez vos vers ici…"
                onInput={handleInput}
                onKeyUp={updateEditor}
                onClick={updateEditor}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
              />
            </div>
          </div>

          {/* Stats bar */}
          <div className="alex-stats-bar">
            <div className="stat">
              <span>Vers</span>
              <span className="stat-value">{realLineCount}</span>
            </div>
            <div className="stat stat-perfect">
              <span>Alexandrins</span>
              <span className="stat-value">{alexCount}</span>
            </div>
            <div className="stat">
              <span>Ligne actuelle</span>
              <span className="stat-value" style={{ color: currentSylColor }}>
                {currentSylText}
              </span>
            </div>
            <div className="stat stat-hint">Le e muet compte avant consonne</div>
          </div>
        </div>

        {/* Help panel */}
        <div className="alex-help-panel">
          <div className="help-title">Règles de la versification classique</div>
          <div className="help-grid">
            <div className="help-item">
              <strong>E muet</strong> — Le « e » final compte avant une consonne :{' '}
              <em>bel·le flem·me</em> = 3 syl.
            </div>
            <div className="help-item">
              <strong>E muet + voyelle</strong> — Il s'élide devant une voyelle :{' '}
              <em>belle amie</em> = <em>bell' amie</em>.
            </div>
            <div className="help-item">
              <strong>Diérèse</strong> — Deux voyelles adjacentes forment deux syllabes :{' '}
              <em>vi·o·lon</em> = 3 syl.
            </div>
            <div className="help-item">
              <strong>Synérèse</strong> — Ces mêmes voyelles fusionnent : <em>vio·lon</em> = 2 syl.
              (choix du poète).
            </div>
            <div className="help-item">
              <strong>Césure</strong> — L'alexandrin classique se coupe après la 6e syllabe.
            </div>
            <div className="help-item">
              <strong>Rime</strong> — Alterner rimes masculines (consonne finale) et féminines (e
              muet final).
            </div>
          </div>
        </div>
      </div>

      {/* Syllable popup */}
      <div ref={popupRef} className="alex-syl-popup" />
    </div>
  );
}
