/*
 This file is part of widelab-datepicker.

    widelab-datepicker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    widelab-datepicker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with widelab-datepicker.  If not, see <http://www.gnu.org/licenses/>.
 */
Array.prototype.last = function(){ return this[this.length - 1]; }
Array.prototype.unique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}
Array.prototype.remove = function(i, len){ if(typeof(len) != "number" || len < 1){len = 1} this.splice(i, len); }
function ObjToArray(input) {
    var tmp_arr = new Array()
 
    for ( key in input ){
        tmp_arr.push(input[key]);
    }
 
    return tmp_arr;
}


String.prototype.times = function(n){
	var s = '';
	for (var i = 0; i < n; i++){ s += this; }
	return s;
}
ObjLength = function(obj) { if(typeof(obj) != "object") return null; var n = 0; for(var i in obj){ n++; } return n; }
String.prototype.zp = function(n,c) { c = c || '0'; return c.times(n - this.length) + this; }
String.prototype.zt = function(n,c) { c = c || '0'; return this + c.times(n - this.length); } 
Number.prototype.zp = function(n,c) { return this.toString().zp(n,c); }
Number.prototype.zt = function(n,c) { return this.toString().zt(n,c); }

String.prototype.toInt = function() { return parseInt(this); }
String.prototype.toFloat = function() { return parseFloat(this); }
String.prototype.toNumber = function() { return parseFloat(this); }
Number.prototype.toInt = function() { return parseInt(this); }
Number.prototype.toFloat = function() { return parseFloat(this); }
Number.prototype.toNumber = function() { return parseFloat(this); }

HTMLElement.prototype.remove = function(){ if(this.parentNode != null){ this.parentNode.removeChild(this); } delete(this); }
HTMLElement.prototype.insertAfter = function(elem){ this.parentNode.insertBefore(elem, this.nextSibling); }
HTMLElement.prototype.replace = function(elem){ this.parentNode.insertBefore(elem, this.nextSibling); this.remove(); }
HTMLElement.prototype.getStyle = function(tag){ return window.getComputedStyle(this).getPropertyValue(tag); }
HTMLElement.prototype.addClass = function(cl){
	var t = (this.getAttribute("class")) ? this.getAttribute("class").split(' ') : [];
	if(t.indexOf(cl) == -1){
		t.push(cl);
		t = t.join(" ").trim();
		this.setAttribute("class", t);
	}
}
HTMLElement.prototype.removeClass = function(cl){
	var t = (this.getAttribute("class")) ? this.getAttribute("class").split(' ') : [];
	while(t.indexOf(cl) > -1){
		var d = t.indexOf(cl);
		delete(t[d]);
	}
	t = t.join(" ").trim();
	this.setAttribute("class", t);
}
HTMLElement.prototype.isClass = function(cl){
	var t = (this.getAttribute("class")) ? this.getAttribute("class").split(' ') : [];
	return (t.indexOf(cl) > -1)
}

var webStore = 
{
	setItem: function (name, object)
		{
			localStorage.setItem(name, JSON.stringify(object))
		},
	getItem: function (name)
		{
			return JSON.parse(localStorage.getItem(name))
		},
	remove: function (name)
		{
			localStorage.removeItem(name)
		},
	clear: function (name)
		{
			localStorage.clear()
		},
	collection: function ()
		{
			var ans = {};
			for (var i = 0; i < localStorage.length; i++)
			{
				ans[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
			}
			return ans;
		},
	length: function ()
		{
			return localStorage.length
		}
}
