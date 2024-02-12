let Utils = {};
export default Utils;

Utils.prepMenuContent = function(content, idMap) {
	if (!idMap.__next_id) { idMap.__next_id = 1; }
	let kids = content.kids;
	for (let i = 0, l = kids.length; i < l; i++) {
		let o = kids[i];
		// current list implementation requires everything to have an id:
		if (!o.id) { o.id = "__id_"+(idMap.__next_id++); }
		idMap[o.id] = o;
		o.parent = content;
		if (o.kids) { Utils.prepMenuContent(o, idMap); }
	}
	return content;
};

Utils.find = function(arr, f) {
	for (let i=0, l=arr.length; i<l; i++) {
		if (f(arr[i])) { return arr[i]; }
	}
}

Utils.findIndex = function(arr, f) {
	for (let i=0, l=arr.length; i<l; i++) {
		if (f(arr[i])) { return i; }
	}
	return -1;
}

Utils.copy = function(target, source) {
	for (let n in source) { target[n] = source[n]; }
	return target;
}

Utils.clone = function(o) {
	// this seems hacky, but it's the fastest, easiest approach for now:
	return JSON.parse(JSON.stringify(o));
}

Utils.searchRank = function(o, search) {
	let test = Utils.searchTest;
	search = search.toLowerCase();

	if (o.access) { // pattern (My Favorites).
		// text? pattern?
		return test((o.keywords||"")+" "+(o.name||""), search, 16) + test((o.description||"")+" "+(o.author||""), search, 8);
	} else { // reference.
		return test(o.token, search, 16) + test((o.id||"")+" "+(o.label||""), search, 8) + test((o.desc||"")+" "+(o.ext||""), search, 4);
	}
}

Utils.searchTest = function(str, search, weight=1) {
	return (str && str.toLowerCase().indexOf(search) !== -1) ? weight : 0;
}

Utils.htmlSafe = function (str) {
	return str == null ? "" : ("" + str).replace(/&/g, "&amp;").replace(/</g, "&lt;");
};

Utils.shorten = function (str, length, htmlSafe, tag="") {
	if (!str) { return str; }
	let b = length > 0 && str.length > length;
	if (b) { str = str.substr(0, length-1); }
	if (htmlSafe) { str = Utils.htmlSafe(str); }
	return !b ? str : str + (tag&&"<"+tag+">") + "\u2026" + (tag&&"</"+tag+">");
};

Utils.unescSubstStr = function(str) {
	if (!str) { return ""; }
	return str.replace(Utils.SUBST_ESC_RE, (a, b, c)=> Utils.SUBST_ESC_CHARS[b] || String.fromCharCode(parseInt(c, 16)) );
};


Utils.getRegExp = function(str) {
	// returns a JS RegExp object.
	let match = str.match(/^\/(.+)\/([a-z]+)?$/), regex=null;
	try {
		regex = match ? new RegExp(match[1], match[2] || "") : new RegExp(str, "g");
	} catch(e) { }
	return regex;
};

Utils.decomposeRegEx = function(str, delim="/") {
	let re = new RegExp("^"+delim+"(.*)"+delim+"([igmsuUxy]*)$");
	let match = re.exec(str);
	if (match) {
		return {source: match[1], flags: match[2]};
	} else {
		return {source: str, flags: "g"};
	}
};

Utils.isMac = function () {
	return !!(navigator.userAgent.match(/Mac\sOS/i))
};

Utils.getCtrlKey = function () {
	return Utils.isMac() ? "cmd" : "ctrl";
};

Utils.now = function() {
	return window.performance ? performance.now() : Date.now();
};

Utils.getUrlParams = function() {
	let match, re = /([^&=]+)=?([^&]*)/g, params = {};
	let url  = window.location.search.substr(1).replace(/\+/g, " ");
	while (match = re.exec(url)) { params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]); }
	return params;
};

let deferIds = {};
Utils.defer = function (f, id, t=1) {
	clearTimeout(deferIds[id]);
	if (f === null) {
		delete(deferIds[id]);
		return;
	}
	deferIds[id] = setTimeout(()=>{
		delete deferIds[id];
		f();
	}, t)
};

Utils.getHashCode = function(s) {
	let hash = 0, l = s.length, i;
	for (i = 0; i < l; i++ ) {
		hash = ((hash << 5) - hash) + s.charCodeAt(i) | 0;
	}
	return hash;
};

Utils.getPatternURL = function(pattern) {
	let a = Utils.isLocal ? "?id=" : "/";
	let url = window.location.origin, id=pattern&&pattern.id||"";
	return url+a+id;
}

Utils.isLocal = (window.location.hostname === "localhost");

Utils.getPatternURLStr = function(pattern) {
	if (!pattern || !pattern.id) { return null; }
	let a = Utils.isLocal ? "?id=" : "/";
	let url = window.location.host, id=pattern.id;
	return url+a+id;
}

Utils.getForkName = function(name) {
	let res = / ?\(fork ?(\d*)\)$/.exec(name);
	if (res) {
		let num = (res[1]||1)*1 + 1;
		return name.substr(0, res.index) + " (fork "+num+")";
	}
	return name + " (fork)";
}

Utils.SUBST_ESC_CHARS = {
	// this is just the list supported in Replace. Others: b, f, ", etc.
	n: "\n",
	r: "\r",
	t: "\t",
	"\\": "\\"
};

Utils.SUBST_ESC_RE = /\\([nrt\\]|u([A-Z0-9]{4}))/ig;


Utils.findMatchesStr = function (regexStr, instance, decIds, extractMatches, monaco) {
    if (instance) {
      try {
        const model = instance.getModel();
        if (model) {
          let matchesFound = []
          instance.removeDecorations(decIds.current)
          const matches = model.findMatches(regexStr, true, true, false, null, true);
          console.log(regexStr,matches)
          matches.forEach((match,index) => {
            matchesFound.push({
              title: 'Match ' + (index + 1) + ": ",
              value: match.matches[0]
            })
            let a = instance.createDecorationsCollection([{
              range: new monaco.Range(
                match.range.startLineNumber,
                match.range.startColumn,
                match.range.endLineNumber,
                match.range.endColumn
              ),
              options: { inlineClassName: 'highlight', stickness: 1 },
            }])
            decIds.current = [...decIds.current, a._decorationIds]
          });
          extractMatches(matchesFound)
        };
      } catch (error) {
        extractMatches([])
      }
      
    }
  }