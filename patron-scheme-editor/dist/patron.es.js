var Ss = Object.defineProperty;
var Ts = (n, e, t) => e in n ? Ss(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => Ts(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as te, defineComponent as E, openBlock as g, createBlock as U, Transition as rs, withCtx as w, unref as d, createElementBlock as y, createElementVNode as b, withModifiers as we, createCommentVNode as S, renderSlot as K, withDirectives as Le, isRef as je, vModelText as os, watch as Be, createVNode as m, normalizeClass as se, computed as Oe, createTextVNode as O, Fragment as W, renderList as J, toDisplayString as C, normalizeStyle as ce, vModelCheckbox as Is, onBeforeUnmount as js, vModelSelect as Bs, onMounted as as, createStaticVNode as Os } from "vue";
import { useScriptTag as Ps, useMagicKeys as Es, useVModel as Qe, useShare as Ds } from "@vueuse/core";
import he from "konva";
import { FontAwesomeIcon as Rs } from "@fortawesome/vue-fontawesome";
import { faShareNodes as Hs, faArrowUp as Ns, faArrowDown as Vs, faArrowRight as zs, faArrowLeft as Us, faClose as Ls, faMap as Qs, faRotateRight as Ws, faRotateLeft as Gs, faFileText as Ks, faCog as Js, faPlusSquare as qs, faHistory as Ys, faSearch as Zs, faTextWidth as Xs, faBarsStaggered as ei, faBars as ti } from "@fortawesome/free-solid-svg-icons";
import { useEditor as si, EditorContent as ii, BubbleMenu as ni } from "@tiptap/vue-3";
import ri from "@tiptap/starter-kit";
class oi {
  constructor(e) {
    e.value(this);
  }
  give(e) {
    return document.title = e, this;
  }
  introduction() {
    return "patron";
  }
}
function ai(n, e) {
  return typeof n == "function" ? n(e) : n.value(e);
}
class be {
  constructor(e) {
    this.guestAware = e;
  }
  value(e) {
    return ai(this.guestAware, e), e;
  }
}
function H(n, e, t) {
  typeof e == "function" ? e(n, t) : e.give(n, t);
}
class fe {
  constructor(e) {
    this.receiver = e;
  }
  give(e, t) {
    return this.receiver(e, t), this;
  }
}
class L {
  constructor(e, t) {
    this.sourceGuest = e, this.targetGuest = t;
  }
  introduction() {
    return typeof this.sourceGuest == "function" || !this.sourceGuest.introduction ? "guest" : this.sourceGuest.introduction();
  }
  give(e, t) {
    var s;
    return H(e, this.targetGuest, {
      ...t,
      data: {
        ...(t == null ? void 0 : t.data) ?? {},
        castedGuest: ((s = t == null ? void 0 : t.data) == null ? void 0 : s.castedGuest) ?? this
      }
    }), this;
  }
  disposed(e) {
    const t = this.sourceGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var ci = Object.defineProperty, li = (n, e, t) => e in n ? ci(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, It = (n, e, t) => li(n, typeof e != "symbol" ? e + "" : e, t);
const cs = /* @__PURE__ */ new Map(), jt = (n) => {
  cs.forEach((e) => {
    e.delete(n);
  });
};
class We {
  constructor(e) {
    this.initiator = e, It(this, "patrons"), It(this, "give"), this.patrons = /* @__PURE__ */ new Set(), cs.set(this, this.patrons);
    let t = null;
    const s = (i, r) => {
      this.patrons.forEach((o) => {
        this.sendValueToGuest(i, o, r);
      });
    };
    this.give = (i, r) => {
      const o = () => {
        o === t && s(i, r);
      };
      return t = o, queueMicrotask(o), this;
    };
  }
  size() {
    return this.patrons.size;
  }
  add(e) {
    if (!e)
      throw new Error("PatronPool add method received nothing!");
    return typeof e != "function" && e.introduction && e.introduction() === "patron" && this.patrons.add(e), this;
  }
  remove(e) {
    return this.patrons.delete(e), this;
  }
  distribute(e, t) {
    return this.add(t), this.sendValueToGuest(e, t, {}), this;
  }
  sendValueToGuest(e, t, s) {
    this.guestDisposed(e, t) || H(e, t, {
      ...s,
      data: {
        ...(s == null ? void 0 : s.data) ?? {},
        initiator: this.initiator,
        pool: this
      }
    });
  }
  guestDisposed(e, t) {
    var s;
    return (s = t.disposed) != null && s.call(t, e) ? (this.remove(t), !0) : !1;
  }
}
var ui = Object.defineProperty, di = (n, e, t) => e in n ? ui(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, hi = (n, e, t) => di(n, e + "", t);
class xe {
  constructor(e) {
    this.sourceDocument = e, hi(this, "thePool", new We(this));
  }
  pool() {
    return this.thePool;
  }
  give(e) {
    return this.sourceDocument = e, this.thePool.give(this.sourceDocument), this;
  }
  value(e) {
    return typeof e == "function" ? this.thePool.distribute(this.sourceDocument, new fe(e)) : this.thePool.distribute(this.sourceDocument, e), this;
  }
}
class Te {
  constructor(e) {
    this.baseGuest = e;
  }
  give(e, t) {
    let s = this.baseGuest;
    return typeof s == "function" && (s = new fe(s)), s.give(e, t), this;
  }
  introduction() {
    return typeof this.baseGuest == "function" || !this.baseGuest.introduction ? "guest" : this.baseGuest.introduction();
  }
  disposed(e) {
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
var pi = Object.defineProperty, gi = (n, e, t) => e in n ? pi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Bt = (n, e, t) => gi(n, typeof e != "symbol" ? e + "" : e, t);
class fi {
  constructor(e) {
    Bt(this, "guests", /* @__PURE__ */ new Set()), Bt(this, "patronPool"), this.patronPool = new We(e);
  }
  give(e, t) {
    return this.deliverToGuests(e, t), this.patronPool.give(e, t), this;
  }
  add(e) {
    return (typeof e == "function" || !e.introduction || e.introduction() === "guest") && this.guests.add(e), this.patronPool.add(e), this;
  }
  remove(e) {
    return this.guests.delete(e), this.patronPool.remove(e), this;
  }
  distribute(e, t) {
    return this.add(t), this.give(e), this;
  }
  size() {
    return this.patronPool.size() + this.guests.size;
  }
  deliverToGuests(e, t) {
    this.guests.forEach((s) => {
      H(e, s, t);
    }), this.guests.clear();
  }
}
var mi = Object.defineProperty, vi = (n, e, t) => e in n ? mi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Pe = (n, e, t) => vi(n, typeof e != "symbol" ? e + "" : e, t);
class Ge {
  constructor() {
    Pe(this, "theAll"), Pe(this, "keysKnown", /* @__PURE__ */ new Set()), Pe(this, "keysFilled", /* @__PURE__ */ new Set()), Pe(this, "filledAllPool", new fi(this)), this.theAll = new xe({});
  }
  valueArray(e) {
    const t = new Te(e);
    return this.filledAllPool.add(
      new L(t, (s) => {
        t.give(Object.values(s));
      })
    ), this.isAllFilled() && this.theAll.value(
      new fe((s) => {
        this.filledAllPool.give(Object.values(s));
      })
    ), this;
  }
  value(e) {
    const t = new Te(e);
    return this.isAllFilled() ? (this.filledAllPool.add(t), this.theAll.value(
      new fe((s) => {
        this.filledAllPool.give(s);
      })
    )) : this.filledAllPool.add(t), this;
  }
  guestKey(e) {
    return this.keysKnown.add(e), new fe((t) => {
      queueMicrotask(() => {
        this.theAll.value(
          new fe((s) => {
            this.keysFilled.add(e);
            const i = {
              ...s,
              [e]: t
            };
            this.theAll.give(i), this.isAllFilled() && this.filledAllPool.give(i);
          })
        );
      });
    });
  }
  isAllFilled() {
    return this.keysFilled.size > 0 && this.keysFilled.size === this.keysKnown.size;
  }
}
var Ai = Object.defineProperty, yi = (n, e, t) => e in n ? Ai(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, bi = (n, e, t) => yi(n, e + "", t);
class ue {
  constructor() {
    bi(this, "baseSource", new xe(null));
  }
  value(e) {
    return this.baseSource.value(
      new L(e, (t, s) => {
        t !== null && H(t, e, s);
      })
    ), this;
  }
  give(e) {
    return this.baseSource.give(e), this;
  }
  pool() {
    return this.baseSource.pool();
  }
}
class wi {
  constructor(e) {
    this.theValue = e;
  }
  give(e) {
    return this.theValue = e, this;
  }
  value() {
    return this.theValue;
  }
}
class Ke {
  constructor(e) {
    this.willBePatron = e;
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return H(e, this.willBePatron, t), this;
  }
  disposed(e) {
    var s;
    const t = this.willBePatron;
    return ((s = t == null ? void 0 : t.disposed) == null ? void 0 : s.call(t, e)) || !1;
  }
}
var xi = Object.defineProperty, Ci = (n, e, t) => e in n ? xi(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, _i = (n, e, t) => Ci(n, e + "", t);
class $i {
  constructor(e) {
    this.baseGuest = e, _i(this, "received", !1);
  }
  introduction() {
    return "patron";
  }
  give(e, t) {
    return this.received || (this.received = !0, H(e, this.baseGuest, t)), this;
  }
  disposed(e) {
    if (this.received)
      return !0;
    const t = this.baseGuest;
    return t.disposed ? t.disposed(e) : !1;
  }
}
class N {
  constructor(e, t = {}) {
    this.constructorFn = e, this.factories = t;
  }
  create(...e) {
    return new this.constructorFn(
      ...e,
      this.factories
    );
  }
}
class Ie extends Error {
  constructor(e, t) {
    super(e, t);
  }
}
class ki {
  constructor(e) {
    this.fileHandler = e;
  }
  content(e) {
    return this.fileHandler.getFile().then(async (t) => await new Response(t).text()).then((t) => {
      e.give(t);
    }).catch((t) => {
      throw new Ie("Problem when reading file in SystemFileFromHandler", {
        cause: t
      });
    }), this;
  }
}
class Mi {
  constructor(e) {
    this.fileHandler = e;
  }
  save(e) {
    return this.fileHandler.createWritable().then((t) => (t.write(e).catch((s) => {
      throw new Ie("Cant save file in browser", { cause: s });
    }), t)).then((t) => {
      t.close().catch((s) => {
        throw new Ie("Cant close written file in browser", { cause: s });
      });
    }), this;
  }
}
class Fi {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.parse(this.content);
  }
}
class Si {
  constructor(e) {
    this.content = e;
  }
  result() {
    return JSON.stringify(this.content);
  }
}
class Ti {
  constructor(e, t = 100, s = 100) {
    this.svgContent = e, this.width = t, this.height = s;
  }
  markup() {
    return this.svgContent.replaceAll("${width}", String(this.width)).replaceAll("${height}", String(this.height));
  }
}
class Ii {
  constructor(e, t) {
    this.type = e, this.factories = t;
  }
  markup() {
    return this.factories.svgImage.create(this.type.svg, this.type.width, this.type.height).markup();
  }
}
class ji {
  constructor(e, t, s) {
    this.chunksCount = e, this.baseNumber = t, this.factories = s;
  }
  chunks(e) {
    return this.baseNumber.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Math.round(t / this.chunksCount), i = [];
        for (let r = 1; r <= this.chunksCount; r += 1)
          i.push(r * s);
        e.give(i);
      })
    ), e;
  }
}
class Bi {
  constructor(e, t) {
    this.mapUrl = e, this.factories = t;
  }
  name(e) {
    this.mapUrl.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        let s = t.replace("/", "").replaceAll("/", "_");
        s.match("_") && (s = `_${s}`), e.give(s);
      })
    );
  }
}
class Oi {
  constructor(e, t) {
    this.text = e, this.factories = t;
  }
  noHtml(e) {
    return this.text.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = document.createElement("DIV");
        s.innerHTML = t;
        const i = s.textContent || s.innerText || "";
        e.give(i);
      })
    ), e;
  }
}
class Pi {
  constructor(e, t, s, i) {
    $(this, "loadingCache");
    this.callbackName = e, this.url = t, this.emptyValue = s, this.factories = i, this.loadingCache = i.sourceEmpty.create();
  }
  content(e) {
    this.loadingCache.give(!0);
    const t = setTimeout(() => {
      this.loadingCache.give(!1), e.give(this.emptyValue);
    }, 1e4);
    return Ps(this.url, () => {
      var i;
      clearInterval(t);
      const s = ((i = window[this.callbackName]) == null ? void 0 : i.call(window)) || this.emptyValue;
      e.give(s), this.loadingCache.give(!1);
    }), e;
  }
  loading(e) {
    return this.loadingCache.value(e), e;
  }
}
class Ei {
  constructor(e) {
    this.text = e;
  }
  asString(e) {
    return e.give(this.text), e;
  }
}
class Di {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        e.give((t ?? "").replace(/<\/?[^>]+>/gi, " "));
      })
    ), e;
  }
}
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ut = { exports: {} }, et, Ot;
function Ri() {
  if (Ot) return et;
  Ot = 1;
  var n = 1e3, e = n * 60, t = e * 60, s = t * 24, i = s * 7, r = s * 365.25;
  et = function(u, l) {
    l = l || {};
    var p = typeof u;
    if (p === "string" && u.length > 0)
      return o(u);
    if (p === "number" && isFinite(u))
      return l.long ? a(u) : c(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (l) {
        var p = parseFloat(l[1]), v = (l[2] || "ms").toLowerCase();
        switch (v) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * r;
          case "weeks":
          case "week":
          case "w":
            return p * i;
          case "days":
          case "day":
          case "d":
            return p * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function c(u) {
    var l = Math.abs(u);
    return l >= s ? Math.round(u / s) + "d" : l >= t ? Math.round(u / t) + "h" : l >= e ? Math.round(u / e) + "m" : l >= n ? Math.round(u / n) + "s" : u + "ms";
  }
  function a(u) {
    var l = Math.abs(u);
    return l >= s ? h(u, l, s, "day") : l >= t ? h(u, l, t, "hour") : l >= e ? h(u, l, e, "minute") : l >= n ? h(u, l, n, "second") : u + " ms";
  }
  function h(u, l, p, v) {
    var f = l >= p * 1.5;
    return Math.round(u / p) + " " + v + (f ? "s" : "");
  }
  return et;
}
function Hi(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = r, t.enable = i, t.enabled = o, t.humanize = Ri(), t.destroy = h, Object.keys(n).forEach((u) => {
    t[u] = n[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let l = 0;
    for (let p = 0; p < u.length; p++)
      l = (l << 5) - l + u.charCodeAt(p), l |= 0;
    return t.colors[Math.abs(l) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let l, p = null, v, f;
    function x(...A) {
      if (!x.enabled)
        return;
      const k = x, j = Number(/* @__PURE__ */ new Date()), G = j - (l || j);
      k.diff = G, k.prev = l, k.curr = j, l = j, A[0] = t.coerce(A[0]), typeof A[0] != "string" && A.unshift("%O");
      let R = 0;
      A[0] = A[0].replace(/%([a-zA-Z%])/g, (D, B) => {
        if (D === "%%")
          return "%";
        R++;
        const F = t.formatters[B];
        if (typeof F == "function") {
          const M = A[R];
          D = F.call(k, M), A.splice(R, 1), R--;
        }
        return D;
      }), t.formatArgs.call(k, A), (k.log || t.log).apply(k, A);
    }
    return x.namespace = u, x.useColors = t.useColors(), x.color = t.selectColor(u), x.extend = s, x.destroy = t.destroy, Object.defineProperty(x, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (v !== t.namespaces && (v = t.namespaces, f = t.enabled(u)), f),
      set: (A) => {
        p = A;
      }
    }), typeof t.init == "function" && t.init(x), x;
  }
  function s(u, l) {
    const p = t(this.namespace + (typeof l > "u" ? ":" : l) + u);
    return p.log = this.log, p;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let l;
    const p = (typeof u == "string" ? u : "").split(/[\s,]+/), v = p.length;
    for (l = 0; l < v; l++)
      p[l] && (u = p[l].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function r() {
    const u = [
      ...t.names.map(c),
      ...t.skips.map(c).map((l) => "-" + l)
    ].join(",");
    return t.enable(""), u;
  }
  function o(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let l, p;
    for (l = 0, p = t.skips.length; l < p; l++)
      if (t.skips[l].test(u))
        return !1;
    for (l = 0, p = t.names.length; l < p; l++)
      if (t.names[l].test(u))
        return !0;
    return !1;
  }
  function c(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function a(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function h() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Ni = Hi;
(function(n, e) {
  e.formatArgs = s, e.save = i, e.load = r, e.useColors = t, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let a = !1;
    return () => {
      a || (a = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let a;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (a = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(a[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(a) {
    if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const h = "color: " + this.color;
    a.splice(1, 0, h, "color: inherit");
    let u = 0, l = 0;
    a[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (u++, p === "%c" && (l = u));
    }), a.splice(l, 0, h);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(a) {
    try {
      a ? e.storage.setItem("debug", a) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function r() {
    let a;
    try {
      a = e.storage.getItem("debug");
    } catch {
    }
    return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = Ni(e);
  const { formatters: c } = n.exports;
  c.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (h) {
      return "[UnexpectedJSONParseError]: " + h.message;
    }
  };
})(ut, ut.exports);
var I = ut.exports;
const ls = /* @__PURE__ */ dt(I), Vi = I.debug("TextNlAsBr");
class zi {
  constructor(e, t) {
    this.baseText = e, this.factories = t;
  }
  asString(e) {
    return this.baseText.asString(
      this.factories.guestInTheMiddle.create(e, (t) => {
        if (typeof t > "u" || t === null)
          return "";
        const s = "<br />";
        return Vi(t), e.give((t ?? "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${s}$2`)), !0;
      })
    ), e;
  }
}
const Ui = new N(xe), Li = new N(xe), Qi = new N(ue), Wi = new N(fe), Gi = new N(L), Ki = new N(be), Ji = new N(We), qi = new N(Ke), Yi = new N($i), Zi = new N(L), Xi = new N(Ge), en = new N(wi), pe = {
  cache: Ui,
  chain: Xi,
  guest: Wi,
  guestCast: Gi,
  guestAware: Ki,
  guestInTheMiddle: Zi,
  guestSync: en,
  patron: qi,
  patronOnce: Yi,
  pool: Ji,
  source: Li,
  sourceEmpty: Qi
}, tn = new N(ki), sn = new N(Mi), nn = new N(Si), rn = new N(Fi), us = new N(Ti), on = new N(Ii, { ...pe, svgImage: us }), an = new N(ji, pe), cn = new N(Bi, pe), ln = new N(Oi, pe), un = new N(Pi, pe), dn = new N(Ei), hn = new N(Di, pe), pn = new N(zi, pe), gn = {
  ...pe,
  fileHandlerContent: tn,
  browserFileSaved: sn,
  transformToString: nn,
  transformToObject: rn,
  svgImage: us,
  svgMapTypeImage: on,
  numberChunks: an,
  mapNameFromUrl: cn,
  textNoHtml: ln,
  jsonp: un,
  textOf: dn,
  textNlAsBr: pn,
  textWithoutHTML: hn
}, Z = () => gn;
class ht {
  constructor(e, t, s) {
    this.notification = e, this.check = t, this.factories = s;
  }
  breakOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((s) => {
        s === !0 ? t.give(!0) : this.notification.give({
          type: "error",
          text: s
        });
      })
    ), this;
  }
  continueOnFail(e, t) {
    return this.check.check(
      e,
      this.factories.guest.create((s) => {
        t.give(s), s !== !0 && this.notification.give({
          type: "error",
          text: s
        });
      })
    ), this;
  }
}
const tt = I.debug("MapCurrent");
class ds {
  constructor(e, t, s) {
    $(this, "objectsCache");
    $(this, "settingsCache");
    $(this, "typesCache");
    this.mapFile = e, this.mapId = t, this.factories = s, this.objectsCache = s.sourceEmpty.create(), this.settingsCache = s.sourceEmpty.create(), this.typesCache = s.sourceEmpty.create(), e.currentMap(
      s.patron.create(
        s.guest.create((i) => {
          tt("current map changed", i), this.settingsCache.give(i.settings), this.objectsCache.give(Object.values(i.objects)), this.typesCache.give(
            Object.entries(i.types).map(([r, o]) => ({
              ...o,
              id: r
            }))
          );
        })
      )
    );
  }
  settings(e) {
    return this.settingsCache.value(e), e;
  }
  objects(e) {
    return tt("notify about new objects"), this.objectsCache.value(e), e;
  }
  types(e) {
    return this.typesCache.value(e), e;
  }
  give(e) {
    return tt("save map document", e), this.mapId.id(
      this.factories.guest.create((t) => {
        this.mapFile.mapFile(
          this.factories.guest.create((s) => {
            this.mapFile.give({
              ...s,
              [t]: e
            });
          })
        );
      })
    ), this;
  }
}
class fn {
  constructor(e) {
    $(this, "idCache");
    this.idCache = e.cache.create("current");
  }
  id(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class mn {
  constructor(e) {
    this.mapFile = e;
  }
  value(e) {
    return this.mapFile.currentMap(
      new L(e, (t) => {
        H(t.settings.title, e);
      })
    ), this;
  }
}
const De = I.debug("MapHistory"), Pt = (n) => {
  const e = JSON.parse(JSON.stringify(n));
  return Object.values(e.objects).forEach((t) => {
    t.width = 0, t.height = 0;
  }), JSON.stringify(e);
};
class vn {
  constructor(e, t, s, i) {
    $(this, "mapsHistory");
    $(this, "historyIndex");
    this.mapFile = e, this.map = t, this.mapId = s, this.factories = i, this.mapsHistory = i.cache.create([]), this.historyIndex = i.cache.create(0), this.mapFile.currentMap(i.patron.create(this)), this.mapId.id(
      i.patron.create(
        i.guest.create(() => {
          this.mapsHistory.give([]), this.historyIndex.give(0);
        })
      )
    );
  }
  give(e) {
    return requestIdleCallback(() => {
      this.historyIndex.value(
        this.factories.guest.create((t) => {
          this.mapsHistory.value(
            this.factories.guest.create((s) => {
              De("add map to history", s, e);
              const i = s.some(
                (r) => Pt(r) === Pt(e)
              );
              if (De("isMapFromHistory", i), !i) {
                const r = s[t] ? [s[t]] : [];
                this.historyIndex.give(0), this.mapsHistory.give([e, ...r, ...s.slice(0, 9)]);
              }
            })
          );
        })
      );
    }), this;
  }
  isPrevPossible(e) {
    const t = this.factories.chain.create(this);
    return this.historyIndex.value(
      this.factories.guestCast.create(e, t.guestKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.guestKey("mapsHistory"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: i }) => {
          const r = s < i.length - 1;
          De("recalculate is prev possible", r), e.give(r);
        }
      )
    ), e;
  }
  prev() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e + 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((s) => {
            const i = s[t];
            this.map.give(i);
          })
        );
      })
    );
  }
  isNextPossible(e) {
    const t = this.factories.chain.create(this);
    return this.historyIndex.value(
      this.factories.guestCast.create(e, t.guestKey("historyIndex"))
    ), this.mapsHistory.value(this.factories.guestCast.create(e, t.guestKey("mapsHistory"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ historyIndex: s, mapsHistory: i }) => {
          const r = s > 0 && s <= i.length - 1;
          De("recalculate is next possible", r), e.give(r);
        }
      )
    ), e;
  }
  next() {
    this.historyIndex.value(
      this.factories.guest.create((e) => {
        const t = e - 1;
        this.historyIndex.give(t), this.mapsHistory.value(
          this.factories.guest.create((s) => {
            const i = s[t];
            this.map.give(i);
          })
        );
      })
    );
  }
}
class An {
  constructor(e, t, s) {
    this.mapFile = e, this.mapId = t, this.factories = s;
  }
  give(e) {
    const { guest: t } = this.factories;
    return this.mapFile.mapFile(
      t.create((s) => {
        delete s[e], this.mapFile.give(s), this.mapId.give("current");
      })
    ), this;
  }
}
const Re = I.debug("MapFile");
class yn {
  constructor(e, t, s) {
    $(this, "currentMapPatrons");
    $(this, "mapFileCache");
    this.mapFileContent = e, this.mapId = t, this.factories = s, this.currentMapPatrons = s.pool.create(this), this.mapFileCache = s.cache.create(!1), e.value(
      s.patron.create((i) => {
        if (!i)
          return;
        const r = this.factories.transformToObject.create(i).result();
        Re("get map file", r), this.mapFileCache.give(r);
      })
    );
  }
  currentMap(e) {
    const t = this.factories.chain.create();
    return this.mapId.id(this.factories.guestCast.create(e, t.guestKey("mapId"))), this.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(
        e,
        ({ mapId: s, mapFile: i }) => {
          if (Re("get current map", s, i, typeof i), !i[s])
            this.createEmptyMapByName(s, e);
          else {
            const r = i[s];
            this.currentMapPatrons.distribute(
              r != null && r.structure ? r.structure : r,
              e
            );
          }
        }
      )
    ), e;
  }
  give(e) {
    return Re("save map file document", e), this.mapFileContent.give(this.factories.transformToString.create(e).result()), this;
  }
  mapFile(e) {
    return this.mapFileCache.value(e), e;
  }
  createEmptyMapByName(e, t) {
    Re("creating empty map by name", e);
    const s = this.factories.transformToObject.create(this.generateEmptyMapFile()).result();
    this.mapFile(
      this.factories.guest.create((i) => {
        this.give({
          ...i,
          [e]: s.current
        }), t.give(s.current);
      })
    );
  }
  generateEmptyMapFile() {
    return '{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}';
  }
}
const bn = I.debug("MapFileForRendering");
class wn {
  constructor(e, t, s) {
    $(this, "mapCache");
    this.mapId = t, this.factories = s, this.mapCache = s.cache.create({ objects: {}, types: {}, settings: {} }), e.currentMap(s.patron.create(this.mapCache));
  }
  currentMap(e) {
    return this.mapCache.value(e), e;
  }
  mapFile(e) {
    return this.mapCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        this.mapId.id(
          this.factories.guest.create((s) => {
            e.give({ [s]: t });
          })
        );
      })
    ), e;
  }
  give(e) {
    return this.mapId.id(
      this.factories.guest.create((t) => {
        bn("received map file, objects = ", e[t].objects), this.mapCache.give(e[t]);
      })
    ), this;
  }
}
class hs {
  constructor(e, t, s) {
    this.map = e, this.mapFile = t, this.factories = s;
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        this.map.give({
          ...t,
          objects: {
            ...t.objects,
            [e.id]: {
              ...e,
              createTimestamp: e.createTimestamp ?? Date.now(),
              changeTimestamp: Date.now()
            }
          }
        });
      })
    ), this;
  }
}
const Et = ls("app:MapObjectCurrent");
class xn {
  constructor(e, t) {
    $(this, "idCache");
    $(this, "silenceActivator");
    this.drawer = e, this.factories = t, this.idCache = t.sourceEmpty.create(), this.silenceActivator = t.source.create(!1), this.idCache.value(
      t.patron.create(
        t.guest.create((s) => {
          s && e.give("object");
        })
      )
    );
  }
  silenceOn(e) {
    return this.silenceActivator.give(e), this;
  }
  silenceOff() {
    return this.silenceActivator.give(!1), this;
  }
  objectId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return Et("new value current object", e), this.silenceActivator.value(
      this.factories.guest.create((t) => {
        Et("silence activator", t), t ? t.give(e) : this.idCache.give(e);
      })
    ), this;
  }
}
class Cn {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        let i = !1;
        Object.values(s.objects).forEach((r) => {
          i = i || r.arrows.some((o) => o.id === e.id);
        }), t.give(!i || "У объекта есть входящие связи!");
      })
    ), this;
  }
}
const st = I.debug("MapObjectNew");
class _n {
  constructor(e, t, s, i, r) {
    this.map = e, this.mapObject = t, this.canvas = s, this.stagePosition = i, this.factories = r;
  }
  byTypeName(e, t) {
    return st("start to add new type", e, t), this.stagePosition.position(
      this.factories.guest.create((s) => {
        this.map.types(
          this.factories.guest.create((i) => {
            this.canvas.canvas(
              this.factories.guest.create((r) => {
                const o = r.getBoundingClientRect(), c = i.find((u) => u.id === e);
                st("is type found", c);
                const a = t.x - o.left, h = t.y - o.top;
                c && (st("add new type"), this.mapObject.give({
                  additionalName: "",
                  arrows: [],
                  description: "",
                  inMenu: !1,
                  lastClick: Date.now(),
                  linked: !1,
                  menuOrder: 0,
                  name: "",
                  outlink: "",
                  targetBlank: !1,
                  type: e,
                  width: c.width,
                  height: c.height,
                  zindex: 0,
                  id: (/* @__PURE__ */ new Date()).getTime().toString(),
                  createTimestamp: Date.now(),
                  changeTimestamp: Date.now(),
                  position: [
                    a > 0 ? a + s.x : 0,
                    h > 0 ? h + s.y : 0
                  ]
                }));
              })
            );
          })
        );
      })
    ), this;
  }
}
class $n {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  names(e) {
    return this.mapId.id(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.split("_").filter((o) => !!o);
        let i = "";
        const r = s.map((o) => {
          const c = `${i}${o}`;
          return i || (i = "_"), i += `${o}_`, c;
        });
        i = "", e.give(r);
      })
    ), e;
  }
}
class kn {
  constructor(e) {
    this.mapObject = e;
  }
  give(e) {
    const { arrows: t } = e.object;
    return t.splice(e.index, 1), this.mapObject.give({
      ...e.object,
      arrows: t
    }), this;
  }
}
class Mn {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(e, t.guestKey(String(i)));
    }), t.value(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.objects[e.id], this.map.give(s);
          })
        );
      })
    ), this;
  }
}
const Fn = I.debug("MapObjectsLink");
class Sn {
  constructor(e, t, s, i, r) {
    $(this, "objectIdsCache");
    this.mapObjectCurrent = e, this.map = t, this.mapObject = s, this.newArrow = i, this.factories = r, this.objectIdsCache = r.cache.create([]);
  }
  objectIds(e) {
    return this.objectIdsCache.value(e), e;
  }
  startLink() {
    this.mapObjectCurrent.give(""), this.objectIdsCache.value(
      this.factories.guest.create((e) => {
        if (e.length) {
          this.mapObjectCurrent.silenceOff(), this.objectIdsCache.give([]);
          return;
        }
        const t = ["first"];
        this.objectIdsCache.give(t), this.mapObjectCurrent.silenceOn(
          this.factories.guest.create((s) => {
            t.push(s), this.objectIdsCache.give([...t]), Fn("object ids", t), t.length === 2 && this.map.objects(
              this.factories.guest.create((i) => {
                const [, r] = t, o = i.find((c) => c.id === r);
                o && this.newArrow.forObject(o);
              })
            ), t.length === 3 && (this.newArrow.dispose(), this.mapObjectCurrent.silenceOff(), this.map.objects(
              this.factories.guest.create((i) => {
                const [, r, o] = t, c = i.find((a) => a.id === r);
                c && o && (this.objectIdsCache.give([]), this.mapObject.give({
                  ...c,
                  arrows: [
                    ...c.arrows,
                    {
                      id: o,
                      label: ""
                    }
                  ]
                }));
              })
            ));
          })
        );
      })
    );
  }
}
function Tn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var pt = Tn, In = typeof Ee == "object" && Ee && Ee.Object === Object && Ee, jn = In, Bn = jn, On = typeof self == "object" && self && self.Object === Object && self, Pn = Bn || On || Function("return this")(), ps = Pn, En = ps, Dn = function() {
  return En.Date.now();
}, Rn = Dn, Hn = /\s/;
function Nn(n) {
  for (var e = n.length; e-- && Hn.test(n.charAt(e)); )
    ;
  return e;
}
var Vn = Nn, zn = Vn, Un = /^\s+/;
function Ln(n) {
  return n && n.slice(0, zn(n) + 1).replace(Un, "");
}
var Qn = Ln, Wn = ps, Gn = Wn.Symbol, gs = Gn, Dt = gs, fs = Object.prototype, Kn = fs.hasOwnProperty, Jn = fs.toString, _e = Dt ? Dt.toStringTag : void 0;
function qn(n) {
  var e = Kn.call(n, _e), t = n[_e];
  try {
    n[_e] = void 0;
    var s = !0;
  } catch {
  }
  var i = Jn.call(n);
  return s && (e ? n[_e] = t : delete n[_e]), i;
}
var Yn = qn, Zn = Object.prototype, Xn = Zn.toString;
function er(n) {
  return Xn.call(n);
}
var tr = er, Rt = gs, sr = Yn, ir = tr, nr = "[object Null]", rr = "[object Undefined]", Ht = Rt ? Rt.toStringTag : void 0;
function or(n) {
  return n == null ? n === void 0 ? rr : nr : Ht && Ht in Object(n) ? sr(n) : ir(n);
}
var ar = or;
function cr(n) {
  return n != null && typeof n == "object";
}
var lr = cr, ur = ar, dr = lr, hr = "[object Symbol]";
function pr(n) {
  return typeof n == "symbol" || dr(n) && ur(n) == hr;
}
var gr = pr, fr = Qn, Nt = pt, mr = gr, Vt = NaN, vr = /^[-+]0x[0-9a-f]+$/i, Ar = /^0b[01]+$/i, yr = /^0o[0-7]+$/i, br = parseInt;
function wr(n) {
  if (typeof n == "number")
    return n;
  if (mr(n))
    return Vt;
  if (Nt(n)) {
    var e = typeof n.valueOf == "function" ? n.valueOf() : n;
    n = Nt(e) ? e + "" : e;
  }
  if (typeof n != "string")
    return n === 0 ? n : +n;
  n = fr(n);
  var t = Ar.test(n);
  return t || yr.test(n) ? br(n.slice(2), t ? 2 : 8) : vr.test(n) ? Vt : +n;
}
var xr = wr, Cr = pt, it = Rn, zt = xr, _r = "Expected a function", $r = Math.max, kr = Math.min;
function Mr(n, e, t) {
  var s, i, r, o, c, a, h = 0, u = !1, l = !1, p = !0;
  if (typeof n != "function")
    throw new TypeError(_r);
  e = zt(e) || 0, Cr(t) && (u = !!t.leading, l = "maxWait" in t, r = l ? $r(zt(t.maxWait) || 0, e) : r, p = "trailing" in t ? !!t.trailing : p);
  function v(D) {
    var B = s, F = i;
    return s = i = void 0, h = D, o = n.apply(F, B), o;
  }
  function f(D) {
    return h = D, c = setTimeout(k, e), u ? v(D) : o;
  }
  function x(D) {
    var B = D - a, F = D - h, M = e - B;
    return l ? kr(M, r - F) : M;
  }
  function A(D) {
    var B = D - a, F = D - h;
    return a === void 0 || B >= e || B < 0 || l && F >= r;
  }
  function k() {
    var D = it();
    if (A(D))
      return j(D);
    c = setTimeout(k, x(D));
  }
  function j(D) {
    return c = void 0, p && s ? v(D) : (s = i = void 0, o);
  }
  function G() {
    c !== void 0 && clearTimeout(c), h = 0, s = a = i = c = void 0;
  }
  function R() {
    return c === void 0 ? o : j(it());
  }
  function re() {
    var D = it(), B = A(D);
    if (s = arguments, i = this, a = D, B) {
      if (c === void 0)
        return f(a);
      if (l)
        return clearTimeout(c), c = setTimeout(k, e), v(a);
    }
    return c === void 0 && (c = setTimeout(k, e)), o;
  }
  return re.cancel = G, re.flush = R, re;
}
var ms = Mr;
const me = /* @__PURE__ */ dt(ms), Fr = (n) => {
  if (n[n.length - 1] === "/") {
    const e = n.split("");
    return e.splice(e.length - 1, 1), e.join("");
  }
  return n;
}, Sr = me((n) => {
  window == null || window.open(n);
}, 200), nt = I.debug("MapObjectUrl");
class Tr {
  constructor(e, t) {
    this.mapId = e, this.factories = t;
  }
  open(e, t) {
    if (e != null && e.linked) {
      const s = e.outlink;
      e.targetBlank ? Sr(s) : (nt("open new map", s), this.factories.mapNameFromUrl.create(
        this.factories.source.create(s)
      ).name(
        this.factories.guest.create((r) => {
          nt("open map name", s, r), t.give(r);
        })
      ));
    }
    return this;
  }
  url(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        this.mapId.id(
          this.factories.guest.create((i) => {
            const r = i[0] === "_" ? i.replaceAll("_", "/") : "/current", o = s.name ? s.name : s.additionalName ? s.additionalName : "";
            this.factories.textNoHtml.create(this.factories.source.create(o)).noHtml(
              this.factories.guest.create((c) => {
                let a = s.outlink ? s.outlink : `${r}/${Ir(c)}`;
                nt("link is", a), a = Fr(a), t.give(a);
              })
            );
          })
        );
      })
    ), t;
  }
}
function Ir(n) {
  return n.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
const jr = I.debug("ObjectPositionBounds");
class Br {
  constructor(e, t) {
    this.stageSize = e, this.factories = t;
  }
  position(e, t, s) {
    return this.stageSize.value(
      this.factories.guestInTheMiddle.create(s, (i) => {
        let { x: r, y: o } = t;
        r < 30 && (r = 30), o < 30 && (o = 30);
        const c = i.width - e.width;
        r > c && (r = c);
        const a = i.height - e.height;
        o > a && (o = a), jr("position", r, o), s.give({ x: r, y: o });
      })
    ), s;
  }
}
const He = 15;
class Or {
  constructor(e, t) {
    this.baseRestriction = e, this.factories = t;
  }
  position(e, t, s) {
    return this.baseRestriction.position(
      e,
      t,
      this.factories.guestInTheMiddle.create(s, (i) => {
        s.give({
          x: Math.round(i.x / He) * He,
          y: Math.round(i.y / He) * He
        });
      })
    ), s;
  }
}
const Ut = {
  x: "width",
  y: "height"
}, rt = {
  x: 0,
  y: 1
}, Pr = {
  positive: 1,
  negative: -1
}, Lt = I.debug("ObjectsOutsideScreen");
class Er {
  constructor(e, t, s, i) {
    this.map = e, this.stageSize = t, this.layer = s, this.factories = i;
  }
  count(e, t) {
    const s = e.direction === "positive", i = this.factories.chain.create();
    return this.map.objects(this.factories.guestCast.create(t, i.guestKey("objects"))), this.layer.layer(this.factories.guestCast.create(t, i.guestKey("layer"))), this.layer.position(this.factories.guestCast.create(t, i.guestKey("position"))), i.value(
      this.factories.guestInTheMiddle.create(
        t,
        ({ objects: r, layer: o, position: c }) => {
          var l;
          const a = Pr[e.direction], u = r.sort(
            (p, v) => p.position[rt[e.axis]] * a - v.position[rt[e.axis]] * a
          ).filter((p) => {
            const v = p.position[rt[e.axis]] + (s ? 0 : p[Ut[e.axis]]), f = c[e.axis] * -1 + (s ? o[Ut[e.axis]]() : 0);
            return Lt(
              "mb nearest points",
              e.direction,
              "objectP=",
              v,
              "screenP=",
              f
            ), s ? v > f : v < f;
          });
          Lt("nearest", u), t.give({
            count: u.length,
            nearestObjectId: ((l = u.at(s ? -1 : 0)) == null ? void 0 : l.id) ?? ""
          });
        }
      )
    ), t;
  }
}
class Dr {
  constructor(e, t, s) {
    this.mapFile = e, this.map = t, this.factories = s;
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        this.map.give({
          ...t,
          settings: e
        });
      })
    ), this;
  }
}
class Rr {
  constructor(e) {
    $(this, "idCache");
    this.idCache = e.sourceEmpty.create();
  }
  typeId(e) {
    return this.idCache.value(e), e;
  }
  give(e) {
    return this.idCache.give(e), this;
  }
}
class Hr {
  constructor(e) {
    this.mapType = e;
  }
  byName() {
    const e = String((/* @__PURE__ */ new Date()).getTime());
    this.mapType.give({
      name: e,
      type: {
        id: e,
        name: "Новый тип",
        svg: '<div style="background: lightyellow;border: 1px solid #ccc;">type</div>',
        width: 100,
        height: 40
      }
    });
  }
}
class Nr {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(
        {
          name: e.id,
          type: e
        },
        t.guestKey(String(i))
      );
    }), t.value(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.types[e.id], this.map.give(s);
          })
        );
      })
    ), this;
  }
}
class Vr {
  constructor(e, t, s, i) {
    this.map = e, this.mapFile = t, this.checks = s, this.factories = i;
  }
  give(e) {
    const t = this.factories.chain.create(this);
    return this.checks.forEach((s, i) => {
      s.breakOnFail(e, t.guestKey(String(i)));
    }), t.value(
      this.factories.guest.create(() => {
        this.mapFile.currentMap(
          this.factories.guest.create((s) => {
            delete s.types[e.name], this.map.give({
              ...s,
              types: {
                ...s.types,
                [e.type.name]: e.type
              }
            });
          })
        );
      })
    ), this;
  }
}
const zr = I.debug("MapTypeUsed");
class Ur {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  check(e, t) {
    return this.mapFile.currentMap(
      this.factories.guest.create((s) => {
        const i = Object.values(s.objects).some(
          (r) => r.type === e.name
        );
        zr("is type used", i), t.give(!i || "Тип карты использован");
      })
    ), this;
  }
}
class Lr {
  constructor(e, t) {
    this.mapTypeUsedCheck = e, this.factories = t;
  }
  check(e, t) {
    return this.mapTypeUsedCheck.check(
      e,
      this.factories.guest.create((s) => {
        s !== !0 && e.name !== e.type.name ? t.give("Нельзя изменять имя типа, который использован!") : t.give(!0);
      })
    ), this;
  }
}
const Qt = I.debug("ParentTypes");
class Qr {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  types(e) {
    Qt("parent types requested");
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.guestKey("parentNames"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ parentNames: s, mapFile: i }) => {
        const r = s.slice(0, -1);
        Qt("parent names", r);
        const o = {};
        r.map((a) => i[a]).forEach((a) => {
          Object.values(a.types).forEach((h) => {
            o[h.name] = h;
          });
        }), e.give(Object.values(o));
      })
    ), e;
  }
}
const Wt = I.debug("ObjectsMatchedToQuery");
class Wr {
  constructor(e, t) {
    this.map = e, this.factories = t;
  }
  objects(e, t) {
    return e.value(
      this.factories.guestInTheMiddle.create(
        t,
        me((i) => {
          i = i.toLowerCase(), this.map.objects(
            this.factories.guest.create((r) => {
              if (!i) {
                Wt("reset results"), t.give([]);
                return;
              }
              const o = r.filter(
                (c) => {
                  var a;
                  return c.name.toLowerCase().includes(i) || ((a = c.additionalName) == null ? void 0 : a.toLowerCase().includes(i)) || Object.values(c.additionalFields ?? {}).join(" ").toLowerCase().includes(i);
                }
              );
              Wt("objects in searching", o, i), t.give(o);
            })
          );
        }, 500)
      )
    ), t;
  }
}
const Gr = {
  height: 3e3,
  width: 3e3
};
class Kr {
  value(e) {
    return H(Gr, e), e;
  }
}
const Gt = I.debug("StageMoveRestriction");
class Jr {
  constructor(e, t, s) {
    this.canvasDep = e, this.stageSize = t, this.factories = s;
  }
  position(e, t) {
    return this.canvasDep.canvas(
      this.factories.guest.create((s) => {
        this.stageSize.value(
          this.factories.guest.create((i) => {
            Gt("income position", e);
            const r = i.width - s.clientWidth, o = i.height - s.clientHeight, c = e.x * -1, a = e.y * -1;
            if (o < 0 || r < 0)
              return { x: 0, y: 0 };
            Gt("boundings", o, r, a, c), t.give({
              x: e.x > 0 ? 0 : c > r ? r * -1 : e.x,
              y: e.y > 0 ? 0 : a > o ? o * -1 : e.y
            });
          })
        );
      })
    ), t;
  }
}
const $e = I.debug("app:MapObjectsVisible");
class qr {
  constructor(e, t, s, i) {
    $(this, "visibleObjectsCache", new ue());
    $e("constructor initialized");
    const r = i.chain.create();
    t.size(i.patron.create(r.guestKey("size"))), e.position(i.patron.create(r.guestKey("position"))), s.currentMap(i.patron.create(r.guestKey("map"))), r.value(
      i.patron.create(
        i.guest.create(({ position: o, size: c, map: a }) => {
          const h = Object.values(a.objects);
          $e("objects come to result", h);
          const u = h.filter((l) => {
            const p = a.types[l.type] ?? {}, v = {
              width: l.width || p.width,
              height: l.height || p.height
            };
            return this.isInBounding(o, c, l.position, v);
          });
          $e("visible objects calculated", u), this.visibleObjectsCache.give(u);
        })
      )
    );
  }
  objects(e) {
    return this.visibleObjectsCache.value(e), this;
  }
  isInBounding(e, t, s, i) {
    const r = e.x, o = e.x - t.width, c = e.y, a = e.y - t.height, [h, u] = s;
    return $e("bounding vars", r, o, c, a), $e("object position", s), r > -h - i.width && -h > o && c > -u - i.height && -u > a;
  }
}
const Yr = (n, e) => {
  const t = n.matchAll(e);
  return Array.from(t).map((s) => s[1]);
}, Zr = (n, e) => n.reduce((t, s) => (t[s] = e[s] || s, t), {});
class Xr {
  constructor(e, t, s, i) {
    this.mapFile = t, this.mapObject = s, this.factories = i, e.objectId(this);
  }
  give(e) {
    return this.mapFile.currentMap(
      this.factories.guest.create((t) => {
        const s = t.objects[e];
        if (!s)
          return;
        const i = t.types[s.type], r = /\$\{([a-zA-Z1-9]+)\}/g, c = Yr(i.svg, r).filter((a) => a !== "width" && a !== "height");
        s.additionalFields = Zr(c, s.additionalFields ?? {}), this.mapObject.give(s);
      })
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class eo {
  constructor() {
    $(this, "filledPoints", /* @__PURE__ */ new Map());
  }
  clear() {
    this.filledPoints.clear();
  }
  breakPoints(e, t, s) {
    const i = this.arrowPointPosition(
      e.shapeGeometry,
      e.shapePosition,
      e.lookToGeometry,
      e.lookToPosition
    ), r = this.arrowPointPosition(
      t.shapeGeometry,
      t.shapePosition,
      t.lookToGeometry,
      t.lookToPosition
    );
    return s.give([
      +i.point.x + i.shift.x,
      +i.point.y + i.shift.y,
      +i.breakPoint.x + i.shift.x,
      +i.breakPoint.y + i.shift.y,
      +r.breakPoint.x + r.shift.x,
      +r.breakPoint.y + r.shift.y,
      +r.point.x + r.shift.x,
      +r.point.y + r.shift.y
    ]), this;
  }
  arrowPointPosition(e, t, s, i) {
    return this.arrowPointPositionNear(
      e,
      t,
      s,
      i
    );
  }
  arrowPointPositionNear(e, t, s, i) {
    const r = {
      x: +i.x + Math.round(s.width / 2),
      y: +i.y + Math.round(s.height / 2)
    }, o = {
      x: +t.x + Math.round(e.width / 2),
      y: +t.y + Math.round(e.height / 2)
    }, c = o.x - r.x, a = o.y - r.y, h = Math.abs(a) > Math.abs(c);
    let u = +t.x, l = +t.y;
    const p = h && a >= 0, v = !h && c >= 0, f = h && a < 0, x = !h && c < 0, A = { x: 0, y: 0 };
    let k = 0, j = 0;
    p ? (u += Math.round(e.width / 2), A.x = u, A.y = (t.y + i.y + s.height) / 2, k = i.x > t.x ? 1 : -1) : x ? (l += Math.round(e.height / 2), u += +e.width, A.x = (t.x + e.width + i.x) / 2, A.y = l, j = i.y > t.y ? 1 : -1) : f ? (u += Math.round(e.width / 2), l += +e.height, A.x = u, A.y = (t.y + e.height + i.y) / 2, k = i.x > t.x ? 1 : -1) : v && (l += Math.round(e.height / 2), A.x = (t.x + i.x + s.width) / 2, A.y = l, j = i.y > t.y ? 1 : -1);
    const G = [u, l].join("-"), R = this.filledPoints.get(G) || 0;
    return this.filledPoints.set(G, R + 1), {
      point: { x: u, y: l },
      breakPoint: A,
      shift: {
        x: k * R * 10,
        y: j * R * 10
      }
    };
  }
}
class to {
  constructor(e, t) {
    this.objectsSource = e, this.objectsMapSource = t;
  }
  value(e) {
    const t = new Ge();
    return this.objectsSource.value(new L(e, t.guestKey("objects"))), this.objectsMapSource.value(new L(e, t.guestKey("objectsMap"))), t.value(
      new L(
        e,
        ({ objects: s, objectsMap: i }) => {
          const r = [];
          s.forEach((o) => {
            o.arrows.forEach((c) => {
              const a = i[c.id];
              a && r.push({
                fromObject: o,
                toObject: a
              });
            });
          }), H(r, e);
        }
      )
    ), this;
  }
}
class so {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new L(e, (t) => {
        if (t.type !== "threeBreaks")
          return;
        const s = this.points(t.fromObject, t.toObject), i = this.points(t.toObject, t.fromObject);
        H({
          key: t.fromObject.id + "-" + t.toObject.id,
          points: [
            +s.point.x + s.shift.x,
            +s.point.y + s.shift.y,
            +s.breakPoint.x + s.shift.x,
            +s.breakPoint.y + s.shift.y,
            +i.breakPoint.x + i.shift.x,
            +i.breakPoint.y + i.shift.y,
            +i.point.x + i.shift.x,
            +i.point.y + i.shift.y
          ]
        }, e);
      })
    ), this;
  }
  points(e, t) {
    const s = {
      x: +t.position[0] + Math.round(t.width / 2),
      y: +t.position[1] + Math.round(t.height / 2)
    }, i = {
      x: +e.position[0] + Math.round(e.width / 2),
      y: +e.position[1] + Math.round(e.height / 2)
    }, r = i.x - s.x, o = i.y - s.y, c = Math.abs(o) > Math.abs(r);
    let a = +e.position[0], h = +e.position[1];
    const u = c && o >= 0, l = !c && r >= 0, p = c && o < 0, v = !c && r < 0, f = { x: 0, y: 0 };
    return u ? (a += Math.round(e.width / 2), f.x = a, f.y = (e.position[1] + t.position[1] + t.height) / 2, t.position[0] > e.position[0]) : v ? (h += Math.round(e.height / 2), a += +e.width, f.x = (e.position[0] + e.width + t.position[0]) / 2, f.y = h, t.position[1] > e.position[1]) : p ? (a += Math.round(e.width / 2), h += +e.height, f.x = a, f.y = (e.position[1] + e.height + t.position[1]) / 2, t.position[1] > e.position[1]) : l && (h += Math.round(e.height / 2), f.x = (e.position[0] + t.position[0] + t.width) / 2, f.y = h, t.position[1] > e.position[1]), {
      point: { x: a, y: h },
      breakPoint: f,
      shift: {
        x: 0,
        y: 0
      }
    };
  }
}
class io {
  constructor(e) {
    this.arrowDeps = e;
  }
  value(e) {
    return this.arrowDeps.value(
      new L(e, (t) => {
        t.type === "twoBreaks" && H({
          key: t.fromObject.id + "-" + t.toObject.id,
          points: this.points(t.fromObject, t.toObject)
        }, e);
      })
    ), this;
  }
  points(e, t) {
    const s = {
      startHeight: e.position[1],
      startWidth: e.position[0],
      midHeight: e.position[1] + Math.round(e.height / 2),
      midWidth: e.position[0] + Math.round(e.width / 2),
      fullHeight: e.position[1] + e.height,
      fullWidth: e.position[0] + e.width
    }, i = {
      startHeight: t.position[1],
      startWidth: t.position[0],
      midHeight: t.position[1] + Math.round(t.height / 2),
      midWidth: t.position[0] + Math.round(t.width / 2),
      fullHeight: t.position[1] + t.height,
      fullWidth: t.position[0] + t.width
    }, r = {
      "left-top": () => s.fullWidth < i.startWidth && s.fullHeight < i.startHeight,
      "right-top": () => i.fullWidth < s.startWidth && s.fullHeight < i.startHeight,
      "left-bottom": () => s.fullWidth < i.startWidth && i.fullHeight < s.startHeight,
      "right-bottom": () => i.fullWidth < s.startWidth && i.fullHeight < s.startHeight
    }, o = {
      "left-top": () => [s.fullWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.startHeight],
      "right-top": () => [
        s.startWidth,
        s.midHeight,
        i.midWidth,
        s.midHeight,
        i.midWidth,
        i.startHeight
      ],
      "left-bottom": () => [s.fullWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.fullHeight],
      "right-bottom": () => [s.startWidth, s.midHeight, i.midWidth, s.midHeight, i.midWidth, i.fullHeight]
    }, c = Object.entries(r).reduce((a, [h, u]) => (u() && (a = h), a), "left-top");
    return o[c]();
  }
}
class no {
  constructor(e, t = 10) {
    this.arrowDepsSource = e, this.centerGap = t;
  }
  value(e) {
    return this.arrowDepsSource.value(
      new L(e, ({ fromObject: t, toObject: s }) => {
        const i = {
          width: t.width,
          height: t.height
        }, r = {
          x: t.position[0],
          y: t.position[1]
        }, o = {
          width: s.width,
          height: s.height
        }, c = {
          x: s.position[0],
          y: s.position[1]
        }, a = {
          x: +c.x + Math.round(o.width / 2),
          y: +c.y + Math.round(o.height / 2)
        }, h = {
          x: +r.x + Math.round(i.width / 2),
          y: +r.y + Math.round(i.height / 2)
        }, u = Math.abs(a.x - h.x) - (o.width + this.centerGap), l = Math.abs(a.y - h.y) - (o.height + this.centerGap);
        H({
          fromObject: t,
          toObject: s,
          type: u < 0 || l < 0 ? "threeBreaks" : "twoBreaks"
        }, e);
      })
    ), this;
  }
}
class ro {
  constructor(e) {
    this.basePoints = e;
  }
  value(e) {
    return this.basePoints.value(
      new L(e, (t) => {
        const s = {};
        t.forEach((i, r) => {
          const o = "" + i.points.at(0) + i.points.at(1);
          s[o] || (s[o] = []), s[o].push({
            arrowIndex: r,
            pointStartIndex: 0,
            breakPointStartIndex: 2,
            pointEndIndex: i.points.length - 2
          });
          const c = "" + i.points.at(-2) + i.points.at(-1);
          s[c] || (s[c] = []), s[c].push({
            arrowIndex: r,
            pointStartIndex: i.points.length - 2,
            breakPointStartIndex: i.points.length - 4,
            pointEndIndex: 0
          });
        }), H(s, e);
      })
    ), this;
  }
}
const Ne = 15;
class oo {
  constructor(e) {
    $(this, "pointGroups");
    this.basePoints = e, this.pointGroups = new ro(e);
  }
  value(e) {
    const t = new Ge();
    return this.pointGroups.value(new L(e, t.guestKey("pointGroups"))), this.basePoints.value(new L(e, t.guestKey("basePoints"))), t.value(
      new L(e, ({ pointGroups: s, basePoints: i }) => {
        Object.values(s).forEach((r) => {
          if (r.length <= 1)
            return;
          r.sort((a, h) => i[h.arrowIndex].points[h.pointEndIndex] - i[a.arrowIndex].points[a.pointEndIndex]);
          let o = 0, c = 0;
          r.forEach((a, h) => {
            const u = i[a.arrowIndex].points[a.pointStartIndex], l = i[a.arrowIndex].points[a.pointStartIndex + 1], p = i[a.arrowIndex].points[a.pointEndIndex], v = i[a.arrowIndex].points[a.pointEndIndex + 1], f = i[a.arrowIndex].points[a.breakPointStartIndex], x = i[a.arrowIndex].points[a.breakPointStartIndex + 1], A = u > f ? -1 : u < f ? 1 : 0, k = l > x ? -1 : l < x ? 1 : 0, j = u > p ? -1 : u < p ? 1 : 0, G = l > v ? -1 : l < v ? 1 : 0;
            if (A !== 0) {
              let R = 0;
              h !== 0 && (G > 0 ? (c += 1, R = c) : (o += 1, R = o)), G && (i[a.arrowIndex].points[a.pointStartIndex + 1] = i[a.arrowIndex].points[a.pointStartIndex + 1] + R * G * Ne), i[a.arrowIndex].points[a.breakPointStartIndex + 1] = i[a.arrowIndex].points[a.breakPointStartIndex + 1] + R * G * Ne;
            }
            if (k !== 0) {
              let R = 0;
              h !== 0 && (j > 0 ? (c += 1, R = c) : (o += 1, R = o)), i[a.arrowIndex].points[a.pointStartIndex] = i[a.arrowIndex].points[a.pointStartIndex] + R * j * Ne, i[a.arrowIndex].points[a.breakPointStartIndex] = i[a.arrowIndex].points[a.breakPointStartIndex] + R * j * Ne;
            }
          });
        }), H(i, e);
      })
    ), this;
  }
}
class ao {
  constructor(e) {
    this.guestAwares = e;
  }
  value(e) {
    let t = null;
    return this.guestAwares.forEach((s) => {
      s.value(
        new L(e, (i) => {
          (!t || t === s) && (H(i, e), t = s);
        })
      );
    }), this;
  }
}
class co {
  constructor(e, t) {
    this.baseSource = e, this.targetSourceFactory = t;
  }
  value(e) {
    const t = new Ge(), s = new ue(), i = this.targetSourceFactory.create(
      s
    );
    return this.baseSource.value(
      new L(e, (r) => {
        let o = 0;
        const c = () => {
          r[o + 1] !== void 0 ? (o = o + 1, a()) : t.valueArray(e);
        };
        function a() {
          s.give(r[o]), i.value(t.guestKey("" + o)), i.value(c);
        }
        r[o] !== void 0 ? a() : H([], e);
      })
    ), this;
  }
}
class lo {
  constructor(e) {
    this.buildingFn = e;
  }
  create(...e) {
    return this.buildingFn(...e);
  }
}
var uo = ms, ho = pt, po = "Expected a function";
function go(n, e, t) {
  var s = !0, i = !0;
  if (typeof n != "function")
    throw new TypeError(po);
  return ho(t) && (s = "leading" in t ? !!t.leading : s, i = "trailing" in t ? !!t.trailing : i), uo(n, e, {
    leading: s,
    maxWait: e,
    trailing: i
  });
}
var fo = go;
const mo = /* @__PURE__ */ dt(fo), { Arrow: vo } = he, Ao = I.debug("MapObjectsArrows");
class yo {
  constructor(e, t, s, i, r) {
    $(this, "previouslyRenderedArrows", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapDep = s, this.arrowPath = i, this.factories = r, Ao("draw arrows on canvas");
    const o = this.factories.chain.create();
    this.konvaLayer.layer(this.factories.patron.create(o.guestKey("layer"))), this.mapFile.currentMap(this.factories.patron.create(o.guestKey("map"))), this.mapDep.objects(this.factories.patron.create(o.guestKey("objects"))), o.value(
      this.factories.patron.create(
        this.factories.guest.create(
          mo(({ layer: c, map: a, objects: h }) => {
            this.previouslyRenderedArrows.forEach((p) => {
              p.arrow.hide();
            });
            const u = h.reduce((p, v) => (p[v.id] = v, p), {});
            new oo(
              new co(
                new to(
                  new be((p) => H(h, p)),
                  new be((p) => H(u, p))
                ),
                new lo((p) => {
                  const v = new no(p);
                  return new ao([new io(v), new so(v)]);
                })
              )
            ).value((p) => {
              p.forEach((v) => {
                const f = v.key;
                if (this.previouslyRenderedArrows.has(f)) {
                  const A = this.previouslyRenderedArrows.get(f);
                  A.arrow.show(), A.arrow.points(v.points);
                  return;
                }
                const x = new vo({
                  x: 0,
                  y: 0,
                  points: v.points,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                });
                this.previouslyRenderedArrows.set(f, {
                  arrow: x
                }), c.add(x);
              });
            });
          }, 50)
        )
      )
    );
  }
  introduction() {
    return "patron";
  }
}
const { Arrow: bo } = he, ot = I.debug("NewArrow"), Kt = {
  width: 10,
  height: 10
};
class wo {
  constructor(e, t, s, i) {
    $(this, "cursorGuest");
    $(this, "arrowCache");
    this.konvaLayer = e, this.cursorPosition = t, this.arrowPath = s, this.factories = i, this.cursorGuest = this.factories.sourceEmpty.create(), this.arrowCache = this.factories.sourceEmpty.create();
  }
  /**
   * Создать новую стрелку для объекта
   */
  forObject(e) {
    ot("start watch cursor"), this.cursorGuest.value(
      this.factories.guest.create((i) => {
        jt(i);
      })
    );
    let t = null;
    const s = this.factories.patron.create(
      this.factories.guest.create((i) => {
        ot("cursor moves"), this.konvaLayer.layer(
          this.factories.guest.create((r) => {
            ot("cursor moves in layer"), this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: e.width,
                  height: e.height
                },
                shapePosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                lookToGeometry: Kt,
                lookToPosition: i
              },
              {
                lookToGeometry: {
                  width: e.width,
                  height: e.height
                },
                lookToPosition: {
                  x: e.position[0],
                  y: e.position[1]
                },
                shapeGeometry: Kt,
                shapePosition: i
              },
              this.factories.guest.create((o) => {
                if (t) {
                  t.points(o);
                  return;
                }
                t = new bo({
                  x: 0,
                  y: 0,
                  points: o,
                  pointerLength: 20,
                  pointerWidth: 10,
                  fill: "#ccc",
                  stroke: "#bbb",
                  strokeWidth: 2,
                  zIndex: 2
                }), r.add(t), this.arrowCache.give(t);
              })
            );
          })
        ), this.arrowPath.clear();
      })
    );
    this.cursorPosition.value(s), this.cursorGuest.give(s);
  }
  /**
   * Отмена стрелки
   */
  dispose() {
    this.cursorGuest.value(
      this.factories.guest.create((e) => {
        jt(e);
      })
    ), this.arrowCache.value(
      this.factories.guest.create((e) => {
        e.remove();
      })
    );
  }
}
const ke = I.debug("MapObjectBackground"), xo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH6AAMAAQADQAqAAthY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAwUEAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH1SCMTDaCMTiuCMTDgxDGf/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAMBAgQFExUyMxL/2gAIAQEAAQUCG9TUPHdga2PndgzrxZQ3qah48gsvnUtHILMrKq5f/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwEH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwEH/8QAHhAAAgIBBQEAAAAAAAAAAAAAAAECMXIQQUKSsVH/2gAIAQEABj8CFkvdFkVLqzla4v6VLqxXe60WS90WRUipWipCSTvc/8QAIxAAAgADCAMAAAAAAAAAAAAAAAEQUfAhMUGhscHR8RFhcf/aAAgBAQABPyErMkMi0ZW2wylmzHorbYSSX3Vg5wrMkMi0Z0a5FVK8Llg05nRrkRmteVg//9oADAMBAAIAAwAAABCCQQSCSST/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/EAf/xAAeEAEAAQQCAwAAAAAAAAAAAAABIRARIDEAQVFxkf/aAAgBAQABPxDEMgTA4U0lpO6EwKiFh/YAyDIEAZSTdCnwUQAma0AtZOl88//Z";
class Co {
  constructor(e, t, s, i) {
    $(this, "mapNameCache");
    this.konvaLayer = e, this.mapFile = t, this.zIndex = s, this.factories = i, this.mapNameCache = i.cache.create(""), this.mapFile.currentMap(i.patron.create(this));
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create((t) => {
        ke("map received in background", e), this.mapNameCache.value(
          this.factories.guest.create((s) => {
            if (s === e.url)
              return;
            ke("background cache is not equals", s), this.mapNameCache.give(e.url);
            const i = new Image(), r = document.querySelector(".grid-example");
            ke("grid example", r), i.src = xo, i.onload = () => {
              ke("canvas pattern loaded"), ke("konva layer loaded");
              const o = new he.Rect({
                width: 3e3,
                height: 3e3,
                x: 0,
                y: 0,
                fillPatternImage: i,
                zIndex: 1
              });
              this.zIndex.give(() => {
                o.zIndex(0);
              }), t.add(o);
            };
          })
        );
      })
    ), this;
  }
}
const _o = I.debug("Breadcrumbs");
class $o {
  constructor(e, t, s) {
    this.parentNames = e, this.mapFile = t, this.factories = s;
  }
  list(e) {
    const t = this.factories.chain.create();
    return this.parentNames.names(this.factories.guestCast.create(e, t.guestKey("names"))), this.mapFile.mapFile(this.factories.guestCast.create(e, t.guestKey("mapFile"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ names: s, mapFile: i }) => {
        _o("map id", s, i), e.give(
          s.map((r) => {
            var o, c;
            return {
              title: ((c = (o = i[r]) == null ? void 0 : o.settings) == null ? void 0 : c.title) || "unknown",
              name: r
            };
          })
        );
      })
    ), e;
  }
}
const Jt = I.debug("CursorWithObjects");
class ko {
  constructor(e, t, s) {
    this.objectsVisible = e, this.cursor = t, this.factories = s;
  }
  value(e) {
    const t = this.factories.chain.create();
    return this.cursor.value(this.factories.guestCast.create(e, t.guestKey("cursor"))), this.objectsVisible.objects(
      this.factories.guestCast.create(e, t.guestKey("objects"))
    ), t.value(
      this.factories.guestInTheMiddle.create(e, ({ cursor: s, objects: i }) => {
        const r = i.find((o) => {
          const c = o.position[0], a = o.position[0] + o.width || 100, h = o.position[1], u = o.position[1] + o.height || 100;
          return s.x >= c && s.x <= a && s.y >= h && s.y <= u;
        });
        r ? (Jt("crossed with", r), H({
          x: r.position[0] + r.width / 2,
          y: r.position[1] + r.height / 2
        }, e)) : (Jt("cursor pos", s), H(s, e));
      })
    ), this;
  }
}
class Mo {
  constructor(e, t = 768) {
    this.windowWidth = e, this.mobileLimit = t;
  }
  value(e) {
    return this.windowWidth.value(
      new L(e, (t) => {
        H({
          isMobile: t <= this.mobileLimit,
          isDesktop: t > this.mobileLimit
        }, e);
      })
    ), this;
  }
}
const qt = I.debug("Drawer");
class Fo {
  constructor(e, t) {
    $(this, "drawerNameCache");
    this.keyboard = e, this.factories = t, this.drawerNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          qt("new key in drawer", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        qt("new drawer name", s), t.give(s === e);
      })
    ), t;
  }
  openedByName(e) {
    return this.factories.guestAware.create((t) => {
      this.isOpenedByName(e, t);
    });
  }
  give(e) {
    return this.drawerNameCache.give(e), this;
  }
}
class So {
  value(e) {
    typeof performance > "u" && e.give(0);
    const t = 10;
    let s = performance.now(), i = 0;
    const r = () => requestAnimationFrame(() => {
      if (i += 1, i >= t) {
        const o = performance.now(), c = o - s;
        e.give(Math.round(1e3 / (c / i))), s = o, i = 0;
      }
      r();
    });
    return r(), e;
  }
}
class To {
  constructor(e, t) {
    this.mapFile = e, this.factories = t;
  }
  menuObjects(e) {
    return this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = Object.values(t.objects).filter((i) => i.inMenu);
        e.give(s);
      })
    ), e;
  }
}
const Yt = I.debug("app:MiniMap"), Zt = 130;
class Io {
  constructor(e, t, s, i) {
    $(this, "theSize");
    $(this, "thePoints");
    $(this, "viewportSizeCache");
    this.map = e, this.layer = t, this.stageSize = s, this.factories = i, this.theSize = i.sourceEmpty.create(), this.thePoints = i.sourceEmpty.create(), this.viewportSizeCache = i.sourceEmpty.create();
    const r = i.chain.create();
    e.objects(i.patron.create(r.guestKey("objects"))), t.layer(i.patron.create(r.guestKey("layer"))), s.value(i.patron.create(r.guestKey("size"))), r.value(
      i.patron.create(
        i.guest.create(({ layer: o, size: c, objects: a }) => {
          const h = Zt / c.width, u = {
            width: Math.round(o.width() * h),
            height: Math.round(o.height() * h)
          };
          this.viewportSizeCache.give(u);
          const l = {
            width: Math.round(c.width * h),
            height: Math.round(c.height * h)
          };
          this.theSize.give(l);
          const p = a.map((v) => ({
            id: v.id,
            x: Math.round(v.position[0] * h),
            y: Math.round(v.position[1] * h),
            width: Math.round(v.width * h),
            height: Math.round(v.height * h)
          }));
          Yt("minimap points", p), this.thePoints.give(p);
        })
      )
    );
  }
  viewportPosition(e) {
    const t = this.factories.chain.create();
    return this.stageSize.value(this.factories.guestCast.create(e, t.guestKey("size"))), this.layer.position(this.factories.guestCast.create(e, t.guestKey("position"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ size: s, position: i }) => {
        const r = Zt / s.width, o = {
          x: i.x * r * -1,
          y: i.y * r * -1
        };
        Yt("scaled position is", o), e.give(o);
      })
    ), e;
  }
  viewportSize(e) {
    return this.viewportSizeCache.value(e), e;
  }
  size(e) {
    return this.theSize.value(e), e;
  }
  points(e) {
    return this.thePoints.value(e), e;
  }
}
const Xt = I.debug("Modal");
class jo {
  constructor(e, t) {
    $(this, "modalNameCache");
    this.keyboard = e, this.factories = t, Xt("modal created"), this.modalNameCache = t.cache.create(""), this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((s) => {
          Xt("new key in modal", s), s === "Escape" && this.give("");
        })
      )
    );
  }
  isOpenedByName(e, t) {
    return this.modalNameCache.value(
      this.factories.guestInTheMiddle.create(t, (s) => {
        t.give(s === e);
      })
    ), t;
  }
  openedByName(e) {
    return this.factories.guestAware.create((t) => {
      this.isOpenedByName(e, t);
    });
  }
  give(e) {
    return this.modalNameCache.give(e), this;
  }
}
class Bo {
  constructor(e) {
    $(this, "messageCache");
    $(this, "notificationLifetimeDelay", 3500);
    $(this, "lastTimerHead", null);
    this.messageCache = e.sourceEmpty.create();
  }
  message(e) {
    return this.messageCache.value(e), e;
  }
  give(e) {
    return this.messageCache.give(e), this.lastTimerHead && clearTimeout(this.lastTimerHead), this.lastTimerHead = setTimeout(() => {
      this.messageCache.give({
        type: "success",
        text: "hide"
      });
    }, this.notificationLifetimeDelay), this;
  }
}
const Me = I.debug("ObjectGeometryFix");
class Oo {
  constructor(e, t, s, i) {
    $(this, "innerReceive");
    this.mapFile = t, this.map = s, this.factories = i, e.objects(i.patron.create(this)), this.innerReceive = me((r) => {
      this.mapFile.currentMap(
        this.factories.guest.create((o) => {
          Me("objects to fix", r);
          const c = document.querySelectorAll(".objects-container .rendered-object"), a = o.objects;
          let h = !1;
          c.forEach((u) => {
            const l = u.getAttribute("data-object-id");
            if (Me("i see id", l), !l)
              return;
            const p = a[l];
            if (p && (Me("dom object geometry", u.clientWidth, u.clientHeight), Me("saved object geometry", p.width, p.height), (p.width !== u.clientWidth || p.height !== u.clientHeight) && (h = !0, Me("update object geometry"), p.width = u.clientWidth, p.height = u.clientHeight), !p.width || !p.height)) {
              const v = o.types[p.type];
              p.width = v.width, p.height = v.height;
            }
          }), h && this.map.give({
            ...o,
            objects: a
          });
        })
      );
    }, 500);
  }
  give(e) {
    return this.innerReceive(e), this;
  }
}
const Fe = I.debug("MapObjectsRectsPatron");
class Po {
  constructor(e, t, s, i, r, o, c, a, h) {
    $(this, "previouslyRenderedRects", /* @__PURE__ */ new Map());
    this.konvaLayer = e, this.mapFile = t, this.mapObject = s, this.mapObjectCurrent = r, this.mapObjectForRendering = o, this.objectPosition = c, this.settings = a, this.factories = h, i.objects(this);
  }
  give(e) {
    return this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((t) => {
          const s = this.factories.chain.create();
          this.mapFile.currentMap(s.guestKey("map")), this.settings.value(s.guestKey("settings")), s.value(
            this.factories.guest.create((i) => {
              const { map: r, settings: o } = i;
              Fe("rerender object rects"), this.previouslyRenderedRects.forEach((c) => {
                c.hide();
              }), e.forEach((c) => {
                const a = r.types[c.type], h = +c.width || +a.width || 100, u = +c.height || +a.height || 100;
                if (this.previouslyRenderedRects.has(c)) {
                  const v = this.previouslyRenderedRects.get(c);
                  v.width(h), v.height(u), v.x(+c.position[0]), v.y(+c.position[1]), v.show();
                  return;
                }
                Fe("rect object", c, a);
                const l = new he.Rect({
                  x: +c.position[0],
                  y: +c.position[1],
                  width: h,
                  height: u,
                  name: c.id,
                  draggable: !o.readonly,
                  objectId: c.id,
                  zIndex: 3
                });
                this.previouslyRenderedRects.set(c, l), t.add(l), l.on("mouseenter", () => {
                  t.getStage().container().style.cursor = "pointer";
                }), l.on("mouseleave", () => {
                  t.getStage().container().style.cursor = "default";
                }), l.on("dragend", () => {
                  Fe("drag ended"), this.objectPosition.position(
                    c,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((v) => {
                      this.mapObject.give({
                        ...c,
                        position: [v.x, v.y]
                      });
                    })
                  );
                }), l.on("dragmove", () => {
                  Fe("dragmove works", l.x(), l.y()), t.getStage().container().style.cursor = "move", this.objectPosition.position(
                    c,
                    {
                      x: l.x(),
                      y: l.y()
                    },
                    this.factories.guest.create((v) => {
                      this.mapObjectForRendering.give({
                        ...c,
                        position: [v.x, v.y]
                      });
                    })
                  );
                });
                const p = () => {
                  Fe("object clicked with id", c.id), this.mapObjectCurrent.give(c.id);
                };
                l.on("click", p), l.on("tap", p);
              });
            })
          );
        })
      )
    ), this;
  }
  introduction() {
    return "patron";
  }
}
class Eo {
  constructor(e, t, s, i) {
    this.canvas = t, this.konvaLayer = s, this.factories = i, e.currentMap(this);
  }
  give() {
    const e = new ResizeObserver((s) => {
      requestAnimationFrame(() => {
        const [i] = s;
        this.canvas.canvas(
          this.factories.guest.create((r) => {
            const o = r.getBoundingClientRect();
            this.konvaLayer.layer(
              this.factories.guest.create((c) => {
                c.getStage().width(i.contentRect.width - o.left), c.getStage().height(i.contentRect.height - o.top), this.canvas.give(r), this.konvaLayer.give(c);
              })
            );
          })
        );
      });
    }), t = document.querySelector("body");
    return t && e.observe(t), this;
  }
}
const Do = I.debug("StagePosition");
class Ro {
  constructor(e) {
    this.stageMove = e;
  }
  give(e) {
    return Do("received position", e), this.stageMove.move(e), this;
  }
}
class Ho {
  constructor(e, t) {
    this.stageMove = e, this.factories = t;
  }
  move(e, t) {
    return e.value(
      this.factories.guest.create((s) => {
        this.stageMove.move(s.objects[t]);
      })
    ), this;
  }
}
class No {
  constructor() {
    $(this, "source", new xe({
      height: window.innerHeight,
      width: window.innerWidth
    }));
    const e = new ResizeObserver(me((s) => {
      requestAnimationFrame(() => {
        this.source.give({
          height: window.innerHeight,
          width: window.innerWidth
        });
      });
    }, 50)), t = document.querySelector("body");
    t && e.observe(t);
  }
  value(e) {
    return this.source.value(e), this;
  }
}
const es = I.debug("Zindex");
class Vo {
  constructor(e) {
    $(this, "fnsCache");
    this.factories = e, this.fnsCache = e.cache.create([]), this.fnsCache.value(
      e.patron.create(
        e.guest.create(
          me((t) => {
            es("zindex fns run"), t.forEach((s) => s());
          }, 50)
        )
      )
    );
  }
  give(e) {
    return es("zindex received value"), this.fnsCache.value(
      this.factories.guest.create((t) => {
        this.fnsCache.give(t.concat(e));
      })
    ), this;
  }
}
const ts = I.debug("app:BrowserCanvas");
class zo {
  constructor(e) {
    $(this, "canvasCache");
    this.factories = e, this.canvasCache = e.sourceEmpty.create();
  }
  canvas(e) {
    return this.canvasCache.value(e), this;
  }
  size(e) {
    return this.canvasCache.value(
      this.factories.guestInTheMiddle.create(e, (t) => {
        const s = t.width || t.clientWidth, i = t.height || t.clientHeight;
        ts("canvas size", s, i), e.give({
          height: i,
          width: s
        });
      })
    ), this;
  }
  give(e) {
    return ts("receive new canvas", e), this.canvasCache.give(e), this;
  }
}
const Uo = I.debug("Cursor");
class Lo {
  constructor(e, t) {
    $(this, "cursorPool");
    this.cursorPool = t.pool.create(this);
    const s = {
      x: 0,
      y: 0
    };
    window == null || window.addEventListener("mousemove", (i) => {
      const r = {
        x: i.offsetX + -s.x,
        y: i.offsetY + -s.y
      };
      Uo("move cursor fired", r), this.cursorPool.give(r);
    }), e.position(
      t.patron.create(
        t.guest.create((i) => {
          s.x = i.x, s.y = i.y;
        })
      )
    );
  }
  value(e) {
    return this.cursorPool.add(new Te(e)), this;
  }
}
class Qo {
  constructor(e) {
    this.el = e, e.value(this);
  }
  give(e) {
    return e.addEventListener("dragstart", (t) => {
      const s = t.target;
      if (!s)
        return;
      const i = s.cloneNode(!0);
      i.style.transform = "translate(0,0)", i.style.position = "absolute", i.style.top = "0", i.style.left = "0", i.style.zIndex = "999", t.dataTransfer && t.dataTransfer.setDragImage(i, 0, 0), document.body.append(i);
      const r = (o) => {
        i.style.transform = `translate(${o.clientX}px, ${o.clientY}px)`;
      };
      s.addEventListener("drag", r, { passive: !0 }), s.addEventListener("dragend", () => {
        i.removeEventListener("drag", r), i.remove();
      });
    }), this;
  }
  introduction() {
    return "patron";
  }
}
const Ve = I.debug("ControlCombo");
class Wo {
  constructor(e, t) {
    this.keyboard = e, this.factories = t;
  }
  /**
   * Случилась комбинация ctrl + keyCode
   */
  happened(e, t) {
    this.keyboard.event(
      this.factories.guestInTheMiddle.create(t, (s) => {
        Ve("combo happened look for key", e, "received", s.code), s.ctrlKey && s.code === e && s.type === "keydown" && (s.preventDefault(), t.give(s));
      })
    );
  }
  /**
   * Случилась комбинация ctrl + keyCode с условием comboCondition
   */
  happenedConditional(e, t, s) {
    Ve("combo control happened registration"), this.keyboard.event(
      this.factories.guestInTheMiddle.create(s, (i) => {
        Ve("keyboard event come"), t.value(
          this.factories.guest.create((r) => {
            Ve("combo happened look for key", e, "received", i.code), r && i.ctrlKey && i.code === e && i.type === "keydown" && (i.preventDefault(), s.give(i));
          })
        );
      })
    );
  }
}
const Se = I.debug("Keyboard");
class Go {
  constructor(e) {
    $(this, "pressedPool");
    $(this, "combinationsPool");
    Se("keyboard created"), this.pressedPool = e.pool.create(this), this.combinationsPool = e.pool.create(this), window == null || window.addEventListener("keyup", (t) => {
      Se("keyboard pressed", t.key), this.pressedPool.give(t.key);
    }), Es({
      passive: !1,
      onEventFired: (t) => {
        Se("magic combination happens 11", t.ctrlKey, t.key), this.combinationsPool.give(t);
      }
    });
  }
  pressed(e) {
    return Se("keyboard receive pressed subscriber"), this.pressedPool.add(e), this;
  }
  event(e) {
    return Se("keyboard receive combination subscriber"), this.combinationsPool.add(e), this;
  }
}
class Ko {
  constructor(e) {
    $(this, "source", new ue());
    if (this.name = e, sessionStorage[e])
      try {
        this.source.give(JSON.parse(sessionStorage[e]));
      } catch {
        console.warn(`SessionRecord cant parse value ${e}`);
      }
  }
  value(e) {
    return this.source.value(e), this;
  }
  give(e) {
    this.source.give(e);
    try {
      sessionStorage[this.name] = JSON.stringify(e);
    } catch {
      console.warn(`SessionRecord cant stringify value ${this.name}`);
    }
    return this;
  }
  pool() {
    return this.pool();
  }
}
const ss = I.debug("app:konva:KonvaLayer");
class Jo {
  constructor(e, t, s, i) {
    $(this, "guestChain");
    $(this, "positionCache");
    $(this, "layerCache");
    this.canvasDep = e, this.stageMoveRestriction = s, this.factories = i, this.positionCache = i.cache.create({
      x: 0,
      y: 0
    }), this.guestChain = i.chain.create(), this.layerCache = i.sourceEmpty.create(), this.canvasDep.canvas(i.patron.create(this.guestChain.guestKey("canvas"))), t.value(this.guestChain.guestKey("stageSize")), this.guestChain.value(
      i.guest.create(
        ({ canvas: r }) => {
          ss("create new konva stage");
          const o = new he.Stage({
            width: r.clientWidth,
            height: r.clientHeight,
            container: r,
            fill: "#ffeeee",
            draggable: !0
          }), c = new he.Layer();
          o.add(c), c.draw(), this.layerCache.give(c), o.on("dragend", (h) => {
            if (!(h.target instanceof he.Stage))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            ss("new position", u), this.positionCache.give(u);
          }), o.on("dragmove", (h) => {
            if (!(h.target instanceof he.Stage))
              return;
            const u = {
              x: o.x(),
              y: o.y()
            };
            this.positionCache.give(u);
          });
          const a = this.factories.guestSync.create({
            x: 0,
            y: 0
          });
          o.dragBoundFunc((h) => (s.position(h, a), a.value()));
        }
      )
    );
  }
  layer(e) {
    return this.layerCache.value(e), e;
  }
  position(e) {
    return this.positionCache.value(e), e;
  }
  give(e) {
    this.layerCache.give(e);
    const t = e.getStage();
    return this.positionCache.give({
      x: t.x(),
      y: t.y()
    }), this;
  }
}
class qo {
  constructor(e, t) {
    this.konvaLayer = e, this.factories = t;
  }
  position(e) {
    return this.konvaLayer.position(
      this.factories.guestInTheMiddle.create(e, (t) => {
        e.give({
          x: t.x * -1,
          y: t.y * -1
        });
      })
    ), e;
  }
}
const Yo = I.debug("position");
class Zo {
  constructor(e, t, s, i, r) {
    this.layer = e, this.canvas = t, this.stageSize = s, this.stageMoveRestriction = i, this.factories = r;
  }
  move(e) {
    Yo("move stage to new point", e.position), this.stageSize.value(
      this.factories.guest.create(() => {
        this.canvas.size(
          this.factories.guest.create((t) => {
            this.layer.layer(
              this.factories.guest.create((s) => {
                const [i, r] = e.position, o = {
                  x: -i - Math.round(e.width / 2) + Math.round(t.width / 2),
                  y: -r - Math.round(e.height / 2) + Math.round(t.height / 2)
                };
                this.stageMoveRestriction.position(
                  o,
                  this.factories.guest.create((c) => {
                    s.getStage().position(c), setTimeout(() => {
                      this.layer.give(s);
                    });
                  })
                );
              })
            );
          })
        );
      })
    );
  }
}
const _ = Z(), Je = new Go(_), vs = new xe({
  readonly: !1,
  presets: {}
}), Xo = new jo(Je, _), As = new Fo(Je, _), qe = new Bo(_), de = new fn(_), ys = _.sourceEmpty.create(), V = new yn(ys, de, _), ea = new mn(V), ta = new oi(ea), sa = new Ko("current-map");
V.currentMap(new Ke(sa));
const gt = new wn(V, de, _), ft = new ds(gt, de, _), ia = new hs(ft, gt, _), ie = new ds(V, de, _), na = new be((n) => {
  V.currentMap(new Te(n));
}), Ye = new xn(As, _), ra = new Rr(_), oa = new Dr(V, ie, _), ve = new zo(_), Ae = new Kr(), bs = new Jr(ve, Ae, _), ne = new Jo(ve, Ae, bs, _), aa = new Vo(_), ca = new Co(ne, V, aa, _), Ce = new hs(ie, V, _), la = new Mn(
  ie,
  V,
  [new ht(qe, new Cn(V, _), _)],
  _
), ua = new qo(ne, _), da = new _n(ie, Ce, ve, ua, _), ws = new Ur(V, _), xs = new Vr(
  ie,
  V,
  [
    new ht(
      qe,
      new Lr(ws, _),
      _
    )
  ],
  _
), ha = new Nr(
  ie,
  V,
  [new ht(qe, ws, _)],
  _
), pa = new Hr(xs), Ze = new qr(ne, ve, gt, _), ga = new Oo(
  Ze,
  V,
  ie,
  _
), fa = new Po(
  ne,
  V,
  Ce,
  Ze,
  Ye,
  ia,
  new Or(new Br(Ae, _), _),
  vs,
  _
), ma = new Lo(ne, _), va = new ko(Ze, ma, _), Cs = new eo(), _s = new wo(ne, va, Cs, _), Aa = new yo(ne, V, ft, Cs, _), ya = new Io(ft, ne, Ae, _), ba = new Sn(
  Ye,
  ie,
  Ce,
  _s,
  _
), wa = new Eo(V, ve, ne, _), xa = new Xr(
  Ye,
  V,
  Ce,
  _
), Ca = new An(V, de, _), _a = new kn(Ce), $a = new So(), mt = new $n(de, _), ka = new $o(mt, V, _), Ma = new Tr(de, _), Fa = new Qr(mt, V, _), Sa = new Wo(Je, _), Ta = new To(V, _), $s = new Zo(ne, ve, Ae, bs, _), Ia = new Ro($s), ja = new Ho($s, _), Ba = new Wr(ie, _), Oa = new vn(V, ie, de, _), Pa = new Er(ie, Ae, ne, _), ks = new ue();
new Qo(ks);
const Ea = new No(), Da = new be((n) => {
  Ea.value(
    new L(n, (e) => {
      H(e.width, n);
    })
  );
}), Ra = new Mo(Da), Ha = {
  mapCurrentID: de,
  mapFile: V,
  mapCurrent: ie,
  mapCurrentSource: na,
  mapRemoved: Ca,
  mapSettings: oa,
  mapObject: Ce,
  mapObjectRemoved: la,
  mapType: xs,
  mapTypeRemoved: ha,
  mapTypeNew: pa,
  mapObjectsVisible: Ze,
  mapObjectCurrent: Ye,
  mapObjectNew: da,
  mapObjectsLink: ba,
  mapTypeCurrent: ra,
  mapRects: fa,
  mapBackground: ca,
  mapObjectArrows: Aa,
  mapObjectsGeometryFix: ga,
  canvas: ve,
  miniMap: ya,
  notification: qe,
  modal: Xo,
  drawer: As,
  konvaLayer: ne,
  resizing: wa,
  objectAdditionalFieldsFix: xa,
  mapObjectRelationRemoved: _a,
  fps: $a,
  breadcrumbs: ka,
  mapObjectUrl: Ma,
  keyboard: Je,
  parentNames: mt,
  parentTypes: Fa,
  controlCombo: Sa,
  menu: Ta,
  stagePosition: Ia,
  stagePositionByObjectId: ja,
  objectsMatchedToQuery: Ba,
  stageSize: Ae,
  mapHistory: Oa,
  fileContent: ys,
  newArrow: _s,
  objectsOutsideScreen: Pa,
  settings: vs,
  documentTitle: ta,
  sidebarDraggable: ks,
  device: Ra
}, Q = () => Ha;
class T {
  constructor(e = void 0) {
    $(this, "innerRef");
    this.innerRef = te(e);
  }
  get value() {
    return this.innerRef.value;
  }
  ref() {
    return this.innerRef;
  }
  give(e) {
    return this.innerRef.value = e, this;
  }
  introduction() {
    return "patron";
  }
}
const Na = {
  key: 0,
  title: "Назад",
  class: "absolute text-white left-0 top-0 -ml-5 flex justify-center items-center bg-primary/70 hover:bg-primary-second/70 cursor-pointer w-5"
}, Va = {
  key: 1,
  class: "BaseModal-Header"
}, za = { class: "overflow-y-auto flex-grow" }, Ua = {
  key: 2,
  class: "BaseModal-Footer"
}, ge = /* @__PURE__ */ E({
  __name: "BaseModal",
  props: {
    name: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const { modal: e } = Q(), t = n, s = e.isOpenedByName(t.name, new T()).ref(), i = [], r = () => {
      e.give("");
    };
    return (o, c) => (g(), U(rs, { name: "fade" }, {
      default: w(() => [
        d(s) ? (g(), y("div", {
          key: 0,
          class: "absolute rounded-main overflow-y-auto flex justify-center items-center top-0 left-0 bg-black/10 z-20 h-full w-full",
          onClick: r
        }, [
          b("div", {
            class: "w-full relative flex flex-col max-w-[800px] max-h-[90%] bg-white p-3",
            onClick: c[0] || (c[0] = we(() => {
            }, ["stop"]))
          }, [
            i.length > 1 ? (g(), y("div", Na, " < ")) : S("", !0),
            b("div", {
              title: "Закрыть",
              class: "e2e-modal-close absolute text-white right-0 top-0 -mr-5 flex justify-center items-center bg-danger/70 hover:bg-danger-second/70 cursor-pointer w-5",
              onClick: r
            }, " × "),
            o.$slots.header ? (g(), y("div", Va, [
              K(o.$slots, "header")
            ])) : S("", !0),
            b("div", za, [
              K(o.$slots, "default")
            ]),
            o.$slots.footer ? (g(), y("div", Ua, [
              K(o.$slots, "footer")
            ])) : S("", !0)
          ])
        ])) : S("", !0)
      ]),
      _: 3
    }));
  }
}), La = { class: "BaseTextarea" }, Qa = ["v-bind"], Ms = /* @__PURE__ */ E({
  inheritAttrs: !1,
  __name: "BaseTextarea",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const i = Qe(n, "modelValue", e);
    return (r, o) => (g(), y("div", La, [
      Le(b("textarea", {
        ref: "textarea",
        "v-bind": r.$attrs,
        "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
        class: "rounded-main block w-full p-2 border min-h-[200px] border-solid border-body-dark"
      }, null, 8, Qa), [
        [os, d(i)]
      ])
    ]));
  }
});
class Wa {
  constructor(e, t, s = !1) {
    this.basePatron = e, this.guest = t, this.refWatcherCreated = s;
  }
  ref() {
    return this.basePatron.ref();
  }
  get value() {
    return this.basePatron.value;
  }
  introduction() {
    return this.basePatron.introduction();
  }
  give(e) {
    return this.basePatron.give(e), this.refWatcherCreated || (this.refWatcherCreated = !0, Be(
      this.basePatron.ref(),
      (t) => {
        t && this.guest.give(t);
      },
      {
        deep: !0
      }
    )), this;
  }
}
class Ga {
  constructor(e) {
    this.baseSource = e;
  }
  value(e) {
    return this.baseSource.value(
      new L(e, (t) => {
        H(JSON.stringify(t), e);
      })
    ), this;
  }
  give(e) {
    return this.value((t) => {
      e !== t && this.baseSource.give(JSON.parse(e));
    }), this;
  }
  pool() {
    return this.baseSource.pool();
  }
}
class Ka {
  constructor(e, t) {
    this.baseGuest = e, this.baseGuestAware = t;
  }
  value(e) {
    return this.baseGuestAware.value(e), this;
  }
  give(e) {
    return H(e, this.baseGuest), this;
  }
  pool() {
    throw Error("No pool in SourceDynamic");
  }
}
const Ja = { class: "AppPresets" }, qa = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Экспорт\\Импорт текущей карты", -1), Ya = { class: "flex flex-col gap-2" }, Za = /* @__PURE__ */ E({
  __name: "AppExport",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), s = new Ka(
      t,
      new be((c) => {
        e.currentMap(new Te(c));
      })
    ), i = new Ga(s), r = new Wa(new T(), i);
    i.value(r);
    const o = r.ref();
    return (c, a) => (g(), U(ge, { name: "export" }, {
      default: w(() => [
        b("div", Ja, [
          qa,
          b("div", Ya, [
            m(Ms, {
              modelValue: d(o),
              "onUpdate:modelValue": a[0] || (a[0] = (h) => je(o) ? o.value = h : null)
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), P = /* @__PURE__ */ E({
  __name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "md",
      validator: (n) => ["sm", "md", "lg"].includes(n)
    },
    type: {
      type: String,
      default: "standard"
    }
  },
  setup(n) {
    const e = n, t = ["rounded-main", `text-${e.size}`, `p-${e.size}`, `bg-${e.type} hover:bg-${e.type}-second`];
    return t.push(""), (s, i) => (g(), y("button", {
      type: "button",
      class: se(t)
    }, [
      K(s.$slots, "default")
    ]));
  }
}), Xa = { key: 0 }, ec = { class: "flex-grow overflow-y-auto" }, tc = {
  key: 1,
  class: "flex gap-1"
}, sc = {
  key: 2,
  class: "flex gap-1"
}, vt = /* @__PURE__ */ E({
  __name: "BaseDrawer",
  props: {
    name: {
      type: String,
      required: !0
    },
    direction: {
      type: String,
      default: "ltr",
      validator: (n) => ["ltr", "rtl", "ttb", "btt"].includes(n)
    }
  },
  emits: ["close"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = Oe(() => ["e2e-drawer-back absolute z-10 top-0 left-0 w-full h-full bg-black/50"]), r = {
      ltr: "top-0 left-0 w-[50%] max-w-[900px] ",
      rtl: "top-0 right-0 w-[50%] max-w-[900px] ",
      ttb: "top-0 right-0 left-0",
      btt: "top-auto h-[900px] max-h-[50%] bottom-0 right-0 left-0"
    }, { drawer: o, device: c } = Q(), a = () => {
      o.give(""), s("close");
    }, h = o.isOpenedByName(t.name, new T()).ref();
    c.value(new Ke((l) => {
      l.isMobile ? (r.ltr = r.ltr.replace("[50%]", "[100%]"), r.rtl = r.rtl.replace("[50%]", "[100%]")) : (r.ltr = r.ltr.replace("[100%]", "[50%]"), r.rtl = r.rtl.replace("[100%]", "[50%]"));
    }));
    const u = new T();
    return c.value(u), (l, p) => (g(), U(rs, { name: "fade" }, {
      default: w(() => [
        d(h) ? (g(), y("div", {
          key: 0,
          class: se(i.value),
          onClick: a
        }, [
          b("div", {
            class: se(["absolute bg-white h-full p-3 flex flex-col overflow-hidden", r[n.direction]]),
            onClick: p[1] || (p[1] = we(() => {
            }, ["stop"]))
          }, [
            l.$slots.header ? (g(), y("div", Xa, [
              K(l.$slots, "header", { class: "BaseDrawer-Header" })
            ])) : S("", !0),
            b("div", ec, [
              K(l.$slots, "default")
            ]),
            l.$slots.footer ? (g(), y("div", tc, [
              K(l.$slots, "footer")
            ])) : S("", !0),
            d(u).value.isMobile ? (g(), y("div", sc, [
              m(P, {
                type: "primary",
                class: "text-white w-full block mt-2",
                onClick: p[0] || (p[0] = (v) => d(o).give(""))
              }, {
                default: w(() => [
                  O(" Закрыть ")
                ]),
                _: 1
              })
            ])) : S("", !0)
          ], 2)
        ], 2)) : S("", !0)
      ]),
      _: 3
    }));
  }
}), q = /* @__PURE__ */ E({
  __name: "BaseIcon",
  props: {
    icon: {
      type: String
    }
  },
  setup(n) {
    const e = {
      "fa-bars": ti,
      "fa-bars-staggered": ei,
      "fa-text-width": Xs,
      "fa-search": Zs,
      "fa-history": Ys,
      "fa-plus-square": qs,
      "fa-cog": Js,
      "fa-file-text": Ks,
      "fa-rotate-left": Gs,
      "fa-rotate-right": Ws,
      "fa-map": Qs,
      "fa-close": Ls,
      "fa-arrow-left": Us,
      "fa-arrow-right": zs,
      "fa-arrow-down": Vs,
      "fa-arrow-up": Ns,
      "fa-share-nodes": Hs
    };
    return (t, s) => (g(), U(d(Rs), {
      icon: e[n.icon]
    }, null, 8, ["icon"]));
  }
}), ic = /* @__PURE__ */ b("h2", { class: "text-lg font-bold" }, " Карты в файле ", -1), nc = ["onClick"], rc = /* @__PURE__ */ E({
  __name: "AppFileMaps",
  setup(n) {
    const {
      mapFile: e,
      mapCurrentID: t,
      drawer: s,
      mapRemoved: i
    } = Q(), r = e.mapFile(new T()).ref(), o = t.id(new T()).ref(), c = (a) => {
      confirm("Вы уверены?") && i.give(a);
    };
    return (a, h) => (g(), U(vt, {
      direction: "rtl",
      name: "fileMaps"
    }, {
      header: w(() => [
        ic
      ]),
      default: w(() => [
        b("div", null, [
          (g(!0), y(W, null, J(d(r), (u, l) => (g(), y("div", {
            key: l,
            class: "flex items-center gap-2"
          }, [
            b("a", {
              href: "#",
              class: se({ "font-bold": d(o) === l }),
              onClick: we((p) => {
                d(t).give(l), d(s).give("");
              }, ["prevent"])
            }, C(u.settings.title), 11, nc),
            m(q, {
              onClick: (p) => c(l),
              class: "text-danger-second cursor-pointer",
              title: "Удалить карту",
              icon: "fa-close"
            }, null, 8, ["onClick"])
          ]))), 128))
        ])
      ]),
      _: 1
    }));
  }
}), oc = { class: "AppMenuObject" }, ac = {
  key: 0,
  class: "AppMenuObject-Empty"
}, cc = {
  key: 1,
  class: "flex flex-col gap-1"
}, lc = ["onClick"], uc = ["innerHTML"], dc = /* @__PURE__ */ E({
  __name: "AppMenuObject",
  setup(n) {
    const {
      controlCombo: e,
      drawer: t,
      menu: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = Z(), c = s.menuObjects(new T()).ref();
    return e.happened(
      "KeyM",
      o.create(r.create(() => {
        t.give("menu");
      }))
    ), (a, h) => (g(), U(vt, {
      direction: "rtl",
      name: "menu"
    }, {
      default: w(() => [
        b("div", oc, [
          d(c).length ? (g(), y("div", cc, [
            (g(!0), y(W, null, J(d(c), (u) => (g(), y("a", {
              key: u.id,
              class: "AppMenuObject-Item",
              href: "#",
              onClick: we((l) => {
                d(i).give(u), d(t).give("");
              }, ["prevent"])
            }, [
              b("span", {
                innerHTML: u.additionalName ? u.additionalName : u.name
              }, null, 8, uc)
            ], 8, lc))), 128))
          ])) : (g(), y("div", ac, C(a.$t("appMenuObject.noItems")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), hc = { class: "AppPresets" }, pc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Общие", -1), gc = { class: "flex flex-col gap-2" }, fc = { class: "text-md font-bold mb-1" }, mc = { class: "flex gap-2 flex-wrap items-end" }, vc = { class: "AppTypesParent-ItemTitle" }, Ac = ["innerHTML"], yc = /* @__PURE__ */ E({
  __name: "AppPresets",
  setup(n) {
    const {
      svgMapTypeImage: e
    } = Z(), { mapType: t, settings: s } = Q(), i = new T();
    s.value(i);
    const r = Oe(
      () => Object.fromEntries(
        Object.entries(i.value.presets).map(
          ([o, c]) => [
            o,
            c.map(
              (a) => ({
                preset: a,
                image: e.create(a).markup()
              })
            )
          ]
        )
      )
    );
    return (o, c) => (g(), U(ge, { name: "presets" }, {
      default: w(() => [
        b("div", hc, [
          pc,
          b("div", gc, [
            (g(!0), y(W, null, J(r.value, (a, h) => (g(), y("div", { key: h }, [
              b("h3", fc, C(h), 1),
              b("div", mc, [
                (g(!0), y(W, null, J(a, (u) => (g(), y("div", {
                  key: u.preset.name,
                  class: "flex flex-col gap-2"
                }, [
                  b("div", vc, C(u.preset.name), 1),
                  b("div", {
                    class: "AppTypesParent-ItemImage",
                    innerHTML: u.image,
                    style: ce(`width:${u.preset.width}px;height:${u.preset.height}px`)
                  }, null, 12, Ac),
                  m(P, {
                    class: "AppTypesParent-ItemButton e2e-add-preset-type",
                    type: "success",
                    size: "sm",
                    onClick: (l) => d(t).give({ name: u.preset.name, type: u.preset })
                  }, {
                    default: w(() => [
                      O(C(o.$t("general.addToMap")), 1)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]))), 128))
              ])
            ]))), 128))
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ae = /* @__PURE__ */ E({
  __name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = te(null);
    Be(
      i,
      me(() => {
        t.autofocus && i.value.focus();
      }, 500)
    );
    const r = Qe(t, "modelValue", s);
    return (o, c) => Le((g(), y("input", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": c[0] || (c[0] = (a) => je(r) ? r.value = a : null),
      class: "block rounded-main w-full p-2 border border-solid border-body-dark",
      type: "text"
    }, null, 512)), [
      [os, d(r)]
    ]);
  }
});
class At {
  constructor(e) {
    $(this, "pool", new We(this));
    this.refSource = e, Be(
      e,
      (t) => {
        t !== void 0 && this.pool.give(t);
      },
      {
        deep: !0
      }
    );
  }
  value(e) {
    return this.refSource.value && H(this.refSource.value, e), this.pool.add(e), this;
  }
}
const bc = { class: "AppSearch" }, wc = {
  key: 0,
  class: "AppSearch-Items"
}, xc = ["onClick"], Cc = ["innerHTML"], _c = ["innerHTML"], $c = ["innerHTML"], kc = { key: 1 }, Mc = { key: 2 }, Fc = /* @__PURE__ */ E({
  __name: "AppSearch",
  setup(n) {
    const {
      objectsMatchedToQuery: e,
      controlCombo: t,
      modal: s,
      stagePosition: i
    } = Q(), { guest: r, patron: o } = Z(), c = te(), a = I.debug("app:AppSearch");
    s.isOpenedByName(
      "search",
      o.create(r.create((l) => {
        setTimeout(() => {
          l && c.value && (a("search is opened", l), c.value.$el.focus());
        }, 500);
      }))
    );
    const h = te(""), u = e.objects(
      new At(h),
      new T([])
    ).ref();
    return t.happened(
      "KeyF",
      o.create(r.create(() => {
        s.give("search");
      }))
    ), (l, p) => (g(), U(ge, { name: "search" }, {
      default: w(() => [
        b("div", bc, [
          m(ae, {
            ref_key: "inputRef",
            ref: c,
            modelValue: h.value,
            "onUpdate:modelValue": p[0] || (p[0] = (v) => h.value = v),
            class: "mb-2 e2e-query-input",
            placeholder: l.$t("general.specifyQuery")
          }, null, 8, ["modelValue", "placeholder"]),
          d(u).length ? (g(), y("div", wc, [
            (g(!0), y(W, null, J(d(u), (v) => (g(), y("div", {
              key: v.name,
              class: "cursor-pointer",
              onClick: we((f) => {
                d(i).give(v), d(s).give("");
              }, ["prevent"])
            }, [
              b("b", {
                class: "AppSearch-ItemName",
                innerHTML: v.name
              }, null, 8, Cc),
              v.additionalName ? (g(), y("b", {
                key: 0,
                class: "AppSearch-ItemName",
                innerHTML: v.additionalName
              }, null, 8, _c)) : S("", !0),
              v.additionalFields ? (g(), y("div", {
                key: 1,
                innerHTML: Object.values(v.additionalFields).join(" ")
              }, null, 8, $c)) : S("", !0)
            ], 8, xc))), 128))
          ])) : h.value ? (g(), y("div", kc, C(l.$t("general.noResults")), 1)) : (g(), y("div", Mc, C(l.$t("general.resultsWillBeHere")), 1))
        ])
      ]),
      _: 1
    }));
  }
}), Sc = { class: "AppTypes" }, Tc = /* @__PURE__ */ b("div", { class: "text-md font-bold mb-2" }, "Родительские типы", -1), Ic = { class: "flex gap-2 items-end" }, jc = { class: "AppTypesParent-ItemTitle" }, Bc = ["innerHTML"], Oc = /* @__PURE__ */ E({
  __name: "AppTypesParent",
  setup(n) {
    const { parentTypes: e, mapType: t } = Q(), { svgMapTypeImage: s } = Z(), i = e.types(new T()).ref(), r = Oe(() => {
      var o;
      return (o = i.value) == null ? void 0 : o.map((c) => ({
        type: c,
        image: s.create(c).markup()
      })).sort((c, a) => +(c.type.name >= a.type.name));
    });
    return (o, c) => (g(), U(ge, { name: "parentTypes" }, {
      default: w(() => [
        b("div", Sc, [
          Tc,
          b("div", Ic, [
            (g(!0), y(W, null, J(r.value, (a) => (g(), y("div", {
              key: a.type.name,
              class: "flex flex-col gap-2"
            }, [
              b("div", jc, C(a.type.name), 1),
              b("div", {
                class: "AppTypesParent-ItemImage",
                innerHTML: a.image,
                style: ce(`width:${a.type.width}px;height:${a.type.height}px`)
              }, null, 12, Bc),
              m(P, {
                class: "AppTypesParent-ItemButton e2e-add-preset-type",
                type: "success",
                size: "sm",
                onClick: (h) => d(t).give({ name: a.type.name, type: a.type })
              }, {
                default: w(() => [
                  O(C(o.$t("general.addToMap")), 1)
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))), 128))
          ])
        ])
      ]),
      _: 1
    }));
  }
});
class Fs {
  constructor(e, t = void 0) {
    $(this, "innerRef");
    this.executor = e, this.innerRef = te(t);
  }
  ref() {
    return this.executor(this.innerRef), this.innerRef;
  }
}
const Pc = { class: "flex gap-2" }, at = /* @__PURE__ */ E({
  __name: "BaseCheckbox",
  props: {
    modelValue: {
      type: Boolean
    },
    label: {
      type: String,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const i = Qe(n, "modelValue", e);
    return (r, o) => (g(), y("label", Pc, [
      Le(b("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
        type: "checkbox"
      }, null, 512), [
        [Is, d(i)]
      ]),
      r.$slots.default ? K(r.$slots, "default", { key: 0 }) : (g(), y(W, { key: 1 }, [
        O(C(n.label), 1)
      ], 64))
    ]));
  }
}), Xe = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, Ec = {}, Dc = { class: "text-sm font-bold" };
function Rc(n, e) {
  return g(), y("div", Dc, [
    K(n.$slots, "default")
  ]);
}
const Y = /* @__PURE__ */ Xe(Ec, [["render", Rc]]), Hc = {}, Nc = { class: "mb-2" };
function Vc(n, e) {
  return g(), y("div", Nc, [
    K(n.$slots, "default")
  ]);
}
const ee = /* @__PURE__ */ Xe(Hc, [["render", Vc]]), zc = { class: "rounded-main p-2 border border-solid border-body-dark" }, Uc = { class: "flex gap-2 p-2 bg-white border border-solid border-body-dark rounded-main" }, ze = /* @__PURE__ */ E({
  __name: "BaseEditor",
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = si({
      content: t.modelValue,
      extensions: [
        ri
      ],
      onUpdate: () => {
        i.value && s("update:modelValue", i.value.getHTML());
      }
    });
    return js(() => {
      var r;
      (r = i.value) == null || r.destroy();
    }), Be(() => t.modelValue, (r) => {
      !i.value || i.value.getHTML() === r || i.value.commands.setContent(r, !1);
    }), (r, o) => (g(), y("div", zc, [
      m(d(ii), { editor: d(i) }, null, 8, ["editor"]),
      d(i) ? (g(), U(d(ni), {
        key: 0,
        editor: d(i),
        "tippy-options": { duration: 100 }
      }, {
        default: w(() => [
          b("div", Uc, [
            b("button", {
              onClick: o[0] || (o[0] = (c) => d(i).chain().focus().toggleBold().run()),
              class: se({ "font-bold": d(i).isActive("bold") })
            }, " bold ", 2),
            b("button", {
              onClick: o[1] || (o[1] = (c) => d(i).chain().focus().toggleItalic().run()),
              class: se({ "font-bold": d(i).isActive("italic") })
            }, " italic ", 2),
            b("button", {
              onClick: o[2] || (o[2] = (c) => d(i).chain().focus().toggleStrike().run()),
              class: se({ "font-bold": d(i).isActive("strike") })
            }, " strike ", 2)
          ])
        ]),
        _: 1
      }, 8, ["editor"])) : S("", !0)
    ]));
  }
}), Lc = ["value"], Qc = /* @__PURE__ */ E({
  __name: "BaseSelect",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    items: {
      type: Array,
      required: !0
    },
    optionId: {
      type: String,
      required: !0
    },
    optionLabel: {
      type: String,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, i = Qe(t, "modelValue", e);
    return (r, o) => Le((g(), y("select", {
      label: "select",
      "onUpdate:modelValue": o[0] || (o[0] = (c) => je(i) ? i.value = c : null),
      class: "block bg-white rounded-main w-full p-2 border border-solid border-body-dark"
    }, [
      (g(!0), y(W, null, J(t.items, (c) => (g(), y("option", {
        key: c[t.optionId],
        value: c[t.optionId]
      }, C(c[t.optionLabel]), 9, Lc))), 128))
    ], 512)), [
      [Bs, d(i)]
    ]);
  }
}), Wc = { class: "text-lg font-bold" }, Gc = {
  key: 0,
  class: "flex gap-2 items-center"
}, Kc = {
  key: 1,
  class: "flex gap-2 mt-2"
}, Jc = { key: 0 }, qc = { key: 1 }, Yc = {
  key: 0,
  class: "flex flex-col gap-2"
}, Zc = { class: "FormObject-Inner" }, Xc = { class: "FormObject-Row" }, el = { class: "FormObject-Row" }, tl = { class: "FormObject-Row" }, sl = { class: "my-2" }, il = { class: "FormObject-Title" }, nl = { class: "FormObject-Row" }, rl = { class: "FormObject-Title" }, ol = { class: "FormObject-Row" }, al = {
  key: 0,
  class: "FormObject-ArrowName"
}, cl = { class: "py-3 flex gap-1" }, ll = /* @__PURE__ */ E({
  __name: "FormObject",
  setup(n) {
    const e = ls("FormObject"), {
      mapObjectCurrent: t,
      mapFile: s,
      mapObject: i,
      mapCurrent: r,
      drawer: o,
      mapObjectRemoved: c,
      mapObjectRelationRemoved: a,
      mapObjectUrl: h,
      controlCombo: u
    } = Q(), {
      patron: l,
      chain: p,
      guest: v
    } = Z(), f = new Fs(() => {
      const B = p.create();
      t.objectId(l.create(B.guestKey("objectId"))), s.currentMap(l.create(B.guestKey("map"))), B.value(l.create(
        v.create(({ map: F, objectId: M }) => {
          e("object opened", M), f.value = F.objects[M];
        })
      ));
    }).ref(), x = r.types(new T()).ref(), A = s.currentMap(new T()).ref(), k = new At(f), j = h.url(k, new T()).ref(), G = () => {
      t.give(""), o.give("");
    }, R = () => {
      c.give(f.value), G();
    }, re = () => {
      i.give({
        ...f.value,
        outlink: f.value.outlink || j.value
      }), G();
    }, D = (B) => {
      a.give({
        index: B,
        object: f.value
      });
    };
    return u.happenedConditional(
      "KeyS",
      o.openedByName("object"),
      l.create(v.create(re))
    ), (B, F) => (g(), U(vt, {
      name: "object",
      onClose: G
    }, {
      header: w(() => [
        b("h2", Wc, C(B.$t("general.mapObject")), 1),
        d(f) ? (g(), y("small", Gc, [
          b("span", null, " ID #" + C(d(f).id), 1)
        ])) : S("", !0),
        d(f) ? (g(), y("div", Kc, [
          d(f).createTimestamp ? (g(), y("div", Jc, " Создан: " + C(new Date(d(f).createTimestamp).toLocaleString()), 1)) : S("", !0),
          d(f).changeTimestamp ? (g(), y("div", qc, " Изменен: " + C(new Date(d(f).changeTimestamp).toLocaleString()), 1)) : S("", !0)
        ])) : S("", !0)
      ]),
      footer: w(() => [
        b("div", cl, [
          m(P, {
            type: "success",
            onClick: re
          }, {
            default: w(() => [
              O(C(B.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(P, {
            type: "danger",
            onClick: R
          }, {
            default: w(() => [
              O(C(B.$t("general.delete")), 1)
            ]),
            _: 1
          }),
          m(P, { onClick: G }, {
            default: w(() => [
              O(C(B.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        d(f) ? (g(), y("div", Yc, [
          b("div", Zc, [
            b("div", Xc, [
              m(at, {
                modelValue: d(f).linked,
                "onUpdate:modelValue": F[0] || (F[0] = (M) => d(f).linked = M),
                label: B.$t("general.nameAsLink")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(f).linked ? (g(), y(W, { key: 0 }, [
              m(Y, null, {
                default: w(() => [
                  O(C(B.$t("general.outerLink")), 1)
                ]),
                _: 1
              }),
              b("div", el, [
                m(ae, {
                  "model-value": d(f).outlink || d(j),
                  "onUpdate:modelValue": F[1] || (F[1] = (M) => d(f).outlink = M)
                }, null, 8, ["model-value"])
              ]),
              b("div", tl, [
                m(at, {
                  modelValue: d(f).targetBlank,
                  "onUpdate:modelValue": F[2] || (F[2] = (M) => d(f).targetBlank = M),
                  label: B.$t("general.inNewTab")
                }, null, 8, ["modelValue", "label"])
              ])
            ], 64)) : S("", !0),
            (g(!0), y(W, null, J(d(f).additionalFields, (M, X) => (g(), U(ee, {
              class: "mb-2",
              key: X
            }, {
              default: w(() => [
                m(Y, { class: "mb-1" }, {
                  default: w(() => [
                    O(C(X), 1)
                  ]),
                  _: 2
                }, 1024),
                m(ze, {
                  modelValue: d(f).additionalFields[X],
                  "onUpdate:modelValue": (le) => d(f).additionalFields[X] = le
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              _: 2
            }, 1024))), 128)),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.topName")), 1)
                  ]),
                  _: 1
                }),
                m(ze, {
                  modelValue: d(f).additionalName,
                  "onUpdate:modelValue": F[3] || (F[3] = (M) => d(f).additionalName = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.bottomName")), 1)
                  ]),
                  _: 1
                }),
                m(ze, {
                  modelValue: d(f).name,
                  "onUpdate:modelValue": F[4] || (F[4] = (M) => d(f).name = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.description")), 1)
                  ]),
                  _: 1
                }),
                m(ze, {
                  modelValue: d(f).description,
                  "onUpdate:modelValue": F[5] || (F[5] = (M) => d(f).description = M)
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Z-Index ")
                  ]),
                  _: 1
                }),
                m(ae, {
                  modelValue: d(f).zindex,
                  "onUpdate:modelValue": F[6] || (F[6] = (M) => d(f).zindex = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Width ")
                  ]),
                  _: 1
                }),
                m(ae, {
                  modelValue: d(f).width,
                  "onUpdate:modelValue": F[7] || (F[7] = (M) => d(f).width = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(" Height ")
                  ]),
                  _: 1
                }),
                m(ae, {
                  modelValue: d(f).height,
                  "onUpdate:modelValue": F[8] || (F[8] = (M) => d(f).height = M),
                  step: "20",
                  type: "number"
                }, null, 8, ["modelValue"])
              ]),
              _: 1
            }),
            m(ee, null, {
              default: w(() => [
                m(Y, null, {
                  default: w(() => [
                    O(C(B.$t("general.objectType")), 1)
                  ]),
                  _: 1
                }),
                m(Qc, {
                  modelValue: d(f).type,
                  "onUpdate:modelValue": F[9] || (F[9] = (M) => d(f).type = M),
                  items: d(x),
                  "option-id": "id",
                  "option-label": "name"
                }, null, 8, ["modelValue", "items"])
              ]),
              _: 1
            }),
            b("div", sl, [
              m(at, {
                modelValue: d(f).inMenu,
                "onUpdate:modelValue": F[10] || (F[10] = (M) => d(f).inMenu = M),
                label: B.$t("general.useInMenu")
              }, null, 8, ["modelValue", "label"])
            ]),
            d(f).inMenu ? (g(), y(W, { key: 1 }, [
              b("div", il, C(B.$t("general.menuOrder")), 1),
              b("div", nl, [
                m(ae, {
                  modelValue: d(f).menuOrder,
                  "onUpdate:modelValue": F[11] || (F[11] = (M) => d(f).menuOrder = M),
                  type: "number"
                }, null, 8, ["modelValue"])
              ])
            ], 64)) : S("", !0),
            d(f).arrows && d(f).arrows.length ? (g(), y(W, { key: 2 }, [
              b("div", rl, C(B.$t("general.relations")), 1),
              b("div", ol, [
                (g(!0), y(W, null, J(d(f).arrows, (M, X) => {
                  var le;
                  return g(), y("div", {
                    key: M.id,
                    class: "FormObject-Arrow"
                  }, [
                    (le = d(A)) != null && le.objects[M.id] ? (g(), y("span", al, " #" + C(X + 1) + " " + C(d(A).objects[M.id].name), 1)) : S("", !0),
                    m(P, {
                      class: "FormObject-ArrowButton",
                      type: "danger",
                      size: "sm",
                      onClick: (ye) => D(X)
                    }, {
                      default: w(() => [
                        O(C(B.$t("general.delete")), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]);
                }), 128))
              ])
            ], 64)) : S("", !0)
          ])
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), ul = { class: "text-lg font-bold" }, dl = {
  key: 0,
  class: "flex flex-col"
}, hl = { class: "flex justify-end pt-4 gap-2" }, pl = /* @__PURE__ */ E({
  __name: "FormType",
  setup(n) {
    const {
      mapTypeCurrent: e,
      mapFile: t,
      mapType: s,
      modal: i,
      controlCombo: r
    } = Q(), { patron: o, chain: c, guest: a } = Z();
    e.typeId(
      o.create(a.create((f) => {
        f && i.give("type");
      }))
    );
    const h = te(""), u = c.create(), l = new Fs(() => {
      e.typeId(o.create(u.guestKey("typeId"))), t.currentMap(o.create(u.guestKey("map"))), u.value(o.create(
        a.create(({ map: f, typeId: x }) => {
          var A;
          l.value = f.types[x], h.value = (A = l.value) == null ? void 0 : A.name;
        })
      ));
    }).ref(), p = () => {
      e.give(""), i.give(""), u.guestKey("typeId").give("");
    }, v = () => {
      s.give({
        name: h.value,
        type: l.value
      }), p();
    };
    return r.happenedConditional(
      "KeyS",
      i.openedByName("type"),
      o.create(a.create(v))
    ), (f, x) => (g(), U(ge, { name: "type" }, {
      header: w(() => [
        b("h2", ul, C(f.$t("general.mapType")), 1)
      ]),
      footer: w(() => [
        b("div", hl, [
          m(P, {
            type: "success",
            onClick: v
          }, {
            default: w(() => [
              O(C(f.$t("general.save")), 1)
            ]),
            _: 1
          }),
          m(P, { onClick: p }, {
            default: w(() => [
              O(C(f.$t("general.cancel")), 1)
            ]),
            _: 1
          })
        ])
      ]),
      default: w(() => [
        d(l) ? (g(), y("div", dl, [
          m(ee, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Название типа ")
                ]),
                _: 1
              }),
              m(ae, {
                modelValue: d(l).name,
                "onUpdate:modelValue": x[0] || (x[0] = (A) => d(l).name = A)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(ee, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" SVG ")
                ]),
                _: 1
              }),
              m(Ms, {
                modelValue: d(l).svg,
                "onUpdate:modelValue": x[1] || (x[1] = (A) => d(l).svg = A)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(ee, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Ширина ")
                ]),
                _: 1
              }),
              m(ae, {
                modelValue: d(l).width,
                "onUpdate:modelValue": x[2] || (x[2] = (A) => d(l).width = A)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          m(ee, null, {
            default: w(() => [
              m(Y, null, {
                default: w(() => [
                  O(" Высота ")
                ]),
                _: 1
              }),
              m(ae, {
                modelValue: d(l).height,
                "onUpdate:modelValue": x[3] || (x[3] = (A) => d(l).height = A)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          })
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), ct = I.debug("MapObjectsWithTemplates");
class gl {
  constructor(e, t, s) {
    this.mapObjects = e, this.map = t, this.factories = s;
  }
  objects(e) {
    const t = this.factories.chain.create();
    return this.map.types(this.factories.guestCast.create(e, t.guestKey("types"))), this.mapObjects.objects(this.factories.guestCast.create(e, t.guestKey("objects"))), t.value(
      this.factories.guestInTheMiddle.create(e, ({ types: s, objects: i }) => {
        ct("visible objects", i);
        const r = i.map((o) => {
          const c = s.find((h) => String(h.id) === String(o.type));
          if (ct("check type existed", c), !c)
            return {
              obj: o,
              template: ""
            };
          let { svg: a } = c;
          return ct("type svg", a), o.additionalFields && Object.entries(o.additionalFields).forEach(([h, u]) => {
            a = a.replaceAll(`\${${h}}`, u);
          }), ["width", "height"].forEach((h) => {
            a = a.replaceAll(`\${${h}}`, o[h]);
          }), {
            obj: o,
            template: a
          };
        });
        e.give(r);
      })
    ), e;
  }
}
const fl = /* @__PURE__ */ E({
  __name: "BaseNotify",
  setup(n) {
    const { notification: e } = Q(), t = e.message(new T()).ref();
    return (s, i) => d(t) && d(t).text !== "hide" ? (g(), y("div", {
      key: 0,
      class: se(["inline font-bold", `text-${d(t).type}-second`])
    }, C(d(t).text), 3)) : S("", !0);
  }
}), ml = { class: "relative" }, vl = { class: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1" }, Al = { class: "text-sm z-10 p-2 absolute bottom-0 left-5" }, yl = /* @__PURE__ */ Os('<div class="absolute bottom-3 shadow-standard-second shadow-md drop-shadow right-3 z-10"><div class="grid-example grid grid-rows-2 grid-cols-2 bg-standard-second border border-standard-second gap-[1px] border-t-0 border-l-0"><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div><div class="w-[14px] h-[14px] bg-white"></div></div></div><div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>', 2), bl = ["title"], wl = { class: "font-bold" }, xl = ["title"], Cl = { class: "font-bold" }, _l = ["title"], $l = { class: "font-bold" }, kl = ["title"], Ml = { class: "font-bold" }, Fl = ["data-object-id"], Sl = { class: "absolute bottom-[100%] left-[50%] translate-x-[-50%] text-center pb-2 pointer-events-auto text-sm w-[300px]" }, Tl = ["innerHTML", "onClick"], Il = ["innerHTML"], jl = ["data-object-id", "innerHTML"], Bl = /* @__PURE__ */ E({
  __name: "TheEditor",
  setup(n) {
    const {
      canvas: e,
      mapObjectsVisible: t,
      mapCurrent: s,
      konvaLayer: i,
      fps: r,
      mapCurrentID: o,
      mapObjectUrl: c,
      stageSize: a,
      objectsOutsideScreen: h,
      stagePositionByObjectId: u,
      mapCurrentSource: l
    } = Q(), p = Z(), v = r.value(new T()).ref(), x = new gl(
      t,
      s,
      p
    ).objects(new T([])).ref(), A = a.value(new T()).ref(), k = i.position(new T()).ref(), j = Oe(() => {
      var ye;
      return (ye = A.value) == null ? void 0 : ye.width;
    }), G = new At(j), R = p.numberChunks.create(10, G).chunks(new T()).ref(), re = te();
    as(() => {
      e.give(re.value);
    });
    const D = (ye) => {
      c.open(ye, p.guest.create((oe) => {
        o.give(oe);
      }));
    }, B = h.count(
      { axis: "x", direction: "negative" },
      new T()
    ).ref(), F = h.count(
      { axis: "x", direction: "positive" },
      new T()
    ).ref(), M = h.count(
      { axis: "y", direction: "negative" },
      new T()
    ).ref(), X = h.count(
      { axis: "y", direction: "positive" },
      new T()
    ).ref(), le = u.move.bind(u, l);
    return (ye, oe) => {
      var yt, bt, wt, xt, Ct, _t, $t, kt, Mt, Ft, St, Tt;
      return g(), y("div", ml, [
        b("div", vl, [
          b("div", Al, [
            O(" Видимых объектов: " + C(d(x).length) + ", FPS: " + C(d(v)) + ", ", 1),
            m(fl)
          ]),
          yl,
          ((yt = d(B)) == null ? void 0 : yt.count) > 0 ? (g(), y("div", {
            key: 0,
            class: "pointer-events-auto absolute z-30 top-0 left-4 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(bt = d(B)) == null ? void 0 : bt.count} шт. объектов левее`,
            onClick: oe[0] || (oe[0] = (z) => d(le)(d(B).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-left" }),
            b("span", wl, C((wt = d(B)) == null ? void 0 : wt.count), 1)
          ], 8, bl)) : S("", !0),
          ((xt = d(F)) == null ? void 0 : xt.count) > 0 ? (g(), y("div", {
            key: 1,
            class: "pointer-events-auto absolute z-30 p-1 top-0 right-0 h-[18px] bg-white flex items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(Ct = d(F)) == null ? void 0 : Ct.count} шт. объектов правее`,
            onClick: oe[1] || (oe[1] = (z) => d(le)(d(F).nearestObjectId))
          }, [
            b("span", Cl, C((_t = d(F)) == null ? void 0 : _t.count), 1),
            m(q, { icon: "fa-arrow-right" })
          ], 8, xl)) : S("", !0),
          (($t = d(M)) == null ? void 0 : $t.count) > 0 ? (g(), y("div", {
            key: 2,
            class: "pointer-events-auto absolute z-30 top-[18px] left-0 w-[18px] bg-white flex flex-col leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(kt = d(M)) == null ? void 0 : kt.count} шт. объектов выше`,
            onClick: oe[2] || (oe[2] = (z) => d(le)(d(M).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-up" }),
            b("span", $l, C((Mt = d(M)) == null ? void 0 : Mt.count), 1)
          ], 8, _l)) : S("", !0),
          ((Ft = d(X)) == null ? void 0 : Ft.count) > 0 ? (g(), y("div", {
            key: 3,
            class: "pointer-events-auto absolute z-30 p-1 bottom-0 left-0 w-[18px] bg-white flex flex-col-reverse leading-4 items-center gap-1 text-body-dark text-sm cursor-pointer",
            title: `${(St = d(X)) == null ? void 0 : St.count} шт. объектов ниже`,
            onClick: oe[3] || (oe[3] = (z) => d(le)(d(X).nearestObjectId))
          }, [
            m(q, { icon: "fa-arrow-down" }),
            b("span", Ml, C((Tt = d(X)) == null ? void 0 : Tt.count), 1)
          ], 8, kl)) : S("", !0),
          b("div", {
            class: se({ "objects-container absolute top-0 left-0": !0 }),
            style: ce({ width: `${d(A).width}px`, height: `${d(A).height}px`, transform: `translate(${d(k).x}px, ${d(k).y}px)` })
          }, [
            b("div", {
              class: "absolute flex top-0 left-0 w-full z-20 h-[20px] bg-default border-b-2 border-border text-right text-sm px-2",
              style: ce({ transform: `translate(0, ${-d(k).y}px)` })
            }, [
              (g(!0), y(W, null, J(d(R), (z) => (g(), y("span", {
                class: "flex-1 text-body-dark",
                key: `horiz_${z}`
              }, C(z) + "px", 1))), 128))
            ], 4),
            b("div", {
              class: "absolute flex [writing-mode:vertical-lr] top-0 left-0 h-full z-20 w-[20px] bg-default border-r-2 border-border text-left text-sm py-2",
              style: ce({ transform: `translate(${-d(k).x}px, 0)` })
            }, [
              (g(!0), y(W, null, J(d(R), (z) => (g(), y("span", {
                class: "flex-1 rotate-180 text-body-dark",
                key: `vert_${z}`
              }, C(z) + "px", 1))), 128))
            ], 4),
            (g(!0), y(W, null, J(d(x), (z) => (g(), y("div", {
              key: z.obj.id,
              class: "absolute z-10",
              "data-object-id": z.obj.id,
              style: ce(`width:${z.obj.width}px;height: ${z.obj.height}px;top: ${z.obj.position[1]}px;left:${z.obj.position[0]}px;z-index:${z.obj.zindex}`)
            }, [
              b("div", Sl, [
                b("span", {
                  innerHTML: z.obj.additionalName,
                  class: se([z.obj.linked && "cursor-pointer underline"]),
                  onClick: (ku) => D(z.obj)
                }, null, 10, Tl)
              ]),
              b("div", {
                class: "absolute top-[100%] left-[50%] translate-x-[-50%] text-center pt-2 text-sm w-[300px]",
                innerHTML: z.obj.name
              }, null, 8, Il),
              b("div", {
                "data-object-id": z.obj.id,
                class: "rendered-object",
                innerHTML: z.template
              }, null, 8, jl)
            ], 12, Fl))), 128))
          ], 4)
        ]),
        b("div", {
          class: "h-full",
          ref_key: "canvasWrapper",
          ref: re
        }, null, 512)
      ]);
    };
  }
}), Ol = { class: "flex flex-wrap gap-2" }, Pl = { key: 0 }, El = { key: 1 }, Dl = ["onClick"], Rl = /* @__PURE__ */ E({
  __name: "BaseBreadcrumbs",
  setup(n) {
    const {
      breadcrumbs: e,
      mapCurrentID: t
    } = Q(), s = e.list(new T()).ref();
    return (i, r) => (g(), y("div", Ol, [
      (g(!0), y(W, null, J(d(s), (o, c) => (g(), y("span", {
        class: "flex gap-2",
        key: o.name
      }, [
        c !== 0 ? (g(), y("span", Pl, "/")) : S("", !0),
        c === d(s).length - 1 ? (g(), y("b", El, "Открыто: " + C(o.title), 1)) : (g(), y("a", {
          key: 2,
          href: "#",
          onClick: we((a) => d(t).give(o.name), ["prevent"])
        }, C(o.title), 9, Dl))
      ]))), 128))
    ]));
  }
}), Hl = { class: "flex items-center p-3 gap-3" }, Nl = { class: "ml-auto gap-1 flex" }, Vl = /* @__PURE__ */ E({
  __name: "TheHeader",
  setup(n) {
    const {
      drawer: e,
      modal: t,
      mapHistory: s,
      controlCombo: i,
      settings: r
    } = Q(), { patron: o, guest: c } = Z(), a = s.isNextPossible(new T()).ref(), h = s.isPrevPossible(new T()).ref();
    i.happened(
      "KeyZ",
      o.create(c.create(() => {
        h.value && s.prev();
      }))
    ), i.happened(
      "KeyP",
      o.create(c.create(() => {
        a.value && s.next();
      }))
    );
    const u = new T();
    return r.value(u), (l, p) => (g(), y("div", Hl, [
      m(Rl, { class: "TheHeader-Breadcrumbs" }),
      b("div", Nl, [
        d(a) && !d(u).value.readonly ? (g(), U(P, {
          key: 0,
          size: "sm",
          title: "Отменить последнее действие",
          class: "w-7 block",
          onClick: p[0] || (p[0] = (v) => d(s).next())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-left" })
          ]),
          _: 1
        })) : S("", !0),
        d(h) && !d(u).value.readonly ? (g(), U(P, {
          key: 1,
          size: "sm",
          title: "Вернуть отмененное действие",
          class: "w-7 block",
          onClick: p[1] || (p[1] = (v) => d(s).prev())
        }, {
          default: w(() => [
            m(q, { icon: "fa-rotate-right" })
          ]),
          _: 1
        })) : S("", !0),
        m(P, {
          type: "success",
          size: "sm",
          class: "w-7 block e2e-open-menu",
          title: l.$t("general.menu"),
          onClick: p[2] || (p[2] = (v) => d(e).give("menu"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-bars" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(P, {
          title: l.$t("general.byText"),
          type: "primary",
          size: "sm",
          class: "w-7 block",
          onClick: p[3] || (p[3] = (v) => d(t).give("mapAsText"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-text-width" })
          ]),
          _: 1
        }, 8, ["title"]),
        m(P, {
          class: "w-7 block e2e-search",
          size: "sm",
          onClick: p[4] || (p[4] = (v) => d(t).give("search"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-search" })
          ]),
          _: 1
        }),
        m(P, {
          size: "sm",
          title: "Все карты файла",
          class: "w-7 block",
          onClick: p[5] || (p[5] = (v) => d(e).give("fileMaps"))
        }, {
          default: w(() => [
            m(q, { icon: "fa-map" })
          ]),
          _: 1
        })
      ])
    ]));
  }
}), zl = {}, Ul = { class: "text-lg font-bold" };
function Ll(n, e) {
  return g(), y("span", Ul, [
    K(n.$slots, "default")
  ]);
}
const Ql = /* @__PURE__ */ Xe(zl, [["render", Ll]]), Wl = { class: "flex gap-1" }, Gl = {
  key: 0,
  class: "TheMapAsText select-auto"
}, Kl = ["innerHTML"], Jl = /* @__PURE__ */ E({
  __name: "TheMapAsText",
  setup(n) {
    const { mapFile: e, mapCurrent: t } = Q(), {
      guest: s,
      patron: i,
      textOf: r,
      textNlAsBr: o,
      textWithoutHTML: c
    } = Z(), a = e.currentMap(new T()).ref(), h = te(""), u = te([]);
    t.objects(
      i.create(
        s.create(me((A) => {
          u.value = A, o.create(
            r.create(
              A.map((k) => `<div class="TheMapAsText-Item">
                <h3>${k.name}</h3><p>${k.additionalName || ""}</p><p>${k.description || ""}</p><p>${k.additionalFields && Object.values(k.additionalFields).join("</p><p>")}</p></div>`).join("")
            )
          ).asString(
            s.create((k) => {
              h.value = k;
            })
          );
        }, 500))
      )
    );
    const { share: l, isSupported: p } = Ds(), v = () => {
      p.value || alert("Sharing is not supported"), c.create(
        r.create(
          h.value
        )
      ).asString(
        s.create((A) => {
          l({
            text: A
          });
        })
      );
    }, f = te(), x = () => {
      var A, k;
      if (a.value) {
        const j = new Range();
        j.setStart(f.value, 0), j.setEnd(f.value, Object.values(u.value).length), (A = document.getSelection()) == null || A.removeAllRanges(), (k = document.getSelection()) == null || k.addRange(j);
      }
    };
    return (A, k) => (g(), U(ge, { name: "mapAsText" }, {
      header: w(() => [
        m(Ql, { class: "block mb-3" }, {
          default: w(() => [
            O(C(A.$t("general.mapAsText")) + " ", 1),
            b("div", Wl, [
              m(P, {
                size: "sm",
                type: "success",
                class: "font-normal",
                onClick: v
              }, {
                default: w(() => [
                  O(C(A.$t("general.share")), 1)
                ]),
                _: 1
              }),
              m(P, {
                size: "sm",
                type: "primary",
                class: "font-normal",
                onClick: x
              }, {
                default: w(() => [
                  O(C(A.$t("general.selectAll")), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })
      ]),
      default: w(() => [
        d(a) ? (g(), y("article", Gl, [
          b("div", {
            ref_key: "textRef",
            ref: f,
            innerHTML: h.value
          }, null, 8, Kl)
        ])) : S("", !0)
      ]),
      _: 1
    }));
  }
}), ql = { key: 1 }, Yl = /* @__PURE__ */ E({
  __name: "TheMiniMap",
  setup(n) {
    const { miniMap: e } = Q(), t = e.points(new T()).ref(), s = e.size(new T()).ref(), i = e.viewportSize(new T()).ref(), r = e.viewportPosition(new T()).ref();
    return (o, c) => d(s) ? (g(), y("div", {
      key: 0,
      style: ce({
        width: `${d(s).width}px`,
        height: `${d(s).height}px`
      }),
      class: "absolute pointer-events-none block bg-white bottom-[10px] mt-3 right-3 z-1 border border-solid border-body-dark"
    }, [
      d(r) ? (g(), y("div", {
        key: 0,
        style: ce({
          width: `${d(i).width}px`,
          height: `${d(i).height}px`,
          top: `${d(r).y}px`,
          left: `${d(r).x}px`
        }),
        class: "absolute bg-primary/50"
      }, null, 4)) : S("", !0),
      d(t) ? (g(), y("div", ql, [
        (g(!0), y(W, null, J(d(t), (a) => (g(), y("div", {
          key: a.id,
          class: "absolute w-1 h-1 block bg-danger",
          style: ce({
            top: `${a.y}px`,
            left: `${a.x}px`,
            width: `${a.width}px`,
            height: `${a.height}px`
          })
        }, null, 4))), 128))
      ])) : S("", !0)
    ], 4)) : S("", !0);
  }
}), Zl = { class: "text-lg font-bold" }, Xl = {
  key: 0,
  class: "TheSettings"
}, eu = { class: "mb-2" }, tu = { class: "TheSettings-Row" }, su = { class: "flex gap-2 mb-2" }, iu = { class: "mb-2" }, nu = { class: "mb-2" }, ru = {
  href: "https://github.com/kosukhin/mind-map-creator",
  target: "_blank"
}, ou = { class: "flex gap-2" }, au = /* @__PURE__ */ E({
  __name: "FormSettings",
  setup(n) {
    const {
      modal: e,
      mapFile: t,
      mapRemoved: s,
      mapSettings: i,
      controlCombo: r,
      parentNames: o,
      mapCurrentID: c
    } = Q(), { patron: a, guest: h } = Z(), u = o.names(new T()).ref(), l = t.currentMap(new T()).ref(), p = c.id(new T()).ref(), v = () => {
      e.give("");
    }, f = () => {
      i.give(l.value.settings), v();
    };
    return r.happenedConditional(
      "KeyS",
      e.openedByName("settings"),
      a.create(h.create(f))
    ), (x, A) => (g(), U(ge, { name: "settings" }, {
      header: w(() => [
        b("h2", Zl, C(x.$t("general.mapSettings")), 1)
      ]),
      default: w(() => {
        var k;
        return [
          (k = d(l)) != null && k.settings ? (g(), y("div", Xl, [
            b("div", eu, [
              b("div", tu, [
                b("div", su, [
                  K(x.$slots, "beforeButtons"),
                  d(u).length > 1 ? (g(), U(P, {
                    key: 0,
                    type: "primary",
                    class: "text-white",
                    onClick: A[0] || (A[0] = (j) => d(e).give("parentTypes"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.parentTypes")), 1)
                    ]),
                    _: 1
                  })) : S("", !0),
                  m(P, {
                    type: "primary",
                    class: "text-white",
                    onClick: A[1] || (A[1] = (j) => d(e).give("export"))
                  }, {
                    default: w(() => [
                      O(C(x.$t("general.exportOrImport")), 1)
                    ]),
                    _: 1
                  }),
                  m(P, {
                    type: "primary",
                    class: "text-white e2e-open-presets",
                    onClick: A[2] || (A[2] = (j) => d(e).give("presets"))
                  }, {
                    default: w(() => [
                      O(" Пресеты ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              b("div", iu, [
                b("label", null, [
                  b("b", null, C(x.$t("general.mapName")), 1),
                  m(ae, {
                    modelValue: d(l).settings.title,
                    "onUpdate:modelValue": A[3] || (A[3] = (j) => d(l).settings.title = j)
                  }, null, 8, ["modelValue"])
                ])
              ]),
              b("div", nu, [
                b("a", ru, C(x.$t("general.githubRepo")), 1)
              ])
            ]),
            b("div", ou, [
              m(P, {
                class: "TheSettings-Button",
                type: "success",
                onClick: A[4] || (A[4] = (j) => f())
              }, {
                default: w(() => [
                  O(C(x.$t("general.save")), 1)
                ]),
                _: 1
              }),
              m(P, {
                class: "TheSettings-Button",
                onClick: v
              }, {
                default: w(() => [
                  O(C(x.$t("general.cancel")), 1)
                ]),
                _: 1
              }),
              m(P, {
                class: "TheSettings-Button",
                type: "danger",
                onClick: A[5] || (A[5] = (j) => {
                  d(s).give(d(p)), v();
                })
              }, {
                default: w(() => [
                  O(C(x.$t("general.removeMap")), 1)
                ]),
                _: 1
              })
            ])
          ])) : S("", !0)
        ];
      }),
      _: 3
    }));
  }
}), cu = {}, lu = { class: "BaseGroup" };
function uu(n, e) {
  return g(), y("div", lu, [
    K(n.$slots, "default")
  ]);
}
const du = /* @__PURE__ */ Xe(cu, [["render", uu]]), hu = "default", pu = /* @__PURE__ */ E({
  __name: "TheLinker",
  setup(n) {
    const { mapObjectsLink: e } = Q(), t = e.objectIds(new T([])).ref();
    return (s, i) => (g(), U(P, {
      type: hu,
      onClick: i[0] || (i[0] = (r) => d(e).startLink())
    }, {
      default: w(() => [
        O(C(d(t).length === 1 ? "Выбиретие объект" : d(t).length === 2 ? "Второй объект" : "Связать объекты"), 1)
      ]),
      _: 1
    }));
  }
}), gu = { class: "flex e2e-sidebar flex-col items-center gap-3 max-h-[100%] overflow-hidden" }, fu = { class: "TheSideBar-ItemName" }, mu = ["innerHTML", "draggable", "title", "onDragend", "onDblclick"], vu = {
  key: 0,
  class: "flex gap-1"
}, Au = {
  key: 0,
  class: "mt-auto w-full p-3 pt-0"
}, yu = /* @__PURE__ */ E({
  __name: "TheSideBar",
  setup(n) {
    const {
      mapObjectNew: e,
      mapCurrent: t,
      mapTypeCurrent: s,
      mapTypeRemoved: i,
      mapTypeNew: r,
      modal: o,
      settings: c,
      sidebarDraggable: a
    } = Q(), h = t.types(new T()).ref(), u = te();
    as(() => {
      a.give(u.value);
    });
    const { svgMapTypeImage: l } = Z(), p = Oe(() => {
      var f;
      return (f = h.value) == null ? void 0 : f.map((x) => ({
        type: x,
        image: l.create(x).markup()
      })).sort((x, A) => +(x.type.name >= A.type.name));
    }), v = new T();
    return c.value(v), (f, x) => (g(), y("div", gu, [
      b("div", {
        ref_key: "dragWrapperRef",
        ref: u,
        class: "flex flex-col gap-3 flex-grow w-full overflow-y-auto"
      }, [
        (g(!0), y(W, null, J(p.value, (A, k) => (g(), y("div", {
          key: k,
          class: "flex flex-col items-center justify-center gap-2"
        }, [
          b("div", fu, C(A.type.name), 1),
          b("div", {
            innerHTML: A.image,
            class: "TheSideBar-ItemImage",
            draggable: d(v).value.readonly ? "false" : "true",
            style: ce(`width:${A.type.width}px;height:${A.type.height}px`),
            title: f.$t("general.notifications.dragToCanvasToAdd"),
            onDragend: (j) => d(e).byTypeName(A.type.id, j),
            onDblclick: (j) => {
              d(e).byTypeName(A.type.id, j), f.$emit("close");
            }
          }, null, 44, mu),
          d(v).value.readonly ? S("", !0) : (g(), y("div", vu, [
            m(P, {
              class: "text-white",
              size: "sm",
              type: "primary",
              onClick: (j) => d(s).give(A.type.id)
            }, {
              default: w(() => [
                O(C(f.$t("general.change")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]),
            m(P, {
              class: "text-white",
              size: "sm",
              type: "danger",
              onClick: (j) => d(i).give(A.type)
            }, {
              default: w(() => [
                O(C(f.$t("general.delete")), 1)
              ]),
              _: 2
            }, 1032, ["onClick"])
          ]))
        ]))), 128))
      ], 512),
      d(v).value.readonly ? S("", !0) : (g(), y("div", Au, [
        m(du, { class: "mb-1 grid gap-1 grid-cols-2" }, {
          default: w(() => [
            m(P, {
              title: f.$t("general.addType"),
              type: "success",
              onClick: x[0] || (x[0] = (A) => d(r).byName())
            }, {
              default: w(() => [
                m(q, { icon: "fa-plus-square" })
              ]),
              _: 1
            }, 8, ["title"]),
            m(P, {
              class: "e2e-show-settings",
              title: f.$t("general.settings"),
              type: "primary",
              onClick: x[1] || (x[1] = (A) => d(o).give("settings"))
            }, {
              default: w(() => [
                m(q, { icon: "fa-cog" })
              ]),
              _: 1
            }, 8, ["title"])
          ]),
          _: 1
        }),
        m(pu, { class: "w-[100%] block mb-1" })
      ]))
    ]));
  }
}), bu = { class: "absolute bg-body hover:bg-border cursor-pointer border-solid border-border bottom-[150px] z-10 right-3 p-3 w-15 h-15" }, wu = /* @__PURE__ */ E({
  __name: "TheSidebarButton",
  setup(n) {
    return (e, t) => (g(), y("div", bu, [
      m(q, { icon: "fa-bars-staggered" })
    ]));
  }
}), xu = { class: "bg-body absolute top-0 left-0 w-full h-full" }, Cu = { class: "AppClientModal" }, _u = { class: "text-md font-bold mb-2" }, $u = { class: "flex flex-col gap-2" }, Pu = /* @__PURE__ */ E({
  __name: "PatronSchemeEditor",
  props: {
    modelValue: {
      type: String,
      required: !0
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    presets: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, s = e, { fileContent: i, settings: r, device: o } = Q(), { guest: c, patron: a } = Z();
    r.value((l) => {
      r.give({
        ...l,
        readonly: t.readonly,
        presets: t.presets
      });
    }), Be(() => t.modelValue, (l) => {
      i.value(c.create((p) => {
        l !== p && i.give(l);
      }));
    }, {
      immediate: !0
    }), i.value(a.create((l) => {
      s("update:modelValue", l);
    }));
    const h = te(!0), u = new T();
    return o.value(u), o.value(new Ke((l) => {
      h.value = l.isDesktop;
    })), (l, p) => (g(), y("div", xu, [
      b("div", {
        class: se(["grid grid-rows-[50px_1fr] h-dvh relative", { "grid-cols-[200px_1fr]": !d(u).value.isMobile, "grid-cols-[1fr]": d(u).value.isMobile }])
      }, [
        m(Vl, { class: "col-span-2" }),
        h.value ? (g(), U(yu, {
          key: 0,
          class: se({ "bg-[#f3f4f6] w-[200px] absolute top-[50px] left-0 z-10 bottom-0": d(u).value.isMobile }),
          onClose: p[0] || (p[0] = (v) => h.value = !1)
        }, null, 8, ["class"])) : S("", !0),
        m(Bl, { class: "w-auto col-auto h-full" }),
        m(Yl),
        d(u).value.isMobile ? (g(), U(wu, {
          key: 1,
          onClick: p[1] || (p[1] = (v) => h.value = !h.value)
        })) : S("", !0),
        K(l.$slots, "insideGrid")
      ], 2),
      m(ll),
      m(pl),
      m(au, null, {
        beforeButtons: w(() => [
          K(l.$slots, "beforeSettingsButtons")
        ]),
        _: 3
      }),
      m(yc),
      m(Oc),
      m(Za),
      m(dc),
      m(Jl),
      m(Fc),
      m(rc),
      m(ge, { name: "custom" }, {
        default: w(() => [
          b("div", Cu, [
            b("div", _u, [
              K(l.$slots, "customModalTitle")
            ]),
            b("div", $u, [
              K(l.$slots, "customModalBody")
            ])
          ])
        ]),
        _: 3
      })
    ]));
  }
}), is = I.debug("FileSystemContent");
class Eu {
  constructor(e, t, s) {
    $(this, "contentPatrons");
    $(this, "fileHandler", null);
    $(this, "contentSource");
    this.launchQueue = e, this.notification = t, this.factories = s, this.contentPatrons = s.pool.create(this), this.contentSource = s.sourceEmpty.create();
  }
  content(e) {
    const t = this.factories.guest.create((s) => {
      this.fileHandler = s, this.factories.fileHandlerContent.create(s).content(
        this.factories.guest.create((i) => {
          this.contentPatrons.distribute(i, e), this.contentSource.give(i);
        })
      );
    });
    return this.fileHandler || this.launchQueue.fileHandler(t), this.contentSource.value(e), this;
  }
  give(e) {
    if (is("save file as content string", e), !this.fileHandler)
      throw new Ie("Cant save file because no fileHandler");
    try {
      return this.contentSource.give(e), this.factories.browserFileSaved.create(this.fileHandler).save(e), this.contentPatrons.give(e), this;
    } catch (t) {
      throw new Ie("Cant handle receive for map file FS", { cause: t });
    } finally {
      this.notification.give({
        type: "success",
        text: "Успешно сохранен файл карты!"
      });
    }
  }
  canBeUsed(e) {
    const t = "launchQueue" in window;
    is("can be used", t);
    const s = window && window.matchMedia("(display-mode: standalone)");
    return e.give(t && s.matches), e;
  }
}
const Ue = I.debug("FirstPossibleFileContent");
class Du {
  constructor(e, t) {
    $(this, "firstPossibleFileContent", null);
    $(this, "contentSource", new ue());
    $(this, "canBeUsedSource", new ue());
    Ue("length", e.length), e.forEach((s) => {
      s.canBeUsed(
        t.patronOnce.create(
          t.guest.create((i) => {
            Ue("canbeused result", s, i), i && !this.firstPossibleFileContent && (this.firstPossibleFileContent = s, s.canBeUsed(t.patron.create(this.canBeUsedSource)), s.content(t.patron.create(this.contentSource)), this.contentSource.value(
              t.patron.create((r) => {
                s.content(
                  t.guest.create((o) => {
                    r !== o && s.give(r);
                  })
                );
              })
            ));
          })
        )
      );
    });
  }
  canBeUsed(e) {
    return Ue("can be used to", this.firstPossibleFileContent), this.canBeUsedSource.value(e), e;
  }
  content(e) {
    return Ue("content to", this.firstPossibleFileContent), this.contentSource.value(e), this;
  }
  give(e) {
    return this.contentSource.give(e), this;
  }
}
const lt = I.debug("UrlContent");
class Ru {
  constructor(e, t) {
    $(this, "contentCache");
    this.notification = e, this.factories = t, this.contentCache = t.sourceEmpty.create();
  }
  canBeUsed(e) {
    if (!window)
      return e.give(!1), this;
    const t = window.location.search.indexOf("?view=") > -1;
    if (lt("can be used", t), e.give(window.location.search.indexOf("?view=") > -1), t) {
      const s = window.location.search.split("=")[1] ?? "";
      fetch(s, { redirect: "follow" }).then((i) => i.text()).then((i) => {
        lt("received text", i), this.contentCache.give(i);
      });
    }
    return e;
  }
  content(e) {
    if (!window)
      return this;
    const t = window.location.search.split("=")[1] ?? "";
    return lt("visit url", t), this.contentCache.value(this.factories.patronOnce.create(e)), this;
  }
  give() {
    return this.notification.give({
      type: "error",
      text: "Невозможно сохранить карту, открытую по ссылке!"
    }), this;
  }
}
const ns = new ue();
class Hu {
  constructor(e = window.launchQueue, t = "launchQueue" in window) {
    $(this, "isCalculated", !1);
    this.launchQueue = e, this.isLaunchQueueSupported = t;
  }
  fileHandler(e) {
    return this.isLaunchQueueSupported && !this.isCalculated && (this.isCalculated = !0, this.launchQueue.setConsumer((t) => {
      if (t.files && t.files.length) {
        const [s] = t.files;
        ns.give(s);
      }
    })), ns.value(e), this;
  }
}
class Nu {
  constructor(e) {
    $(this, "source", new ue());
    this.name = e;
    const t = JSON.parse(localStorage.getItem(e) || "null");
    this.source.give(t), document.addEventListener(
      "localDataStorage",
      (s) => {
        s.detail.key === e && this.source.give(JSON.parse(s.detail.newval));
      },
      !1
    );
  }
  do(e) {
    return e === "empty" && localStorage.removeItem(this.name), this;
  }
  give(e) {
    return localStorage.setItem(this.name, JSON.stringify(e)), this.source.give(e), this;
  }
  pool() {
    return this.source.pool();
  }
  value(e) {
    return this.source.value(e), this;
  }
}
export {
  Hu as BrowserLaunchQueue,
  Eu as FileSystemContent,
  Du as FirstPossibleFileContent,
  Pu as PatronSchemeEditor,
  Nu as StorageRecord,
  Ru as UrlContent,
  T as VueRefPatron,
  Q as useApplication,
  Z as useFactories
};
