# -*- coding: utf-8 -*-
"""Regenerate the site's event-funnel module from the standalone prototype."""
import io, re, sys
SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/corc-funnel/panel.html'
OUT = '/home/claude/corc-website/src/lib/event-funnel/'
NAMES = ['app','big','box','btn','card','chip','chips','crumbs','done','eyebrow','f','facts','fields',
         'ghost','lbl','lines','link','ln','mark','note','now','num','on','opt','opts','panel','phead',
         'ptop','quote','rail','row','soft','stage','stagetag','step','stepper','steps','sub','sumbar',
         't','tg','toggles','two','val','vat','octag','frame']
S = set(NAMES)
src = io.open(SRC, encoding='utf-8').read().split('\n')
cs = next(i for i, l in enumerate(src) if l.strip() == ':root{')
ce = next(i for i, l in enumerate(src) if l.strip() == '</style>')
js_a = next(i for i, l in enumerate(src) if l.startswith('(function () {'))
js_b = next(i for i, l in enumerate(src) if l.strip() == '</script>')

css = '\n'.join(src[cs:ce])
css = (css.replace(":root{", ".funnel{")
          .replace("--display:'Archivo',var(--sans);", "--display:'Archivo Variable',var(--sans);")
          .replace("*{box-sizing:border-box;}", ".funnel *{box-sizing:border-box;}")
          .replace("html,body{height:100%;margin:0;}\n", "")
          .replace("body{background:var(--bg);color:var(--fg);font-family:var(--sans);-webkit-font-smoothing:antialiased;}",
                   ".funnel{background:var(--bg);color:var(--fg);font-family:var(--sans);-webkit-font-smoothing:antialiased;}")
          .replace("button{font:inherit;color:inherit;cursor:pointer;}", ".funnel button{font:inherit;color:inherit;cursor:pointer;}")
          .replace(".app{display:grid;grid-template-columns:minmax(360px,34%) 1fr;height:100%;}",
                   ".funnel .app{display:grid;grid-template-columns:minmax(360px,34%) 1fr;height:calc(100svh - 4rem);}")
          .replace(".steps{flex:1;", ".steps{position:relative;flex:1;"))
css = re.sub(r"^\.lang.*\n", "", css, flags=re.M)

def prefix(block):
    out = []
    for line in block.split('\n'):
        m = re.match(r'^(\s*)([^@\s][^{]*)\{', line)
        if m and not line.lstrip().startswith('.funnel'):
            sels = ', '.join('.funnel ' + s.strip() for s in m.group(2).split(','))
            out.append(m.group(1) + sels + '{' + line.split('{', 1)[1])
        else:
            out.append(line)
    return '\n'.join(out)

head, _, media = css.partition('@media (max-width:900px){')
body, _, tail = media.rpartition('}')
css = prefix(head) + '@media (max-width:900px){' + prefix(body) + '}' + tail
css += "\n.funnel{display:block;}\n.funnel .stage svg{max-height:calc(100svh - 8rem);}\n"
# the site has its own globals, so every class of ours carries a prefix
css = re.sub(r'\.([a-zA-Z][\w-]*)', lambda m: '.cf-' + m.group(1) if m.group(1) in S else m.group(0), css)
io.open(OUT + 'funnel.css', 'w', encoding='utf-8').write(css)

js = '\n'.join(src[js_a:js_b])
js = js.split("  'use strict';\n", 1)[1]
js = js[:js.rstrip().rfind('})();')].rstrip() + '\n'
js = js.replace("""  var LANG = 'en';
  try { if (localStorage.getItem('corc-lang') === 'de') LANG = 'de'; } catch (e) {}""",
                """  var LANG = initialLang === 'de' ? 'de' : 'en';""")
i = js.index("  function setLang(l) {"); j = js.index("\n  }\n", i) + 4
js = js[:i] + js[j:]
i = js.index("  document.documentElement.lang = LANG;"); j = js.index("  (document.fonts ? document.fonts.ready")
js = js[:i] + js[j:]
js = js.replace('font-family="Archivo"', 'font-family="Archivo Variable"')
js = re.sub(r'class="([^"]*)"', lambda m: 'class="' + ' '.join(('cf-' + t if t in S else t) for t in m.group(1).split()) + '"', js)
js = re.sub(r"(querySelectorAll|querySelector)\((['\"])([^'\"]*)\2",
            lambda m: m.group(1) + '(' + m.group(2) +
            re.sub(r'\.([a-zA-Z][\w-]*)', lambda k: '.cf-' + k.group(1) if k.group(1) in S else k.group(0), m.group(3)) + m.group(2), js)
assert 'setLang' not in js and 'localStorage' not in js
io.open(OUT + 'engine.js', 'w', encoding='utf-8').write(
    "/**\n * The event bar funnel. One hand written perspective engine, one panel of questions.\n *\n"
    " * Generated from the standalone prototype; see tools/extract-event-funnel.py.\n */\n"
    "export function mountEventFunnel(initialLang) {\n  'use strict';\n" + js + "}\n")
print('regenerated')
