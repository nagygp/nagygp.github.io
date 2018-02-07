var alphabet="";
var generator_matrix = new Array();
var code_dim=-1;
var code_len=-1;
var cws = new Array();

function letter2digit(x) {
	ret = new Array(7);
	y=alphabet.indexOf(x);
	if (y<0) alert("Error: Letter '"+x+"' is missing from alphabet!");
	for (var i=6; i>=0; --i) {
		ret[i]=y%2;
		y=(y-ret[i])/2;
	}
	return ret;
}

function digit2letter(d) {
	var y=0;
	var pow=1;
	for (var i=6; i>=0; --i) {
		y+=d[i]*pow;
		pow*=2;
	}
	return alphabet[y];
}

function plaintext2binseq(text) {
	ret = new Array();
	for (var i=0; i<text.length; ++i) {
		ret = ret.concat(letter2digit(text[i]));
	}
	return ret;
}

function binseq2plaintext(binseq) {
	var t = "";
	for (var i=0;7*i+6<binseq.length;i++) {
		x=0;
		for (var j=0;j<7;j++) {
			x+=binseq[7*i+6-j]*Math.pow(2,j);
		}
		t+=alphabet[x];
	}
	return t;
}

function binseq2string(binseq,wlen,rlen,rnr) {
	var t="";
	var cw=0;
	var cr=1;
	var cp=1;
	for (var i=0;i<binseq.length;++i) {
		cw+=1;
		t+=binseq[i];
		if (0==cw%wlen) {
			cr+=1;
			cw=0;
			t+=' ';
		}
		if (0==cr%(rlen+1)) {
			cr=1;
			t+='\n';
			cp+=1;
		}
		if ((cp>rnr)&&(i+1<binseq.length)) {
			t+='[...]\n';
			break;
		}
	}
	return t;
}

function noise(binseq,p) {
	var r = new Array();
	var bits_changed=0;
	for (var i=0;i<binseq.length;++i) {
		if (Math.random()<p) {
			r.push(1-binseq[i]);
			bits_changed+=1;
		} else {
			r.push(binseq[i]);
		}
	}
	return Array(r,bits_changed);
}

function binary_innerprod(u,v) {
	var r=0;
	for (var i=0;i<u.length;++i) {
		r+=u[i]*v[i];
	}
	return r%2;
}

function binary_matrix_by_vector(mat,vect) {
	var ret = new Array();
	for (var i=0;i<mat.length;++i) {
		ret[i]=binary_innerprod(mat[i],vect);
	}
	return ret;
}

function tuples(n) {
	var ret = new Array();
	ret[0]=new Array();
	for (var i=0;i<n;++i) {
		var rl=ret.length;
		for (var k=0;k<rl;++k) {
			ret.splice(2*k+1,0,ret[2*k].slice(0));
			ret[2*k].push(0);
			ret[2*k+1].push(1);
		}
	}
	return ret;
}

function set_code(genmat) {
	code_dim = genmat[0].length;
	code_len = genmat.length;
	cws = tuples(code_dim);
	for (var i=0;i<cws.length;++i) {
		cws[i]=binary_matrix_by_vector(genmat,cws[i]);
	}
}

function encoding(binseq) {
	var bl=binseq.length;
	while (0!=binseq.length%code_dim) {
		binseq.push(0);
	}
	r=new Array();
	for (var i=0;i<binseq.length/code_dim;++i) {
		w=binseq.slice(code_dim*i,code_dim*(i+1));
		r=r.concat(binary_matrix_by_vector(generator_matrix,w));
	}
	return r;
}

function hamming_distance(u,v) {
	var r=0;
	for (var i=0;i<u.length;++i) {
		if (u[i]!=v[i]) { ++r; }
	}
	return r;
}

function closest_codeword(u) {
	var md=u.length;
	var hd;
	var i=0;
	var r=new Array();
	while ((i<cws.length)&&(md>0)) {
		hd=hamming_distance(u,cws[i]);
		if (hd<md) {
			md=hd;
			r=cws[i];
		}
		i++;
	}

	return r;
}

function decoding(binseq) {
	var r=new Array();
	for (var i=0;i<binseq.length/code_len;++i) {
		w=binseq.slice(code_len*i,code_len*(i+1));
		w=closest_codeword(w);
		w=cws.indexOf(w);
		for (var j=code_dim-1; j>=0; --j) {
			r[code_dim*i+j]=w%2;
			w=(w-r[code_dim*i+j])/2;
		}
	}
	return r;
}

function color_diff_text(text1,text2) {
	var r="<code>";
	for (var i=0;i<text1.length;i++) {
		if (text1[i]=="\n") {
			x="<br>\n";
		} else {
			x=text1[i];
		}
		if ((text1[i]!=text2[i])&&(text1[i]!="\n")) {
			x="<span style=\"background-color:red;\">"+x+"</span>";
		}
		r+=x;
	}
	return r;
}


