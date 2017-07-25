var WR360 = {};
(function() {
    Function.prototype.aK = function(eB) {
        if (eB.constructor == Function) {
            this.prototype = new eB;
            this.prototype.constructor = this;
            this.prototype.ct = eB.prototype;
            this.prototype.iQ = 0;
            this.prototype.aB = function() {
                var ct = this.ct;
                for (var i = this.iQ; i > 0; i--) {
                    ct = ct.ct;
                }
                this.iQ++;
                return ct;
            }
            ;
        } else {
            this.prototype = eB;
            this.prototype.constructor = this;
            this.prototype.ct = eB;
        }
        return this;
    }
    ;
    String.prototype.pg = function() {
        var txt = this;
        var i = arguments.length;
        while (i--) {
            txt = txt.replace(new RegExp("\\{" + i + "\\}","gm"), arguments[i]);
        }
        return txt;
    }
    ;
    String.prototype.bE = function() {
        if (this == "auto") {
            return 0;
        }
        return parseInt(this.replace("px", ""));
    }
    ;
    String.prototype.nA = function() {
        var txt = this;
        txt = txt.replace(/\r\n/g, "<br>");
        txt = txt.replace(/\n\r/g, "<br>");
        txt = txt.replace(/\r/g, "<br>");
        txt = txt.replace(/\n/g, "<br>");
        return txt;
    }
    ;
})();
(function() {
    Date.now = Date.now || function() {
        return +new Date;
    }
    ;
    jQuery.fn.fI = function(onclick, proxy) {
        var proxy = proxy === undefined ? "" : ".proxy" + proxy;
        var gv = 0;
        var gq = "touchstart";
        if (window.navigator.pointerEnabled) {
            gq = "pointerdown";
        } else if (window.navigator.msPointerEnabled) {
            gq = "MSPointerDown";
        }
        this.bind(gq + proxy, function(e) {
            onclick.call(this, e);
            e.stopPropagation();
            e.preventDefault();
            gv = Date.now();
            return false;
        });
        this.bind("click" + proxy, function(e) {
            if (Date.now() - gv < 400) {
                return;
            }
            gv = 0;
            onclick.call(this, e);
        });
        return this;
    }
    ;
    jQuery.fn.oe = function(proxy) {
        var proxy = proxy === undefined ? "" : ".proxy" + proxy;
        this.unbind("touchstart" + proxy);
        this.unbind("click" + proxy);
        return this;
    }
    ;
    WR360.by = function() {}
    ;
    WR360.by.mZ = function() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    ;
    WR360.by.lf = function() {
        var Device = {};
        Device.UA = navigator.userAgent;
        Device.Type = false;
        Device.jf = ["iPhone", "iPod", "iPad", "android"];
        for (var d = 0; d < Device.jf.length; d++) {
            var t = Device.jf[d];
            Device[t] = !!Device.UA.match(new RegExp(t,"i"));
            Device.Type = Device.Type || Device[t];
        }
        return Device.Type ? true : false;
    }
    ;
    WR360.by.fU = WR360.by.lf();
    WR360.by.cz = function(string, defaultValue) {
        if (string == null || string.length == 0) {
            return defaultValue;
        }
        return string;
    }
    ;
    WR360.by.dM = function(string, defaultValue) {
        if (string == null || string.length == 0) {
            return defaultValue;
        }
        return parseFloat(string);
    }
    ;
    WR360.by.je = function(string, defaultValue) {
        if (string == null || string.length == 0) {
            return defaultValue;
        }
        return parseFloat(string.replace(",", "."));
    }
    ;
    WR360.by.bX = function(string, defaultValue) {
        if (string == null || string.length == 0) {
            return defaultValue;
        }
        return string.toLowerCase() == "true" || string.toLowerCase() == "1";
    }
    ;
    WR360.by.ge = function() {
        var charCode;
        var jd = "";
        var mq = 10 + parseInt(Math.random() * 10);
        for (var i = 0; i < mq; i++) {
            charCode = 97 + parseInt(Math.random() * 26);
            jd += String.fromCharCode(charCode);
        }
        return jd;
    }
    ;
    WR360.by.qk = function() {
        if (jQuery.ad.msie == true) {
            return;
        }
        var trident = /Trident\/7\./;
        if (trident.test(navigator.userAgent)) {
            jQuery.ad.version = "99";
            jQuery.ad.msie = true;
            jQuery.ad.webkit = false;
            jQuery.ad.mozilla = false;
            jQuery.ad.opera = false;
            return;
        }
        jQuery.ad.sa = /(android)/i.test(navigator.userAgent);
        if (jQuery.ad.sa == true) {
            var hL = navigator.userAgent;
            jQuery.ad.rY = hL.indexOf("Chrome") > -1;
            if (jQuery.ad.rY == false) {
                jQuery.ad.sO = hL.indexOf("Mozilla/5.0") > -1 && hL.indexOf("AppleWebKit") > -1;
            }
        }
    }
    ;
    WR360.by.mG = function() {
        var matched, browser;
        if (!jQuery.uaMatch) {
            jQuery.uaMatch = function(ua) {
                ua = ua.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            }
            ;
        }
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        jQuery.ad = browser;
        WR360.by.qk();
    }
    ;
    WR360.by.fS = function(e) {
        var fw = 0
          , gI = 0;
        var rA = typeof window.event !== "undefined" && typeof window.event.targetTouches !== "undefined";
        if (WR360.by.fU == false && rA == false) {
            if (e.pageX || e.pageY) {
                fw = e.pageX;
                gI = e.pageY;
            } else if (e.clientX || e.clientY) {
                fw = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                gI = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            return {
                x: fw,
                y: gI
            };
        }
        if (rA == true && window.event.targetTouches != null && window.event.targetTouches.length > 0) {
            fw = window.event.targetTouches[0].screenX;
            gI = window.event.targetTouches[0].screenY;
            return {
                x: fw,
                y: gI
            };
        }
        var st = typeof e.originalEvent !== "undefined" && typeof e.originalEvent.targetTouches !== "undefined";
        if (st == true && e.originalEvent.targetTouches != null && e.originalEvent.targetTouches.length > 0) {
            fw = e.originalEvent.targetTouches[0].screenX;
            gI = e.originalEvent.targetTouches[0].screenY;
        }
        return {
            x: fw,
            y: gI
        };
    }
    ;
    WR360.by.pe = function(qv, dX) {
        var jS = qv.slice(-3);
        if (jS !== "svg") {
            return;
        }
        document.body.appendChild(dX);
        dX.width = dX.offsetWidth;
        dX.height = dX.offsetHeight;
        document.body.removeChild(dX);
    }
    ;
    WR360.by.fA = function(cu, eJ) {
        var x = cu.offset().left;
        var y = cu.offset().top;
        var x2 = x + cu.outerWidth(false);
        var y2 = y + cu.outerHeight(false);
        var jx = Math.abs(eJ.x);
        return jx >= x && jx <= x2 && eJ.y >= y && eJ.y <= y2;
    }
    ;
    WR360.by.pA = function() {
        var rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/;
        var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
        var ajaxLocation = "";
        try {
            ajaxLocation = location.href;
        } catch (e) {
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            ajaxLocation = ajaxLocation.href;
        }
        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
        var qm = rlocalProtocol.test(ajaxLocParts[1]);
        return qm;
    }
    ;
    WR360.by.qT = function(options) {
        try {
            if (!jQuery.ad.msie) {
                return false;
            }
            var qW = window.ActiveXObject !== undefined;
            if (qW == false) {
                return false;
            }
            if (!WR360.by.pA()) {
                return false;
            }
            var xhr = null;
            try {
                xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
            if (xhr == null) {
                return false;
            }
            if (!options.async) {
                options.async = jQuery.ajaxSettings.async;
            }
            xhr.open(options.type, options.url, options.async);
            var jv = function() {
                try {
                    var text = xhr.responseText;
                    if (options.success) {
                        options.success(text);
                    }
                } catch (e) {
                    if (options.error) {
                        options.error(e);
                    }
                }
            };
            xhr.send(null);
            if (!options.async) {
                jv();
            } else if (xhr.readyState === 4) {
                setTimeout(jv, 0);
            } else {
                xhr.onreadystatechange = jv;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    ;
})();
(function() {
    WR360.J = function() {
        this.dr = new Array;
    }
    ;
    WR360.J.prototype.iS = function(item) {
        var result = -1;
        for (var i = 0; i < this.dr.length; i++) {
            if (this.dr[i] == item) {
                result = i;
                break;
            }
        }
        return result;
    }
    ;
    WR360.J.prototype.bk = function(item) {
        var result = false;
        if (item != null) {
            this.dr.push(item);
            result = true;
        }
        return result;
    }
    ;
    WR360.J.prototype.removeItem = function(item) {
        var result = false;
        var hN = this.iS(item);
        if (hN > -1) {
            this.dr.splice(hN, 1);
            result = true;
        }
        return result;
    }
    ;
    WR360.J.prototype.clear = function() {
        this.dr = new Array;
    }
    ;
    WR360.J.prototype.contains = function(item) {
        return this.iS(item) > -1;
    }
    ;
    WR360.J.prototype.mh = function(index) {
        return this.dr[index];
    }
    ;
    WR360.J.prototype.ds = function() {
        return this.dr.length;
    }
    ;
    WR360.J.prototype.nz = function() {
        return this.dr.length == 0;
    }
    ;
})();
(function() {
    WR360.gl = function() {
        this.settings = new WR360.kT;
        this.bF = new Array;
        this.hi = new Array;
        this.aw = new Array;
        this.ky = new Array;
        this.aw.ep = 0;
        this.aw.eU = 0;
        this.aw.rows = 1;
    }
    ;
    WR360.gl.prototype.iq = function() {
        return this.aw.ep > 0 && this.aw.eU > 0;
    }
    ;
    WR360.gl.prototype.ly = function() {
        for (var dj = 0; dj < this.bF.length; dj++) {
            var cd = this.bF[dj];
            if (cd.disabled == false && cd.renderMode != WR360.kc.bf.au) {
                return true;
            }
        }
        return false;
    }
    ;
    WR360.Control = function() {
        this.gp = 0.12;
        this.inBrowserFullScreen = false;
        this.dJ = false;
        this.iu = false;
        this.doubleClickFullscreen = false;
        this.mouseHoverDrag = false;
        this.qc = true;
        this.hideHotspotsOnLoad = false;
        this.hideHotspotsOnZoom = true;
        this.rowSensitivity = 15;
        this.dragSensitivity = 10;
    }
    ;
    WR360.Margin = function() {
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
    }
    ;
    WR360.Margin.prototype.parse = function(fG) {
        if (fG == null || fG.length == 0) {
            return;
        }
        var aj = fG.split(",");
        for (var i = 0; i < aj.length; i++) {
            switch (i) {
            case 0:
                this.top = WR360.by.dM(aj[i], this.top);
                break;
            case 1:
                this.right = WR360.by.dM(aj[i], this.right);
                break;
            case 2:
                this.bottom = WR360.by.dM(aj[i], this.bottom);
                break;
            case 3:
                this.left = WR360.by.dM(aj[i], this.left);
                break;
            default:
                break;
            }
        }
    }
    ;
    WR360.Align = function() {
        this.vertical = WR360.Align.TOP;
        this.horizontal = WR360.Align.LEFT;
        this.parsed = false;
    }
    ;
    WR360.Align.TOP = -1;
    WR360.Align.CENTER = 0;
    WR360.Align.BOTTOM = 1;
    WR360.Align.LEFT = -1;
    WR360.Align.CENTER = 0;
    WR360.Align.RIGHT = 1;
    WR360.Align.prototype.pn = function() {
        return this.vertical == WR360.Align.CENTER && this.horizontal == WR360.Align.CENTER;
    }
    ;
    WR360.Align.prototype.parse = function(bK) {
        if (bK == null || bK.length == 0) {
            return;
        }
        var gP = bK.split(",");
        this.parsed = gP.length > 0;
        for (var i = 0; i < gP.length; i++) {
            switch (i) {
            case 0:
                var verticalAlign = gP[i].toLowerCase().trim();
                if (verticalAlign == "top" || verticalAlign == "-1") {
                    this.vertical = WR360.Align.TOP;
                } else if (verticalAlign == "center" || verticalAlign == "0") {
                    this.vertical = WR360.Align.CENTER;
                } else if (verticalAlign == "bottom" || verticalAlign == "1") {
                    this.vertical = WR360.Align.BOTTOM;
                }
                break;
            case 1:
                var ag = gP[i].toLowerCase().trim();
                if (ag == "left" || ag == "-1") {
                    this.horizontal = WR360.Align.LEFT;
                } else if (ag == "center" || ag == "0") {
                    this.horizontal = WR360.Align.CENTER;
                } else if (ag == "right" || ag == "1") {
                    this.horizontal = WR360.Align.RIGHT;
                }
                break;
            default:
                break;
            }
        }
    }
    ;
    WR360.ix = function() {
        this.x = 0;
        this.y = 0;
        this.isXDefined = false;
        this.isYDefined = false;
    }
    ;
    WR360.ix.prototype.ot = function() {
        return this.isXDefined || this.isYDefined;
    }
    ;
    WR360.ix.prototype.parse = function(offsetX, offsetY) {
        this.isXDefined = offsetX != null && offsetX.length > 0;
        this.isYDefined = offsetY != null && offsetY.length > 0;
        this.x = WR360.by.dM(offsetX, this.x);
        this.y = WR360.by.dM(offsetY, this.y);
    }
    ;
    WR360.kc = function() {
        this.id = "";
        this.type = "";
        this.indicatorImage = "circ-cross-thin-blue.svg";
        this.disabled = false;
        this.hotspotInfo = null;
        this.offset = new WR360.ix;
        this.margin = new WR360.Margin;
        this.align = new WR360.Align;
        this.wrap = true;
        this.renderMode = WR360.kc.bf.aC;
        this.activateOnClick = false;
        this.deactivateOnClick = false;
    }
    ;
    WR360.kc.bf = {};
    WR360.kc.bf.aC = 0;
    WR360.kc.bf.io = 1;
    WR360.kc.bf.au = 2;
    WR360.kc.bf.kd = 3;
    WR360.HotspotInfo = function() {
        this.src = "";
        this.clickAction = WR360.HotspotInfo.iE.NONE;
        this.clickData = "";
        this.clickDataParam = "";
        this.url = "";
        this.urlTarget = "_self";
        this.txt = "";
        this.txtWidth = 242;
        this.txtColor = "#525B69";
        this.txtBkColor = "#FFFFFF";
        this.fntHeight = 14;
        this.css = "";
        this.cdata = "";
        this.imgWidth = 0;
        this.imgBkColor = "transparent";
        this.lbxShowClose = true;
        this.lbxBackCover = false;
        this.lbxClickActive = true;
        this.imgNoScale = false;
    }
    ;
    WR360.HotspotInfo.iE = {};
    WR360.HotspotInfo.iE.NONE = 0;
    WR360.HotspotInfo.iE.qq = 1;
    WR360.HotspotInfo.iE.mA = 2;
    WR360.HotspotInfo.iE.qx = 3;
    WR360.HotspotInfo.iE.sL = 4;
    WR360.HotspotInfo.iE.ss = 5;
    WR360.HotspotInfo.iE.rH = 6;
    WR360.HotspotInfo.iE.qP = 7;
    WR360.HotspotInfo.iE.pB = 8;
    WR360.HotspotInfo.iE.sr = 9;
    WR360.HotspotInfo.iE.sX = 10;
    WR360.HotspotInfo.iE.er = 11;
    WR360.lv = function() {
        this.src = "";
        this.label = "";
        this.delay = 0;
        this.bF = new Array;
        this.hi = new Array;
        this.cS = null;
    }
    ;
    WR360.lq = function() {
        this.source = "";
        this.offsetX = 0;
        this.offsetY = 0;
    }
    ;
    WR360.nu = function() {
        this.image = "first";
    }
    ;
    WR360.jJ = function() {
        this.fE = 0;
        this.rotate = "false";
        this.kC = -1;
        this.oc = "false";
        this.gg = 7;
        this.bounce = false;
        this.bounceRows = true;
        this.useInertia = true;
        this.inertiaRelToDragSpeed = true;
        this.inertiaTimeToStop = 700;
        this.inertiaMaxInterval = 120;
        this.flipHorizontalInput = false;
        this.flipVerticalInput = false;
    }
    ;
    WR360.kT = function() {
        this.eH = new WR360.nu;
        this.bI = new WR360.jH;
        this.control = new WR360.Control;
        this.bg = new WR360.jJ;
    }
    ;
    WR360.jH = function() {
        this.hb = true;
        this.gj = true;
        this.gw = true;
        this.iT = true;
        this.bY = true;
        this.iU = true;
        this.bz = true;
        this.gx = 0;
        this.gH = "#ffffff";
        this.iC = 0.9;
        this.gX = 0.9;
        this.fullScreenBackColor = "#ffffff";
        this.showFullScreenToolbar = false;
    }
    ;
    WR360.kB = function() {
        this.src = "";
    }
    ;
})();
(function() {
    WR360.dh = function() {
        this.dw = {};
    }
    ;
    WR360.dh.prototype = {
        constructor: WR360.dh,
        oK: function() {
            return null;
        },
        addEventListener: function(type, cc, param) {
            if (typeof this.dw[type] == "undefined") {
                this.dw[type] = [];
            }
            this.dw[type].push({
                cc: cc,
                param: param
            });
        },
        dispatchEvent: function(event) {
            if (typeof event == "string") {
                event = {
                    type: event
                };
            }
            if (!event.target) {
                event.target = this;
            }
            if (!event.type) {
                throw new Error("Event object missing 'type' property.");
            }
            var handled = false;
            if (this.dw[event.type]instanceof Array) {
                var cs = this.dw[event.type];
                for (var i = 0, ia = cs.length; i < ia; i++) {
                    var ret = cs[i].cc.call(this, event, cs[i].param);
                    if (typeof ret !== "undefined" && ret == true) {
                        handled = true;
                    }
                }
            }
            return handled;
        },
        removeEventListener: function(type, cc) {
            if (this.dw[type]instanceof Array) {
                var cs = this.dw[type];
                for (var i = 0, ia = cs.length; i < ia; i++) {
                    if (cs[i].cc === cc) {
                        cs.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    WR360.Event = function(type, bubbles, cancelable, param) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.param = param;
    }
    ;
})();
(function() {
    WR360.dY = function() {
        this.aB().constructor.call(this);
        this.cQ = false;
        this.rootPath = "";
    }
    ;
    WR360.dY.aK(WR360.dh);
    WR360.dY.prototype.Init = function(rootPath, V) {
        this.rootPath = rootPath;
        this.cQ = false;
    }
    ;
})();
(function() {
    WR360.ba = function(image, index, rootPath, graphicsPath, oq) {
        this.aB().constructor.call(this);
        if (image == null) {
            throw new Error("ImageObject.ctor. null == hotspot");
        }
        this.image = image;
        this.F = new Image;
        this.bG = null;
        this.index = index;
        this.rootPath = rootPath;
        this.graphicsPath = graphicsPath;
        this.oq = oq;
        this.F.be = this;
        this.F.onload = this.gm;
        this.F.onerror = this.gc;
        this.aA();
    }
    ;
    WR360.ba.aK(WR360.dh);
    WR360.ba.iK = "pixel.png";
    WR360.ba.prototype.aA = function() {
        this.bG = new Image;
        this.bG.be = this;
        this.bG.cQ = false;
        this.bG.onload = this.lQ;
        this.bG.onerror = this.lL;
        this.bG.onabort = this.lG;
    }
    ;
    WR360.ba.prototype.gm = function() {
        var bu = this.be;
        bu.dispatchEvent(new WR360.ah(WR360.ah.COMPLETE,true,false,bu,false,bu.index,true,""));
    }
    ;
    WR360.ba.prototype.gc = function() {
        var bu = this.be;
        bu.dispatchEvent(new WR360.ah(WR360.ah.ERROR,true,false,bu,false,bu.index,false,"Error loading image: " + this.src));
    }
    ;
    WR360.ba.prototype.lQ = function() {
        var bu = this.be;
        if (bu.hx(this)) {
            return;
        }
        this.cQ = true;
        bu.dispatchEvent(new WR360.ah(WR360.ah.eD,true,false,bu,true,bu.index,true,""));
    }
    ;
    WR360.ba.prototype.lL = function() {
        var bu = this.be;
        if (bu.hx(this)) {
            return;
        }
        bu.dispatchEvent(new WR360.ah(WR360.ah.dU,true,false,bu,true,bu.index,false,"Error loading high-res image: " + this.src));
    }
    ;
    WR360.ba.prototype.lG = function() {
        var bu = this.be;
        if (bu.hx(this)) {
            return;
        }
        bu.dispatchEvent(new WR360.ah(WR360.ah.fD,true,false,bu,true,bu.index,false,"Abort loading high-res image: " + this.src));
    }
    ;
    WR360.ba.prototype.hx = function(image) {
        return image.src.indexOf(WR360.ba.iK) != -1;
    }
    ;
    WR360.ba.prototype.Load = function() {
        var qv = this.oq ? this.image.cS.src : this.image.src;
        this.F.src = this.rootPath + qv;
    }
    ;
    WR360.ba.prototype.hS = function() {
        if (this.bG == null) {
            this.aA();
        }
        this.bG.src = this.rootPath + this.image.cS.src;
    }
    ;
    WR360.ba.prototype.aE = function() {
        if (this.bG == null) {
            return;
        }
        this.hK();
    }
    ;
    WR360.ba.prototype.hK = function() {
        if (this.bG == null) {
            throw new Error("forceUnloadHighRes: highresBitmapLoader==null");
        }
        this.bG.cQ = false;
        this.bG.src = this.graphicsPath + "/" + WR360.ba.iK;
    }
    ;
    WR360.ba.prototype.kz = function() {
        if (this.bG == null) {
            return;
        }
        if (this.bG.cQ == false) {
            return;
        } else {
            this.hK();
        }
    }
    ;
    WR360.ah = function(type, bubbles, cancelable, af, ht, index, success, errorMessage) {
        this.aB().constructor.call(this, type, bubbles, cancelable);
        this.af = af;
        this.ht = ht;
        this.index = index;
        this.success = success;
        this.errorMessage = errorMessage;
    }
    ;
    WR360.ah.aK(WR360.Event);
    WR360.ah.COMPLETE = "ImageObject_complete";
    WR360.ah.ERROR = "ImageObject_error";
    WR360.ah.eD = "ImageObject_Highres_complete";
    WR360.ah.fD = "ImageObject_Highres_abort";
    WR360.ah.dU = "ImageObject_Highres_error";
})();
(function() {
    WR360.fC = function(bi, index, rootPath) {
        this.aB().constructor.call(this);
        this.bi = bi;
        this.index = index;
        this.F = new Image;
        this.rootPath = rootPath;
        this.F.be = this;
        this.F.onload = this.gm;
        this.F.onerror = this.gc;
    }
    ;
    WR360.fC.aK(WR360.dh);
    WR360.fC.Events = {};
    WR360.fC.Events.CLICK_ACTION = "HOTSPOT_API_CLICK_ACTION";
    WR360.da = function(type, bubbles, cancelable, aO, index, success, errorMessage) {
        this.aB().constructor.call(this, type, bubbles, cancelable);
        this.aO = aO;
        this.index = index;
        this.success = success;
        this.errorMessage = errorMessage;
    }
    ;
    WR360.da.aK(WR360.Event);
    WR360.da.COMPLETE = "HotspotObject_complete";
    WR360.da.ERROR = "HotspotObject_error";
    WR360.fC.prototype.gm = function() {
        var image = this;
        var handler = this.be;
        setTimeout(function() {
            WR360.by.pe(image.src, image);
            handler.dispatchEvent(new WR360.da(WR360.da.COMPLETE,true,false,handler,handler.index,true,""));
        }, 100);
    }
    ;
    WR360.fC.prototype.gc = function() {
        var bu = this.be;
        bu.dispatchEvent(new WR360.da(WR360.da.ERROR,true,false,bu,bu.index,false,"Error loading image: " + this.src));
    }
    ;
    WR360.fC.prototype.Load = function() {
        this.F.src = this.rootPath + this.bi.hotspotInfo.src;
    }
    ;
    WR360.fC.prototype.js = function() {
        if (this.bi.hotspotInfo.clickAction != WR360.HotspotInfo.iE.NONE) {
            return true;
        }
        return this.bi.hotspotInfo.url.length > 0;
    }
    ;
    WR360.fC.prototype.gL = function() {
        return this.bi.hotspotInfo.cdata.length > 0 || this.F.src.length > 0 || this.bi.hotspotInfo.txt.length > 0;
    }
    ;
    WR360.fC.prototype.ea = function() {
        return this.bi.hotspotInfo.imgWidth != 0 ? this.bi.hotspotInfo.imgWidth : this.F.width;
    }
    ;
    WR360.fC.prototype.kv = function(imagerotator) {
        var bO = false;
        switch (this.bi.hotspotInfo.clickAction) {
        case WR360.HotspotInfo.iE.sX:
            if (imagerotator.pY == true) {
                imagerotator.cJ();
            } else {
                imagerotator.gJ();
            }
            bO = true;
            break;
        case WR360.HotspotInfo.iE.qq:
            imagerotator.cJ();
            imagerotator.gJ();
            bO = true;
            break;
        case WR360.HotspotInfo.iE.mA:
            imagerotator.cJ();
            bO = true;
            break;
        case WR360.HotspotInfo.iE.qx:
            imagerotator.cJ();
            imagerotator.bV.iG(1);
            bO = true;
            break;
        case WR360.HotspotInfo.iE.sL:
            imagerotator.cJ();
            imagerotator.bV.iG(-1);
            bO = true;
            break;
        case WR360.HotspotInfo.iE.ss:
            imagerotator.bV.qB(this.bi.hotspotInfo.clickData, this.bi.hotspotInfo.clickDataParam);
            bO = true;
            break;
        case WR360.HotspotInfo.iE.rH:
            imagerotator.cJ();
            imagerotator.bV.qo(this.bi.hotspotInfo.clickData);
            bO = true;
            break;
        case WR360.HotspotInfo.iE.qP:
            imagerotator.mf();
            bO = true;
            break;
        case WR360.HotspotInfo.iE.pB:
            imagerotator.mt();
            bO = true;
            break;
        case WR360.HotspotInfo.iE.sr:
            imagerotator.rc(null);
            bO = true;
            break;
        case WR360.HotspotInfo.iE.er:
            var mE = this.bi.hotspotInfo.clickData;
            if (mE.length > 0) {
                var hZ = window[mE];
                if (typeof hZ === "function") {
                    hZ(this.bi);
                    bO = true;
                }
            }
            break;
        default:
            ;
        }
        return bO;
    }
    ;
    WR360.fC.prototype.cv = function(imagerotator) {
        var bO = false;
        if (this.dispatchEvent(new WR360.Event(WR360.fC.Events.CLICK_ACTION,false,false)) == true) {
            bO = true;
        } else if (this.js() == true) {
            if (this.bi.hotspotInfo.clickAction == WR360.HotspotInfo.iE.NONE) {
                var url = this.bi.hotspotInfo.url;
                if (imagerotator.gD() == true) {
                    imagerotator.sm.Event(WR360.sY.rU.rR);
                }
                var re = url.substr(url.lastIndexOf(".") + 1);
                if (re && re.length > 0 && re.toLowerCase() == "xml") {
                    imagerotator.reload(url, imagerotator.settings.rootPath);
                } else {
                    window.open(url, this.bi.hotspotInfo.urlTarget);
                }
                return true;
            }
            bO = this.kv(imagerotator);
        }
        if (bO == true) {
            if (imagerotator.gD() == true) {
                imagerotator.sm.Event(WR360.sY.rU.rR);
            }
        }
        return false;
    }
    ;
})();
(function() {
    WR360.cL = function(bh) {
        this.aB().constructor.call(this);
        if (bh == null) {
            throw new Error("ImagePreloader: imageRotator is null");
        }
        this.image = null;
        this.bh = bh;
    }
    ;
    WR360.cL.aK(WR360.dY);
    WR360.cL.le = "first";
    WR360.cL.la = "none";
    WR360.cL.prototype.Load = function(rootPath, V) {
        this.ct.Init.call(this, rootPath, V);
        var hh = V.settings.eH.image;
        var av = typeof this.bh.qQ !== "undefined" && this.bh.qQ();
        var qI = this.bh.settings.fullScreenOnClick;
        if (!av) {
            if (this.bh.dV == true && this.bh.reloadImageIndex >= 0) {
                var bW = this.bh.reloadImageIndex;
                if (bW > V.aw.length - 1) {
                    bW = 0;
                }
                hh = V.aw[bW].src;
            } else if (V.settings.eH.image.length == 0 || V.settings.eH.image.toLowerCase() == WR360.cL.la) {
                this.dispatchEvent(new WR360.cO(WR360.cO.COMPLETE,true,false,null,true,""));
                return;
            }
        } else {
            if (V.aw.length == 0) {
                this.dispatchEvent(new WR360.cO(WR360.cO.COMPLETE,true,false,null,true,""));
                return;
            }
            var aF = qI == true ? V.settings.bg.fE : this.bh.pH.bV.ob(true);
            if (aF < 0 || aF > V.aw.length - 1) {
                aF = 0;
            }
            hh = V.aw[aF].src;
            var oq = av && V.settings.control.qc && this.bh.bV.lc;
            if (oq) {
                hh = V.aw[aF].cS != null ? V.aw[aF].cS.src : V.aw[aF].src;
            }
        }
        this.image = new Image;
        this.image.be = this;
        this.image.onload = this.os;
        this.image.onerror = this.mj;
        this.image.src = this.rootPath + hh;
    }
    ;
    WR360.cL.prototype.os = function() {
        this.be.dispatchEvent(new WR360.cO(WR360.cO.COMPLETE,true,false,this.be.image,true,""));
    }
    ;
    WR360.cL.prototype.mj = function() {
        this.be.dispatchEvent(new WR360.cO(WR360.cO.ERROR,true,false,null,false,"Preloader IO ERROR: " + this.src));
    }
    ;
    WR360.cO = function(type, bubbles, cancelable, image, success, errorMessage) {
        this.aB().constructor.call(this, type, bubbles, cancelable);
        this.image = image;
        this.success = success;
        this.errorMessage = errorMessage;
    }
    ;
    WR360.cO.aK(WR360.Event);
    WR360.cO.COMPLETE = "complete";
    WR360.cO.ERROR = "error";
})();
(function() {
    WR360.dP = function(cR) {
        this.aB().constructor.call(this);
        this.aw = new Array;
        this.sU = new Array;
        this.rd = 0;
        this.startRowIndex = 0;
        this.cG = 0;
        this.cR = cR;
        this.mu = "cache_" + cR.substr(1, cR.length);
    }
    ;
    WR360.dP.aK(WR360.dY);
    WR360.dP.prototype.lU = function(row) {
        if (row > this.sU.length) {
            row = 0;
        }
        return this.sU[row];
    }
    ;
    WR360.dP.prototype.sd = function() {
        return this.sU.length;
    }
    ;
    WR360.dP.prototype.sM = function() {
        return this.rd;
    }
    ;
    WR360.dP.prototype.rr = function() {
        return this.aw.length;
    }
    ;
    WR360.dP.prototype.Init = function(rootPath, graphicsPath, V, oq) {
        this.ct.Init.call(this, rootPath, V);
        this.ln(rootPath, graphicsPath, V, oq);
    }
    ;
    WR360.dP.prototype.ln = function(rootPath, graphicsPath, V, oq) {
        this.rd = V.aw.length / V.aw.rows;
        if (this.rd % 1) {
            this.rd = V.aw.length;
            V.aw.rows = 1;
        }
        for (var row = 0; row < V.aw.rows; row++) {
            this.sU[row] = new Array;
        }
        var sK = 1;
        var sl = 0;
        for (var i = 0; i < V.aw.length; i++) {
            if (i >= sK * this.rd) {
                sK++;
                sl = 0;
            }
            this.aw[i] = new WR360.ba(V.aw[i],sl,rootPath,graphicsPath,oq);
            this.sU[sK - 1][sl++] = this.aw[i];
            if (V.settings.bg.fE == i) {
                this.startRowIndex = sK - 1;
            }
        }
    }
    ;
    WR360.dP.prototype.kE = function() {
        var hX = "#" + this.mu;
        this.hA = jQuery(hX);
        if (this.hA.length == 1) {
            this.hA.remove();
        }
        jQuery(this.cR + " .container").append("<div style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;' id='" + this.mu + "'></div>");
        this.hA = jQuery(hX);
        this.cG = 0;
        for (var i = 0; i < this.aw.length; i++) {
            var af = this.aw[i];
            af.be = this;
            af.addEventListener(WR360.ah.COMPLETE, this.nU);
            af.addEventListener(WR360.ah.ERROR, this.ou);
            af.Load();
        }
    }
    ;
    WR360.dP.prototype.oB = function(index) {
        var af = aw[index];
        af.be = this;
        af.hS();
    }
    ;
    WR360.dP.prototype.oW = function(jM) {
        for (var i = 0; i < this.aw.length; i++) {
            if (i == jM) {
                continue;
            }
            this.aw[i].kz();
        }
    }
    ;
    WR360.dP.prototype.nU = function(e) {
        this.be.kA(e);
    }
    ;
    WR360.dP.prototype.kA = function(e) {
        if (e.ht) {
            return;
        }
        this.cG++;
        var eR = WR360.cf.PROGRESS;
        if (this.cG >= this.aw.length) {
            eR = WR360.cf.COMPLETE;
            this.cQ = true;
        }
        this.hA.append("<div style='position:absolute;left:0;top:0;width:100%;height:100%;visibility:hidden;z-index:0;background-image: url(" + "\"" + e.af.F.src + "\")" + "'></div>");
        this.dispatchEvent(new WR360.cf(eR,true,false,e.af,Math.round(this.cG * 100 / this.aw.length),true,""));
    }
    ;
    WR360.dP.prototype.ou = function(e) {
        var bu = this.be;
        bu.dispatchEvent(new WR360.cf(WR360.cf.ERROR,true,false,e.af,Math.round(bu.cG * 100 / bu.aw.length),false,e.errorMessage));
    }
    ;
    WR360.cf = function(type, bubbles, cancelable, af, ee, success, errorMessage) {
        this.aB().constructor.call(this, type, bubbles, cancelable);
        this.af = af;
        this.ee = ee;
        this.errorMessage = errorMessage;
        this.success = success;
    }
    ;
    WR360.cf.aK(WR360.Event);
    WR360.cf.PROGRESS = "ImagesCache_progress";
    WR360.cf.COMPLETE = "ImagesCache_complete";
    WR360.cf.ERROR = "ImagesCache_error";
    WR360.cf.bJ = "ImagesCache_canceled";
})();
(function() {
    WR360.dc = function() {
        this.aB().constructor.call(this);
        this.dH = 0;
        this.bF = new Array;
        this.hu = -1;
    }
    ;
    WR360.dc.aK(WR360.dY);
    WR360.dc.prototype.Init = function(rootPath, V) {
        this.ct.Init.call(this, rootPath, V);
        this.ku(rootPath, V);
    }
    ;
    WR360.dc.prototype.ku = function(rootPath, V) {
        var eW = 0;
        for (var i = 0; i < V.bF.length; i++) {
            if (!V.bF[i].disabled) {
                if (this.hu == -1) {
                    this.bF[eW] = new WR360.fC(V.bF[i],eW,rootPath);
                } else if (eW < this.hu) {
                    this.bF[eW] = new WR360.fC(V.bF[i],eW,rootPath);
                }
                eW++;
            }
        }
    }
    ;
    WR360.dc.prototype.kD = function() {
        this.dH = 0;
        for (var i = 0; i < this.bF.length; i++) {
            var aO = this.bF[i];
            if (aO.bi.hotspotInfo.src.length > 0) {
                aO.be = this;
                aO.addEventListener(WR360.da.COMPLETE, this.mN);
                aO.addEventListener(WR360.da.ERROR, this.og);
                aO.Load();
            } else {
                this.kq(new WR360.da(WR360.da.COMPLETE,true,false,aO,aO.index,true,""));
            }
        }
    }
    ;
    WR360.dc.prototype.mN = function(e) {
        this.be.kq(e);
    }
    ;
    WR360.dc.prototype.kq = function(e) {
        this.dH++;
        var eR = WR360.dK.PROGRESS;
        if (this.dH >= this.bF.length) {
            eR = WR360.dK.COMPLETE;
            this.cQ = true;
        }
        this.dispatchEvent(new WR360.dK(eR,true,false,e.aO,Math.round(this.dH * 100 / this.bF.length),true,""));
    }
    ;
    WR360.dc.prototype.og = function(e) {
        var bu = this.be;
        bu.dispatchEvent(new WR360.dK(WR360.dK.ERROR,true,false,e.aO,Math.round(bu.dH * 100 / bu.bF.length),false,e.errorMessage));
    }
    ;
    WR360.dK = function(type, bubbles, cancelable, aO, ee, success, errorMessage) {
        this.aB().constructor.call(this, type, bubbles, cancelable);
        this.aO = aO;
        this.ee = ee;
        this.errorMessage = errorMessage;
        this.success = success;
    }
    ;
    WR360.dK.aK(WR360.Event);
    WR360.dK.PROGRESS = "HotspotsCache_progress";
    WR360.dK.COMPLETE = "HotspotsCache_complete";
    WR360.dK.ERROR = "HotspotsCache_error";
    WR360.dK.bJ = "HotspotsCache_canceled";
})();
(function() {
    WR360.cI = function(visible, aO, bV, H) {
        this.df = visible;
        this.dz = 0;
        this.dg = 0;
        this.aO = aO;
        this.bV = bV;
        this.bh = bV.bh;
        this.playing = false;
        this.H = H;
    }
    ;
    WR360.cI.prototype.cD = function() {
        this.fR();
    }
    ;
    WR360.cI.prototype.aH = function(visible) {}
    ;
    WR360.cI.prototype.eC = function(x) {
        this.dz = x;
    }
    ;
    WR360.cI.prototype.fv = function(y) {
        this.dg = y;
    }
    ;
    WR360.cI.prototype.nT = function() {
        if (this.bH == null) {
            return;
        }
        var aM = this.bV.oy(this.aO, this.bH.qh, this.bH.qw);
        this.dz = aM.x;
        this.dg = aM.y;
        this.bH.gM.css("left", this.dz);
        this.bH.gM.css("top", this.dg);
        if (this.bH.image != null && this.aO.bi.hotspotInfo.imgNoScale == false) {
            this.bH.gM.css("width", this.aO.ea() * this.bV.lB);
        }
    }
    ;
    WR360.cI.prototype.fR = function() {
        if (this.bH == null && this.aO.gL()) {
            this.bH = new WR360.bx(this.bV,this.aO,this.H);
            this.bH.jw();
            this.bH.jl(this.gV());
        }
    }
    ;
    WR360.cI.prototype.gV = function() {
        return {
            x: this.dz,
            y: this.dg
        };
    }
    ;
    WR360.cI.prototype.pM = function() {
        if (this.bH != null) {
            this.bH['delete']();
        }
    }
    ;
})();
(function() {
    WR360.aT = function(visible, aO, bV, H) {
        this.aB().constructor.call(this);
        this.df = visible;
        this.dz = 0;
        this.dg = 0;
        this.aO = aO;
        this.bV = bV;
        this.bh = bV.bh;
        this.dW = false;
        this.H = H;
        this.bb = null;
        this.hotspotHtmlId = "";
        this.kN = this.bh.settings.graphicsPath + "/" + this.aO.bi.indicatorImage;
        this.image = new Image;
        this.bH = null;
        this.fc = false;
        this.gB = 0;
        this.gE = 0;
        this.pl = "indicator_active " + this.aO.bi.id + "_indicator_active";
        this.image.onload = jQuery.proxy(this.nK, this);
        this.image.onerror = jQuery.proxy(this.nY, this);
        this.hotspotHtmlId = this.bh.gK(this.aO.bi);
        this.cb = 0;
        this.kn = 0;
        this.kG();
        this.image.src = this.kN;
        this.aH(visible);
    }
    ;
    WR360.aT.aK(WR360.dh);
    WR360.aT.Events = {};
    WR360.aT.Events.ACTIVATE = "HOTSPOT_API_ACTIVATE";
    WR360.aT.Events.DEACTIVATE = "HOTSPOT_API_DEACTIVATE";
    WR360.aT.Events.mI = "HOTSPOT_ROLLOVER_REMOVED";
    WR360.aT.prototype.kG = function() {
        this.bb = jQuery("<div style='position:absolute' class='hotspot_indicator " + this.aO.bi.id + "_indicator" + " wr360hotspot_" + this.bh.oY + "' id='" + this.hotspotHtmlId + "'/>").appendTo(this.H);
        this.bb.mouseover(jQuery.proxy(function(event) {
            this.OnMouseOver(event);
        }, this));
        this.bb.mouseout(jQuery.proxy(function(event) {
            this.OnMouseOut(event);
        }, this));
        this.bb.fI(jQuery.proxy(function(event) {
            this.kf(event);
        }, this));
        this.bh.addEventListener(WR360.Events.hG, jQuery.proxy(this.mC, this));
        var self = this;
        this.bb.bind("touchend mousedown", function(e) {
            e.stopPropagation();
            self.bh.jB(e);
        });
    }
    ;
    WR360.aT.prototype.nK = function(e) {
        var image = e.target;
        var self = this;
        setTimeout(function() {
            WR360.by.pe(self.aO.bi.indicatorImage, image);
            self.eC(self.dz);
            self.fv(self.dg);
            self.bb.css("background-image", "url(" + image.src + ")");
            self.bb.css("width", image.width);
            self.bb.css("height", image.height);
        }, 100);
    }
    ;
    WR360.aT.prototype.nY = function(e) {
        WR360.bZ.gA("DynamicHotspotPresenter. Error loading image: " + e.target.src);
    }
    ;
    WR360.aT.prototype.cD = function() {}
    ;
    WR360.aT.prototype.aH = function(visible, aX) {
        this.df = visible;
        if (visible) {
            if (aX) {
                this.bb.fadeIn(300);
            } else {
                this.bb.show();
            }
        } else {
            if (aX) {
                this.bb.fadeOut(300);
            } else {
                this.bb.hide();
            }
        }
    }
    ;
    WR360.aT.prototype.eC = function(x) {
        this.dz = x;
        this.bb.css("left", x - this.image.width / 2);
    }
    ;
    WR360.aT.prototype.fv = function(y) {
        this.dg = y;
        this.bb.css("top", y - this.image.height / 2);
    }
    ;
    WR360.aT.prototype.lX = function() {
        return this.image.width;
    }
    ;
    WR360.aT.prototype.lT = function() {
        return this.image.height;
    }
    ;
    WR360.aT.prototype.mC = function(e) {
        if (e.param != this.hotspotHtmlId) {
            this.gY(false);
        }
    }
    ;
    WR360.aT.prototype.OnMouseOut = function(e) {
        e.stopPropagation();
        this.fc = false;
    }
    ;
    WR360.aT.prototype.OnMouseOver = function(e) {
        if (this.bh.pY == true) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        if (this.aO.bi.activateOnClick == false) {
            var iH = this.fR();
            if (iH == true) {
                this.gE = Date.now();
            }
        }
    }
    ;
    WR360.aT.prototype.kf = function(e) {
        if (this.aO.bi.activateOnClick == false) {
            if (Date.now() - this.gE < 150) {
                return;
            }
            this.gE = 0;
        }
        if (this.aO.js() == true) {
            if (this.aO.gL() == false || this.aO.bi.activateOnClick == false && this.dW == true) {
                if (this.aO.gL() == false) {
                    this.bh.dispatchEvent(new WR360.Event(WR360.Events.hG,false,false,this.hotspotHtmlId));
                }
                var pU = this.aO.cv(this.bh);
                if (pU == false && this.dW == true) {
                    this.gY(false);
                }
                return;
            }
        }
        this.fc = false;
        if (this.dW == true) {
            this.gY(false);
        } else {
            this.fR();
        }
    }
    ;
    WR360.aT.prototype.jP = function(e) {
        clearInterval(this.gB);
        clearTimeout(this.kn);
        clearTimeout(this.cb);
        this.cb = 0;
        this.bb.removeClass(this.pl);
        if (this.dW == false) {
            return;
        }
        this.dW = false;
        var aq = e.param;
        if (aq == false) {
            this.ld();
        }
        if (this.aO.bi.activateOnClick == true) {
            return;
        }
        if (WR360.by.fU == true) {
            return;
        }
        var cV = {
            x: this.bh.dO,
            y: this.bh.ei
        };
        if (cV.x == 0 && cV.y == 0) {
            return;
        }
        if (WR360.by.fA(this.bb, cV) == true) {
            this.fc = true;
            var lM = this;
            this.gB = setInterval(function() {
                lM.lb();
            }, 200);
        }
    }
    ;
    WR360.aT.prototype.eb = function(timeout, hZ) {
        this.fR(timeout);
        if (timeout !== undefined && this.cb == 0) {
            var self = this;
            this.cb = setTimeout(function() {
                self.gY(true);
                if (hZ !== undefined) {
                    hZ(self.mv());
                }
            }, timeout);
        }
    }
    ;
    WR360.aT.prototype.fR = function(timeout) {
        if (this.bh.fu == true || this.dW == true || this.fc == true) {
            return false;
        }
        this.bh.dispatchEvent(new WR360.Event(WR360.Events.hG,false,false,this.hotspotHtmlId));
        this.bh.cJ();
        this.dW = true;
        this.bh.lp();
        this.bb.addClass(this.pl);
        if (this.ll() == true || this.aO.gL() == false) {
            this.oX(timeout);
            return false;
        }
        if (this.bH == null) {
            this.bH = this.aO.bi.renderMode == WR360.kc.bf.kd ? new WR360.fH(this.bV,this.aO,this.H) : new WR360.bx(this.bV,this.aO,this.H);
            this.bH.addEventListener(WR360.aT.Events.mI, jQuery.proxy(this.jP, this));
            this.bH.jw();
            this.bH.jl(this.gV());
        } else {
            this.bH.jl(this.gV());
        }
        this.oX(timeout);
        return true;
    }
    ;
    WR360.aT.prototype.ll = function() {
        return this.dispatchEvent(new WR360.Event(WR360.aT.Events.ACTIVATE,false,false));
    }
    ;
    WR360.aT.prototype.ld = function() {
        return this.dispatchEvent(new WR360.Event(WR360.aT.Events.DEACTIVATE,false,false));
    }
    ;
    WR360.aT.prototype.gY = function(aX) {
        clearInterval(this.gB);
        clearTimeout(this.cb);
        this.cb = 0;
        clearTimeout(this.kn);
        this.bb.removeClass(this.pl);
        if (this.dW == false) {
            return;
        }
        if (this.ld() == true) {
            this.dW = false;
            return;
        }
        if (this.bH != null) {
            this.bH.cN(aX, true);
        }
    }
    ;
    WR360.aT.prototype.gV = function() {
        return {
            x: this.dz,
            y: this.dg
        };
    }
    ;
    WR360.aT.prototype.oX = function(timeout) {
        if (WR360.by.fU == true) {
            return;
        }
        clearInterval(this.gB);
        var oP = timeout !== undefined ? timeout : 0;
        var self = this;
        if (this.aO.bi.deactivateOnClick == true && oP == 0) {
            return;
        }
        this.kn = setTimeout(function() {
            self.gB = setInterval(function() {
                self.jE();
            }, 300);
        }, oP);
    }
    ;
    WR360.aT.prototype.jE = function() {
        var cV = {
            x: this.bh.dO,
            y: this.bh.ei
        };
        if (cV.x == 0 && cV.y == 0) {
            return;
        }
        if (WR360.by.fA(this.bb, cV) == false) {
            if (this.bH == null || this.bH.iI(cV) == false) {
                this.gY(true);
                clearInterval(this.gB);
            }
        }
    }
    ;
    WR360.aT.prototype.lb = function() {
        var cV = {
            x: this.bh.dO,
            y: this.bh.ei
        };
        if (cV.x == 0 && cV.y == 0) {
            return;
        }
        if (WR360.by.fA(this.bb, cV) == false) {
            this.fc = false;
            clearInterval(this.gB);
            this.gB = 0;
        }
    }
    ;
    WR360.aT.prototype.nT = function() {
        if (this.bH == null) {
            return;
        }
        if (this.aO.bi.renderMode == WR360.kc.bf.io) {
            var aM = this.bV.oy(this.aO, this.bH.qh, this.bH.qw);
            this.dz = aM.x;
            this.dg = aM.y;
            this.bH.gM.css("left", this.dz);
            this.bH.gM.css("top", this.dg);
        }
        if (this.aO.bi.renderMode != WR360.kc.bf.kd) {
            if (this.bH.image != null && this.aO.bi.hotspotInfo.imgNoScale == false) {
                this.bH.gM.css("width", this.aO.ea() * this.bV.lB);
            }
        }
    }
    ;
    WR360.aT.prototype.mv = function() {
        var oJ = {
            hotspotHtmlId: this.hotspotHtmlId,
            parentContainer: this.H,
            hotspotConfig: this.aO.bi,
            coordX: this.dz,
            coordY: this.dg,
            isVisible: this.df
        };
        return oJ;
    }
    ;
    WR360.aT.prototype.pM = function() {
        this.bb.unbind();
        this.bb.remove();
        if (this.bH != null) {
            this.bH.removeEventListener(WR360.aT.Events.mI, jQuery.proxy(this.jP, this));
            this.bH['delete']();
        }
        clearInterval(this.gB);
        clearTimeout(this.cb);
        clearTimeout(this.kn);
        this.bh.removeEventListener(WR360.Events.hG, jQuery.proxy(this.mC, this));
    }
    ;
    WR360.aT.prototype.pZ = function(isHide) {
        var ps = "hotspot_indicator_hidden";
        if (isHide == true) {
            this.bb.addClass(ps);
        } else {
            this.bb.removeClass(ps);
        }
    }
    ;
})();
(function() {
    WR360.bx = function(bV, aO, H) {
        this.aB().constructor.call(this);
        this.bV = bV;
        this.bh = bV.bh;
        this.H = H;
        this.ig = WR360.by.ge();
        this.dv = null;
        this.gM = null;
        this.image = null;
        this.qh = 0;
        this.qw = 0;
        this.aO = aO;
        this.hotspotInfo = aO.bi.hotspotInfo;
        this.renderMode = aO.bi.renderMode;
        this.sT = 0;
        this.bP = 5;
        this.visible = false;
        this.iA = new Array;
        this.dv = jQuery("<div class='hotspot_rollover position_rollover " + this.aO.bi.id + "_rollover" + " wr360rollover_" + this.bh.oY + "' id='" + this.ig + "'/>").appendTo(this.H);
    }
    ;
    WR360.bx.aK(WR360.dh);
    WR360.bx.prototype.nc = function(visible) {
        if (visible) {
            this.dv.show();
        } else {
            this.dv.hide();
        }
        this.visible = visible;
    }
    ;
    WR360.bx.prototype.mc = function(visible, duration, hZ) {
        if (visible) {
            this.dv.fadeIn(duration, hZ);
        } else {
            this.dv.fadeOut(duration, hZ);
        }
        this.visible = visible;
    }
    ;
    WR360.bx.prototype.iI = function(eJ) {
        if (this.visible == false) {
            return false;
        }
        return WR360.by.fA(this.gM, eJ);
    }
    ;
    WR360.bx.prototype.iL = function() {
        var ig = WR360.by.ge();
        if (this.hotspotInfo.cdata.length != 0) {
            this.gM = jQuery("<div class='hotspot_cdata' id='" + ig + "'/>").appendTo(this.dv);
            this.gM.append(this.hotspotInfo.cdata);
            var bn = this;
            this.gM.find("iframe").each(function() {
                bn.iA.push(jQuery(this).attr("src"));
            });
        } else if (this.aO.F.src.length > 0) {
            var hY = this.hotspotInfo.imgNoScale == false ? this.bV.lB : 1;
            this.gM = jQuery("<div id='" + ig + "'/>").appendTo(this.dv);
            this.gM.css("width", this.aO.ea() * hY);
            this.gM.css("background-color", this.hotspotInfo.imgBkColor);
            this.image = jQuery("<img style='display:block;width:100%;' src='" + this.aO.F.src + "'/>").appendTo(this.gM);
        } else if (this.hotspotInfo.txt.length != 0) {
            this.gM = jQuery("<div id='" + ig + "'/>").appendTo(this.dv);
            this.kr(this.gM);
            this.gM.html(this.hotspotInfo.txt.nA());
        }
        this.gM.css("position", "relative");
        if (this.hotspotInfo.cdata.length != 0 || this.hotspotInfo.txt.length != 0) {
            this.gM.find("a").fI(jQuery.proxy(function(event) {
                this.ib(event);
            }, this));
        }
    }
    ;
    WR360.bx.prototype.kr = function(dR) {
        if (this.hotspotInfo.css.length == 0) {
            dR.css("font-family", "Arial");
            dR.css("width", this.hotspotInfo.txtWidth + "px");
            dR.css("color", this.hotspotInfo.txtColor);
            dR.css("background-color", this.hotspotInfo.txtBkColor);
            dR.css("font-size", this.hotspotInfo.fntHeight + "px");
            dR.css("border", "1px #eeeeee solid");
            dR.css("padding", "6px 8px 10px 8px");
        } else {
            dR.attr("style", this.hotspotInfo.css);
        }
    }
    ;
    WR360.bx.prototype.jw = function() {
        this.iL();
        this.qh = this.dv.outerWidth();
        this.qw = this.dv.outerHeight();
        if (this.renderMode != WR360.kc.bf.aC) {
            var aM = this.bV.oy(this.aO, this.qh, this.qw);
            this.gM.css("left", aM.x);
            this.gM.css("top", aM.y);
            this.dv.css("width", 0);
            this.dv.css("height", 0);
        } else {
            this.gM.css("left", -(this.qh / 2));
            this.gM.css("top", -(this.qw / 2));
        }
        this.nc(false);
        this.dv.css("visibility", "visible");
    }
    ;
    WR360.bx.prototype.lm = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var pU = this.aO.cv(this.bh);
        if (this.renderMode != WR360.kc.bf.au && pU == false) {
            this.cN(true);
        }
    }
    ;
    WR360.bx.prototype.ib = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var link = jQuery(e.target).attr("href");
        if (link === undefined || link.length == 0) {
            this.lm(e);
        } else {
            if (this.bh.gD() == true) {
                this.bh.sm.Event(WR360.sY.rU.rR);
            }
            var target = jQuery(e.target).attr("target");
            window.open(link, target === undefined ? "_self" : target);
        }
    }
    ;
    WR360.bx.prototype.nR = function(it, ab) {
        var gd = 0;
        var jj = ab / 2;
        var margin = this.aO.bi.margin;
        switch (this.aO.bi.align.horizontal) {
        case WR360.Align.LEFT:
            gd = it - jj - margin.right;
            break;
        case WR360.Align.CENTER:
            gd = it - margin.right + margin.left;
            break;
        case WR360.Align.RIGHT:
            gd = it + jj + margin.left;
            break;
        default:
            ;
        }
        var ca = jj + this.bP;
        if (this.aO.bi.wrap == true) {
            if (gd - ca <= 0) {
                gd = it + jj + margin.left;
            } else if (gd + ca > this.H.css("width").bE()) {
                gd = it - jj - margin.right;
            }
        }
        return gd;
    }
    ;
    WR360.bx.prototype.oi = function(gR, bq) {
        var ho = 0;
        var hC = bq / 2;
        var margin = this.aO.bi.margin;
        switch (this.aO.bi.align.vertical) {
        case WR360.Align.TOP:
            ho = gR - hC - margin.bottom;
            break;
        case WR360.Align.CENTER:
            ho = gR - margin.bottom + margin.top;
            break;
        case WR360.Align.BOTTOM:
            ho = gR + hC + margin.top;
            break;
        default:
            ;
        }
        var cE = hC + this.bP;
        if (this.aO.bi.wrap == true) {
            if (ho - cE <= 0) {
                ho = gR + hC + margin.top;
            } else if (ho + cE > this.H.css("height").bE()) {
                ho = gR - hC - margin.bottom;
            }
        }
        return ho;
    }
    ;
    WR360.bx.prototype.mi = function(it, ab) {
        var ca = ab / 2 + this.bP;
        var lD = this.H.css("width").bE();
        if (it + ca >= lD) {
            return lD - ca;
        } else if (it - ca <= 0) {
            return ca;
        }
        return it;
    }
    ;
    WR360.bx.prototype.lF = function(gR, bq) {
        var cE = bq / 2 + this.bP;
        var mQ = this.H.css("height").bE();
        if (gR + cE >= mQ) {
            return mQ - cE;
        } else if (gR - cE <= 0) {
            return cE;
        }
        return gR;
    }
    ;
    WR360.bx.prototype.jl = function(cU) {
        this.iZ();
        if (this.visible == true) {
            return;
        }
        if (this.renderMode == WR360.kc.bf.aC) {
            var ab = this.qh;
            var bq = this.qw;
            if (this.image != null && this.hotspotInfo.imgNoScale == false) {
                ab = this.aO.ea() * this.bV.lB;
                bq = ab * this.aO.F.height / this.aO.F.width;
                this.gM.css("left", -(ab / 2));
                this.gM.css("top", -(bq / 2));
            }
            var kK = 0;
            var lg = 0;
            if (this.aO.bi.align.parsed == true && this.aO.bi.align.pn() == false) {
                kK = this.nR(cU.x, ab);
                lg = this.oi(cU.y, bq);
            } else {
                kK = this.mi(cU.x, ab);
                lg = this.lF(cU.y, bq);
            }
            this.dv.css("left", kK);
            this.dv.css("top", lg);
        }
        this.mc(true, 300, jQuery.proxy(this.jm, this));
    }
    ;
    WR360.bx.prototype.cN = function(aX, aq) {
        if (this.visible == false) {
            return;
        }
        if (aX) {
            this.mc(false, 200, jQuery.proxy(this.kk, this));
        } else {
            this.nc(false);
            this.kk();
        }
        aq = aq !== undefined ? aq : false;
        this.dispatchEvent(new WR360.Event(WR360.aT.Events.mI,false,false,aq));
    }
    ;
    WR360.bx.prototype.iZ = function() {
        this.gM.unbind();
        this.H.unbind("touchstart." + this.ig);
        this.H.unbind("mousedown." + this.ig);
    }
    ;
    WR360.bx.prototype.mx = function(e) {
        e.stopPropagation();
        if (this.renderMode != WR360.kc.bf.au) {
            this.cN(true);
        }
    }
    ;
    WR360.bx.prototype.jm = function() {
        if (this.renderMode == WR360.kc.bf.aC || this.renderMode == WR360.kc.bf.io) {
            this.sT = Date.now();
        }
        this.gM.bind("mouseover", function(event) {
            event.stopPropagation();
        });
        if (!WR360.by.fU) {
            this.gM.bind("mousedown", jQuery.proxy(function(event) {
                this.lm(event);
            }, this));
            this.H.bind("mousedown." + this.ig, jQuery.proxy(function(event) {
                this.mx(event);
            }, this));
        } else {
            this.gM.bind("touchstart", jQuery.proxy(function(event) {
                this.lm(event);
            }, this));
            this.H.bind("touchstart." + this.ig, jQuery.proxy(function(event) {
                this.mx(event);
            }, this));
        }
        var bn = this;
        this.gM.find("iframe").each(function(index) {
            var sS = jQuery(this).attr("src");
            var hv = bn.iA[index];
            if (typeof sS !== "undefined" && sS.length == 0 && typeof hv !== "undefined") {
                jQuery(this).attr("src", hv);
            }
        });
    }
    ;
    WR360.bx.prototype.kk = function() {
        if (this.renderMode == WR360.kc.bf.aC || this.renderMode == WR360.kc.bf.io) {
            if (this.sT != 0) {
                if (this.bh.gD() == true) {
                    this.bh.sm.Event(WR360.sY.rU.te, Date.now() - this.sT);
                }
                this.sT = 0;
            }
        }
        this.gM.find("iframe").each(function() {
            jQuery(this).attr("src", "");
        });
        this.iZ();
    }
    ;
    WR360.bx.prototype['delete'] = function() {
        this.iZ();
        this.dv.remove();
    }
    ;
})();
(function() {
    WR360.jI = function(id, visible) {
        this.Id = id;
        this.Visible = visible;
    }
    ;
})();
(function() {
    WR360.cP = function(id, dF, cn) {
        this.cj = false;
        this.df = false;
        this.id = id;
        this.dF = dF;
        this.cn = cn;
        this.K = jQuery("#" + this.id);
    }
    ;
    WR360.cP.prototype.iW = function() {
        return this.cj;
    }
    ;
    WR360.cP.prototype.fi = function(fh) {
        if (this.cj == fh) {
            return;
        }
        if (!this.cj) {
            this.K.attr("class", this.cn);
        } else {
            this.K.attr("class", this.dF);
        }
        this.cj = fh;
    }
    ;
    WR360.cP.prototype.aH = function(visible) {
        if (this.K == null) {
            throw new Error("SetVisible: buttonElement==null.");
        }
        this.df = visible;
        if (visible) {
            this.K.show();
        } else {
            this.K.hide();
        }
    }
    ;
    WR360.eI = function(id, cg, be, dF, ck, cn, cY, du) {
        this.aB().constructor.call(this, id, dF, cn);
        this.jn = false;
        this.cg = cg;
        this.ck = ck;
        this.cY = cY;
        this.du = du;
        this.be = be;
    }
    ;
    WR360.eI.aK(WR360.cP);
    WR360.eI.prototype.cD = function() {
        if (this.jn) {
            return;
        }
        this.K.bind(this.cg, jQuery.proxy(this.ck, this.be));
        this.jn = true;
    }
    ;
    WR360.eI.prototype.fi = function(fh) {
        if (this.cj == fh) {
            return;
        }
        if (!this.cj) {
            this.K.unbind(this.cg);
            this.K.attr("class", this.cn);
            if (this.du == 0) {
                this.K.bind(this.cg, jQuery.proxy(this.cY, this.be));
            } else {
                var bu = this;
                setTimeout(function() {
                    bu.ka();
                }, this.du);
            }
        } else {
            this.K.unbind(this.cg);
            this.K.attr("class", this.dF);
            if (this.du == 0) {
                this.K.bind(this.cg, jQuery.proxy(this.ck, this.be));
            } else {
                var bu = this;
                setTimeout(function() {
                    bu.lj();
                }, this.du);
            }
        }
        this.cj = fh;
    }
    ;
    WR360.cP.prototype.ka = function() {
        this.K.bind(this.cg, jQuery.proxy(this.cY, this.be));
    }
    ;
    WR360.cP.prototype.lj = function() {
        this.K.bind(this.cg, jQuery.proxy(this.ck, this.be));
    }
    ;
    WR360.fb = function(id, cg, be, dF, ck, cn, cY, du) {
        this.aB().constructor.call(this, id, cg, be, dF, ck, cn, cY, du);
    }
    ;
    WR360.fb.aK(WR360.eI);
    WR360.fb.prototype.pb = function() {
        return this.iW();
    }
    ;
    WR360.fb.prototype.ji = function(playing) {
        this.fi(playing);
    }
    ;
    WR360.ej = function(id, dF, cn) {
        this.aB().constructor.call(this, id, dF, cn);
    }
    ;
    WR360.ej.aK(WR360.cP);
    WR360.ej.prototype.nM = function() {
        return this.iW();
    }
    ;
    WR360.ej.prototype.as = function(dn) {
        this.fi(dn);
    }
    ;
})();
(function() {
    WR360.bN = function() {
        this.he = 1;
        this.aF = -1;
        this.kl = 0;
        this.bU = null;
        this.bB = null;
        this.V = null;
        this.es = 0;
        this.fe = 0;
        this.bh = null;
        this.db = true;
        this.cA = null;
        this.hz = null;
        this.ce = null;
        this.en = false;
        this.hw = false;
        this.cX = new WR360.J;
        this.aU = null;
        this.dZ = 0;
        this.jr = true;
        this.lc = false;
        this.H = null;
        this.bd = null;
        this.jp = null;
        this.aG = null;
        this.kL = null;
        this.lB = 1;
        this.rm = false;
        this.pJ = 0;
        this.sn = 0;
        this.hE = 0;
    }
    ;
    WR360.bN.prototype.iF = function(bh, bd, jp) {
        this.bh = bh;
        this.bd = bd;
        this.aG = bd;
        this.jp = jp;
        this.hE = this.bd.css("z-index");
        if (typeof this.hE === "undefined" || this.hE == 0) {
            this.hE = 2002;
        }
    }
    ;
    WR360.bN.prototype.cD = function(bU, bB, V, es, fe, aU, H) {
        this.cA = new Array;
        this.hz = new Array;
        this.ce = new Array;
        this.bU = bU;
        this.kl = bU.startRowIndex;
        this.bB = bB;
        this.V = V;
        this.aU = aU;
        this.H = H;
        this.lB = this.bh.lB;
        this.he = this.bh.bA.settings.bg.kC == -1 ? 1 : -1;
        if (this.bh.pH != null && this.bh.pH.configFileFullScreenURL == "" && this.bh.settings.fullScreenOnClick == false) {
            this.es = this.bh.pH.dG;
            this.fe = this.bh.pH.dA;
        } else {
            this.es = es;
            this.fe = fe;
        }
        if (this.V.settings.control.hideHotspotsOnLoad) {
            this.db = false;
        }
        for (var i = 0; i < this.bB.bF.length; i++) {
            var aO = this.bB.bF[i];
            if (aO.bi.disabled == true) {
                continue;
            }
            var dj = aO.bi.id;
            var ai = null;
            if (aO.bi.renderMode != WR360.kc.bf.au) {
                ai = new WR360.aT(false,aO,this,this.H);
            } else {
                ai = new WR360.cI(false,aO,this,this.H);
            }
            this.cA[dj] = ai;
            this.hz[dj] = this.ce[i] = new WR360.jI(dj,true);
            ai.cD();
        }
    }
    ;
    WR360.bN.prototype.oy = function(aO, width, height) {
        var x = 0;
        var y = 0;
        var bi = aO.bi;
        if (aO.F.src.length > 0) {
            var hY = aO.bi.hotspotInfo.imgNoScale == false ? this.lB : 1;
            width = aO.ea() * hY;
            height = width * aO.F.height / aO.F.width;
        }
        if (bi.offset.ot()) {
            return {
                x: bi.offset.x * this.lB,
                y: bi.offset.y * this.lB
            };
        }
        switch (bi.align.horizontal) {
        case WR360.Align.LEFT:
            x = bi.margin.left;
            break;
        case WR360.Align.CENTER:
            x = bi.margin.left + (this.H.css("width").bE() - bi.margin.left - bi.margin.right - width) / 2;
            break;
        case WR360.Align.RIGHT:
            x = this.H.css("width").bE() - bi.margin.right - width;
            break;
        default:
            ;
        }
        switch (bi.align.vertical) {
        case WR360.Align.TOP:
            y = bi.margin.top;
            break;
        case WR360.Align.CENTER:
            y = bi.margin.top + (this.H.css("height").bE() - bi.margin.top - bi.margin.bottom - height) / 2;
            break;
        case WR360.Align.BOTTOM:
            y = this.H.css("height").bE() - bi.margin.bottom - height;
            break;
        default:
            ;
        }
        return {
            x: x,
            y: y
        };
    }
    ;
    WR360.bN.prototype.sx = function() {
        var sz = this.bU.sd();
        if (this.kl < sz - 1) {
            this.kl++;
        } else if (this.V.settings.bg.bounceRows == false) {
            this.kl = 0;
        }
        this.dE(this.aF);
    }
    ;
    WR360.bN.prototype.ta = function() {
        var sz = this.bU.sd();
        if (this.kl > 0) {
            this.kl--;
        } else if (this.V.settings.bg.bounceRows == false) {
            this.kl = sz - 1;
        }
        this.dE(this.aF);
    }
    ;
    WR360.bN.prototype.fo = function() {
        var dir = this.V.settings.bg.kC;
        if (this.V.settings.bg.oc == "true") {
            this.he = dir == -1 ? 1 : -1;
        } else {
            this.he = dir == -1 ? -1 : 1;
        }
        if (this.tk() == false) {
            return true;
        }
        return this.iG(this.he);
    }
    ;
    WR360.bN.prototype.eT = function() {
        var dir = this.V.settings.bg.kC;
        if (this.V.settings.bg.oc == "true") {
            this.he = dir == -1 ? 1 : -1;
        } else {
            this.he = dir == -1 ? 1 : -1;
        }
        if (this.tk() == false) {
            return true;
        }
        return this.iG(this.he);
    }
    ;
    WR360.bN.prototype.tk = function() {
        var jq = this.bU.lU(this.kl);
        var af = jq[this.aF];
        if (af.image.delay > 0) {
            if (this.sn++ < af.image.delay) {
                if (this.bh.gQ != -1) {
                    this.bh.gQ++;
                }
                return false;
            }
        }
        this.sn = 0;
        return true;
    }
    ;
    WR360.bN.prototype.rE = function() {
        this.sn = 0;
    }
    ;
    WR360.bN.prototype.ny = function() {
        this.dE(0);
    }
    ;
    WR360.bN.prototype.nC = function() {
        this.dE(this.bU.lU(this.kl).length - 1);
    }
    ;
    WR360.bN.prototype.iG = function(jG) {
        return this.dE(this.aF + jG);
    }
    ;
    WR360.bN.prototype.qo = function(label) {
        if (typeof label === "undefined" || label.length <= 0) {
            return false;
        }
        this.sn = 0;
        var sz = this.bU.sd();
        for (var sH = 0; sH < sz; sH++) {
            var jq = this.bU.lU(sH);
            for (var si = 0; si < jq.length; si++) {
                if (jq[si].image.label.toLowerCase() == label.toLowerCase()) {
                    this.kl = sH;
                    return this.dE(si);
                }
            }
        }
        return false;
    }
    ;
    WR360.bN.prototype.qB = function(label, rF, hZ) {
        if (this.pJ != 0) {
            return true;
        }
        if (typeof label === "undefined" || label.length <= 0) {
            return false;
        }
        this.bh.cJ();
        var sz = this.bU.sd();
        for (var sh = 0; sh < sz; sh++) {
            var rD = false;
            var jq = this.bU.lU(sh);
            for (var pO = 0; pO < jq.length; pO++) {
                if (jq[pO].image.label.toLowerCase() == label.toLowerCase()) {
                    rD = true;
                    break;
                }
            }
            if (rD == true) {
                break;
            }
        }
        if (rD == false) {
            return false;
        }
        if (pO == this.aF && sh == this.kl) {
            return true;
        }
        var lh = true;
        var pv = Math.abs(this.aF - pO);
        if (pv <= jq.length / 2) {
            lh = this.aF < pO;
        } else {
            lh = this.aF > pO;
        }
        var lM = this;
        var qD = function() {
            if (lM.bh.pY == false || lM.aF == pO && lM.kl == sh) {
                clearInterval(lM.pJ);
                lM.pJ = 0;
                lM.bh.eg.ji(false);
                lM.bh.pY = false;
                if (lM.aF == pO && typeof hZ !== "undefined") {
                    if (hZ != null) {
                        hZ(label);
                    }
                }
                return;
            }
            lM.rm = true;
            if (sh > lM.kl) {
                lM.sx();
            } else if (sh < lM.kl) {
                lM.ta();
            }
            if (lM.aF != pO) {
                lh ? lM.eT() : lM.fo();
            }
            lM.rm = false;
        };
        this.bh.eg.ji(true);
        this.bh.pY = true;
        var gg = WR360.by.dM(rF, 1);
        var eo = gg / jq.length * 1000;
        this.pJ = setInterval(function() {
            qD();
        }, eo);
        return true;
    }
    ;
    WR360.bN.prototype.ob = function(nh) {
        if (typeof nh !== "undefined" && nh == true) {
            return this.aF + this.kl * this.bU.sM();
        }
        return this.aF;
    }
    ;
    WR360.bN.prototype.lV = function(index) {
        var jq = this.bU.lU(this.kl);
        var kj = false;
        if (index < 0) {
            index = -index;
            kj = true;
        }
        if (index > jq.length - 1) {
            index = index % jq.length;
        }
        if (index > 0 && kj) {
            index = jq.length - index;
        }
        return index;
    }
    ;
    WR360.bN.prototype.nk = function(index) {
        var jq = this.bU.lU(this.kl);
        if (!this.rm && this.V.settings.bg.bounce) {
            if (index >= jq.length - 1) {
                return jq.length - 1;
            } else if (index <= 0) {
                return 0;
            }
        }
        return this.lV(index);
    }
    ;
    WR360.bN.prototype.fK = function(bW, deltaX, deltaY) {
        var jq = this.bU.lU(this.kl);
        var fL = jq[bW].bG;
        if (fL == null) {
            return;
        }
        if (deltaX == null) {
            deltaX = 0;
        }
        if (deltaY == null) {
            deltaY = 0;
        }
        var dC = 0;
        var cK = 0;
        if (this.bh.bA.iq()) {
            dC = this.bh.bA.aw.ep;
            cK = this.bh.bA.aw.eU;
        } else {
            dC = fL.width;
            cK = fL.height;
        }
        this.aG.css("width", dC);
        this.aG.css("height", cK);
        if (this.jr) {
            this.aG.css("margin-left", this.aU['_viewPort.x'] + (this.aU['_viewPort.width'] - dC) / 2 + deltaX);
            this.aG.css("margin-top", this.aU['_viewPort.y'] + (this.aU['_viewPort.height'] - cK) / 2 + deltaY);
            if (this.dZ == 0) {
                this.dZ = dC / this.aU['_viewPort.width'];
            }
            if (this.bh.fm - dC < 0) {
                this.bh.eL.eY = this.bh.fm - dC;
                this.bh.eL.fd = 0;
            } else {
                this.bh.eL.eY = 0;
                this.bh.eL.fd = this.bh.fm - dC;
            }
            if (this.bh.fJ - cK < 0) {
                this.bh.eL.ev = this.bh.fJ - cK;
                this.bh.eL.fM = 0;
            } else {
                this.bh.eL.ev = 0;
                this.bh.eL.fM = this.bh.fJ - cK;
            }
            this.jr = false;
        }
        this.hs(fL.src);
        if (!this.bh.eG()) {
            this.eh(bW);
        }
        this.aU['_viewPort.zoomedInX'] = this.aG.css("margin-left").bE();
        this.aU['_viewPort.zoomedInY'] = this.aG.css("margin-top").bE();
        this.aU['_viewPort.zoomedInWidth'] = this.aG.css("width").bE();
        this.aU['_viewPort.zoomedInHeight'] = this.aG.css("height").bE();
        this.hw = true;
    }
    ;
    WR360.bN.prototype.dE = function(index, deltaX, deltaY) {
        var ic = this.aF;
        var returnValue = true;
        this.aF = parseInt(this.nk(index));
        if (ic >= 0 && this.aF == ic) {
            returnValue = false;
        }
        var jq = this.bU.lU(this.kl);
        var af = jq[this.aF];
        if (this.en && af.image.cS != null) {
            if (af.bG != null && af.bG.cQ == true) {
                this.aS(null);
                this.fK(this.aF);
            } else {
                this.aS(af);
                if (!this.cX.contains(af)) {
                    this.cX.bk(af);
                    af.addEventListener(WR360.ah.eD, jQuery.proxy(this.hm, this), {
                        deltaX: deltaX,
                        deltaY: deltaY
                    });
                    af.addEventListener(WR360.ah.dU, jQuery.proxy(this.eK, this));
                    af.addEventListener(WR360.ah.fD, jQuery.proxy(this.eK, this));
                    af.hS();
                    if (af.bG == null || af.bG.cQ == false) {
                        this.bh.hc(true);
                    }
                }
                if (af.bG == null || af.bG.cQ == false) {
                    this.iM(this.aF, true);
                }
            }
        } else {
            this.iM(this.aF, this.hw);
        }
        return returnValue;
    }
    ;
    WR360.bN.prototype.aS = function(iw) {
        var bC = 0;
        if (this.cX.contains(iw)) {
            bC = 1;
        }
        while (this.cX.ds() > bC) {
            var af = this.cX.mh(0);
            if (af != iw) {
                af.removeEventListener(WR360.ah.eD, this.hm);
                af.removeEventListener(WR360.ah.dU, this.eK);
                af.removeEventListener(WR360.ah.fD, this.eK);
                af.aE();
                this.cX.removeItem(af);
            }
        }
        if (this.cX.ds() == 0) {
            this.bh.hc(false);
        }
    }
    ;
    WR360.bN.prototype.iM = function(bW, jT) {
        var jq = this.bU.lU(this.kl);
        if (this.bU == null) {
            return;
        }
        if (jq[bW].F.src.length == 0) {
            return;
        }
        this.hs(jq[bW].F.src);
        if (!this.bh.eG()) {
            this.eh(bW);
        }
        if (jT) {
            this.hw = false;
        }
    }
    ;
    WR360.bN.prototype.kg = function() {
        if (this.ce != null) {
            for (var i = 0; i < this.ce.length; i++) {
                this.ce[i].Visible = false;
            }
        }
    }
    ;
    WR360.bN.prototype.eh = function(bW, aX) {
        if (!this.db) {
            this.nT();
            return;
        }
        if (this.aG.is(":visible") != true) {
            var bn = this;
            setTimeout(function() {
                bn.eh(bW, aX);
            }, 400);
            return;
        }
        this.kg();
        if (!this.bU) {
            return;
        }
        var jq = this.bU.lU(this.kl);
        var af = jq[bW];
        if (!af) {
            return;
        }
        for (var i = 0; i < af.image.bF.length; i++) {
            var al = af.image.bF[i];
            if (al != null) {
                var ai = this.cA[al.source];
                if (ai != null) {
                    ai.eC(this.aG.css("left").bE() + this.aG.css("margin-left").bE() + al.offsetX * (this.aG.css("width").bE() / this.es));
                    ai.fv(this.aG.css("top").bE() + this.aG.css("margin-top").bE() + al.offsetY * (this.aG.css("height").bE() / this.fe));
                    ai.aH(true, aX);
                    this.hz[al.source].Visible = true;
                }
            }
        }
        this.nT();
        this.kQ();
    }
    ;
    WR360.bN.prototype.nT = function() {
        for (var i = 0; i < this.ce.length; i++) {
            var bi = this.ce[i];
            if (bi !== undefined && bi != null) {
                var ai = this.cA[bi.Id];
                if (ai != null) {
                    var aO = ai.aO;
                    if (aO != null) {
                        ai.nT();
                    }
                }
            }
        }
    }
    ;
    WR360.bN.prototype.kQ = function() {
        for (var i = 0; i < this.ce.length; i++) {
            var jg = this.ce[i];
            if (!jg.Visible) {
                this.cA[jg.Id].aH(false);
            }
        }
    }
    ;
    WR360.bN.prototype.kM = function(duration, left, top, marginLeft, marginTop, width, height) {
        if (!this.db) {
            return;
        }
        var jq = this.bU.lU(this.kl);
        var af = jq[this.aF];
        for (var i = 0; i < af.image.bF.length; i++) {
            var al = af.image.bF[i];
            if (al != null) {
                var ai = this.cA[al.source];
                if (ai != null) {
                    var aO = ai.aO;
                    if (aO.bi.renderMode != WR360.kc.bf.au) {
                        ai.bb.animate({
                            left: left + marginLeft + al.offsetX * (width / this.es) - ai.lX() / 2,
                            top: top + marginTop + al.offsetY * (height / this.fe) - ai.lT() / 2
                        }, duration);
                    }
                }
            }
        }
    }
    ;
    WR360.bN.prototype.lx = function(aX) {
        for (var i = 0; i < this.ce.length; i++) {
            this.cA[this.ce[i].Id].aH(false, aX);
        }
        this.bh.R = false;
    }
    ;
    WR360.bN.prototype.hs = function(src) {
        this.bd.attr("src", src);
    }
    ;
    WR360.bN.prototype.bo = function() {
        var aI = new Array;
        for (var i = 0; i < this.ce.length; i++) {
            var bi = this.ce[i];
            if (!bi) {
                continue;
            }
            var aN = this.cA[bi.Id];
            if (aN instanceof WR360.aT) {
                aI.push(aN.mv());
            }
        }
        return aI;
    }
    ;
    WR360.bN.prototype.ActivateHotspot = function(dj, timeout, hZ) {
        var aN = this.cA[dj];
        if (aN instanceof WR360.aT) {
            aN.eb(timeout, hZ);
        }
    }
    ;
    WR360.bN.prototype.op = function(dj) {
        var aN = this.cA[dj];
        if (aN instanceof WR360.aT) {
            aN.gY(true);
        }
    }
    ;
    WR360.bN.prototype.qb = function(dj, isHide) {
        var cA = this.cA;
        var aN = cA[dj];
        if (aN instanceof WR360.aT) {
            aN.pZ(isHide);
            this.fP();
        }
    }
    ;
    WR360.bN.prototype.qG = function() {
        for (var i = 0; i < this.ce.length; i++) {
            var bi = this.ce[i];
            if (!bi) {
                continue;
            }
            var aN = this.cA[bi.Id];
            if (aN instanceof WR360.aT || aN instanceof WR360.cI) {
                aN.pM();
            }
        }
    }
    ;
    WR360.bN.prototype.lO = function(e) {
        this.db = true;
        this.eh(this.aF, true);
        this.bh.ih(true);
    }
    ;
    WR360.bN.prototype.mo = function(e) {
        this.db = false;
        this.lx(true);
        this.bh.ih(false);
    }
    ;
    WR360.bN.prototype.fP = function() {
        this.eh(this.aF);
    }
    ;
    WR360.bN.prototype.hm = function(e, offset) {
        if (e.af == null) {
            return;
        }
        this.cX.removeItem(e.af);
        if (this.cX.ds() == 0) {
            this.bh.hc(false);
        }
        if (!this.en) {
            return;
        }
        e.af.removeEventListener(WR360.ah.eD, this.hm);
        e.af.removeEventListener(WR360.ah.dU, this.eK);
        e.af.removeEventListener(WR360.ah.fD, this.eK);
        if (e.af.index != this.aF) {
            return;
        }
        this.fK(this.aF, offset.deltaX, offset.deltaY);
    }
    ;
    WR360.bN.prototype.eK = function(e) {
        if (e.af == null) {
            return;
        }
        this.cX.removeItem(e.af);
        if (this.cX.ds() == 0) {
            this.bh.hc(false);
        }
        e.af.removeEventListener(WR360.ah.eD, this.hm);
        e.af.removeEventListener(WR360.ah.dU, this.eK);
        e.af.removeEventListener(WR360.ah.fD, this.eK);
    }
    ;
})();
(function() {
    WR360.sY = function() {
        this.sZ = false;
        this.label = "N/A";
        this.rN = "WebRotate360";
        this.rs = "ga";
        this.rz = null;
        this.hW = null;
    }
    ;
    WR360.sY.prototype.cD = function(viewName, sZ) {
        if (viewName.length > 0) {
            this.label = viewName;
        }
        this.sZ = sZ;
        if (this.sZ == false) {
            return;
        }
        var sb = "GoogleAnalyticsObject";
        var ga = window[sb];
        if (typeof ga !== "undefined" && ga.length > 0) {
            this.rs = ga;
            this.rz = window;
        } else {
            ga = window.parent.window[sb];
            if (typeof ga !== "undefined" && ga.length > 0) {
                this.rs = ga;
                this.rz = window.parent.window;
            }
        }
        if (this.rz == null) {
            if (typeof _gaq !== "undefined") {
                this.hW = window;
            } else if (typeof window.parent._gaq !== "undefined") {
                this.hW = window.parent;
            }
        }
    }
    ;
    WR360.sY.prototype.Event = function(action, value) {
        var rJ = false;
        if (action == WR360.sY.rU.sG) {
            rJ = true;
        }
        if (this.sZ == true) {
            if (this.rz != null) {
                this.rz[this.rs]("send", "event", this.rN, action, this.label, value, rJ);
            } else if (this.hW != null) {
                this.hW._gaq.push(["_trackEvent", this.rN, action, this.label, value, rJ]);
            }
        }
    }
    ;
    WR360.sY.rU = {};
    WR360.sY.rU.ZOOM = "Zoom";
    WR360.sY.rU.rQ = "Playback";
    WR360.sY.rU.sP = "ArrowNavigation";
    WR360.sY.rU.FULLSCREEN = "Fullscreen";
    WR360.sY.rU.sk = "HotspotsOnOff";
    WR360.sY.rU.rC = "ImageGrab";
    WR360.sY.rU.rW = "ImageHover";
    WR360.sY.rU.sG = "ViewerLoaded";
    WR360.sY.rU.sc = "ViewerReloaded";
    WR360.sY.rU.te = "HotspotPopup";
    WR360.sY.rU.rR = "HotspotAction";
})();
(function() {
    WR360.bs = function() {}
    ;
    WR360.bs.prototype.cD = function() {
        var self = this;
        jQuery(".wr360embed, .wr360embed-cdl").each(function() {
            var data = self.ed(this);
            var cF = "wr360_" + data.name + "_playerid";
            if (data.fsclick == true) {
                var existingId = jQuery(this).attr("id");
                if (existingId && existingId.length > 0) {
                    cF = existingId;
                } else {
                    jQuery(this).attr("id", cF);
                }
            } else {
                var am = jQuery("<div id='" + cF + "' class='wr360_player'></div>");
                jQuery(this).append(am);
                if (data.background.length > 0) {
                    am.css("background-color", data.background);
                }
            }
            var r = WR360.ImageRotator.Create(cF);
            r.settings.configFileURL = data.xmlfile;
            r.licenseFileURL = data.licfile;
            r.licenseCode = data.lic;
            r.settings.graphicsPath = data.graphics;
            r.settings.googleEventTracking = data.events;
            r.settings.responsiveBaseWidth = data.basewidth;
            r.settings.responsiveMinHeight = data.minheight;
            r.settings.eventTrackingAlias = data.name;
            r.settings.rootPath = data.rootpath;
            r.settings.fullScreenOnClick = data.fsclick;
            r.settings.inBrowserFullScreen = data.browserfs;
            r.settings.crossDomainConfigLoader = jQuery(this).hasClass("wr360embed-cdl") ? true : false;
            if (data.onready.length > 0) {
                var fn = window[data.onready];
                if (typeof fn === "function") {
                    r.settings.apiReadyCallback = fn;
                }
            }
            if (data.onprogress.length > 0) {
                var fn = window[data.onprogress];
                if (typeof fn === "function") {
                    r.settings.progressCallback = fn;
                }
            }
            r.runImageRotator();
        });
    }
    ;
    WR360.bs.prototype.ed = function(hk) {
        var data = jQuery(hk).data("imagerotator");
        var defs = new WR360.jQ;
        data.name = this.bv(data.name, (new Date).getTime());
        data.licfile = this.bv(data.licfile, "license.lic");
        data.lic = this.bv(data.lic, "");
        data.graphics = this.bv(data.graphics, "https://cdn.webrotate360.com/lib/imagerotator/graphics");
        data.events = this.bv(data.events, defs.googleEventTracking);
        data.basewidth = this.bv(data.basewidth, defs.responsiveBaseWidth);
        data.minheight = this.bv(data.minheight, defs.responsiveMinHeight);
        data.rootpath = this.bv(data.rootpath, defs.rootPath);
        data.background = this.bv(data.background, "");
        data.onready = this.bv(data.onready, "");
        data.onprogress = this.bv(data.onprogress, "");
        data.fsclick = this.bv(data.fsclick, defs.fullScreenOnClick);
        data.browserfs = this.bv(data.browserfs, defs.inBrowserFullScreen);
        return data;
    }
    ;
    WR360.bs.prototype.bv = function(param, ez) {
        if (typeof param === "undefined" || param.length <= 0) {
            return ez;
        }
        return param;
    }
    ;
})();
(function() {
    WR360.fH = function(bV, aO, H) {
        this.aB().constructor.call(this);
        this.bV = bV;
        this.bh = bV.bh;
        this.dv = null;
        this.gM = null;
        this.gS = null;
        this.iX = WR360.by.ge();
        this.H = H;
        this.eV = null;
        this.aO = aO;
        this.hotspotInfo = aO.bi.hotspotInfo;
        this.sT = 0;
    }
    ;
    WR360.fH.aK(WR360.dh);
    WR360.fH.prototype.iL = function() {
        this.dv = jQuery("<div class='hotspot_rollover lightbox_rollover " + this.aO.bi.id + "_rollover" + " wr360rollover_" + this.bV.bh.oY + "' id='" + this.iX + "'/>").appendTo(this.H);
        if (this.aO.F.src.length > 0) {
            this.gM = jQuery("<div class='img_wrap'></div>").appendTo(this.dv);
            this.gM.css("background-image", "url(" + this.aO.F.src + ")");
            this.gM.css("background-color", this.hotspotInfo.imgBkColor);
            if (this.hotspotInfo.lbxShowClose == true) {
                this.gS = jQuery("<div class='closelbox'></div>").appendTo(this.dv);
                this.gS.fI(jQuery.proxy(function(event) {
                    this.lw(event);
                }, this));
            }
        }
        if (this.aO.bi.hotspotInfo.cdata.length > 0 || this.aO.bi.hotspotInfo.txt.length > 0) {
            var hn = jQuery("<div class='img_title'></div>").appendTo(this.dv);
            var ao = jQuery("<div class='usr_text'></div>").appendTo(hn);
            if (this.hotspotInfo.cdata.length != 0) {
                ao.append(this.hotspotInfo.cdata).addClass("hotspot_cdata");
            } else {
                this.kr(hn, ao);
                ao.html(this.hotspotInfo.txt.nA());
            }
            ao.find("a").fI(jQuery.proxy(function(event) {
                this.ib(event);
            }, this));
        }
    }
    ;
    WR360.fH.prototype.kr = function(hn, ao) {
        if (this.hotspotInfo.css.length == 0) {
            return;
        }
        ao.attr("style", this.hotspotInfo.css);
        var kh = "background-color";
        var mB = "text-align";
        hn.css(kh, ao.css(kh));
        ao.css(kh, "none");
        hn.css(mB, ao.css(mB));
    }
    ;
    WR360.fH.prototype.jw = function() {
        this.iL();
        if (this.hotspotInfo.lbxClickActive == true) {
            this.dv.fI(jQuery.proxy(function(event) {
                this.mb(event);
            }, this));
            this.dv.css("cursor", "pointer");
        }
        this.dv.mousedown(function(e) {
            e.stopPropagation();
        });
        this.dv.mouseover(function(e) {
            e.stopPropagation();
        });
    }
    ;
    WR360.fH.prototype.jl = function(cU) {
        if (this.dv.is(":visible") == true) {
            return;
        }
        if (this.hotspotInfo.lbxBackCover == true) {
            this.gM.css("background-size", "cover");
        } else {
            if (this.aO.F.width > this.H.width() || this.aO.F.height > this.H.height()) {
                this.gM.css("background-size", "contain");
            } else {
                this.gM.css("background-size", "auto");
            }
        }
        this.eV = cU;
        this.dv.fadeIn(300, jQuery.proxy(function(e) {
            this.jY(e);
        }, this));
    }
    ;
    WR360.fH.prototype.cN = function(aX, aq) {
        if (this.dv.is(":visible") != false) {
            if (aX == false) {
                this.dv.hide();
                this.iY(null);
            } else {
                this.dv.fadeOut(400, jQuery.proxy(function(e) {
                    this.iY(e);
                }, this));
            }
        }
        aq = aq !== undefined ? aq : false;
        this.dispatchEvent(new WR360.Event(WR360.aT.Events.mI,false,false,aq));
    }
    ;
    WR360.fH.prototype.ib = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var link = jQuery(e.target).attr("href");
        if (link === undefined || link.length == 0) {
            this.mb(e);
        } else {
            if (this.bh.gD() == true) {
                this.bh.sm.Event(WR360.sY.rU.rR);
            }
            var target = jQuery(e.target).attr("target");
            window.open(link, target === undefined ? "_self" : target);
        }
    }
    ;
    WR360.fH.prototype.mb = function(e) {
        e.stopPropagation();
        e.preventDefault();
        var pU = this.aO.cv(this.bV.bh);
        if (pU == true) {
            return;
        }
        this.cN(true);
    }
    ;
    WR360.fH.prototype.lw = function(e) {
        e.stopPropagation();
        this.cN(true);
    }
    ;
    WR360.fH.prototype.jY = function(e) {
        this.sT = Date.now();
    }
    ;
    WR360.fH.prototype.iY = function(e) {
        if (this.sT != 0) {
            if (this.bh.gD() == true) {
                this.bh.sm.Event(WR360.sY.rU.te, Date.now() - this.sT);
            }
            this.sT = 0;
        }
    }
    ;
    WR360.fH.prototype.iI = function(eJ) {
        if (this.dv.is(":visible") == false) {
            return false;
        }
        return WR360.by.fA(this.dv, eJ);
    }
    ;
    WR360.fH.prototype['delete'] = function() {
        this.dv.unbind();
        this.gS.unbind();
        this.dv.remove();
    }
    ;
})();
(function() {
    WR360.by.mG();
    var hT = false;
    var jR = true;
    document.ondragstart = function() {
        return false;
    }
    ;
    jQuery(window).on("beforeunload", function() {
        jQuery.each(lH.ew, function() {
            if (this.av) {
                this.pR(null);
            }
        });
    });
    jQuery(window).resize(function() {
        jQuery.each(lH.ew, function() {
            if (this.or == true) {
                this.pS();
            }
        });
    });
    function ra() {
        jQuery.each(lH.ew, function() {
            if (this.loaded) {
                this.qn();
            }
        });
    }
    jQuery(document).ready(function() {
        hT = true;
        if (typeof lH === "undefined" || typeof lH.ew === "undefined") {
            return;
        }
        var ii = new WR360.bs;
        ii.cD();
        jQuery.each(lH.ew, function() {
            this.jy();
        });
    });
    var ko = "ECAwQFBgcICQAB";
    var fp = "";
    WR360.jX = function() {
        this.eY = 0;
        this.ev = 0;
        this.fd = 0;
        this.fM = 0;
    }
    ;
    WR360.ImageRotator = function(cR) {
        this.aB().constructor.call(this);
        if (cR != null && cR.length > 0) {
            this.cR = "#" + cR;
            this.oY = cR;
        }
        lH.add(this);
        this.settings = new WR360.jQ;
        this.fm = 0;
        this.fJ = 0;
        this.iR = 0;
        this.dO = 0;
        this.ei = 0;
        this.hl = false;
        this.rI = false;
        this.nX = false;
        this.cp = 0;
        this.ha = 0;
        this.hg = 0;
        this.qe = 0;
        this.eu = false;
        this.eS = 0;
        this.eO = 0;
        this.ri = false;
        this.nJ = 0;
        this.kU = false;
        this.pY = false;
        this.oS = false;
        this.bU = null;
        this.bB = null;
        this.eE = null;
        this.eP = 0;
        this.dG = 0;
        this.dA = 0;
        this.loaded = false;
        this.viewerBackgroundColor = "";
        this.bA = new WR360.gl;
        this.nL = "";
        this.configFileFullScreenURL = "";
        this.fN = "";
        this.gf = "";
        this.rootPath = "";
        this.cq = null;
        this.toolbar = new WR360.Toolbar(this);
        this.dV = false;
        this.reloadImageIndex = -1;
        this.reloadRowIndex = -1;
        this.aU = new Array;
        this.dn = false;
        this.qY = true;
        this.R = false;
        this.bd = null;
        this.jp = null;
        this.jW = 0;
        this.jt = 0;
        this.eL = new WR360.jX;
        this.bV = new WR360.bN;
        this.fs = 0;
        this.fX = 0;
        this.db = true;
        this.fu = false;
        this.jo = true;
        this.or = false;
        this.av = false;
        this.reloadCallback = null;
        this.ok = null;
        this.sm = new WR360.sY;
        this.rK = 0;
        this.sI = 0;
        this.rZ = 0;
        this.fY = 0;
        this.gb = null;
        this.bp = null;
        this.fl = 0;
        this.ak = 0;
        this.aV = 0;
        this.fq = 0;
        this.oa = 0;
        this.pp = 0;
        this.O = 50;
        this.eo = 500;
        this.gy = 0;
        this.gQ = -1;
        this.bw = 300;
        this.licenseFileURL = "license.lic";
        this.licenseCode = "";
        this.cr = null;
        this.cZ = null;
        this.oV = false;
        this.fT = true;
        this.fQ = false;
        this.pL = true;
        this.eg = null;
        this.dN = null;
        this.bY = null;
        this.qZ = null;
        this.hB = false;
        this.bS = false;
        this.ey = false;
        this.gT = false;
        this.bM = false;
        this.qX = false;
        this.lB = 1;
        this.gu = "rdVd3lrjF/EFcxKccvguE5TGmYpDXz16dn3CLv2qNR7fcnEECgg7ebiZEA==";
        this.oD = "i8ujXOfyQKsb0ntiQLRJNqDYT9/9OTL6lvTpPB41YFAxMZ9Rt1pBpA==";
        this.hV = "pEObvaqAslGmqYSI1iZngQ3MF/Ar3ZGxZ78TLJ1LZW4kqxU0";
        this.pD = "ohtdbI/Ul1vCoSNkyoMEAlSUbVOqLNdSbs9XJPekPzilsNp6DFHMI/E=";
        this.qN = "WXau8tyNHUiBQE1xmrkAdTYP/ZKx+Vu92rRIkbli1cMxbsyz";
        this.gF = "RamEB6nl1dIeNBEZm7QDsOVb3dGGYWkwNVHWuvJ94wp9G3vW5SHvOOlX44oxMBX7X1vxUANM+tmDqjoqhA==";
        this.ju = "GlSkJBzsD5RcCjrwLEVCJ7mIFwJDyCqGGD5NdA==";
        this.bc = "I13W8RlKe6Yayl4GlxmUeikOpnYC2f+670yXu72y7idNN0j795CD7MjrbQHnCttCWNIRfqtetvfZdjtFHMv9B7N/svehVJIIBsyUikJiMwEb6x2IQ4F8Ue4S76ECejNSntsUyU13oKS5AbEC9I2fJPKiAN7Oq0L1wpWA/3ScM3QEsWCdWBJB6g/BFwhPLtUawmtmb254VB7usOdolJ7j/rE8Pto5WyJpPFwNzdADjNTMQYwO0ruTgFdxUcI7IPnU3UxU49p+VNyE+NNU8agNqu+ja5effa3g9YNRg8MFGXE4uzKOr/s=";
        this.ap = "pmuBtCy0JoqL8AqvfsdLp7NbUBIFSFSHA/hjzT60rFMcQZGaXjIvVG+PwebPexdTRRFhyH/8IrTen6fzgGtVnycjCxmpPvwvFrxqmS1BUPc38AiMjyJA+wcPoTqnhL1YZOfCkjvQOuafTER2Kuvy09Xw9ObUwJqTP3Bh7nxnMsu/O3tM12gTkg/MHR3c488+qMyNHGh52KogLg/RrlY8EFSlf35VhJrvqCG6PBfGaspU57NOPDpbzwVi2d06gG4rBxa3CA4FsOTfOwxsb+L2yYc54X43e8NT";
        this.aY = "gLXFo2OyFFajJLgDCn5XLL+N71QzGlT6B6SRJw9wR6kFt1YpKgjqYwA=";
        this.bj = "U9qFtDJ21PC9rzk1zcXKJ0aTTb0z7Ojb48ynUZ6BaTrthixUOunP6ZM=";
        this.aQ = "6WRVZbWJBZrmjJ4O+gNBk4awRfKJaHfVd0ucq/Be49pmSPS3hN04UyU=";
        this.hq = "6y7SGSlWes9q2IflC0eN1zTVBe9uUxRIOSAOy+QcMxxjyZdMB+OxqajaTiKOp4X050n1TJPtrKAIERK/AO9Fu308PzrUdhCvmnWRGOcuAGvN3yVXz1SHb2H3nNDE1VOZYFISzEfFxj8+fFdHZ+b4iDk6fpEr8+ZTg+uKy6QsPicLWV8K+ETe5jEHKX1ep+FYyu9izHmUzDexvD385DVbdc7j5bbjIQuGNqhscjYT/GSgtM37tQ+oRp7EQ1R96utA08g1TrAXvwzOCn6WBa5IqwXECkpg7K7f/4M5YBLGvdWWoYoOH/QjSQLGnhQcHW5S6LsSk0Sz9IIoYrmoDtAdfdSRN2CLid5b3c3oS+OWfBaDB6ZhKZRsmKZGmXbZfgxc3JTeUETN6WTZQCGukrbQd0QPoCA/Ml6vFzttVBaSBwi8+VdwOP4XUI3NSHTe2bn5nfXIbOZ0iOb4d9TW/vLrBg9hnoOR53m6obVoMh9zTblKSaHDY1dWjwgDCbwwrOcz1e6ulr33vweOPUZkbJWJLJXiPnPenDGNuPdgNItBy0PI/7w2cA89IYexKc8JruWjwV+AnObhr7FJyA2Zgw0Fg52SRxEr2NogPfBEd+/fv7APlCfs16r2FpnfkuPKufyBMzWNG8xCwtdoweQu+w15lj5ZPlG94GsENbX/XstHR90za3xBs0zgmjV1fNLdYfGxdGHwlmV83SI2tdUmPw8Uw8Cyh/9Yg3MByVCfZyIO3aBpjPnIihzkFXVTdMtJUgcWZy/8jVo5/zmlWHGeQa8hTcHS1Wex8BTRORKFYR33GVrwVzQNPeZ/GtFDm4hfq9G/E07XmrCVlgq7Wl3v4u+8mfKvir+bLHIhd6dBhEr5hnZNECCOygYm+G/G55p0YbxCJwLrimKpTwqcY5idt34WEzi9daPCXj6Ctc4+HNHuU4StY766CAhD4Dz4eJyczxqjFOsHTWfCGC+aPDYFmWoLYwiz+eyih+JRwRECWdkpePVqOzMjxbTZZeIt5gNzatM50ZzYnMFsrTlxTFgyOtrm1/Y9F5mx04qT2rrN1wG6Iensg8ByPikttMtiU25+4QTWupU7aJ7LTIs/TU/4RYLfbTszGuTiOgrpSchT8LaOtQcm7gYMF0km+wMFSkg5hEOLUxJoupWzIgazI2UVGXUoDUsmCn/z6eFqhaDeDVsJablJzatmwBOtObZdOYfL9RjNYQ4KuGnrf6BUrgFp7GbdNtsuwMZQ+BG/hThvZx3fPjcyVRzlBcXXuoIYZaMA7F8xH/GN12m29NtzagISdluoX/+sSL3IiBcP4LqRu2crai/Q2zZUEM5p7ETTcLA8Stfi946Aplfv+lPVoRWTK0koCbbErn9+bK9gYW5JWmpkBaETbhjv43kTHmKL+qoyHxNrcWFTNTGeKuG4e/tRyvWikxP2uIz9GUe3evTtp0TuofIr5WRIwk+po9qL3p5upw+qMfvVQ6PdJFm4jmVvfUWFujXEfbJBZw9a7aHMWWAclOVzr0rY2VYUzeavdLoVFDKa26KwD8XRsJUiVwUyVcuXD2GzXTyqCFj9V89XZP2f/LgEOOBowKGueZXbKCguN1xbq7qBRtkx4KlgHEMqdNOHjbtkhD51QPdiPWyAKhD/VckKo7v9u/yG34gsTpou3adPN/BBDvBu+qz6In6oj2S4bvF0HUEOB4Rrr9Sd9L6bxTM+xF2GuwBRXV1SsWb4V5xICvyEUXU=";
        this.cl = "Lry6mt1Er3KgdvDjSqztJMzw8wHNLfeCLQIJ";
        this.cB = "2+lMNTNVifwdgdpXfSXjH+M4KoHd0xgNcw==";
        this.ay = "QNwfbJZzxJbLJoAS6wD5rjfHAwo=";
        this.eN = "nULFbgdXOAsnDyopPfu7L0d0NtZ5uMg+AA==";
        this.eQ = "4UVPbHd7uENiUDjx+NgOOXMkA9nZbGalFg==";
        this.ft = "wCGtg+3u3OfUBYPdq/af6ZVoYJ7/UddZbmK1Zw==";
        this.iO = "sU1SxZ+bTWPPsst0n2G3qVvXmytz72GF/Dk7IouwuME=";
        this.gZ = "yEvByyFGwPn9PODQyazu6d22IbKQKoUYm0puGAnoKLbaWmrieWizccI4EOouWWN4lHyq/MPudc9xTPClmSInstXxtQ==";
        this.pr = "rDRrdT/G3CyWJhlFPwJyqargFHqHSCgKoUMu3HDGhxn7WohEA1YONuK2TagGaNDqG8vk2Z7RQ7WLc3ZWG8L0mOstNa/bYPwAKhefJqWqoSJnQ1i6myiTb8fStXxQR9ptNBlonx9ez4seVsruQea7mLfWlfFPH7rus+XJepIsSrTTh4v6GiYq1xkcCHSwEK6cEHGm09Leu2MQRCiRQ8U7zGCQjcdS9Xsj0/XDmsVyPW2Kk9EblA4atSsaaxnAiyxX/SZEnbn3L/cPI0AqMGWumQBN+kDQYr9Ez5H3aVhMIyKE0JCD/8NfLpSvSVP/XnzvFdFdpORN7xW7z4iiR683ef+wu4CsNyVYpDIe6rpupAFcsv8uXOuzXyfI67HfvIWNYMD8iZD/whCQ3AEh2u7TCIUoI6L4gw==";
        this.oG = "XOwh26ByinkEBUnj6JYyAyG6Pogtg8f5ZIeHJwEuLX3zRu/HhwD8pXT4p3rMXhURL06HWGS+mRJED6xdIPObueNhlPDsnAA+Jp+xVBwlDfqEeQ3gQZhbTJK7Tsc6uDVhE3JlkB6+PUEDdTBq1zaWJgpGWPkJFmAFM0lcAyeEY4L75+M4wgYVmOOXesWfVFlWlJgx9j6RqhvlgwrOmo6UwNLU/sqsxK7dQw1vKslg3qYko6saw9snTERvFoCfy4/JBdLtWPYkEgFu7OAbWUjTXfPQvuSNCBMYxfHJEU5/sGlqPhlFPbIdM6IogZbtGxoHMi7DPPl7XxhGDeJVu47VZqggct/pXoq6m30yK8BA3lp3fsDpFOzWyzZvhbqkqNVE2KIxFXL4aG+TWVRqjDfhMvYv5662n0HfQyvVhI3ViyE6eNSXUmo0cSDdCH+s5fcq20G2vKS0QLAXUUVO966s+2VxCN+4/M1N0ZgkbnaSHQ92M9gPbQZqstX7VCXXUuT9cWYmNnogsrJoXtp+C3eaTsyr+A7Psjc6hJzoHLwW9W0Qd69RiHH4WwOi/H4H77pMJOI1ux46B9QGKMJglscX9j0dam1+Lw==";
        this.pf = "Xj/4NHvML4pcsq3MvkaM3AhqEAHI30bVi+sjPrV7rQ==";
        this.nF = "74jKbQgCCCSweCxY5xm3RfzymxqRs40kgKxSqA==";
        this.po = "aejT9R7nMP19KhITxmBxBaOBaJgGqR6+y4ZzYDYmBTjUY7nw7TGGm7Hp438XllTR";
        this.oz = "A8qo8fCMEFHG785164bZu5KlOzaZbE/92zINLNcQ+c2z+PBCNSRT/nkAObS7v9HLu3KzZR0=";
        this.nB = "v8yhMDISy8CQJF073b9a6xB2lMix";
        this.oO = "4IIhiEFPgpBJmPziEDdMl+hEws/AK+6ACB9P";
        this.hU = "7qR/XVEBpg/aWMbNx0dxYeet6ZZ/1A8NbCZRJ2+GgSuulVwMtOWtN9GlvXNu+Gy+LTPOiGhAK91uTK0AdScjX49Uvd++aleCNQ3mXK5DqqsopNEdlJKUDLkh1IIobHvW2yjORI0x/A0SVGIEjZMwBHb6ix1Y8gll/YbObgJRXfYbUuorCLyywROZMlEuB0dkVtRQVv24Zbz1RheXbhLnc1ELk++xAFfTNbgCGSwprUoeITRS/6D1cOXni+D5s3H5GO3X7cB7yjipUqaON6YoxILYqylPTTQsrqvr5XbZX5bSG+TL27i7jFCAFoIm170iytoVGGb2C2ZNMCW71Q4TL+kac3jEICKB57VmQlXlJGS8zCcMpUXpqZKG82vYJ7FreST2xOjOwd/d0Su2QWvTCgl8SiOxhW1odZ9lhb77dmMg6UmNmccvcpbG+RlgOKyR+4SN3PHlvT05i21KbTjxUDQhKNKqdyTi5GZr+a42WwXOpLTM1W/fsCzbbX3sD4COOgL3tgg4a+zDBOHQ/1NhtTsUYKLju2E16dWnl4N/g43lAT8MvJ8NQWMgvZ/+GEAPD4vxWysRaIgQFEVqEznGP8eXWjn+nOCXYQ0T1uD8IER+KWDxpDy7E1/Ngugb24TZpPBWUJ3xkVqlRm4DL9+RJ9OOzPhE3WB5AaC/4SQmwMkVR6ArBMgIVl8HGXHPjPVRonZ+da0/mPU1ecEWoACSJ0t+cqlfQ9+gPBRVYeBvzQQ5V2ChbmpwMeatJg3FF2b7ya7VgXBthk8tiqbMxEb8R9OJh2l0Hy9/5y3uwIHbPS3591UlRgFsNXPsqehQCP036Ps1RksCO/FW7hchEkKskrz/iwmw808Y/pu/Lb7HrnKMvGsCUnH5a218dLv77JdKD0SoZzAzwTRXySNQ+ugZ74Cd/4SrzS3tSi61qgsf0WTdBCa71HiKifRyvXrkl7YcvJQCtsmiLjWPiiQHkL+wxgAQmSim/2/ca8LihsrqOIK6cqHnJKBTd3sViif0Mt3aIID92n0H7Div+0mXut9dOISUMb/VOhTHnGuvQBL/Out/yBTEPog6ZJDpQPJyrNf7f/5AwIgcZym4UjaddB/EVxgnizPg+Tmg5JKgPEf3V4rWK6f98NT6xguMQrEInMScBszhO1x4zWCaAL/fB//0TgdPA5JF3a+aYgyQwszHnswR+gud5vq+YsqvMUBVzYRH5DznAdyhJKn089twvv4p9eFfrf+ZzzP3lkqWqBvfN28lV1MssQpOt4xDParY6fg1i9smVsLS3JooBWx80vy8KpNstWRP9AYtoY70pAZWpoU3a12RguJp8iExpjY+ZNr7a32XEUuxqHYD1SEPhQlt23x5dj6m56crFqijbxBabvTqD0ejYsvY99FgpzucZSpd4p82Ar6vJgGFVPbKJHKqnCdjzHqz8Q8LTEmVDo7iK2zB7YY9eb+hP54hKD4/8eaZh/P/4jP9KtjViwEk9rkYLSvDWu9TjZqQrgLjs6OWJjRUEMKUigeDPqIllAMulEvtqSuvAkwV/X9JBXzpu9RmkphbZ686pUGwSutmWZqv1e55jMD4qeRntcNn/3+lVC4t6bVTXCLt931oNKRel6DVPu5ifUuUBY21rmcqrI61bE9+9YDh2z5tgTi0tO8AuGBOQJsqvEH9Yhox0WbYONFoyGX+LBNJR5dNLlsw2yRCKm1qrEGioj3T0LWnf0rz9rTNRvbVwmFScDFvR3SVoppSHgfeoquVJpAWEq2wbfp+l3Oz8MpUhyxQEktTn8czZHHiV37Ufj0W+6lAIiTxmR1PpdFVwzm2iyUP07JcQcuWexRSmamyzIqPTU87rgbQC6n7+5FZsy1bG39PL4FN7EGHcKHhQJ+XrXDyycj8yc7v7UfTQsqlxVPowr6YaOizCH685vwlRF/0wwxpb+PHCD0=";
        this.pi = "mJgNlTEGtveYiNQvknk723yoaeTP8laCEZEoePk79YPL1hM3QFoUJ48sBi1xFeiKxJs36ZgRjNUN91RVSkZ2xsjzhFcmhGT8F8E993dIJrLP8S0rnSqH";
    }
    ;
    WR360.ImageRotator.aK(WR360.dh);
    WR360.ImageRotator.Events = {};
    WR360.ImageRotator.Events.IMAGE_ZOOM = "IMAGEROTATOR_API_IMAGE_ZOOM";
    WR360.ImageRotator.km = 4;
    var oH = false;
    WR360.ImageRotator.Create = function(cR) {
        if (!oH) {
            var nf = lH.get(0);
            if (cR != null && cR.length > 0) {
                nf.cR = "#" + cR;
                nf.oY = cR;
            }
            oH = true;
            return nf;
        }
        return new WR360.ImageRotator(cR);
    }
    ;
    WR360.ImageRotator.kR = function() {
        if (fp.length > 0) {
            return fp;
        }
        fp = kP + ko + kZ;
        return fp;
    }
    ;
    WR360.ImageRotator.prototype.bm = function() {
        if (!jR || this.bM == true) {
            return;
        }
        var ns = WR360.ImageRotator.kR();
        var bQ = ac.fk.bL(ns);
        this.gu = ac.G.aD(this.gu, bQ);
        this.oD = ac.G.aD(this.oD, bQ);
        this.hV = ac.G.aD(this.hV, bQ);
        this.pD = ac.G.aD(this.pD, bQ);
        this.qN = ac.G.aD(this.qN, bQ);
        this.gF = ac.G.aD(this.gF, bQ);
        this.ju = ac.G.aD(this.ju, bQ);
        this.bc = ac.G.aD(this.bc, bQ);
        this.ap = ac.G.aD(this.ap, bQ);
        this.aY = ac.G.aD(this.aY, bQ);
        this.bj = ac.G.aD(this.bj, bQ);
        this.aQ = ac.G.aD(this.aQ, bQ);
        this.hU = ac.G.aD(this.hU, bQ);
        this.cl = ac.G.aD(this.cl, bQ);
        this.cB = ac.G.aD(this.cB, bQ);
        this.ay = ac.G.aD(this.ay, bQ);
        this.eN = ac.G.aD(this.eN, bQ);
        this.eQ = ac.G.aD(this.eQ, bQ);
        this.ft = ac.G.aD(this.ft, bQ);
        this.iO = ac.G.aD(this.iO, bQ);
        this.gZ = ac.G.aD(this.gZ, bQ);
        this.pr = ac.G.aD(this.pr, bQ);
        this.oG = ac.G.aD(this.oG, bQ);
        this.pf = ac.G.aD(this.pf, bQ);
        this.nF = ac.G.aD(this.nF, bQ);
        this.po = ac.G.aD(this.po, bQ);
        this.oz = ac.G.aD(this.oz, bQ);
        this.nB = ac.G.aD(this.nB, bQ);
        this.oO = ac.G.aD(this.oO, bQ);
        this.pi = ac.G.aD(this.pi, bQ);
        this.bM = true;
    }
    ;
    WR360.ImageRotator.prototype.rh = function() {
        ra();
    }
    ;
    WR360.ImageRotator.nn = function(align, defaultValue) {
        if (align == null) {
            return defaultValue;
        }
        if (align.toLocaleLowerCase() == "left") {
            return -1;
        }
        if (align.toLocaleLowerCase() == "right") {
            return 1;
        }
        return defaultValue;
    }
    ;
    WR360.ImageRotator.prototype.goto_next_frame = function() {
		// SMGroup /////////////////////////////////////////////////////
		// SMGroup /////////////////////////////////////////////////////
		// SMGroup /////////////////////////////////////////////////////
		// alert();
		bn.nv();
	}
    WR360.ImageRotator.prototype.reload = function(configFileURL, rootPath, hZ, reloadImageIndex, reloadRowIndex) {
        if (typeof this.pj !== "undefined") {
            this.pj();
        }
        this.kI(false);
        this.ri = true;
        if (configFileURL && configFileURL.length > 0) {
            this.settings.configFileURL = configFileURL;
        }
        this.settings.rootPath = rootPath;
        this.hB = false;
        this.co();
        this.cJ();
        this.ff();
        this.hD();
        this.mU();
        this.loaded = false;
        this.eP = 0;
        this.jo = true;
        this.db = true;
        this.nV = null;
        this.fN = this.settings.configFileURL;
        this.gf = this.settings.rootPath;
        this.fX = 0;
        this.bA = new WR360.gl;
        this.bV = new WR360.bN;
        this.reloadCallback = null;
        this.dV = true;
        this.reloadImageIndex = typeof reloadImageIndex !== "undefined" ? reloadImageIndex : -1;
        this.reloadRowIndex = typeof reloadRowIndex !== "undefined" ? reloadRowIndex : -1;
        if (typeof hZ !== "undefined" && hZ != null) {
            this.reloadCallback = hZ;
        }
        this.gN(null);
    }
    ;
    WR360.ImageRotator.prototype.ih = function(db) {
        this.db = db;
        if (this.bY) {
            this.bY.fi(!this.db);
        }
    }
    ;
    WR360.ImageRotator.prototype.lz = function() {
        if (this.bA.ly()) {
            this.bV.mo();
        }
    }
    ;
    WR360.ImageRotator.prototype.iV = function() {
        if (this.bA.ly()) {
            this.bV.lO();
        }
    }
    ;
    WR360.ImageRotator.prototype.runImageRotator = function(cR) {
        if (this.cR == null || this.cR.length == 0) {
            if (cR == null || cR.length == 0) {
                throw new Error("Player ID parameter is empty.");
            }
            this.cR = "#" + cR;
            this.oY = cR;
        }
        if (this.settings.fullScreenOnClick == true && this.pH === undefined) {
            this.bm();
            var bn = this;
            jQuery(this.cR).click(function(e) {
                e.preventDefault();
                bn.rg();
            });
            return;
        }
        this.sR = "#" + this.aR("wr360UpButton", "wr360UpButton");
        this.sj = "#" + this.aR("wr360DownButton", "wr360DownButton");
        this.gU = "#" + this.aR("wr360LeftButton", "wr360LeftButton");
        this.hd = "#" + this.aR("wr360RightButton", "wr360RightButton");
        this.jA = "#" + this.aR("wr360ZoomButton", "wr360ZoomButton");
        this.jD = "#" + this.aR("wr360PlayButton", "wr360PlayButton");
        this.kp = "#" + this.aR("wr360HotspotsButton", "wr360HotspotsButton");
        this.pQ = "#" + this.aR("wr360FullScreenButton", "wr360FullScreenButton");
        this.ja = "#" + this.aR("wr360ThemePanel_", "wr360ThemePanel_");
        this.ie = "#" + this.aR("wr360ToolBar", "wr360ToolBar");
        this.nQ = "#" + this.aR("wr360ThemePanelBack", "wr360ThemePanelBack");
        this.kW = "#" + this.aR("wr360ProgressBar", "wr360ProgressBar");
        this.fj = "#" + this.aR("wr360ProgressNum", "wr360ProgressNum");
        jQuery(this.cR).removeClass("wr360_player").addClass("wr360_player");
        this.fm = jQuery(this.cR).innerWidth();
        this.fJ = jQuery(this.cR).innerHeight();
        this.iR = this.fJ;
        this.viewerBackgroundColor = jQuery(this.cR).css("backgroundColor");
        this.gf = this.settings.rootPath;
        this.fN = this.settings.configFileURL;
        this.gN(null);
        this.or = true;
    }
    ;
    WR360.ImageRotator.prototype.gN = function(hQ) {
        if (!hQ || hQ.success == false) {
            this.bS = true;
            this.jy();
        }
    }
    ;
    WR360.ImageRotator.prototype.aR = function(stringToChange, oA) {
        return stringToChange.replace(oA, oA + "_" + this.oY);
    }
    ;
    WR360.ImageRotator.prototype.oQ = function() {
        if (this.qX) {
            return;
        }
        this.ap = this.aR(this.ap, this.cl.replace("#", ""));
        this.aY = this.aR(this.aY, this.cB.replace("#", ""));
        this.bj = this.aR(this.bj, this.eN.replace("#", ""));
        this.aQ = this.aR(this.aQ, this.eQ.replace("#", ""));
        this.hq = this.hU;
        this.hq = this.aR(this.hq, "wr360container");
        this.hq = this.aR(this.hq, "wr360image");
        this.hq = this.aR(this.hq, "wr360image2");
        this.hq = this.aR(this.hq, "wr360toolheader");
        this.hq = this.aR(this.hq, "wr360placer");
        this.hq = this.aR(this.hq, "wr360LeftButton");
        this.hq = this.aR(this.hq, "wr360RightButton");
        this.hq = this.aR(this.hq, "wr360UpButton");
        this.hq = this.aR(this.hq, "wr360DownButton");
        this.hq = this.aR(this.hq, "wr360ZoomButton");
        this.hq = this.aR(this.hq, "wr360PlayButton");
        this.hq = this.aR(this.hq, "wr360HotspotsButton");
        this.hq = this.aR(this.hq, "wr360FullScreenButton");
        this.hq = this.aR(this.hq, "wr360ThemePanel_");
        this.hq = this.aR(this.hq, "wr360ToolBar");
        this.hq = this.aR(this.hq, "wr360ThemePanelBack");
        this.hq = this.aR(this.hq, "wr360ProgressBar");
        this.hq = this.aR(this.hq, "wr360ProgressNum");
        this.cl = this.aR(this.cl, "wr360_menu");
        this.cB = this.aR(this.cB, this.cB.replace("#", ""));
        this.eN = this.aR(this.eN, this.eN.replace("#", ""));
        this.eQ = this.aR(this.eQ, this.eQ.replace("#", ""));
        this.ft = this.aR(this.ft, "wr360placer");
        this.iO = this.aR(this.iO, "wr360toolheader");
        this.pf = this.aR(this.pf, "wr360container");
        this.qX = true;
    }
    ;
    WR360.ImageRotator.prototype.jy = function() {
        if (hT == false && document.readyState === "complete") {
            hT = true;
        }
        if (this.bS == false || hT == false || this.hB == true) {
            return;
        }
        this.sm.cD(this.settings.eventTrackingAlias, this.settings.googleEventTracking);
        this.rK = Date.now();
        this.hB = true;
        this.bm();
        this.oQ();
        this.lk();
        this.pS();
        this.kO();
    }
    ;
    WR360.ImageRotator.ov = function() {
        return ac;
    }
    ;
    WR360.ImageRotator.oZ = function() {
        return WR360.ImageRotator.kR();
    }
    ;
    WR360.ImageRotator.prototype.hj = function() {
        return this.rootPath;
    }
    ;
    WR360.ImageRotator.prototype.lk = function() {
        if (this.dV == false) {
            jQuery(this.cR).append(this.hq);
            this.bp = jQuery(this.pf);
        }
        this.bp.css({
            width: jQuery(this.cR).innerWidth(),
            height: jQuery(this.cR).innerHeight()
        });
        if (this.qr) {
            this.qr();
        }
        if (this.qU) {
            this.qU();
        }
        this.toolbar.cD();
        this.bd = jQuery("#wr360image_" + this.oY);
        this.jp = jQuery("#wr360image2_" + this.oY);
        this.bd.hide();
        this.jp.hide();
        if (!this.eG()) {
            this.jp = null;
        }
        this.bV.iF(this, this.bd, this.jp);
        jQuery(this.ja).hide();
        WR360.bZ.od(this.gu + " ~ " + this.settings.version);
    }
    ;
    WR360.ImageRotator.prototype.eG = function() {
        return false;
    }
    ;
    jQuery.ajaxSetup({
        error: function(XMLHttpRequest, fr, ec) {
            WR360.bZ.gA(fr);
            WR360.bZ.gA(ec);
            WR360.bZ.gA(XMLHttpRequest.responseText);
        }
    });
    WR360.ImageRotator.prototype.im = function() {
        this.aL();
        var aW = this.fN.length != 0;
        if (aW) {
            if (!this.mY()) {
                WR360.bZ.gA("Could not parse XML config path.");
                return;
            }
        }
        this.fs = 0;
        this.dn = false;
        if (this.dN) {
            this.dN.as(false);
        }
        this.qY = true;
        this.R = false;
        if (!this.av && this.pL) {
            if (this.fT == true && this != lH.get(0)) {
                return;
            }
        }
        if (this.av && this.fT && this.pL) {
            return;
        }
        if (this.qS()) {
            return;
        }
        if (aW) {
            this.ki();
        } else {
            this.dq();
        }
    }
    ;
    WR360.ImageRotator.prototype.kO = function() {
        if (this.licenseCode.length > 0) {
            this.nd(this.licenseCode);
            return;
        }
        var bu = this;
        var options = {
            type: "GET",
            url: this.licenseFileURL,
            dataType: "text",
            mimeType: "text/plain",
            success: function(gi) {
                bu.nd(gi);
            },
            error: function(e) {
                bu.lW(e);
            }
        };
        if (!WR360.by.qT(options)) {
            jQuery.ajax(options);
        }
    }
    ;
    WR360.ImageRotator.prototype.md = function() {
        this.ok = new Image;
        this.ok.src = this.gZ;
    }
    ;
    WR360.ImageRotator.prototype.nd = function(gi) {
        if (this.qS()) {
            return;
        }
        this.jK(gi);
        this.im();
    }
    ;
    WR360.ImageRotator.prototype.lW = function(e) {
        if (this.qS()) {
            return;
        }
        this.dQ();
        this.im();
    }
    ;
    WR360.ImageRotator.prototype.ek = function() {
        return this.fT == false;
    }
    ;
    WR360.ImageRotator.prototype.gz = function() {
        return this.fQ == true;
    }
    ;
    WR360.ImageRotator.prototype.gD = function() {
        return this.ek() == true || this.pL == false;
    }
    ;
    WR360.ImageRotator.prototype.qS = function() {
        if (this.pL) {
            return false;
        }
        var lu = this.jh(document.location.hostname);
        var qt = this.jh(this.hV);
        var pP = this.jh(this.pD);
        var qV = this.jh(this.qN);
        if (lu.indexOf(qt) == -1 && lu.indexOf(pP) == -1 && lu.indexOf(qV) == -1) {
            return true;
        }
        return false;
    }
    ;
    WR360.ImageRotator.prototype.nl = function() {
        if (this.pL) {
            return false;
        }
        var gk = window.location.href;
        var jN = gk.length;
        var nb = gk.lastIndexOf(".com");
        if (jN - nb > 5) {
            return false;
        }
        var lu = this.jh(document.location.hostname);
        var qp = this.jh(this.hV);
        if (lu.indexOf(qp) == -1) {
            return false;
        }
        return true;
    }
    ;
    WR360.ImageRotator.prototype.jh = function(eA) {
        var gr = 0;
        if (eA.substr(0, 10) == "http://www") {
            gr = 11;
        } else if (eA.substr(0, 7) == "http://") {
            gr = 7;
        } else if (eA.substr(0, 8) == "https://") {
            gr = 8;
        } else if (eA.substr(0, 11) == "https://www") {
            gr = 12;
        } else if (eA.substr(0, 4) == "www.") {
            gr = 4;
        }
        var gG = eA.indexOf("/", gr);
        if (gG == -1) {
            gG = eA.length;
        }
        var pa = eA.substring(gr, gG);
        return pa;
    }
    ;
    WR360.ImageRotator.prototype.az = function() {
        if (this.ci()) {
            return true;
        }
        var lu = this.jh(document.location.hostname);
        var kH = this.jh(this.cZ);
        if (lu != kH) {
            if (this.cZ.indexOf(".") == -1) {
                if (this.cZ.length >= 4 && lu.indexOf(this.cZ) != -1) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }
    ;
    WR360.ImageRotator.prototype.dQ = function() {
        this.fQ = false;
        this.fT = true;
    }
    ;
    WR360.ImageRotator.prototype.jK = function(gW) {
        if (gW == null || gW.length == 0) {
            this.dQ();
            return;
        }
        var mW = WR360.ImageRotator.kR();
        try {
            var hy = getBrowserId(gW, mW);
        } catch (kV) {
            this.dQ();
            return;
        }
        if (hy == null || hy.length == 0) {
            this.dQ();
            return;
        }
        var fW = hy.split("^^");
        if (fW.length < 3) {
            this.dQ();
            return;
        }
        this.cr = fW[0];
        if (this.cr.length == 0) {
            this.dQ();
            return;
        }
        this.cZ = fW[2];
        if (this.cZ.length == 0) {
            this.dQ();
            return;
        }
        var hF = fW[1];
        if (hF.length != 12) {
            this.dQ();
            return;
        }
        try {
            var an = this.cr + this.cZ;
            var aa = 0;
            for (var i = 0; i < an.length; i++) {
                aa += an.charCodeAt(i);
            }
            var bD = hF.substr(0, 4);
            var ae = parseInt(bD, 16);
            if (aa != ae) {
                this.dQ();
                return;
            }
            var kS = hF.substr(6, 1);
            var kJ = Number(kS);
            this.fQ = kJ == 1;
        } catch (kV) {
            this.dQ();
            return;
        }
        if (this.gz() && this.az() == false) {
            this.dQ();
            return;
        }
        this.fT = false;
    }
    ;
    WR360.ImageRotator.prototype.mz = function() {
        jQuery(this.iO).show();
    }
    ;
    WR360.ImageRotator.prototype.hD = function() {
        if (this.oa != 0) {
            clearInterval(this.oa);
            this.oa = 0;
        }
        if (this.pp != 0) {
            clearInterval(this.pp);
            this.pp = 0;
        }
    }
    ;
    WR360.ImageRotator.prototype.oT = function() {
        if (this.bp.find(this.iO).length == 0) {
            this.bp.append(this.po.pg(this.nF, this.iO.replace("#", "")));
        }
        var p = jQuery(this.iO);
        p.attr(this.nB, this.pr);
        p.show();
        if (jQuery(this.iO).find(this.ft).length == 0) {
            p.append(this.oz.pg(this.ft.replace("#", ""), this.hV, this.gu));
        }
        var y = jQuery(this.ft);
        y.attr(this.nB, this.oG);
        var z = y.html();
        if (z != this.oD) {
            y.html(this.oD);
        }
        y.show();
    }
    ;
    WR360.ImageRotator.prototype.nI = function() {
        if (!jQuery(this.cl).is(":visible")) {
            jQuery(this.cl).remove();
            this.aL();
            jQuery(this.cl).unbind(this.oO);
            this.bp.unbind(this.oO);
            this.bp.bind(this.oO, function(event) {
                ow(event);
            });
            jQuery(this.cl).bind(this.oO, function(event) {
                ow(event);
            });
            var bn = this;
            jQuery(this.cl).unbind("mousemove");
            jQuery(this.cl).unbind("mouseout");
            jQuery(this.cl).bind("mousemove", function(event) {
                bn.gT = true;
            });
            jQuery(this.cl).bind("mouseout", function(event) {
                bn.gT = false;
            });
        }
    }
    ;
    WR360.ImageRotator.prototype.mY = function() {
        var configFileURL = this.fN;
        if (null != configFileURL && configFileURL.length > 0) {
            var el = configFileURL.lastIndexOf("/");
            if (-1 == el) {
                el = configFileURL.lastIndexOf("\\");
            }
            if (-1 != el) {
                var path = this.gf;
                if (null != path && path.length > 0 && this.ek() == true) {
                    this.rootPath = path;
                } else {
                    this.rootPath = configFileURL.substr(0, el + 1);
                }
                this.nL = configFileURL.substr(el + 1);
                this.jF = configFileURL;
                return true;
            }
        }
        this.jF = this.rootPath + this.nL;
        return true;
    }
    ;
    WR360.ImageRotator.prototype.ki = function() {
        var hI = this.jF;
        if (this.settings.crossDomainConfigLoader == true) {
            hI = this.pi + encodeURIComponent(this.jF);
        }
        var bu = this;
        var options = {
            type: "GET",
            url: hI,
            dataType: "xml",
            success: function(di) {
                bu.mO(di);
            },
            error: function(jk, fr, ec) {
                bu.mH(jk, fr, ec);
            }
        };
        if (!WR360.by.qT(options)) {
            jQuery.ajax(options);
        }
    }
    ;
    WR360.ImageRotator.prototype.dq = function() {
        this.cq = new WR360.lE(this.bA,this);
        this.eP = this.bA.settings.bg.fE;
        if (this.bA.aw.length > 0 && this.bA.aw[0].cS != null) {
            this.bV.lc = true;
        }
        if (this.av == true) {
            jQuery(this.cR).css({
                'background-color': this.bA.settings.bI.fullScreenBackColor
            });
        } else {
            this.bp.css({
                'background-color': this.viewerBackgroundColor
            });
        }
        this.eE = new WR360.cL(this);
        this.eE.addEventListener(WR360.cO.COMPLETE, jQuery.proxy(this.lZ, this));
        this.eE.addEventListener(WR360.cO.ERROR, jQuery.proxy(this.lK, this));
        this.eE.Load(this.hj(), this.bA);
        this.bB = new WR360.dc;
        if (this.ek() == false) {
            this.bB.hu = WR360.ImageRotator.km;
        }
        this.bB.addEventListener(WR360.dK.PROGRESS, jQuery.proxy(this.nN, this));
        this.bB.addEventListener(WR360.dK.ERROR, jQuery.proxy(this.pq, this));
        this.bB.addEventListener(WR360.dK.COMPLETE, jQuery.proxy(this.nZ, this));
        this.bB.Init(this.hj(), this.bA);
        this.bU = new WR360.dP(this.cR);
        this.bU.addEventListener(WR360.cf.PROGRESS, jQuery.proxy(this.mP, this));
        this.bU.addEventListener(WR360.cf.COMPLETE, jQuery.proxy(this.lP, this));
        this.bU.addEventListener(WR360.cf.ERROR, jQuery.proxy(this.ml, this));
        this.bU.Init(this.hj(), this.settings.graphicsPath, this.bA, this.av && this.bA.settings.control.qc && this.bV.lc);
        this.fX += this.bU.aw.length;
        this.fX += this.bB.bF.length;
        this.bB.kD();
        this.bU.kE();
    }
    ;
    WR360.ImageRotator.prototype.mO = function(di) {
        var bn = this;
        var V = this.bA;
        if (jQuery.ad.msie && WR360.by.pA()) {
            di = jQuery.parseXML(di);
        }
        var ip = jQuery(di).find("settings");
        if (ip && ip.length == 0) {
            WR360.bZ.gA("ERROR: Cannot read config section 'settings'.");
            return;
        }
        jQuery(di).find("preloader").each(function() {
            V.settings.eH.image = jQuery(this).attr("image");
        });
        jQuery(di).find("userInterface").each(function() {
            V.settings.bI.hb = WR360.by.bX(jQuery(this).attr("showArrows"), V.settings.bI.hb);
            V.settings.bI.gj = WR360.by.bX(jQuery(this).attr("showTogglePlayButton"), V.settings.bI.gj);
            V.settings.bI.gw = WR360.by.bX(jQuery(this).attr("showZoomButtons"), V.settings.bI.gw);
            V.settings.bI.iT = WR360.by.bX(jQuery(this).attr("showFullScreenButton"), V.settings.bI.iT);
            V.settings.bI.bY = WR360.by.bX(jQuery(this).attr("showHotspotsButton"), V.settings.bI.bY);
            V.settings.bI.iU = WR360.by.bX(jQuery(this).attr("showToolTips"), V.settings.bI.iU);
            V.settings.bI.bz = WR360.by.bX(jQuery(this).attr("showProgressNumbers"), V.settings.bI.bz);
            V.settings.bI.gx = WR360.ImageRotator.nn(jQuery(this).attr("toolbarAlign"), V.settings.bI.gx);
            V.settings.bI.gH = WR360.by.cz(jQuery(this).attr("toolbarBackColor"), V.settings.bI.gH);
            V.settings.bI.iC = WR360.by.je(jQuery(this).attr("toolbarAlpha"), V.settings.bI.iC);
            V.settings.bI.gX = WR360.by.je(jQuery(this).attr("toolbarBackAlpha"), V.settings.bI.gX);
            V.settings.bI.gC = WR360.by.cz(jQuery(this).attr("progressNumColor"), V.settings.bI.gC);
            V.settings.bI.fullScreenBackColor = WR360.by.cz(jQuery(this).attr("fullScreenBackColor"), V.settings.bI.fullScreenBackColor);
            V.settings.bI.showFullScreenToolbar = WR360.by.bX(jQuery(this).attr("showFullScreenToolbar"), V.settings.bI.showFullScreenToolbar);
        });
        jQuery(di).find("control").each(function() {
            V.settings.control.gp = WR360.by.je(jQuery(this).attr("dragSpeed"), V.settings.control.gp);
            V.settings.control.dJ = WR360.by.bX(jQuery(this).attr("disableMouseControl"), V.settings.control.dJ);
            V.settings.control.inBrowserFullScreen = WR360.by.bX(jQuery(this).attr("inBrowserFullScreen"), V.settings.control.inBrowserFullScreen);
            V.settings.control.doubleClickFullscreen = WR360.by.bX(jQuery(this).attr("doubleClickFullscreen"), V.settings.control.doubleClickFullscreen);
            V.settings.control.iu = WR360.by.bX(jQuery(this).attr("doubleClickZooms"), V.settings.control.iu);
            V.settings.control.qc = WR360.by.bX(jQuery(this).attr("showHighresOnFullScreen"), V.settings.control.qc);
            V.settings.control.mouseHoverDrag = WR360.by.bX(jQuery(this).attr("mouseHoverDrag"), V.settings.control.mouseHoverDrag);
            V.settings.control.hideHotspotsOnLoad = WR360.by.bX(jQuery(this).attr("hideHotspotsOnLoad"), V.settings.control.hideHotspotsOnLoad);
            V.settings.control.hideHotspotsOnZoom = WR360.by.bX(jQuery(this).attr("hideHotspotsOnZoom"), V.settings.control.hideHotspotsOnZoom);
            V.settings.control.rowSensitivity = WR360.by.dM(jQuery(this).attr("rowSensitivity"), V.settings.control.rowSensitivity);
            V.settings.control.dragSensitivity = WR360.by.dM(jQuery(this).attr("dragSensitivity"), V.settings.control.dragSensitivity);
        });
        jQuery(di).find("rotation").each(function() {
            V.settings.bg.fE = WR360.by.cz(jQuery(this).attr("firstImage"), V.settings.bg.fE);
            V.settings.bg.rotate = WR360.by.cz(jQuery(this).attr("rotate"), V.settings.bg.rotate);
            V.settings.bg.kC = WR360.by.dM(jQuery(this).attr("rotateDirection"), V.settings.bg.kC);
            V.settings.bg.oc = WR360.by.cz(jQuery(this).attr("forceDirection"), V.settings.bg.oc);
            V.settings.bg.gg = WR360.by.dM(jQuery(this).attr("rotatePeriod"), V.settings.bg.gg);
            V.settings.bg.bounce = WR360.by.bX(jQuery(this).attr("bounce"), V.settings.bg.bounce);
            V.settings.bg.bounceRows = WR360.by.bX(jQuery(this).attr("bounceRows"), V.settings.bg.bounceRows);
            V.settings.bg.useInertia = WR360.by.bX(jQuery(this).attr("useInertia"), V.settings.bg.useInertia);
            V.settings.bg.inertiaRelToDragSpeed = WR360.by.bX(jQuery(this).attr("inertiaRelToDragSpeed"), V.settings.bg.inertiaRelToDragSpeed);
            V.settings.bg.inertiaTimeToStop = WR360.by.dM(jQuery(this).attr("inertiaTimeToStop"), V.settings.bg.inertiaTimeToStop);
            V.settings.bg.inertiaMaxInterval = WR360.by.dM(jQuery(this).attr("inertiaMaxInterval"), V.settings.bg.inertiaMaxInterval);
            V.settings.bg.flipHorizontalInput = WR360.by.bX(jQuery(this).attr("flipHorizontalInput"), V.settings.bg.flipHorizontalInput);
            V.settings.bg.flipVerticalInput = WR360.by.bX(jQuery(this).attr("flipVerticalInput"), V.settings.bg.flipVerticalInput);
        });
        var hH = jQuery(di).find("hotspots");
        if (hH && hH.length > 0) {
            var kw = 0;
            hH.each(function() {
                jQuery(this).find("hotspot").each(function() {
                    var bi = new WR360.kc;
                    bi.id = jQuery(this).attr("id");
                    bi.renderMode = WR360.by.dM(jQuery(this).attr("renderMode"), bi.renderMode);
                    bi.indicatorImage = WR360.by.cz(jQuery(this).attr("indicatorImage"), bi.indicatorImage);
                    bi.disabled = WR360.by.bX(jQuery(this).attr("disabled"), bi.disabled);
                    bi.wrap = WR360.by.bX(jQuery(this).attr("wrap"), bi.wrap);
                    bi.activateOnClick = WR360.by.bX(jQuery(this).attr("activateOnClick"), bi.activateOnClick);
                    bi.deactivateOnClick = WR360.by.bX(jQuery(this).attr("deactivateOnClick"), bi.deactivateOnClick);
                    bi.offset.parse(jQuery(this).attr("offsetX"), jQuery(this).attr("offsetY"));
                    bi.margin.parse(jQuery(this).attr("margin"));
                    bi.align.parse(jQuery(this).attr("align"));
                    var dI = WR360.by.bX(jQuery(this).attr("absolutePosition"), false);
                    if (dI == true) {
                        bi.renderMode = WR360.kc.bf.au;
                    }
                    jQuery(this).find("spotinfo").each(function() {
                        bi.hotspotInfo = new WR360.HotspotInfo;
                        bi.hotspotInfo.src = WR360.by.cz(jQuery(this).attr("src"), bi.hotspotInfo.src);
                        bi.hotspotInfo.url = WR360.by.cz(jQuery(this).attr("url"), bi.hotspotInfo.url);
                        bi.hotspotInfo.urlTarget = WR360.by.cz(jQuery(this).attr("urlTarget"), bi.hotspotInfo.urlTarget);
                        bi.hotspotInfo.txt = WR360.by.cz(jQuery(this).attr("txt"), bi.hotspotInfo.txt);
                        bi.hotspotInfo.txtWidth = WR360.by.dM(jQuery(this).attr("txtWidth"), bi.hotspotInfo.txtWidth);
                        bi.hotspotInfo.txtColor = WR360.by.cz(jQuery(this).attr("txtColor"), bi.hotspotInfo.txtColor);
                        bi.hotspotInfo.txtBkColor = WR360.by.cz(jQuery(this).attr("txtBkColor"), bi.hotspotInfo.txtBkColor);
                        bi.hotspotInfo.fntHeight = WR360.by.dM(jQuery(this).attr("fntHeight"), bi.hotspotInfo.fntHeight);
                        bi.hotspotInfo.imgWidth = WR360.by.dM(jQuery(this).attr("imgWidth"), bi.hotspotInfo.imgWidth);
                        bi.hotspotInfo.imgBkColor = WR360.by.cz(jQuery(this).attr("imgBkColor"), bi.hotspotInfo.imgBkColor);
                        bi.hotspotInfo.css = WR360.by.cz(jQuery(this).attr("css"), bi.hotspotInfo.css);
                        bi.hotspotInfo.imgNoScale = WR360.by.bX(jQuery(this).attr("imgNoScale"), bi.hotspotInfo.imgNoScale);
                        bi.hotspotInfo.lbxShowClose = WR360.by.bX(jQuery(this).attr("lbxShowClose"), bi.hotspotInfo.lbxShowClose);
                        bi.hotspotInfo.lbxBackCover = WR360.by.bX(jQuery(this).attr("lbxBackCover"), bi.hotspotInfo.lbxBackCover);
                        bi.hotspotInfo.lbxClickActive = WR360.by.bX(jQuery(this).attr("lbxClickActive"), bi.hotspotInfo.lbxClickActive);
                        bi.hotspotInfo.clickAction = WR360.by.dM(jQuery(this).attr("clickAction"), bi.hotspotInfo.clickAction);
                        bi.hotspotInfo.clickData = WR360.by.cz(jQuery(this).attr("clickData"), bi.hotspotInfo.clickData);
                        bi.hotspotInfo.clickDataParam = WR360.by.dM(jQuery(this).attr("clickDataParam"), bi.hotspotInfo.clickDataParam);
                        jQuery(this).find("cdata").each(function() {
                            bi.hotspotInfo.cdata = WR360.by.cz(jQuery(this).text(), bi.hotspotInfo.cdata);
                        });
                    });
                    if (bi.disabled == false) {
                        V.bF[kw] = bi;
                        V.hi[bi.id] = bi;
                        kw++;
                    }
                });
            });
        } else {
            return;
        }
        var fV = jQuery(di).find("images");
        if (fV && fV.length > 0) {
            var bW = 0;
            fV.each(function() {
                V.aw.ep = WR360.by.dM(jQuery(this).attr("highresWidth"), V.aw.ep);
                V.aw.eU = WR360.by.dM(jQuery(this).attr("highresHeight"), V.aw.eU);
                V.aw.rows = WR360.by.dM(jQuery(this).attr("rows"), V.aw.rows);
                jQuery(this).find("image").each(function() {
                    var dp = new WR360.lv;
                    dp.src = jQuery(this).attr("src");
                    dp.label = WR360.by.cz(jQuery(this).attr("label"), dp.label);
                    dp.delay = WR360.by.dM(jQuery(this).attr("delay"), dp.delay);
                    var hO = 0;
                    jQuery(this).find("hotspot").each(function() {
                        var al = new WR360.lq;
                        al.source = WR360.by.cz(jQuery(this).attr("source"), al.source);
                        al.offsetX = WR360.by.dM(jQuery(this).attr("offsetX"), al.offsetX);
                        al.offsetY = WR360.by.dM(jQuery(this).attr("offsetY"), al.offsetY);
                        dp.bF[hO] = al;
                        dp.hi[al.source] = al;
                        hO++;
                    });
                    jQuery(this).find("highres").each(function() {
                        dp.cS = new WR360.kB;
                        dp.cS.src = WR360.by.cz(jQuery(this).attr("src"), dp.cS.src);
                    });
                    V.aw[bW] = dp;
                    V.ky[dp.src] = dp;
                    bW++;
                });
            });
        } else {
            WR360.bZ.gA("ERROR: Cannot read config section 'images'.");
            return;
        }
        this.dq();
    }
    ;
    WR360.ImageRotator.prototype.mP = function(e) {
        this.dS();
    }
    ;
    WR360.ImageRotator.prototype.nN = function(e) {
        this.dS();
    }
    ;
    WR360.ImageRotator.prototype.lP = function(e) {
        this.dS();
        this.jb(e);
    }
    ;
    WR360.ImageRotator.prototype.nZ = function(e) {
        this.dS();
        this.jb(e);
    }
    ;
    WR360.ImageRotator.prototype.ml = function(e) {
        WR360.bZ.gA(e.errorMessage);
    }
    ;
    WR360.ImageRotator.prototype.pq = function(e) {
        WR360.bZ.gA(e.errorMessage);
    }
    ;
    WR360.ImageRotator.prototype.dS = function() {
        this.fs++;
        var kt = Math.round(this.fs / this.fX * 100);
        this.cq.il(kt);
        if (this.settings.progressCallback != null) {
            this.settings.progressCallback(this.av, kt);
        }
    }
    ;
    WR360.ImageRotator.prototype.jb = function(e) {
        if (this.qS()) {
            return;
        }
        if (this.fs < this.fX) {
            return;
        }
        this.jo = false;
        try {
            this.cq.il(99);
            this.jV(this.bU.aw[this.eP].F);
            this.bV.cD(this.bU, this.bB, this.bA, this.dG, this.dA, this.aU, this.bp);
            if (this.dV == true && this.reloadImageIndex >= 0) {
                if (this.reloadRowIndex >= 0) {
                    this.bV.kl = this.reloadRowIndex;
                }
                this.bV.dE(this.reloadImageIndex);
            } else if (this.settings.fullScreenOnClick == true || typeof this.qz === "undefined" || !this.qz()) {
                this.bV.dE(this.bA.settings.bg.fE);
            }
            this.cq.destroy();
            this.lo();
            var qL = this.jp ? this.jp : this.bd;
            if (this.dV == false) {
                qL.fadeIn(600, jQuery.proxy(function() {
                    this.ke();
                }, this));
            } else {
                qL.show();
                this.ke();
            }
            if (this.settings.progressCallback != null) {
                this.settings.progressCallback(this.av, 100);
            }
            if (this.settings.apiReadyCallback != null && this.dV != true) {
                this.settings.apiReadyCallback(new WR360.API(this), this.av, this.settings.eventTrackingAlias);
            }
            if (this.dV == true && this.reloadCallback != null) {
                this.reloadCallback();
                this.reloadCallback = null;
            }
            if (this.rK != 0) {
                if (this.gD() == true) {
                    this.sm.Event(this.dV ? WR360.sY.rU.sc : WR360.sY.rU.sG, Date.now() - this.rK);
                }
                this.rK = 0;
            }
            this.dV = false;
        } catch (ex) {
            WR360.bZ.gA("Exception: " + ex.message);
        }
    }
    ;
    WR360.ImageRotator.prototype.fK = function(deltaX, deltaY) {
        this.bV.en = true;
        this.bV.dE(this.bV.aF, deltaX, deltaY);
    }
    ;
    WR360.ImageRotator.prototype.lZ = function(e) {
        if (!this.jo) {
            return;
        }
        var image = e.image;
        if (image == null) {
            return;
        }
        this.jV(this.eE.image);
        this.bV.hs(image.src);
        var qL = this.jp ? this.jp : this.bd;
        if (this.dV == false) {
            qL.fadeIn(600);
        } else {
            qL.show();
        }
    }
    ;
    WR360.ImageRotator.prototype.lK = function(e) {
        WR360.bZ.gA(e.errorMessage);
    }
    ;
    WR360.ImageRotator.prototype.mH = function(jk, fr, ec) {
        WR360.bZ.gA("Could not load configuration file '" + this.fN + "': " + fr + ", " + ec.toString());
    }
    ;
    WR360.ImageRotator.prototype.ci = function() {
        if (location.href.indexOf("https://") == -1 && location.href.indexOf("http://") == -1 || location.href.indexOf("localhost") != -1 || location.href.indexOf("127.0.0") != -1) {
            return true;
        }
        return false;
    }
    ;
    WR360.ImageRotator.prototype.lo = function() {
        this.dG = this.bU.aw[this.eP].F.width;
        this.dA = this.bU.aw[this.eP].F.height;
        this.loaded = true;
        this.kY();
        this.nx();
        this.toolbar.mV(this.bA, this);
        if (this.qa) {
            this.qa();
        }
        this.nt();
        this.pS();
        if (this.ek() == false && this.ci() == false) {
            var lM = this;
            setTimeout(function() {
                lM.md();
            }, 2000);
        }
    }
    ;
    WR360.ImageRotator.prototype.gK = function(bi) {
        var ax = bi.id;
        if (ax != null) {
            ax = ax.replace(/ /g, "_");
        }
        if (bi.renderMode == WR360.kc.bf.au) {
            return "wr360StaticSpot_" + ax + "_" + this.oY;
        } else {
            return "wr360DynamicSpot_" + ax + "_" + this.oY;
        }
    }
    ;
    WR360.ImageRotator.prototype.mU = function() {
        this.bV.qG();
    }
    ;
    WR360.ImageRotator.prototype.nt = function() {
        var bn = this;
        if (bn.dV == false) {
            this.bp.bind("selectstart", function(event) {
                bn.na(event);
            });
            this.bp.bind("mousemove", function(event) {
                bn.onMouseMove(event);
            });
            this.bp.bind("mousedown", function(event) {
                bn.onMouseDown(event);
            });
            this.bp.bind("mouseup", function(event) {
                bn.onMouseUp(event);
            });
            this.bp.bind("mouseleave", function(event) {
                bn.onMouseLeave(event);
            });
            this.bd.bind("dblclick", function(event) {
                bn.lJ(event, this);
            });
            this.bd.bind("touchend", function(event) {
                bn.mr(event, this);
            });
            if (this.jp) {
                this.jp.bind("dblclick", function(event) {
                    bn.lJ(event, this);
                });
                this.jp.bind("touchstart", function(event) {
                    bn.mr(event, this);
                });
            }
            this.bp.bind(this.oO, function(event) {
                ow(event);
            });
            jQuery(this.cl).bind(this.oO, function(event) {
                ow(event);
            });
            this.bp.bind("touchstart", function(event) {
                bn.mk(event);
            });
            this.bp.bind("touchmove", function(event) {
                bn.nm(event);
            });
            this.bp.bind("touchend", function(event) {
                bn.mL(event);
            });
            this.bp.bind("touchcancel", function() {
                bn.ma(event);
            });
            jQuery(this.bc).bind("mousedown", function(event) {
                bn.ph();
            });
            jQuery(this.cl).bind("mouseover", function(event) {
                bn.gT = true;
            });
            jQuery(this.cl).bind("mouseout", function(event) {
                bn.gT = false;
            });
        }
        if (bn.ek() == false) {
            if (this.nl() == true) {
                jQuery(this.ft).remove();
            } else if (bn.oa == 0) {
                bn.oa = setInterval(function() {
                    bn.oT();
                }, 2000);
            }
        }
        if (bn.pp == 0) {
            bn.pp = setInterval(function() {
                bn.nI();
            }, 5000);
        }
    }
    ;
    WR360.ImageRotator.prototype.nx = function() {
        var bn = this;
        if (bn.dV == false) {
            jQuery(this.sR).bind({
                mousedown: function() {
                    bn.tj();
                },
                mouseup: function() {
                    bn.rq();
                },
                mouseout: function() {
                    bn.rM();
                }
            });
            jQuery(this.sj).bind({
                mousedown: function() {
                    bn.sQ();
                },
                mouseup: function() {
                    bn.so();
                },
                mouseout: function() {
                    bn.sC();
                }
            });
            jQuery(this.gU).bind({
                mousedown: function() {
                    bn.np();
                },
                mouseup: function() {
                    bn.nr();
                },
                mouseout: function() {
                    bn.lY();
                }
            });
            jQuery(this.hd).bind({
                mousedown: function() {
                    bn.nv();
                },
                mouseup: function() {
                    bn.mT();
                },
                mouseout: function() {
                    bn.mK();
                }
            });
            jQuery(this.jA).bind({
                mousedown: function(event) {
                    bn.mt(event);
                }
            });
            jQuery(this.kp).bind({
                click: function(event) {
                    bn.mf(event);
                }
            });
            jQuery(this.pQ).bind({
                click: function(event) {
                    if (bn.rc) {
                        bn.rc(event);
                    }
                }
            });
            this.dN = new WR360.ej(this.jA.replace("#", ""),"zoomin_button","zoomout_button");
            this.bY = new WR360.cP(this.kp.replace("#", ""),"hotspotson_button","hotspotsoff_button");
            this.qZ = new WR360.cP(this.pQ.replace("#", ""),"fullscreenon_button","fullscreenoff_button");
            this.eg = new WR360.fb(this.jD.replace("#", ""),"click",this,"play_button",bn.mR,"pause_button",bn.mp,500);
            this.eg.cD();
            jQuery(this.ja).mousedown(function(event) {
                bn.nj(event);
            });
            jQuery(this.ja).mousemove(function(event) {
                bn.nD(event);
            });
            jQuery(this.ja).mouseleave(function(event) {
                bn.oj(event);
            });
        }
        this.ih(!this.bA.settings.control.hideHotspotsOnLoad);
    }
    ;
    WR360.ImageRotator.prototype.pS = function() {
        if (this.pW) {
            if (this.pW()) {
                if (this.bV) {
                    this.bV.eh(this.bV.aF, false);
                }
                return;
            }
        }
        this.kI(false);
        this.fm = jQuery(this.cR).innerWidth();
        if (this.settings.responsiveBaseWidth == 0) {
            this.fJ = jQuery(this.cR).innerHeight();
            this.bp.css({
                width: this.fm,
                height: this.fJ
            });
            this.lB = 1;
        } else {
            var ratio = this.iR / this.settings.responsiveBaseWidth;
            this.fJ = this.fm * ratio;
            if (this.fJ < this.settings.responsiveMinHeight) {
                this.fJ = this.settings.responsiveMinHeight;
            }
            this.bp.css({
                width: this.fm,
                height: this.fJ
            });
            jQuery(this.cR).css({
                height: this.fJ
            });
            jQuery(this.cR).parent().css({
                height: this.fJ
            });
            this.lB = this.fm / this.settings.responsiveBaseWidth;
        }
        if (this.bV != null) {
            this.gs();
            if (this.bV.H != null) {
                this.bV.eh(this.bV.aF, !this.av);
                this.bV.lB = this.lB;
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.gs = function() {
        var cW = this.bp.innerWidth();
        var dk = this.bp.innerHeight();
        var jU = dk / cW;
        var ks = this.dA / this.dG;
        var fB = 0
          , cw = 0
          , fa = 0
          , fF = 0;
        if (this.dG < cW && this.dA < dk) {
            fB = this.dG;
            cw = this.dA;
            fa = (cW - this.dG) / 2;
            fF = (dk - this.dA) / 2;
        } else {
            if (jU >= ks) {
                fB = cW;
                cw = cW / this.dG * this.dA;
                fa = 0;
                fF = (dk - cw) / 2;
            } else {
                cw = dk;
                fB = dk / this.dA * this.dG;
                fa = (cW - fB) / 2;
                fF = 0;
            }
        }
        this.bp.css("text-align", "left");
        this.bd.css("margin-left", fa);
        this.bd.css("margin-top", fF);
        this.bd.css("width", fB);
        this.bd.css("height", cw);
        if (this.jp) {
            this.jp.css("margin-left", fa);
            this.jp.css("margin-top", fF);
            this.jp.css("width", fB);
            this.jp.css("height", cw);
        }
        this.aU['_viewPort.x'] = fa;
        this.aU['_viewPort.y'] = fF;
        this.aU['_viewPort.width'] = fB;
        this.aU['_viewPort.height'] = cw;
        if (this.bA.iq()) {
            this.bV.dZ = this.bA.aw.ep / this.aU['_viewPort.width'];
        }
    }
    ;
    var kP = "AQIDBAUGBwgJAA";
    WR360.ImageRotator.prototype.aP = function() {
        if (this.dV == false) {
            jQuery(this.pf).append(this.ap);
            jQuery(this.cl).append(this.aY);
            jQuery(this.cB).append(this.bj);
            jQuery(this.cB).append(this.aQ);
        }
    }
    ;
    WR360.ImageRotator.prototype.aL = function() {
        var eZ = "";
        var gn = this.gu;
        var fg = 0;
        this.mz();
        this.aP();
        if (this.ek()) {
            if (this.cr != null && this.cr.length > 0) {
                if (!this.gz()) {
                    eZ = this.ju + this.cr;
                } else {
                    eZ = this.cr + " &copy;";
                }
            }
        } else {
            gn = this.gF;
        }
        if (eZ.length != 0) {
            var ij = "";
            if (this.cZ != null && this.cZ.length > 0) {
                if (this.gz() && this.cZ.indexOf(".") == -1) {
                    if (this.ci()) {
                        jQuery(this.eN).html(this.bc.pg("", eZ));
                        jQuery(this.eQ).hide();
                        return;
                    }
                    ij = document.location.hostname;
                } else {
                    ij = this.cZ;
                }
            }
            jQuery(this.eN).html(this.bc.pg(ij, eZ));
        } else {
            jQuery(this.eN).hide();
        }
        if (!this.gz()) {
            jQuery(this.eQ).html(this.bc.pg(this.hV, gn));
        } else {
            jQuery(this.eQ).hide();
        }
    }
    ;
    WR360.ImageRotator.prototype.jV = function(image) {
        this.dG = image.width;
        this.dA = image.height;
        this.pS();
    }
    ;
    WR360.ImageRotator.prototype.ng = function() {
        var fB = this.aU['_viewPort.width'];
        if (fB > this.dG) {
            return 1;
        }
        return this.dG / fB;
    }
    ;
    WR360.ImageRotator.prototype.mJ = function() {
        if (this.bV.dZ == 0) {
            return this.ng();
        } else {
            return this.bV.dZ;
        }
    }
    ;
    WR360.ImageRotator.prototype.kY = function() {
        if (this.bU.sM() > 0 && this.bA.settings.bg.gg > 0) {
            this.eo = this.bA.settings.bg.gg / this.bU.sM() * 1000;
            this.O = this.eo;
            if (this.bA.settings.control.gp > 0) {
                this.O *= this.bA.settings.control.gp;
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.mR = function(e) {
        this.gJ();
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.rQ);
        }
    }
    ;
    WR360.ImageRotator.prototype.mp = function(e) {
        this.cJ();
    }
    ;
    WR360.ImageRotator.prototype.nr = function(e) {
        this.co();
    }
    ;
    WR360.ImageRotator.prototype.lY = function(e) {
        if (this.pY == false) {
            this.co();
        }
    }
    ;
    WR360.ImageRotator.prototype.np = function(e) {
        this.bV.eT();
        this.cJ();
        this.co();
        this.nX = false;
        this.rI = false;
        this.hl = true;
        var bu = this;
        this.ak = setTimeout(function() {
            bu.jz();
        }, this.bw);
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.sP);
        }
    }
    ;
    WR360.ImageRotator.prototype.rq = function(e) {
        this.co();
    }
    ;
    WR360.ImageRotator.prototype.rM = function(e) {
        if (this.pY == false) {
            this.co();
        }
    }
    ;
    WR360.ImageRotator.prototype.tj = function(e) {
        this.bV.sx();
        this.co();
        this.nX = false;
        this.rI = true;
        this.hl = false;
        var bu = this;
        this.ak = setTimeout(function() {
            bu.jz();
        }, this.bw);
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.sP);
        }
    }
    ;
    WR360.ImageRotator.prototype.mt = function(e) {
        if (this.eG()) {
            this.ri = true;
            if (this.pY == true) {
                this.cJ();
                if (this.dn && this.bV.lc) {
                    return;
                }
            }
        }
        this.jL(false, e);
    }
    ;
    WR360.ImageRotator.prototype.mK = function(e) {
        if (this.pY == false) {
            this.co();
        }
    }
    ;
    WR360.ImageRotator.prototype.nv = function(e) {
        this.bV.fo();
        this.cJ();
        this.co();
        this.nX = false;
        this.rI = false;
        this.hl = false;
        var bu = this;
        this.ak = setTimeout(function() {
            bu.jz();
        }, this.bw);
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.sP);
        }
    }
    ;
    WR360.ImageRotator.prototype.mT = function(e) {
        this.co();
    }
    ;
    WR360.ImageRotator.prototype.so = function(e) {
        this.co();
    }
    ;
    WR360.ImageRotator.prototype.sC = function(e) {
        if (this.pY == false) {
            this.co();
        }
    }
    ;
    WR360.ImageRotator.prototype.sQ = function(e) {
        this.bV.ta();
        this.co();
        this.nX = true;
        this.rI = false;
        this.hl = false;
        var bu = this;
        this.ak = setTimeout(function() {
            bu.jz();
        }, this.bw);
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.sP);
        }
    }
    ;
    WR360.ImageRotator.prototype.mf = function(e) {
        if (this.R) {
            return;
        }
        if (this.db == true) {
            this.lz();
        } else {
            this.iV();
        }
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.sk);
        }
    }
    ;
    WR360.ImageRotator.prototype.nj = function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.dispatchEvent(new WR360.Event(WR360.Events.hG,false,false));
    }
    ;
    WR360.ImageRotator.prototype.nD = function(e) {
        this.kU = true;
    }
    ;
    WR360.ImageRotator.prototype.oj = function(e) {
        this.kU = false;
    }
    ;
    WR360.ImageRotator.prototype.na = function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    ;
    WR360.ImageRotator.prototype.onMouseDown = function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button == mg()) {
            this.pm(e);
            if (this.bA.settings.control.dJ) {
                return;
            }
            this.kx(e);
        } else if (e.button == mD()) {
            this.nP(e);
        }
    }
    ;
    WR360.ImageRotator.prototype.jB = function(e) {
        var cC = WR360.by.fS(e);
        this.dO = this.bA.settings.bg.flipHorizontalInput ? -cC.x : cC.x;
        this.ei = this.bA.settings.bg.flipVerticalInput ? -cC.y : cC.y;
    }
    ;
    WR360.ImageRotator.prototype.kx = function(e) {
        this.fu = true;
        this.ri = true;
        this.cJ();
        this.sq();
        this.eu = true;
        this.sI = Date.now();
        if (!e) {
            e = window.event;
        }
        var cC = WR360.by.fS(e);
        this.dO = this.bA.settings.bg.flipHorizontalInput ? -cC.x : cC.x;
        this.ei = this.bA.settings.bg.flipVerticalInput ? -cC.y : cC.y;
        this.jW = this.bV.aG.css("margin-left").bE();
        this.jt = this.bV.aG.css("margin-top").bE();
    }
    ;
    var kZ = "AgMEBQYHCAkAAQI=";
    WR360.ImageRotator.prototype.su = function() {
        if (this.eu == true && this.sI != 0) {
            if (this.gD() == true) {
                this.sm.Event(WR360.sY.rU.rC, Date.now() - this.sI);
            }
        }
        this.sI = 0;
    }
    ;
    WR360.ImageRotator.prototype.sq = function() {
        if (this.eu == false && this.rZ != 0) {
            if (this.gD() == true) {
                this.sm.Event(WR360.sY.rU.rW, Date.now() - this.rZ);
            }
        }
        this.rZ = 0;
    }
    ;
    WR360.ImageRotator.prototype.onMouseUp = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.su();
        this.fu = false;
        this.eu = false;
        this.ff();
    }
    ;
    WR360.ImageRotator.prototype.onMouseLeave = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.bp.css("cursor", "default");
        this.su();
        this.sq();
        this.fu = false;
        this.eu = false;
        this.ff();
    }
    ;
    WR360.ImageRotator.prototype.lJ = function(e, target) {
        e.stopPropagation();
        e.preventDefault();
        if (this.bA.settings.control.dJ) {
            return;
        }
        if (this.bA.settings.control.doubleClickFullscreen) {
            this.rc(e);
            return;
        }
        if (this.av == true) {
            return;
        }
        if (!this.bA.settings.control.iu) {
            return;
        }
        this.jL(true, e, target);
    }
    ;
    WR360.ImageRotator.prototype.onMouseMove = function(e) {
        if (this.qS()) {
            return;
        }
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.bp.css("cursor", "pointer");
        if (!e) {
            e = window.event;
        }
        var cC = WR360.by.fS(e);
        this.cp = this.bA.settings.bg.flipHorizontalInput ? -cC.x : cC.x;
        this.ha = this.bA.settings.bg.flipVerticalInput ? -cC.y : cC.y;
        this.hg += Math.abs(this.cp - this.dO);
        this.qe += Math.abs(this.ha - this.ei);
        if (this.eu == false && this.rZ == 0) {
            this.rZ = Date.now();
        }
        if (this.eu == false && this.bA.settings.control.mouseHoverDrag == false) {
            this.dO = this.cp;
            this.ei = this.ha;
            return;
        }
        if (this.eu == false && this.bA.settings.control.mouseHoverDrag == true) {
            if (this.pY == true || this.dn == true || this.kU == true) {
                this.dO = this.cp;
                this.ei = this.ha;
                return;
            }
        }
        if (this.qY || this.av && !this.settings.fullScreenOnClick) {
            this.kF();
        } else {
            this.ff();
            this.nq(e);
        }
    }
    ;
    WR360.ImageRotator.prototype.nq = function(e) {
        var et = this.jW + (this.cp - this.dO);
        var gO = this.jt + (this.ha - this.ei);
        if (et < this.eL.eY) {
            et = this.eL.eY;
        } else if (et > this.eL.fd) {
            et = this.eL.fd;
        }
        if (gO < this.eL.ev) {
            gO = this.eL.ev;
        } else if (gO > this.eL.fM) {
            gO = this.eL.fM;
        }
        if (this.eG()) {
            if (this.jp == this.bV.aG) {
                this.bd.hide();
            } else {
                this.jp.hide();
            }
        }
        this.bV.aG.css("margin-left", et);
        this.bV.aG.css("margin-top", gO);
        this.bV.fP();
    }
    ;
    WR360.ImageRotator.prototype.mk = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.eS = Date.now();
        this.eO = this.hg;
        this.kx(e);
        e.stopPropagation();
    }
    ;
    WR360.ImageRotator.prototype.mr = function(e, target) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        var now = Date.now();
        if (now - this.fY < 300) {
            this.lJ(e, target);
            this.onMouseUp(e);
            return;
        }
        this.fY = now;
    }
    ;
    WR360.ImageRotator.prototype.mL = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.onMouseUp(e);
        this.oC();
        e.stopPropagation();
    }
    ;
    WR360.ImageRotator.prototype.nm = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        var qg = this.hg;
        var qK = this.qe;
        this.onMouseMove(e);
        if (this.hg - qg > 8 && this.qe - qK < 20 || this.av == true || this.dn == true || this.bA.aw.rows > 1) {
            e.preventDefault();
        } else {
            this.ri = true;
        }
        e.stopPropagation();
    }
    ;
    WR360.ImageRotator.prototype.ma = function(e) {
        if (this.bA.settings.control.dJ) {
            return;
        }
        this.onMouseLeave(e);
        this.ri = true;
        e.stopPropagation();
    }
    ;
    WR360.ImageRotator.prototype.fO = function() {
        this.gQ = this.bA.settings.bg.bounce ? this.bU.sM() * 2 - 2 : this.bU.sM();
    }
    ;
    WR360.ImageRotator.prototype.ke = function() {
        if (this.bA.settings.bg.rotate == "false") {
            return;
        }
        if (this.bA.settings.bg.rotate == "once") {
            this.fO();
        }
        this.gJ();
    }
    ;
    WR360.ImageRotator.prototype.kF = function() {
        if (this.fl == 0) {
            var bu = this;
            this.fl = setInterval(function() {
                bu.lN();
            }, this.O);
            this.eS = Date.now();
            this.eO = this.hg;
        }
    }
    ;
    WR360.ImageRotator.prototype.ff = function() {
        if (this.fl == 0) {
            return;
        }
        clearInterval(this.fl);
        this.fl = 0;
        this.oC();
    }
    ;
    WR360.ImageRotator.prototype.lp = function() {
        this.nJ = 500;
    }
    ;
    WR360.ImageRotator.prototype.oC = function() {
        if (!this.bA.settings.bg.useInertia) {
            return;
        }
        if (this.dn) {
            return;
        }
        this.ri = false;
        this.eS = Date.now() - this.eS;
        this.eO = this.hg - this.eO;
        var gp = this.eO / this.eS;
        if (gp > 0.1 && this.nJ < 120) {
            this.qM(0, gp);
        }
    }
    ;
    WR360.ImageRotator.prototype.qM = function(startTime, pu) {
        var ox = this.O;
        if (startTime > 0) {
            var relativeToSpeed = this.bA.settings.bg.inertiaRelToDragSpeed;
            var pI = relativeToSpeed == true ? this.bA.settings.bg.inertiaTimeToStop * pu : this.bA.settings.bg.inertiaTimeToStop;
            var py = this.bA.settings.bg.inertiaMaxInterval;
            var nH = Date.now() - startTime;
            ox = py * (nH /= pI) * nH + this.O;
            if (ox > py) {
                return;
            }
        } else {
            startTime = Date.now();
        }
        var bu = this;
        setTimeout(function() {
            if (bu.ri) {
                return;
            }
            bu.qf();
            bu.qM(startTime, pu);
        }, ox);
    }
    ;
    WR360.ImageRotator.prototype.me = function() {
        if (this.gy++ == this.gQ) {
            this.cJ();
            if (this.gb != null) {
                this.gb();
            }
            return;
        }
        this.ql();
    }
    ;
    WR360.ImageRotator.prototype.qf = function() {
        var oM = this.bA.settings.bg.kC == -1 ? 1 : -1;
        if (this.bV.he == oM) {
            if (this.bV.eT() == false) {
                this.bV.fo();
            }
        } else {
            if (this.bV.fo() == false) {
                this.bV.eT();
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.ql = function() {
        if (this.pY == false) {
            return;
        }
        var oM = this.bA.settings.bg.kC == -1 ? 1 : -1;
        if (this.bV.he == oM) {
            if (this.bV.eT() == false) {
                this.bV.fo();
            }
        } else {
            if (this.bV.fo() == false) {
                this.bV.eT();
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.gJ = function(gg) {
        if (this.pY) {
            return;
        }
        this.eg.ji(true);
        this.pY = true;
        this.gy = 0;
        var interval = gg === undefined || gg === null ? this.eo : gg / this.bU.sM() * 1000;
        var bu = this;
        this.fq = setInterval(function() {
            bu.me();
        }, interval);
    }
    ;
    WR360.ImageRotator.prototype.cJ = function() {
        if (!this.pY) {
            return;
        }
        this.eg.ji(false);
        this.pY = false;
        this.gQ = -1;
        this.gy = 0;
        if (this.fq != 0) {
            clearInterval(this.fq);
            this.fq = 0;
        }
    }
    ;
    WR360.ImageRotator.prototype.co = function() {
        if (this.ak != 0) {
            clearTimeout(this.ak);
            this.ak = 0;
        }
        if (this.aV != 0) {
            clearInterval(this.aV);
            this.aV = 0;
        }
    }
    ;
    WR360.ImageRotator.prototype.jz = function() {
        var bu = this;
        this.aV = setInterval(function() {
            bu.iJ();
        }, this.O);
    }
    ;
    WR360.ImageRotator.prototype.lN = function() {
        this.nJ += this.O;
        var tc = this.bU.sd() > 1;
        var dragSensitivity = this.bA.settings.control.dragSensitivity;
        var ru = tc == true && dragSensitivity > 0 && Math.abs(this.cp - this.dO) < dragSensitivity;
        if (ru == false) {
            if (this.cp != this.dO) {
                this.nJ = 0;
            }
            if (this.cp > this.dO) {
                this.bV.fo();
            } else if (this.cp < this.dO) {
                this.bV.eT();
            }
            this.dO = this.cp;
        }
        if (tc == true) {
            var rowSensitivity = this.bA.settings.control.rowSensitivity;
            if (rowSensitivity > 0) {
                var ti = this.ha - this.ei;
                if (ti > rowSensitivity) {
                    this.bV.ta();
                    this.ei = this.ha;
                } else if (ti < -rowSensitivity) {
                    this.bV.sx();
                    this.ei = this.ha;
                }
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.iJ = function() {
        if (this.rI) {
            this.bV.sx();
        } else if (this.nX) {
            this.bV.ta();
        } else if (this.hl) {
            this.bV.eT();
        } else {
            this.bV.fo();
        }
    }
    ;
    WR360.ImageRotator.prototype.hc = function(show) {
        if (this.settings.progressCallback != null) {
            this.settings.progressCallback(this.av, -1, show);
            return;
        }
        if (show) {
            this.cq.show();
        } else {
            this.cq.hide();
        }
    }
    ;
    WR360.lE = function(V, bh) {
        this.bh = bh;
        this.showProgressNum = V.settings.bI.bz;
        this.tf = bh.qQ();
        this.rO = false;
        this.rV = function() {
            if (this.rO == true) {
                return;
            }
            jQuery(bh.kW).show();
            jQuery(bh.fj).html("");
            if (jQuery.ad.mozilla == true && bh.qQ() == false) {
                jQuery(bh.fj).css("margin-top", "-1px");
            } else if (jQuery.ad.rY == true || jQuery.ad.sO == true) {
                jQuery(bh.fj).css("margin-top", "1px");
            }
            if (this.showProgressNum == false) {
                jQuery(bh.fj).hide();
            } else {
                jQuery(bh.fj).show();
            }
        }
        ;
        jQuery(bh.kW).addClass(this.tf == true ? "progress_bar_anim_fs" : "progress_bar_anim");
        if (bh.settings.progressCallback == null) {
            var bn = this;
            setTimeout(function() {
                bn.rV();
            }, this.tf == true ? 500 : 200);
        }
        this.il = function(percent) {
            if (this.showProgressNum == true) {
                jQuery(bh.fj).html(percent + "%");
            }
        }
        ;
        this.destroy = function() {
            if (this.showProgressNum == true) {
                jQuery(bh.fj).html("");
                jQuery(bh.fj).hide();
            }
            jQuery(bh.kW).hide();
            jQuery(bh.ja).show();
            this.rO = true;
        }
        ;
        this.show = function() {
            jQuery(bh.kW).show();
        }
        ;
        this.hide = function() {
            jQuery(bh.kW).hide();
        }
        ;
    }
    ;
    WR360.bZ = function() {}
    ;
    WR360.bZ.od = function(text) {
        this.eF("INFO", text);
    }
    ;
    WR360.bZ.pd = function(text) {
        this.eF("DBG", text);
    }
    ;
    WR360.bZ.gA = function(text) {
        this.eF("ERR", text);
    }
    ;
    WR360.bZ.oU = function(text) {
        this.eF("CRI", text);
    }
    ;
    WR360.bZ.nG = function(text) {
        this.eF("WRN", text);
    }
    ;
    WR360.bZ.eF = function(lA, text) {
        if (window.console) {
            window.console.log(lA + " " + text);
        }
    }
    ;
    function mg() {
        if (jQuery.ad.msie) {
            if (parseInt(jQuery.ad.version.substring(0, 1)) < 9 && jQuery.ad.version.substring(1, 2) == ".") {
                return 1;
            }
        }
        return 0;
    }
    function mD() {
        return 2;
    }
    WR360.ImageRotator.prototype.qn = function() {
        this.ey = false;
        this.gT = false;
        jQuery(this.cl).fadeOut(200);
    }
    ;
    WR360.ImageRotator.prototype.pm = function(e) {
        if (this.ey) {
            if (this.gT == false) {
                this.qn();
                return true;
            }
            return true;
        }
        return false;
    }
    ;
    WR360.ImageRotator.prototype.ph = function() {
        this.ey = false;
        this.gT = false;
        jQuery(this.cl).css("display", "none");
    }
    ;
    WR360.ImageRotator.prototype.mF = function() {
        var scrollX = 0
          , scrollY = 0;
        if (typeof window.pageYOffset == "number") {
            scrollX = window.pageXOffset;
            scrollY = window.pageYOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            scrollX = document.body.scrollLeft;
            scrollY = document.body.scrollTop;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            scrollX = document.documentElement.scrollLeft;
            scrollY = document.documentElement.scrollTop;
        }
        return {
            scrollX: scrollX,
            scrollY: scrollY
        };
    }
    ;
    WR360.ImageRotator.prototype.nP = function(e) {
        var cC = WR360.by.fS(e);
        var offset = this.bp.offset();
        jQuery(this.cl).css("left", cC.x - offset.left);
        jQuery(this.cl).css("top", cC.y - offset.top);
        jQuery(this.cl).fadeIn(200);
        this.ey = true;
        return false;
    }
    ;
    function ow(e) {
        e.preventDefault();
        return false;
    }
    WR360.Toolbar = function(bh) {
        this.sD = 0;
        this.tg = 0;
        this.hM = 0;
        this.iz = 0;
        this.ik = 0;
        this.iy = 0;
        this.rk = 0;
        this.jZ = 0;
        this.bh = bh;
        this.iB = false;
    }
    ;
    WR360.Toolbar.prototype.cD = function() {
        if (this.iB == false) {
            this.sD = jQuery(this.bh.sR).outerWidth(true);
            this.tg = jQuery(this.bh.sj).outerWidth(true);
            this.hM = jQuery(this.bh.gU).outerWidth(true);
            this.iz = jQuery(this.bh.hd).outerWidth(true);
            this.ik = jQuery(this.bh.jA).outerWidth(true);
            this.iy = jQuery(this.bh.jD).outerWidth(true);
            this.rk = jQuery(this.bh.pQ).outerWidth(true);
            this.jZ = jQuery(this.bh.kp).outerWidth(true);
            this.iB = true;
        }
    }
    ;
    WR360.Toolbar.prototype.Translate = function(V, bh) {
        if (V.settings.bI.iU == true) {
            if (typeof WR360_TRANSLATE_OVERRIDE !== "undefined") {
                bh.settings.i18n = WR360_TRANSLATE_OVERRIDE;
            }
            jQuery(this.bh.sR).attr("title", bh.settings.i18n.sV);
            jQuery(this.bh.sj).attr("title", bh.settings.i18n.sy);
            jQuery(this.bh.gU).attr("title", bh.settings.i18n.arrowLeftButtonTooltip);
            jQuery(this.bh.hd).attr("title", bh.settings.i18n.arrowRightButtonTooltip);
            jQuery(this.bh.jA).attr("title", bh.settings.i18n.zoomButtonsTooltip);
            jQuery(this.bh.jD).attr("title", bh.settings.i18n.togglePlayButtonTooltip);
            jQuery(this.bh.pQ).attr("title", bh.settings.i18n.fullScreenButtonTooltip);
            jQuery(this.bh.kp).attr("title", bh.settings.i18n.hotspotButtonTooltip);
        }
    }
    ;
    WR360.Toolbar.prototype.mV = function(V, bh) {
        var align = V.settings.bI.gx;
        if (align == 0) {
            jQuery(bh.ie).css("float", "none");
        } else if (align == -1) {
            jQuery(bh.ie).css("float", "left");
        } else if (align == 1) {
            jQuery(bh.ie).css("float", "right");
        }
        jQuery(bh.nQ).css("background-color", V.settings.bI.gH);
        jQuery(bh.nQ).css("opacity", V.settings.bI.gX);
        jQuery(bh.ie).css("opacity", V.settings.bI.iC);
        var cT = 0;
        if (V.settings.bI.hb == true) {
            cT += this.hM + this.iz;
            jQuery(bh.gU).show();
            jQuery(bh.hd).show();
            if (V.aw.rows > 1) {
                cT += this.sD + this.tg;
                jQuery(bh.sR).show();
                jQuery(bh.sj).show();
            } else {
                jQuery(bh.sR).hide();
                jQuery(bh.sj).hide();
            }
        } else {
            jQuery(bh.sR).hide();
            jQuery(bh.sj).hide();
            jQuery(bh.gU).hide();
            jQuery(bh.hd).hide();
        }
        if (V.settings.bI.gw == true && bh.av == false) {
            cT += this.ik;
            bh.dN.aH(true);
        } else {
            bh.dN.aH(false);
        }
        if (V.settings.bI.gj == true) {
            cT += this.iy;
            jQuery(bh.jD).show();
        } else {
            jQuery(bh.jD).hide();
        }
        var jO = WR360.by.mZ() && !bh.pz(bh.bp[0]);
        if (V.settings.bI.iT == true && bh.av == false && jO == false) {
            cT += this.rk;
            bh.qZ.aH(true);
        } else {
            bh.qZ.aH(false);
        }
        if (V.settings.bI.bY == true && V.ly()) {
            cT += this.jZ;
            bh.bY.aH(true);
        } else {
            bh.bY.aH(false);
        }
        jQuery(this.bh.ie).css("width", cT);
        this.Translate(V, bh);
    }
    ;
    WR360.Translations = function() {
        this.zoomButtonsTooltip = "Zoom in / out";
        this.hotspotButtonTooltip = "Hot-spots on / off";
        this.fullScreenButtonTooltip = "Full Screen on / off";
        this.togglePlayButtonTooltip = "Play / Stop";
        this.arrowLeftButtonTooltip = "Rotate left";
        this.arrowRightButtonTooltip = "Rotate right";
        this.sV = "Move up";
        this.sy = "Move down";
    }
    ;
    WR360.jQ = function() {
        this.graphicsPath = "";
        this.configFileURL = "";
        this.rootPath = "";
        this.responsiveBaseWidth = 0;
        this.responsiveMinHeight = 0;
        this.zIndexLayersOn = true;
        this.inBrowserFullScreen = false;
        this.fullScreenOnClick = false;
        this.apiReadyCallback = null;
        this.progressCallback = null;
        this.googleEventTracking = false;
        this.eventTrackingAlias = "";
        this.crossDomainConfigLoader = false;
        this.version = "v3.6 (build 3.6.1.180)";
        this.i18n = new WR360.Translations;
    }
    ;
    WR360.Events = function() {}
    ;
    WR360.Events.hG = "HIDE_ROLLOVER";
    WR360.lC = function() {
        this.ew = [];
    }
    ;
    WR360.lC.prototype = {
        constructor: WR360.lC,
        add: function(rotator) {
            if (!(rotator instanceof WR360.ImageRotator)) {
                throw new Error("Added object is not an ImageRotator object.");
            }
            for (var i = 0, ia = this.ew.length; i < ia; i++) {
                if (this.ew[i] === rotator) {
                    throw new Error("Added ImageRotator already exists.");
                }
            }
            this.ew.push(rotator);
        },
        remove: function(rotator) {
            for (var i = 0, ia = this.ew.length; i < ia; i++) {
                if (this.ew[i] === rotator) {
                    this.ew.splice(i, 1);
                    break;
                }
            }
        },
        get: function(index) {
            if (index < 0 || index > this.ew.length - 1) {
                return null;
            } else {
                return this.ew[index];
            }
        }
    };
    var lH = new WR360.lC;
})();
var _imageRotator = new WR360.ImageRotator;
(function() {
    jQuery.fn.rotator = function(options) {
        var oR = jQuery.extend({}, jQuery.fn.rotator.defaults, options);
        return this.each(function() {
            var o = jQuery.metadata ? jQuery.extend({}, oR, jQuery.metadata.get(this)) : oR;
            qu(this, o);
        });
    }
    ;
    function qu(qd, oR) {
        var cR = qd.attributes.id.value;
        if (cR == null || (typeof cR).toString().toLowerCase() != "string" || cR.length == 0) {
            throw new Error("Can't get Player ID from the jQuery selected element.");
        }
        var ir = WR360.ImageRotator.Create(cR);
        if (ir == null) {
            return;
        }
        ir.licenseCode = oR.licenseCode;
        ir.licenseFileURL = oR.licenseFileURL;
        ir.settings.graphicsPath = oR.graphicsPath;
        ir.settings.configFileURL = oR.configFileURL;
        ir.settings.rootPath = oR.rootPath;
        ir.settings.responsiveBaseWidth = oR.responsiveBaseWidth;
        ir.settings.responsiveMinHeight = oR.responsiveMinHeight;
        ir.settings.zIndexLayersOn = oR.zIndexLayersOn;
        ir.settings.i18n = oR.i18n;
        ir.settings.fullScreenOnClick = oR.fullScreenOnClick;
        ir.settings.inBrowserFullScreen = oR.inBrowserFullScreen;
        ir.settings.apiReadyCallback = oR.apiReadyCallback;
        ir.settings.progressCallback = oR.progressCallback;
        ir.settings.googleEventTracking = oR.googleEventTracking;
        ir.settings.eventTrackingAlias = oR.eventTrackingAlias;
        ir.settings.crossDomainConfigLoader = oR.crossDomainConfigLoader;
        if (ir.qC) {
            ir.qC(oR.configFileFullScreenURL);
        }
        ir.runImageRotator();
    }
    jQuery.fn.rotator.defaults = {
        licenseCode: "",
        licenseFileURL: "license.lic",
        graphicsPath: "",
        configFileURL: "",
        configFileFullScreenURL: "",
        rootPath: "",
        responsiveBaseWidth: 0,
        responsiveMinHeight: 0,
        zIndexLayersOn: true,
        fullScreenOnClick: false,
        inBrowserFullScreen: false,
        i18n: new WR360.Translations,
        apiReadyCallback: null,
        progressCallback: null,
        crossDomainConfigLoader: false,
        googleEventTracking: false,
        eventTrackingAlias: ""
    };
})();
(function() {
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var d = window.ac = {};
    var a = d.fk = {
        iv: function(h, g) {
            return h << g | h >>> 32 - g;
        },
        om: function(h, g) {
            return h << 32 - g | h >>> g;
        },
        endian: function(h) {
            if (h.constructor == Number) {
                return a.iv(h, 8) & 16711935 | a.iv(h, 24) & 4278255360;
            }
            for (var g = 0; g < h.length; g++) {
                h[g] = a.endian(h[g]);
            }
            return h;
        },
        mw: function(h) {
            for (var g = []; h > 0; h--) {
                g.push(Math.floor(Math.random() * 256));
            }
            return g;
        },
        ar: function(h) {
            for (var k = [], j = 0, g = 0; j < h.length; j++,
            g += 8) {
                k[g >>> 5] |= h[j] << 24 - g % 32;
            }
            return k;
        },
        iP: function(i) {
            for (var h = [], g = 0; g < i.length * 32; g += 8) {
                h.push(i[g >>> 5] >>> 24 - g % 32 & 255);
            }
            return h;
        },
        aZ: function(g) {
            for (var j = [], h = 0; h < g.length; h++) {
                j.push((g[h] >>> 4).toString(16));
                j.push((g[h] & 15).toString(16));
            }
            return j.join("");
        },
        oI: function(h) {
            for (var g = [], i = 0; i < h.length; i += 2) {
                g.push(parseInt(h.substr(i, 2), 16));
            }
            return g;
        },
        aJ: function(h) {
            if (typeof btoa == "function") {
                return btoa(e.T(h));
            }
            for (var g = [], l = 0; l < h.length; l += 3) {
                var m = h[l] << 16 | h[l + 1] << 8 | h[l + 2];
                for (var k = 0; k < 4; k++) {
                    if (l * 8 + k * 6 <= h.length * 8) {
                        g.push(c.charAt(m >>> 6 * (3 - k) & 63));
                    } else {
                        g.push("=");
                    }
                }
            }
            return g.join("");
        },
        bL: function(h) {
            if (typeof atob == "function") {
                return e.de(atob(h));
            }
            h = h.replace(/[^A-Z0-9+\/]/gi, "");
            for (var g = [], j = 0, k = 0; j < h.length; k = ++j % 4) {
                if (k == 0) {
                    continue;
                }
                g.push((c.indexOf(h.charAt(j - 1)) & Math.pow(2, -2 * k + 8) - 1) << k * 2 | c.indexOf(h.charAt(j)) >>> 6 - k * 2);
            }
            return g;
        }
    };
    d.mode = {};
    var b = d.charenc = {};
    var f = b.UTF8 = {
        de: function(g) {
            return e.de(unescape(encodeURIComponent(g)));
        },
        T: function(g) {
            return decodeURIComponent(escape(e.T(g)));
        }
    };
    var e = b.Binary = {
        de: function(j) {
            for (var g = [], h = 0; h < j.length; h++) {
                g.push(j.charCodeAt(h));
            }
            return g;
        },
        T: function(g) {
            for (var j = [], h = 0; h < g.length; h++) {
                j.push(String.fromCharCode(g[h]));
            }
            return j.join("");
        }
    };
})();
(function() {
    var f = ac
      , a = f.fk
      , b = f.charenc
      , e = b.UTF8
      , d = b.Binary;
    var c = f.SHA1 = function(i, g) {
        var h = a.iP(c.mn(i));
        return g && g.asBytes ? h : g && g.asString ? d.T(h) : a.aZ(h);
    }
    ;
    c.mn = function(o) {
        if (o.constructor == String) {
            o = e.de(o);
        }
        var v = a.ar(o)
          , x = o.length * 8
          , p = []
          , r = 1732584193
          , q = -271733879
          , k = -1732584194
          , h = 271733878
          , g = -1009589776;
        v[x >> 5] |= 128 << 24 - x % 32;
        v[(x + 64 >>> 9 << 4) + 15] = x;
        for (var z = 0; z < v.length; z += 16) {
            var E = r
              , D = q
              , C = k
              , B = h
              , A = g;
            for (var y = 0; y < 80; y++) {
                if (y < 16) {
                    p[y] = v[z + y];
                } else {
                    var u = p[y - 3] ^ p[y - 8] ^ p[y - 14] ^ p[y - 16];
                    p[y] = u << 1 | u >>> 31;
                }
                var s = (r << 5 | r >>> 27) + g + (p[y] >>> 0) + (y < 20 ? (q & k | ~q & h) + 1518500249 : y < 40 ? (q ^ k ^ h) + 1859775393 : y < 60 ? (q & k | q & h | k & h) - 1894007588 : (q ^ k ^ h) - 899497514);
                g = h;
                h = k;
                k = q << 30 | q >>> 2;
                q = r;
                r = s;
            }
            r += E;
            q += D;
            k += C;
            h += B;
            g += A;
        }
        return [r, q, k, h, g];
    }
    ;
    c.dB = 16;
})();
(function() {
    var e = ac
      , a = e.fk
      , b = e.charenc
      , d = b.UTF8
      , c = b.Binary;
    e.HMAC = function(l, m, k, h) {
        if (m.constructor == String) {
            m = d.de(m);
        }
        if (k.constructor == String) {
            k = d.de(k);
        }
        if (k.length > l.dB * 4) {
            k = l(k, {
                asBytes: true
            });
        }
        var g = k.slice(0)
          , n = k.slice(0);
        for (var j = 0; j < l.dB * 4; j++) {
            g[j] ^= 92;
            n[j] ^= 54;
        }
        var f = l(g.concat(l(n.concat(m), {
            asBytes: true
        })), {
            asBytes: true
        });
        return h && h.asBytes ? f : h && h.asString ? c.T(f) : a.aZ(f);
    }
    ;
})();
function getBrowserId(t, k) {
    var kb = ac.fk.bL(k);
    return ac.G.aD(t, kb);
}
(function() {
    var e = ac
      , a = e.fk
      , b = e.charenc
      , d = b.UTF8
      , c = b.Binary;
    e.PBKDF2 = function(q, o, f, t) {
        if (q.constructor == String) {
            q = d.de(q);
        }
        if (o.constructor == String) {
            o = d.de(o);
        }
        var s = t && t.hasher || e.SHA1
          , k = t && t.iterations || 1;
        function p(i, j) {
            return e.HMAC(s, j, i, {
                asBytes: true
            });
        }
        var h = []
          , g = 1;
        while (h.length < f) {
            var l = p(q, o.concat(a.iP([g])));
            for (var r = l, n = 1; n < k; n++) {
                r = p(q, r);
                for (var m = 0; m < l.length; m++) {
                    l[m] ^= r[m];
                }
            }
            h = h.concat(l);
            g++;
        }
        h.length = f;
        return t && t.asBytes ? h : t && t.asString ? c.T(h) : a.aZ(h);
    }
    ;
})();
(function() {
    ac.mode.OFB = {
        jc: a,
        aD: a
    };
    function a(c, b, d) {
        var g = c.dB * 4
          , f = d.slice(0);
        for (var e = 0; e < b.length; e++) {
            if (e % g == 0) {
                c.mX(f, 0);
            }
            b[e] ^= f[e % g];
        }
    }
})();
(function() {
    var l = ac
      , a = l.fk
      , u = l.charenc
      , s = u.UTF8
      , j = u.Binary;
    var v = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
    for (var n = [], r = 0; r < 256; r++) {
        n[v[r]] = r;
    }
    var q = []
      , p = []
      , m = []
      , h = []
      , g = []
      , e = [];
    function f(y, x) {
        for (var w = 0, z = 0; z < 8; z++) {
            if (x & 1) {
                w ^= y;
            }
            var A = y & 128;
            y = y << 1 & 255;
            if (A) {
                y ^= 27;
            }
            x >>>= 1;
        }
        return w;
    }
    for (var r = 0; r < 256; r++) {
        q[r] = f(r, 2);
        p[r] = f(r, 3);
        m[r] = f(r, 9);
        h[r] = f(r, 11);
        g[r] = f(r, 13);
        e[r] = f(r, 14);
    }
    var k = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    var c = [[], [], [], []], d, b, t;
    var o = l.G = {
        jc: function(A, z, y) {
            var i = s.de(A)
              , x = a.mw(o.dB * 4)
              , w = z.constructor == String ? l.PBKDF2(z, x, 32, {
                asBytes: true
            }) : z;
            var mode = y && y.mode || l.mode.OFB;
            o.jC(w);
            mode.jc(o, i, x);
            return a.aJ(x.concat(i));
        },
        aD: function(z, y, x) {
            var A = a.bL(z)
              , w = A.splice(0, o.dB * 4)
              , i = y.constructor == String ? l.PBKDF2(y, w, 32, {
                asBytes: true
            }) : y;
            var mode = x && x.mode || l.mode.OFB;
            o.jC(i);
            mode.aD(o, A, w);
            return s.T(A);
        },
        dB: 4,
        mX: function(w, x) {
            for (var D = 0; D < o.dB; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] = w[x + i * 4 + D];
                }
            }
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] ^= t[i][D];
                }
            }
            for (var C = 1; C < b; C++) {
                for (var D = 0; D < 4; D++) {
                    for (var i = 0; i < 4; i++) {
                        c[D][i] = v[c[D][i]];
                    }
                }
                c[1].push(c[1].shift());
                c[2].push(c[2].shift());
                c[2].push(c[2].shift());
                c[3].unshift(c[3].pop());
                for (var i = 0; i < 4; i++) {
                    var B = c[0][i]
                      , A = c[1][i]
                      , z = c[2][i]
                      , y = c[3][i];
                    c[0][i] = q[B] ^ p[A] ^ z ^ y;
                    c[1][i] = B ^ q[A] ^ p[z] ^ y;
                    c[2][i] = B ^ A ^ q[z] ^ p[y];
                    c[3][i] = p[B] ^ A ^ z ^ q[y];
                }
                for (var D = 0; D < 4; D++) {
                    for (var i = 0; i < 4; i++) {
                        c[D][i] ^= t[C * 4 + i][D];
                    }
                }
            }
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] = v[c[D][i]];
                }
            }
            c[1].push(c[1].shift());
            c[2].push(c[2].shift());
            c[2].push(c[2].shift());
            c[3].unshift(c[3].pop());
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] ^= t[b * 4 + i][D];
                }
            }
            for (var D = 0; D < o.dB; D++) {
                for (var i = 0; i < 4; i++) {
                    w[x + i * 4 + D] = c[D][i];
                }
            }
        },
        oE: function(x, w) {
            for (var D = 0; D < o.dB; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] = x[w + i * 4 + D];
                }
            }
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] ^= t[b * 4 + i][D];
                }
            }
            for (var C = 1; C < b; C++) {
                c[1].unshift(c[1].pop());
                c[2].push(c[2].shift());
                c[2].push(c[2].shift());
                c[3].push(c[3].shift());
                for (var D = 0; D < 4; D++) {
                    for (var i = 0; i < 4; i++) {
                        c[D][i] = n[c[D][i]];
                    }
                }
                for (var D = 0; D < 4; D++) {
                    for (var i = 0; i < 4; i++) {
                        c[D][i] ^= t[(b - C) * 4 + i][D];
                    }
                }
                for (var i = 0; i < 4; i++) {
                    var B = c[0][i]
                      , A = c[1][i]
                      , z = c[2][i]
                      , y = c[3][i];
                    c[0][i] = e[B] ^ h[A] ^ g[z] ^ m[y];
                    c[1][i] = m[B] ^ e[A] ^ h[z] ^ g[y];
                    c[2][i] = g[B] ^ m[A] ^ e[z] ^ h[y];
                    c[3][i] = h[B] ^ g[A] ^ m[z] ^ e[y];
                }
            }
            c[1].unshift(c[1].pop());
            c[2].push(c[2].shift());
            c[2].push(c[2].shift());
            c[3].push(c[3].shift());
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] = n[c[D][i]];
                }
            }
            for (var D = 0; D < 4; D++) {
                for (var i = 0; i < 4; i++) {
                    c[D][i] ^= t[i][D];
                }
            }
            for (var D = 0; D < o.dB; D++) {
                for (var i = 0; i < 4; i++) {
                    x[w + i * 4 + D] = c[D][i];
                }
            }
        },
        jC: function(i) {
            d = i.length / 4;
            b = d + 6;
            o.ni(i);
        },
        ni: function(w) {
            t = [];
            for (var x = 0; x < d; x++) {
                t[x] = [w[x * 4], w[x * 4 + 1], w[x * 4 + 2], w[x * 4 + 3]];
            }
            for (var x = d; x < o.dB * (b + 1); x++) {
                var i = [t[x - 1][0], t[x - 1][1], t[x - 1][2], t[x - 1][3]];
                if (x % d == 0) {
                    i.push(i.shift());
                    i[0] = v[i[0]];
                    i[1] = v[i[1]];
                    i[2] = v[i[2]];
                    i[3] = v[i[3]];
                    i[0] ^= k[x / d];
                } else {
                    if (d > 6 && x % d == 4) {
                        i[0] = v[i[0]];
                        i[1] = v[i[1]];
                        i[2] = v[i[2]];
                        i[3] = v[i[3]];
                    }
                }
                t[x] = [t[x - d][0] ^ i[0], t[x - d][1] ^ i[1], t[x - d][2] ^ i[2], t[x - d][3] ^ i[3]];
            }
        }
    };
})();
(function() {
    WR360.ImageRotator.prototype.jL = function(gh, e, target) {
        var aX = true;
        if (this.R) {
            return;
        }
        if (!this.dn) {
            if (this.gD() == true) {
                this.sm.Event(WR360.sY.rU.ZOOM);
            }
            this.kX(this.mJ(), aX, gh, e, target);
        } else {
            this.kI(aX);
        }
    }
    ;
    WR360.ImageRotator.prototype.kX = function(ratio, aX, gh, e, target) {
        var fz = 300;
        if (!this.dn) {
            var deltaX = 0;
            var deltaY = 0;
            var hJ = false;
            var jq = this.bU.lU(this.bV.kl);
            var af = jq[this.bV.aF];
            if (af.image.cS != null) {
                hJ = true;
            }
            if (this.bA.settings.control.hideHotspotsOnZoom) {
                this.lz();
            }
            var gd = this.aU['_viewPort.x'] - (this.aU['_viewPort.width'] * ratio - this.aU['_viewPort.width']) / 2 + deltaX;
            var ho = this.aU['_viewPort.y'] - (this.aU['_viewPort.height'] * ratio - this.aU['_viewPort.height']) / 2 + deltaY;
            var dC = this.aU['_viewPort.width'] * ratio;
            var cK = this.aU['_viewPort.height'] * ratio;
            if (!aX) {
                this.bV.aG.css("margin-left", gd);
                this.bV.aG.css("margin-top", ho);
                this.bV.aG.css("width", dC);
                this.bV.aG.css("height", cK);
                this.bV.aG.css("left", 0);
                this.bV.aG.css("top", 0);
                this.eL.eY = -(dC - this.fm);
                this.eL.ev = -(cK - this.fJ);
                this.eL.fd = 0;
                this.eL.fM = 0;
                this.qY = false;
                this.dn = true;
                this.dN.as(true);
                if (hJ) {
                    this.fK(deltaX, deltaY);
                }
                this.bV.fP();
                this.dispatchEvent(new WR360.Event(WR360.ImageRotator.Events.IMAGE_ZOOM,false,false,100));
            } else {
                this.bV.aG.animate({
                    marginLeft: gd,
                    marginTop: ho,
                    width: dC,
                    height: cK,
                    left: 0,
                    top: 0
                }, fz, jQuery.proxy(function() {
                    if (this.fm - dC < 0) {
                        this.eL.eY = this.fm - dC;
                        this.eL.fd = 0;
                    } else {
                        this.eL.eY = 0;
                        this.eL.fd = this.fm - dC;
                    }
                    if (this.fJ - cK < 0) {
                        this.eL.ev = this.fJ - cK;
                        this.eL.fM = 0;
                    } else {
                        this.eL.ev = 0;
                        this.eL.fM = this.fJ - cK;
                    }
                    this.dn = true;
                    this.dN.as(true);
                    if (hJ) {
                        this.fK(deltaX, deltaY);
                    }
                    this.bV.fP();
                    this.R = false;
                    this.dispatchEvent(new WR360.Event(WR360.ImageRotator.Events.IMAGE_ZOOM,false,false,100));
                }, this));
                this.bV.kM(fz, this.bV.aG.css("left").bE(), this.bV.aG.css("top").bE(), gd, ho, dC, cK);
                this.R = true;
                this.qY = false;
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.kI = function(aX) {
        var fz = 300;
        if (this.dn) {
            this.bV.aS(null);
            this.bV.en = false;
            this.bV.dE(this.bV.aF);
            if (this.bV.kL != null) {
                this.bV.kL.hide();
            }
            if (!aX) {
                this.bV.aG.css("margin-left", this.aU['_viewPort.x']);
                this.bV.aG.css("margin-top", this.aU['_viewPort.y']);
                this.bV.aG.css("width", this.aU['_viewPort.width']);
                this.bV.aG.css("height", this.aU['_viewPort.height']);
                this.bV.aG.css("left", 0);
                this.bV.aG.css("top", 0);
                this.qY = true;
                this.dn = false;
                this.dN.as(false);
                this.iV();
                this.bV.fP();
                this.dispatchEvent(new WR360.Event(WR360.ImageRotator.Events.IMAGE_ZOOM,false,false,0));
            } else {
                this.bV.aG.animate({
                    marginLeft: this.aU['_viewPort.x'],
                    marginTop: this.aU['_viewPort.y'],
                    width: this.aU['_viewPort.width'],
                    height: this.aU['_viewPort.height'],
                    left: 0,
                    top: 0
                }, fz, jQuery.proxy(function() {
                    this.qY = true;
                    this.dn = false;
                    this.dN.as(false);
                    this.iV();
                    this.R = false;
                    this.dispatchEvent(new WR360.Event(WR360.ImageRotator.Events.IMAGE_ZOOM,false,false,0));
                }, this));
                this.bV.kM(fz, 0, 0, this.aU['_viewPort.x'], this.aU['_viewPort.y'], this.aU['_viewPort.width'], this.aU['_viewPort.height']);
                this.R = true;
            }
        }
    }
    ;
})();
(function() {
    WR360.ImageRotator.prototype.getAPI = function() {
        return new WR360.API(this);
    }
    ;
    WR360.API = function(L) {
        this.toolbar = new WR360.API.Tools(L);
        this.images = new WR360.API.Images(L);
        this.configuration = new WR360.API.Config(L);
        this.hotspots = new WR360.API.Hotspots(L);
        this.L = L;
    }
    ;
    WR360.API.prototype.reload = function(configFileURL, rootPath, hZ, reloadImageIndex, reloadRowIndex) {
        this.L.reload(configFileURL, rootPath, hZ, reloadImageIndex, reloadRowIndex);
    }
    ;
    WR360.API.prototype.updateDimensions = function() {
        this.L.pS();
    }
    ;
    WR360.API.Hotspots = function(L) {
        this.L = L;
    }
    ;
    WR360.API.Hotspots.prototype.getDynamicHotspots = function() {
        return this.L.bV.bo();
    }
    ;
    WR360.API.Hotspots.prototype.hide = function(dj, isHide) {
        this.L.bV.qb(dj, isHide);
    }
    ;
    WR360.API.Hotspots.prototype.activate = function(dj, timeout, hZ) {
        this.L.bV.ActivateHotspot(dj, timeout, hZ);
    }
    ;
    WR360.API.Hotspots.prototype.deactivate = function(dj) {
        this.L.bV.op(dj);
    }
    ;
    WR360.API.Hotspots.prototype.onAction = function(hZ) {
        if (typeof hZ !== "function") {
            return;
        }
        var cA = this.L.bV.cA;
        for (var fZ in cA) {
            var aN = cA[fZ];
            if (aN instanceof WR360.aT) {
                aN.aO.addEventListener(WR360.fC.Events.CLICK_ACTION, function() {
                    var param = this.bi;
                    return hZ(param);
                });
            }
        }
    }
    ;
    WR360.API.Hotspots.prototype.onActivate = function(hZ) {
        if (typeof hZ !== "function") {
            return;
        }
        var cA = this.L.bV.cA;
        for (var fZ in cA) {
            var aN = cA[fZ];
            if (aN instanceof WR360.aT) {
                aN.addEventListener(WR360.aT.Events.ACTIVATE, function() {
                    var param = this.mv();
                    return hZ(param);
                });
            }
        }
    }
    ;
    WR360.API.Hotspots.prototype.onDeactivate = function(hZ) {
        if (typeof hZ !== "function") {
            return;
        }
        var cA = this.L.bV.cA;
        for (var fZ in cA) {
            var aN = cA[fZ];
            if (aN instanceof WR360.aT) {
                aN.addEventListener(WR360.aT.Events.DEACTIVATE, function() {
                    var param = this.mv();
                    return hZ(param);
                });
            }
        }
    }
    ;
    WR360.API.Tools = function(L) {
        this.L = L;
    }
    ;
    WR360.API.Tools.prototype.zoomToggle = function() {
        this.L.mt();
    }
    ;
    WR360.API.Tools.prototype.hotspotToggle = function() {
        this.L.mf();
    }
    ;
    WR360.API.Tools.prototype.openFullScreen = function() {
        this.L.rc(null);
    }
    ;
    WR360.API.Tools.prototype.rotateOnce = function(period, hZ) {
        if (hZ !== undefined) {
            this.L.gb = hZ;
        }
        this.L.fO();
        this.L.gJ(period);
    }
    ;
    WR360.API.Tools.prototype.playbackToggle = function(period) {
        if (this.L.pY == true) {
            this.L.cJ();
        } else {
            this.L.co();
            this.L.gJ(period);
            if (this.L.gD() == true) {
                this.L.sm.Event(WR360.sY.rU.rQ);
            }
        }
    }
    ;
    WR360.API.Tools.prototype.playbackStop = function() {
        this.L.cJ();
    }
    ;
    WR360.API.Tools.prototype.playbackStart = function(period) {
        this.L.co();
        this.L.cJ();
        this.L.gJ(period);
    }
    ;
    WR360.API.Tools.prototype.moveRowUp = function(ef) {
        this.L.bV.sx();
        if (typeof ef === "undefined" || ef === true) {
            if (this.L.gD() == true) {
                this.L.sm.Event(WR360.sY.rU.sP);
            }
        }
    }
    ;
    WR360.API.Tools.prototype.moveRowDown = function(ef) {
        this.L.bV.ta();
        if (typeof ef === "undefined" || ef === true) {
            if (this.L.gD() == true) {
                this.L.sm.Event(WR360.sY.rU.sP);
            }
        }
    }
    ;
    WR360.API.Tools.prototype.startLeftArrowRotate = function() {
        this.L.co();
        this.L.cJ();
        this.L.np();
    }
    ;
    WR360.API.Tools.prototype.startRightArrowRotate = function() {
        this.L.co();
        this.L.cJ();
        this.L.nv();
    }
    ;
    WR360.API.Tools.prototype.stopArrowRotate = function() {
        this.L.co();
    }
    ;
    WR360.API.Images = function(L) {
        this.L = L;
    }
    ;
    WR360.API.Images.prototype.getRowCount = function() {
        return this.L.bV.bU.sd();
    }
    ;
    WR360.API.Images.prototype.getTotalImageCount = function() {
        return this.L.bV.bU.rr();
    }
    ;
    WR360.API.Images.prototype.getCurrentRowIndex = function() {
        return this.L.bV.kl;
    }
    ;
    WR360.API.Images.prototype.getCurrentImageIndex = function() {
        return this.L.bV.ob();
    }
    ;
    WR360.API.Images.prototype.showImageByIndex = function(index, rowIndex) {
        this.L.co();
        this.L.cJ();
        this.L.bV.rE();
        if (typeof rowIndex !== "undefined") {
            if (rowIndex < this.L.bV.bU.sd() && rowIndex >= 0) {
                this.L.bV.kl = rowIndex;
            }
        }
        this.L.bV.dE(index);
    }
    ;
    WR360.API.Images.prototype.showImageByDelta = function(jG, rowIndex) {
        this.L.co();
        this.L.cJ();
        this.L.bV.rE();
        if (typeof rowIndex !== "undefined") {
            if (rowIndex < this.L.bV.bU.sd() && rowIndex >= 0) {
                this.L.bV.kl = rowIndex;
            }
        }
        this.L.bV.iG(jG);
    }
    ;
    WR360.API.Images.prototype.playToLabel = function(label, period, hZ) {
        this.L.co();
        this.L.cJ();
        this.L.bV.qB(label, period, hZ);
    }
    ;
    WR360.API.Images.prototype.jumpToLabel = function(label) {
        this.L.co();
        this.L.cJ();
        this.L.bV.qo(label);
    }
    ;
    WR360.API.Images.prototype.onZoom = function(hZ) {
        this.L.addEventListener(WR360.ImageRotator.Events.IMAGE_ZOOM, function(event) {
            return hZ(event.param);
        });
    }
    ;
    WR360.API.Config = function(L) {
        this.L = L;
    }
    ;
})();
(function() {
    WR360.ImageRotator.prototype.qQ = function() {
        return this.av;
    }
    ;
    WR360.ImageRotator.prototype.qr = function() {
        if (this.av === undefined) {
            this.av = false;
        }
        if (this.qR === undefined) {
            this.qR = null;
        }
        if (this.pH === undefined) {
            this.pH = null;
        }
        if (this.qA === undefined) {
            this.qA = "";
        }
        if (this.configFileFullScreenURL === undefined) {
            this.configFileFullScreenURL = "";
        }
        if (this.pF === undefined) {
            this.pF = null;
        }
        if (this.qj === undefined) {
            this.qj = false;
        }
    }
    ;
    WR360.ImageRotator.prototype.pW = function() {
        if (this.av && this.loaded && jQuery(this.cR).is(":visible")) {
            if (!this.qj) {
                this.qy();
                return true;
            }
        }
        return false;
    }
    ;
    WR360.ImageRotator.prototype.ScrollbarsToggleOff = function(pk) {
        jQuery("html, body").css("overflow", pk ? "hidden" : "");
    }
    ;
    WR360.ImageRotator.prototype.qy = function() {
        this.ScrollbarsToggleOff(true);
        var hf = this.mF();
        jQuery(this.cR).css({
            top: hf.scrollY,
            left: hf.scrollX,
            width: jQuery(window).width(),
            height: window.innerHeight ? window.innerHeight : jQuery(window).height()
        });
        jQuery(this.pf).css({
            width: jQuery(window).width(),
            height: window.innerHeight ? window.innerHeight : jQuery(window).height()
        });
        this.gs();
    }
    ;
    WR360.ImageRotator.prototype.qC = function(configFileFullScreenURL) {
        if (this.qS()) {
            return;
        }
        this.configFileFullScreenURL = configFileFullScreenURL;
    }
    ;
    WR360.ImageRotator.prototype.rg = function() {
        if (this.qS()) {
            return;
        }
        var zIndex = 50000;
        var suffix = "_fs";
        this.rh();
        if (this.gD() == true) {
            this.sm.Event(WR360.sY.rU.FULLSCREEN);
        }
        if (this.qR == null) {
            var pG = this.cR + suffix;
            var pw = this.oY + suffix;
            if (jQuery(pG).length == 0) {
                var parentElement = jQuery("body");
                if (parentElement == null) {
                    throw new Error("Can't create full-screen image rotator: parent element is NULL.");
                }
                var fullScreenElm = jQuery("<div id='" + pw + "' class='wr360_player'></div>").appendTo(parentElement);
                var rf = jQuery(this.cR).attr("class");
                fullScreenElm.addClass(rf);
                var pF = fullScreenElm[0];
                var qj = this.pz(pF);
                if (qj) {
                    if (pF.requestFullScreen) {
                        pF.requestFullScreen();
                    } else if (pF.mozRequestFullScreen) {
                        pF.mozRequestFullScreen();
                    } else if (pF.webkitRequestFullScreen) {
                        pF.webkitRequestFullScreen();
                    } else if (pF.msRequestFullscreen) {
                        pF.msRequestFullscreen();
                    }
                    fullScreenElm.css({
                        width: screen.width,
                        height: screen.height,
                        'background-color': this.bA.settings.bI.fullScreenBackColor
                    });
                } else {
                    this.ScrollbarsToggleOff(true);
                    var hf = this.mF();
                    fullScreenElm.css({
                        position: "absolute",
                        top: hf.scrollY,
                        left: hf.scrollX,
                        width: jQuery(window).width(),
                        height: window.innerHeight ? window.innerHeight : jQuery(window).height(),
                        'z-index': zIndex,
                        'background-color': this.bA.settings.bI.fullScreenBackColor
                    });
                }
            }
            this.qR = new WR360.ImageRotator(pw);
            this.qR.settings.viewName = this.settings.viewName;
            this.qR.settings.googleEventTracking = this.settings.googleEventTracking;
            this.qR.settings.graphicsPath = this.settings.graphicsPath;
            this.qR.settings.configFileURL = this.configFileFullScreenURL.length > 0 ? this.configFileFullScreenURL : this.settings.configFileURL;
            this.qR.licenseFileURL = this.licenseFileURL;
            this.qR.licenseCode = this.licenseCode;
            this.qR.settings.fullScreenOnClick = this.settings.fullScreenOnClick;
            this.qR.settings.rootPath = this.settings.rootPath;
            this.qR.settings.zIndexLayersOn = this.settings.zIndexLayersOn;
            this.qR.settings.inBrowserFullScreen = this.settings.inBrowserFullScreen;
            this.qR.settings.crossDomainConfigLoader = this.settings.crossDomainConfigLoader;
            this.qR.settings.apiReadyCallback = this.settings.apiReadyCallback;
            this.qR.av = true;
            this.qR.settings.progressCallback = this.settings.progressCallback;
            this.qR.pH = this;
            this.qR.pF = pF;
            this.qR.qj = qj;
            if (qj) {
                this.qR.pN();
            }
            this.qR.runImageRotator();
        } else {
            this.qR.qi();
        }
    }
    ;
    WR360.ImageRotator.prototype.pN = function(e) {
        jQuery(document).on("mozfullscreenchange webkitfullscreenchange MSFullscreenChange", jQuery.proxy(function(event) {
            this.qE(event);
        }, this));
    }
    ;
    WR360.ImageRotator.prototype.qE = function(e) {
        if (!document.mozFullScreen && !document.webkitIsFullScreen && !document.msFullscreenElement) {
            if (jQuery(this.cR).is(":visible")) {
                this.pR(e);
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.pz = function(cu) {
        if (this.bA.settings.control.inBrowserFullScreen == true || this.settings.inBrowserFullScreen == true) {
            return false;
        }
        return cu != null && (cu.requestFullScreen || cu.mozRequestFullScreen || cu.msRequestFullscreen || cu.webkitRequestFullScreen);
    }
    ;
    WR360.ImageRotator.prototype.qi = function() {
        if (this.qS()) {
            return;
        }
        if (!this.av) {
            return;
        }
        if (this.qj) {
            if (this.pF.requestFullScreen) {
                this.pF.requestFullScreen();
            } else if (this.pF.mozRequestFullScreen) {
                this.pF.mozRequestFullScreen();
            } else if (this.pF.webkitRequestFullScreen) {
                this.pF.webkitRequestFullScreen();
            } else if (this.pF.msRequestFullscreen) {
                this.pF.msRequestFullscreen();
            }
            jQuery(this.cR).css({
                width: screen.width,
                height: screen.height
            });
        } else {
            this.qy();
        }
        if (this.pH != null) {
            this.bV.kl = this.pH.bV.kl;
            this.bV.dE(this.pH.bV.ob());
        }
        this.bV.aG.fadeIn(600);
        jQuery(this.cR).show();
    }
    ;
    WR360.ImageRotator.prototype.pj = function() {
        if (this.qR != null) {
            this.pZ();
            jQuery(this.qR.cR).remove();
            this.qR = null;
        }
    }
    ;
    WR360.ImageRotator.prototype.pZ = function() {
        if (!this.av) {
            return;
        }
        this.rh();
        this.bV.aG.hide();
        this.dispatchEvent(new WR360.Event(WR360.Events.hG,false,false));
        this.bV.lx();
        jQuery(this.cR).hide();
    }
    ;
    WR360.ImageRotator.prototype.qU = function() {
        if (this.av && this.pH.bA.settings.bI.iT == true) {
            this.qA = this.cR + "_X";
            if (jQuery(this.qA).length == 0) {
                jQuery(this.cR).append("<a class='fullscreenoff_button' id='" + this.qA.replace("#", "") + "'></a>");
                jQuery(this.qA).click(jQuery.proxy(function(event) {
                    this.ro(event);
                }, this));
                jQuery(document).keydown(jQuery.proxy(function(event) {
                    this.qF(event);
                }, this));
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.qz = function() {
        var success = false;
        if (this.av && this.pH != null) {
            this.bV.kl = this.pH.bV.kl;
            this.bV.dE(this.pH.bV.ob());
            success = true;
        }
        return success;
    }
    ;
    WR360.ImageRotator.prototype.qa = function() {
        if (this.av) {
            if (this.settings.fullScreenOnClick || this.bA.settings.bI.showFullScreenToolbar == true) {
                return;
            }
            jQuery(this.ja).hide();
            jQuery(this.nQ).hide();
        }
    }
    ;
    WR360.ImageRotator.prototype.rc = function(e) {
        if (this.R) {
            return;
        }
        if (!this.av) {
            this.rg();
            this.kI(false);
        } else {
            this.rn(e);
        }
    }
    ;
    WR360.ImageRotator.prototype.pR = function(e) {
        this.pZ();
        if (!this.qj) {
            this.ScrollbarsToggleOff(false);
        }
    }
    ;
    WR360.ImageRotator.prototype.ro = function(e) {
        e.preventDefault();
        this.rn(e);
    }
    ;
    WR360.ImageRotator.prototype.rn = function(e) {
        if (this.av) {
            if (this.qj && (document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement)) {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                this.pR(e);
            }
        }
    }
    ;
    WR360.ImageRotator.prototype.qF = function(e) {
        if (this.av && jQuery(this.cR).is(":visible")) {
            if (e.which == 27) {
                e.preventDefault();
                this.pR(e);
            }
        }
    }
    ;
})();
