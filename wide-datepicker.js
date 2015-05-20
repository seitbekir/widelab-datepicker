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
/* DatePicker */
var datePicker = function(input, onpick, ondis)
	{
		this.input = input;
		if(/^[0-9]{2}.{1}[0-9]{2}.{1}[0-9]{4}$/g.test(input.value)) // TOTO
		{
			this.Td = new Date(input.value.substr(6,4).toInt(), input.value.substr(3,2).toInt() - 1, input.value.substr(0,2).toInt());
			this.iTd = new Date(input.value.substr(6,4).toInt(), input.value.substr(3,2).toInt() - 1, input.value.substr(0,2).toInt());
		}
		else 
		{
			this.Td = new Date();
			this.iTd = new Date();
		}
		
		this.onpick = onpick;
		this.ondis = ondis;
		var th = this;
		document.addEventListener("outClick", function(e){ if(th.curent){ th.end(); th.ondis(th.input); } })
		document.addEventListener("datePickerCross", function(e){ if(th.curent){ th.end(); th.ondis(th.input); } })
		
		this.input.addEventListener("click", function(){ th.put.call(th); });
		this.input.addEventListener("click", function(e){ e.stopPropagation(); });
		this.input.addEventListener("keyup", function(e){ th.changing.call(th) });
	}
datePicker.prototype.buildCal = function(m, y)
	{
		var mn=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		var dim=[31,0,31,30,31,30,31,31,30,31,30,31];

		var oD = new Date(y, m, 1); //DD replaced line to fix date bug when current day is 31st
		oD.od = (oD.getDay() + 6) % 7;

		var todaydate = this.iTd //DD added
		var scanfortoday = (y == todaydate.getFullYear() && m == todaydate.getMonth()) ? todaydate.getDate() : 0; //DD added

		dim[1]=(((oD.getFullYear() % 100 != 0) && (oD.getFullYear() % 4 == 0)) || (oD.getFullYear() % 400 == 0)) ? 29 : 28;
		
		var t='<table cols="7"><tr>';
		t+='<td colspan="7"><div class="next">►</div><div class="prev">◄</div>'+mn[m]+' - '+y+'</td></tr><tr>';
		
		for(s=0;s<7;s++)
			t+='<td>'+"ПнВтСрЧтПтСбВс".substr(s*2,2)+'</td>';
			
		t+='</tr><tr>';
		
		for(var i = 0; i < oD.od; i++)
		{
			t += '<td>&nbsp;</td>';
		}
		
		for(var x = 1; x <= dim[m]; x++)
		{
			var z = " data-make=\""+(new Date(y, m, x)).getTime()+"\""; var cl = "";
			if (x == scanfortoday) cl = ' class="today"';
			t+='<td'+z+''+cl+'>'+x+'</td>';
			if(((x + oD.od)%7==0))
				t+='</tr><tr>';
		}
		for(var x = dim[m]+1; x <= 42 - oD.od; x++)
		{
			t+='<td>&nbsp;</td>';
			if(((x + oD.od)%7==0) && x < 37)
				t+='</tr><tr>';
		}
		
		t += '</tr></table>';
		
		return t;
		
	}
datePicker.prototype.changing = function()
{
	if(/^[0-9]{2}.{1}[0-9]{2}.{1}[0-9]{4}$/g.test(this.input.value)) // TOTO
	{
		this.Td = 	new Date(this.input.value.substr(6,4).toInt(), this.input.value.substr(3,2).toInt() - 1, this.input.value.substr(0,2).toInt());
		this.iTd = 	new Date(this.input.value.substr(6,4).toInt(), this.input.value.substr(3,2).toInt() - 1, this.input.value.substr(0,2).toInt());
		
		this.curent.remove();
		delete(this.curent)
		this.put();
	}
}
datePicker.prototype.put = function()
	{
		if(this.curent) return;
		document.dispatchEvent(datePickerCross);
		
		this.curent = document.createElement("div");
		this.curent.className = "wide-datepicker";
		this.input.insertAfter(this.curent);
		
		if(typeof(this.onpick) == "function") this.curent.onpick = this.onpick; else this.curent.onpick = function(){ return false; }
		if(typeof(this.ondis ) == "function") this.curent.ondis  = this.ondis ; else this.curent.ondis  = function(){ return false; }
		
		this.curent.innerHTML = this.buildCal(this.Td.getMonth(), this.Td.getFullYear());
		
		var th = this;
		this.curent.querySelector(".next").addEventListener("click", function(){ th.next(); });
		this.curent.querySelector(".prev").addEventListener("click", function(){ th.prev(); });
		
		this.curent.just = true;
		this.curent.addEventListener("click", function(e){ e.stopPropagation(); });
		
		var ds = this.curent.querySelectorAll("td[data-make]")
		for(i = 0; i < ds.length; i++)
			ds[i].addEventListener("click", function(){ th.choose(this.getAttribute("data-make")); });
		
		this.curent.is = true;
	}
datePicker.prototype.next = function()
	{
		this.Td.setMonth(this.Td.getMonth() + 1);
		this.curent.remove();
		delete(this.curent)
		
		this.put();
	}
datePicker.prototype.prev = function()
	{
		this.Td.setMonth(this.Td.getMonth() - 1);
		this.curent.remove();
		delete(this.curent)
		
		this.put();
	}
datePicker.prototype.choose = function(time)
	{
		var time = 	new Date(time.toInt());
		this.Td = 	new Date(time);
		this.iTd = 	new Date(time);
		
		this.input.value = time.getDate().zp(2) + "/" + (time.getMonth() + 1).zp(2) + "/" + time.getFullYear();
		this.curent.onpick(time, this.input);
		
		this.end();
	}
datePicker.prototype.end = function()
	{
		if(!this.curent) return;
		this.curent.remove();
		delete(this.curent)
	}
var datePickerCross = document.createEvent("Event");
datePickerCross.initEvent("datePickerCross", true, true)

var outClick = document.createEvent("Event");
outClick.initEvent("outClick", true, true);
document.addEventListener("click", function(){ document.dispatchEvent(outClick); });
/* /DatePicker */
