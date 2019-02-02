
--�ڰ��������в��� Import "�����.lua" ������������ �����.������ ���ɵ���
--~ ��Ȩ����,2014.8.13 ------------by zhou164902127
--~ ��Ȩ����,2014.8.21-------------by zhou164902127


--~ ��ȡ�ļ�
function QMPlugin.Read(FileName)
	local ReadContent
	--������pcall�ѿ��ܲ�������ʱ����Ĳ��ְ��������������ļ���ʧ�ܵ�ʱ������ű���ֹ
	pcall(
	function()
	io.input(FileName)
	ReadContent = io.read("*a")
	io.close()
	end)
	return ReadContent
end

--~ ��ȡ�ļ�������
function QMPlugin.ReadLines(FileName)
	local Lines = {}
	pcall(
	function()
	io.input(FileName)
	while true do
		local ReadContent = io.read()
		--Ϊ�˺Ͱ���������﷨����һ�£�ע�� lua �е� nil ��ҪдΪ null
		if ReadContent == null then
			break
		end
		table.insert(Lines, ReadContent)
	end
	io.close()
	end)
	return Lines
end

--~ д�ļ�
function QMPlugin.Write(FileName, ...)
	local arg={...}
	pcall(
	function()
		io.output(FileName)
		for i, v in ipairs(arg) do
			io.write(tostring(v))
		end
		io.close()
	end)
end

--~ д���е��ļ�
function QMPlugin.WriteLines(FileName, Lines)
	pcall(
	function()
		io.output(FileName)
		for i, v in ipairs(Lines) do
			io.write(tostring(v), '\n')
		end
		io.close()
	end)
end

--~ �½�Ŀ¼
function QMPlugin.CreateFolder(dirname)
	pcall(
	function()
		os.execute("mkdir -p " .. dirname)
	end)
end

--~ ɾ���ļ�
function QMPlugin.DeleteFile(filename)
	pcall(function()
		 os.remove (filename)
		end)
end

--~ ɾ��Ŀ¼
function QMPlugin.DeleteFolder(dirname)
	pcall(
	function()
		os.execute("rm -r " .. dirname)
	end)
end

--~ �ƶ��ļ�
function QMPlugin.MoveFile(file1, file2)
	pcall(
	function()
		os.execute("mv " ..file1.." ".. file2)
	end)
end

--~ �½��ļ�
function QMPlugin.Createfile(file)
	pcall(
	function()
		os.execute("touch " ..file)
	end)
end

--~ �����ļ�
function QMPlugin.CopyFile(file1, dirname)
	pcall(
	function()
		 os.execute("cp " ..file1.." "..  dirname)
	end)
end

--~ �������ļ�
function QMPlugin.ReNameFile(oldname, newname)
	pcall(
	function()
		os.rename(oldname, newname)
	end)
end

--~ ~�ж��ļ��Ƿ����
function QMPlugin.IsFileExist(file)
	local x
	pcall(
	function()
		x=io.open(file)
		if x then
		io.close(x)
		x=true
		else
		x=false
		end
	end)
	return x
end

--~ ������ݵ��ļ�
function QMPlugin.WriteEX(filename,str)
	pcall(
	function()
		file = io.open(filename,"a")
		file:write(str)
		file:close()
	end)
end









