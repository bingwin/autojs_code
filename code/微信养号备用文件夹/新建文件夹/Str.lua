--~ ���ܣ��ַ����ظ������ҡ��滻�����ܡ������ĸ�����֡�����
--~ ��ȡʱ��
--~ ��������-2014.8.13 ------------by zhou164902127
--~ ��Ȩ����,2014.8.13-------------����229083030@qq.com
--~ �޸�����--2014-08-29-----------by zhou164902127

--~ �����滻����ַ�
function QMPlugin.replace(s, pattern, rep , n)
	local x
	pcall(function()
		x=string.gsub(s,pattern,rep,n)
	end)
	return x
end


--~ ����n��s��sep�������ַ���,sep��ʡ��
function QMPlugin.string(s, n , sep)
	local x
	pcall(function()
	x=string.rep (s, n , sep)
	end)
	return x
end


--~ ����ƥ�䵽���ַ�
function QMPlugin.match(s, pattern,init)
    local x
	pcall(function()
	x=string.match (s, pattern,init)
	end)
	return x
end


--~ �����ַ���
function QMPlugin.find (s, pattern, init)
  local x
	pcall(function()
	x=string.find(s, pattern, init)
	end)
	return x
end



--~ ��������һ���ܳ�
--~ ���ܺ���

function QMPlugin.encrypt(bytes,key)
	local x
	pcall(function()
		local Num=255
		local  mod=math.fmod
		key=key or "zhou164902127"
		local i,j,temp,len,len2=1,0,0,string.len(bytes),string.len(key)
		local key1,s={1},{1}
		for i = 1,len2 do
			key1[i]=tonumber(string.byte(key, i))
		end
		for i=0,254 do
			s[i+1]=i+1
			key1[i+1]=key1[mod(i,len2)+1]
		end
		for i=0,254 do
			j=mod((j+s[i+1]+key1[i+1]),254)+1
			temp=s[i+1]
			s[i+1]=s[j+1]
			s[j+1]=temp
		end
		local data={}
		for i=1,len do
			data[i]=0
		end
		i=0
		for k = 1, len do
			data[k]= tonumber(string.byte(bytes, k))
			i=mod(i+1,Num)+1
			j=mod(j+s[i],Num)+1
			temp=s[i]
			s[i]=s[j]
			s[j]=temp
			t=mod(s[i]+s[j],Num)+1
			data[k]=bit32.bxor(data[k],s[t])
			data[k]=string.char(data[k])
		end
		x= table.concat(data)
	end)
 	return x
end

--~ ���ܺ���
function QMPlugin.decrypt(bytes,key)
	local x
	pcall(function()
		local Num=255
		local  mod=math.fmod
		key=key or "zhou164902127"
		local i,j,temp,len,len2=1,0,0,string.len(bytes),string.len(key)
		local key1,s={1},{1}
		for i = 1,len2 do
			key1[i]=tonumber(string.byte(key, i))
		end
		for i=0,254 do
			s[i+1]=i+1
			key1[i+1]=key1[mod(i,len2)+1]
		end
		for i=0,254 do
			j=mod((j+s[i+1]+key1[i+1]),254)+1
			temp=s[i+1]
			s[i+1]=s[j+1]
			s[j+1]=temp
		end
		local data={}
		for i=1,len do
			data[i]=0
		end
		i=0
		for k = 1, len do
			data[k]= tonumber(string.byte(bytes, k))
			i=mod(i+1,Num)+1
			j=mod(j+s[i],Num)+1
			temp=s[i]
			s[i]=s[j]
			s[j]=temp
			t=mod(s[i]+s[j],Num)+1
			data[k]=bit32.bxor(data[k],s[t])
			data[k]=string.char(data[k])
		end
		x= table.concat(data)
	end)
 	return x
end

--~ ��ȡʱ�� Hour:Minute:Second
function QMPlugin.GetTime()
	local x
	pcall(function()
		x=os.date("%X")
	end)
	return x
end

function QMPlugin.Now()
	local x
	pcall(function()
		x="20"..string.sub(os.date("%x"),7).."/"
		..string.sub(os.date("%x"),1,5).."|"..os.date("%X")
	end)
	return x
end

--~ �޼��ַ���
function QMPlugin.Strtrim(str,compstr)
	local x,temp
	pcall(function()
		x=str
		if compstr~=null then
			if (1==string.find(str,compstr))then
				temp=string.gsub(str,compstr,"",1)
				temp=string.reverse(temp)
				compstr=string.reverse(compstr)
				if string.find(temp,compstr)==1 then
					temp=string.gsub(temp,compstr,"",1)
					x=string.reverse(temp)
				end
			end
		end
	end)
	return x
end


function QMPlugin.getvalue(str)
	local x
	pcall(function()
	 f=load("a="..str)
	 f()
	x=a
	end)
	return x
end

--~ �޸�����---2014-08-29
function QMPlugin.RndChr()
	local x,n
	local chr=string.char
	pcall(function()
	n=math.random (19968 , 40869)
	x=chr(bit32.bor(0xE0,bit32.extract (n, 12, 4)))..
	 chr(bit32.bor(0x80,bit32.extract (n, 6, 6)))..
	 chr(bit32.bor(0x80,bit32.extract (n, 0, 6)))
	end)
	return x
end


--~ ���������
function QMPlugin.RndNum(m , n)
	local x
	pcall(function()
	if m==nil and n==nil then
	 x=math.random()
	 elseif n==nil  then
	 x=math.random(m)
	 else
	x=math.random(m , n)
	end
	end)
	return x
end

--~ �����ĸ
function QMPlugin.RndLetter()
	local x
	pcall(function()
	if math.random()>0.5 then
	x = string.char(math.random(65,90))
	else
	x= string.char(math.random(97,122))
	end
	end)
	return x
end




