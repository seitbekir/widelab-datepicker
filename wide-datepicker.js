Array.prototype.last = function(){ return this[this.length - 1]; }

String.prototype.times = function(n){
	var s = '';
	for (var i = 0; i < n; i++){ s += this; }
	return s;
}
String.prototype.zp = function(n) { return '0'.times(n - this.length) + this; }
Number.prototype.zp = function(n) { return this.toString().zp(n); }
String.prototype.zt = function(n) { return this + '0'.times(n - this.length); } 
Number.prototype.zt = function(n) { return this.toString().zt(n); }

String.prototype.toInt = function() { return parseInt(this); }
String.prototype.toFloat = function() { return parseFloat(this); }
String.prototype.toNumber = function() { return parseFloat(this); }

HTMLElement.prototype.remove = function(){ if(this.parentNode != null) this.parentNode.removeChild(this); else delete(this); }
HTMLElement.prototype.insertAfter = function(elem){ this.parentNode.insertBefore(elem, this.nextSibling); }
HTMLElement.prototype.replace = function(elem){ this.parentNode.insertBefore(elem, this.nextSibling); this.remove(); }

var datePicker = function(input)
	{
		if(typeof(datePicker.curent) == "object") datePicker.end();
		
		datePicker.input = input;
		if(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/g.test(input.value))
		{
			datePicker.Td = new Date(input.value.substr(6,4).toInt(), input.value.substr(3,2).toInt() - 1, input.value.substr(0,2).toInt());
			datePicker.iTd = new Date(input.value.substr(6,4).toInt(), input.value.substr(3,2).toInt() - 1, input.value.substr(0,2).toInt());
		}
		else 
		{
			datePicker.Td = new Date();
			datePicker.iTd = new Date();
		}
		datePicker.put();
	}
datePicker.buildCal = function(m, y)
	{
		var mn=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
		var dim=[31,0,31,30,31,30,31,31,30,31,30,31];

		var oD = new Date(y, m, 1); //DD replaced line to fix date bug when current day is 31st
		oD.od = oD.getDay() + 1; //DD replaced line to fix date bug when current day is 31st

		var todaydate = datePicker.iTd //DD added
		var scanfortoday = (y == todaydate.getFullYear() && m == todaydate.getMonth()) ? todaydate.getDate() : 0; //DD added

		dim[1]=(((oD.getFullYear() % 100 != 0) && (oD.getFullYear() % 4 == 0)) || (oD.getFullYear() % 400 == 0)) ? 29 : 28;
		
		var t='<table cols="7"><tr>';
		t+='<td colspan="7"><div class="next">►</div><div class="prev">◄</div>'+mn[m]+' - '+y+'</td></tr><tr>';
		
		for(s=0;s<7;s++)
			t+='<td>'+"ПнВтСрЧтПтСбВс".substr(s*2,2)+'</td>';
			
		t+='</tr><tr>';
		
		for(i = 1; i <= 42; i++)
		{
			var x = ((i - oD.od >= -1) && (i - oD.od < dim[m] - 1)) ? i - oD.od + 2 : '&nbsp;';
			var z = "", cl = "";
			if( x != "&nbsp;") z = " data-make=\""+(new Date(y, m, x)).getTime()+"\"";
			if (x == scanfortoday) cl = ' class="today"';
			t+='<td'+z+''+cl+'>'+x+'</td>';
			if(((i)%7==0)&&(i<36))
				t+='</tr><tr>';
		}
		
		t += '</tr></table>';
		
		datePicker.curent.innerHTML = t;
		datePicker.curent.querySelector(".next").addEventListener("click", function(){ datePicker.next(); });
		datePicker.curent.querySelector(".prev").addEventListener("click", function(){ datePicker.prev(); });
		
		var ds = datePicker.curent.querySelectorAll("td[data-make]")
		for(i = 0; i < ds.length; i++)
			ds[i].addEventListener("click", function(){ datePicker.choose(this.getAttribute("data-make")); });
	}
datePicker.put = function()
	{
		datePicker.curent = document.createElement("div");
		datePicker.curent.className = "wide-datepicker";
		datePicker.input.insertAfter(datePicker.curent);
		
		datePicker.buildCal(datePicker.Td.getMonth(), datePicker.Td.getFullYear());
	}
datePicker.next = function()
	{
		datePicker.Td.setMonth(datePicker.Td.getMonth() + 1);
		datePicker.curent.remove();
		
		datePicker.put();
	}
datePicker.prev = function()
	{
		datePicker.Td.setMonth(datePicker.Td.getMonth() - 1);
		datePicker.curent.remove();
		
		datePicker.put();
	}
datePicker.choose = function(time)
	{
		var time = new Date(time.toInt());
		datePicker.input.value = time.getDate().zp(2) + "/" + (time.getMonth() + 1).zp(2) + "/" + time.getFullYear();
		datePicker.end();
	}
datePicker.end = function()
	{
		datePicker.curent.remove();
	}
	
