--������Ҫ����������ʹ�õĲ��������������� QMPlugin. ǰ׺
--�ڰ��������в��� Import "�����.lua" ������������ �����.������ ���ɵ���

--ȡ�ַ��������鳤��
function QMPlugin.UBound(arr)
return #arr
end



--���������Ա 
function QMPlugin.insert(arr,value,pos)
     local len=#arr
     if pos==null  or pos >=len then
          pos=len+1
     elseif  pos <=0 then 
          pos=1
     else 
          pos=pos+1
     end
	pcall(
	   function()
                   table.insert(arr,pos,value)
        end)
       if #arr>len then 
              return true
       else 
              return false
       end
end

--ɾ�������Ա
function QMPlugin.remove(arr,pos)
       local len=#arr
       if pos==null  or pos >=len then
            pos=len
       elseif  pos <=0 then 
            pos=1
       else 
            pos=pos+1
       end
          pcall(
	      function()
                     table.remove(arr,pos)
          end)
       if #arr==len-1 then 
              return true
       else 
              return false
       end
end

-- ���ָ��λ�������Ա
function QMPlugin.concat(arr, sep,  start, end1) 
return table.concat(arr, sep,  start, end1) 
end

--����
function QMPlugin.sort(arr, comp) 

if comp==null then
comp = null
elseif comp==0 then
comp = function(a, b) return b < a end 
else
comp = function(a, b) return b > a end 
end
return table.sort(arr, comp) 
end

--ȡcpu����ʱ��
function clock()
	return math.ceil(os.clock()*1000)
end



function QMPlugin.exect(str,getresult)
local Lines = {}
local Line
if getresult==null or getresult==0  then
os.execute(str)
Line=true
return Line


elseif getresult==1 then
str=str..">  /sdcard/anjian.txt"
os.execute(str)
	pcall(
	function()

	io.input("/sdcard/anjian.txt")
	Line = io.read("*a")
	io.close()

	end)

	return Line
else 
str=str..">  /sdcard/anjian.txt"
os.execute(str)
	pcall(
	function()

	io.input("/sdcard/anjian.txt")
	while true do
		local ReadContent = io.read()
		--Ϊ�˺Ͱ���������﷨����һ�£�ע�� lua �е� nil ��ҪдΪ null
		if ReadContent == null then
			break
		end
		table.insert(Lines, ReadContent)
	end

	io.close()
        os.execute("rm -f /sdcard/anjian.txt")

	end)

	return Lines
end


end

