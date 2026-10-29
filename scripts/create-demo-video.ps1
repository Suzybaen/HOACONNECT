param(
  [string]$FfmpegPath = "C:\Users\Bodgie\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe",
  [string]$FfprobePath = "C:\Users\Bodgie\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffprobe.exe",
  [string]$SourceDir = "C:\Users\Bodgie\Downloads\app",
  [string]$OutputDir = "C:\hoaconnect\hoaconnect\demo-video",
  [int]$SceneSeconds = 9
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath $FfmpegPath)) {
  throw "FFmpeg was not found at $FfmpegPath"
}

if (!(Test-Path -LiteralPath $FfprobePath)) {
  throw "FFprobe was not found at $FfprobePath"
}

$scenes = @(
  @{
    File = "log.jpg"
    Subtitle = "Still managing your HOA with chats, spreadsheets, and manual reminders? Meet HOAConnect."
  },
  @{
    File = "ladingpage.png"
    Subtitle = "HOAConnect brings payments, announcements, waste collection, reports, and homeowners into one simple platform."
  },
  @{
    File = "login.png"
    Subtitle = "Each user gets the right experience: homeowners, collectors, and administrators all have their own dashboard."
  },
  @{
    File = "homeowner2-3.png"
    Subtitle = "Homeowners can see dues, amount paid, announcements, property details, and the next collection schedule at a glance."
  },
  @{
    File = "homeownerdashboard1.png"
    Subtitle = "Smart notifications keep the community informed about trash collection, billing reminders, and important updates."
  },
  @{
    File = "homeowner4.png"
    Subtitle = "Payment history is clear, searchable, and easy to understand, with paid, unpaid, and overdue records in one place."
  },
  @{
    File = "homeowner5.png"
    Subtitle = "Announcements are organized by urgency, billing, and general updates, so homeowners never miss what matters."
  },
  @{
    File = "homeowner6.png"
    Subtitle = "Residents can submit and track reports, including missed collection, road damage, and community concerns."
  },
  @{
    File = "collectordashboard1.png"
    Subtitle = "Collectors start the day with a live overview of confirmed households, completed stops, route progress, and urgent requests."
  },
  @{
    File = "collectordashboard5.png"
    Subtitle = "The household list shows who is ready, who is pending, and which stop needs action next."
  },
  @{
    File = "collectordashboard2.png"
    Subtitle = "Route maps help collectors move through the subdivision with fewer missed stops and better visibility."
  },
  @{
    File = "collectordashboard4.png"
    Subtitle = "Urgent pickup requests can be reviewed, approved, declined, and added to today's route."
  },
  @{
    File = "collectordashboard3.png"
    Subtitle = "Completed collections are tracked in real time, giving the team a clean record of finished stops."
  },
  @{
    File = "admin1.png"
    Subtitle = "Admins get a full operating dashboard: households, payment compliance, participation, reports, overdue accounts, and monthly collections."
  },
  @{
    File = "admin2.png"
    Subtitle = "Analytics show collection readiness, payment health, and performance trends for better community decisions."
  },
  @{
    File = "admin6.png"
    Subtitle = "Payment management helps administrators monitor paid, unpaid, and overdue accounts without manual spreadsheets."
  },
  @{
    File = "admin5.png"
    Subtitle = "Waste collection schedules and readiness confirmations are managed from one HOA-wide view."
  },
  @{
    File = "admin4.png"
    Subtitle = "Reports are prioritized by status and severity, helping admins resolve issues faster."
  },
  @{
    File = "admin3.png"
    Subtitle = "Admins can post announcements and notify all homeowners from one simple composer."
  },
  @{
    File = "admin8.png"
    Subtitle = "Household records show ownership, contacts, zones, occupancy, and payment readiness in a structured table."
  },
  @{
    File = "admin7.png"
    Subtitle = "Subscription, usage, billing history, and plan management are visible inside the admin billing screen."
  },
  @{
    File = "log.jpg"
    Subtitle = "HOAConnect: manage your community, track payments, coordinate collections, and stay connected. Try before purchase."
  }
)

function Format-SrtTime([double]$seconds) {
  $time = [TimeSpan]::FromSeconds($seconds)
  return "{0:00}:{1:00}:{2:00},{3:000}" -f [Math]::Floor($time.TotalHours), $time.Minutes, $time.Seconds, $time.Milliseconds
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

Get-ChildItem -LiteralPath $OutputDir -Filter "segment_*.mp4" -ErrorAction SilentlyContinue | Remove-Item -Force

$segmentListPath = Join-Path $OutputDir "segments.txt"
$subtitlePath = Join-Path $OutputDir "subtitles.srt"
$outputPath = Join-Path $OutputDir "HOAConnect-demo-video.mp4"

$segmentLines = New-Object System.Collections.Generic.List[string]
$subtitleLines = New-Object System.Collections.Generic.List[string]

for ($i = 0; $i -lt $scenes.Count; $i++) {
  $scene = $scenes[$i]
  $inputPath = Join-Path $SourceDir $scene.File
  if (!(Test-Path -LiteralPath $inputPath)) {
    throw "Missing source image: $inputPath"
  }

  $segmentName = "segment_{0:000}.mp4" -f ($i + 1)
  $segmentPath = Join-Path $OutputDir $segmentName
  $duration = $SceneSeconds

  $filter = @"
color=c=0xf8fafc:s=1920x1080:d=${duration}:r=24[base];
[base]drawbox=x=0:y=0:w=1920:h=1080:color=0xecfeff@0.62:t=fill,drawbox=x=1180:y=0:w=740:h=1080:color=0xf7fee7@0.48:t=fill,drawbox=x=516:y=70:w=888:h=940:color=black@0.10:t=fill,drawbox=x=542:y=46:w=836:h=968:color=white@1:t=fill,drawbox=x=572:y=76:w=776:h=908:color=0xdbeafe@1:t=2[canvas];
[0:v]format=rgb24,scale=760:900:force_original_aspect_ratio=decrease,pad=780:920:(ow-iw)/2:(oh-ih)/2:color=white[screen];
[canvas][screen]overlay=x='(W-w)/2+10*sin(2*PI*t/$duration)':y='(H-h)/2-6+6*sin(2*PI*t/$duration)',format=yuv420p[v]
"@

  Write-Host ("Rendering {0}/{1}: {2}" -f ($i + 1), $scenes.Count, $scene.File)
  & $FfmpegPath -y -hide_banner -loglevel error -loop 1 -t $duration -i $inputPath -filter_complex $filter -map "[v]" -r 24 -c:v libx264 -preset ultrafast -crf 22 -movflags +faststart $segmentPath
  if ($LASTEXITCODE -ne 0) {
    throw "FFmpeg failed while rendering $segmentName"
  }

  $segmentLines.Add("file '$segmentName'") | Out-Null

  $start = $i * $SceneSeconds
  $end = ($i + 1) * $SceneSeconds - 0.1
  $subtitleLines.Add([string]($i + 1)) | Out-Null
  $subtitleLines.Add(("{0} --> {1}" -f (Format-SrtTime $start), (Format-SrtTime $end))) | Out-Null
  $subtitleLines.Add($scene.Subtitle) | Out-Null
  $subtitleLines.Add("") | Out-Null
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($segmentListPath, $segmentLines, $utf8NoBom)
[System.IO.File]::WriteAllLines($subtitlePath, $subtitleLines, $utf8NoBom)

Push-Location $OutputDir
try {
  $subtitleFilter = "subtitles=subtitles.srt:force_style='FontName=Arial,FontSize=10,PrimaryColour=&HFFFFFF&,BackColour=&H99000000&,BorderStyle=4,Outline=1,Shadow=0,MarginV=32'"
  Write-Host "Combining segments and burning subtitles..."
  & $FfmpegPath -y -hide_banner -loglevel error -f concat -safe 0 -i "segments.txt" -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=48000" -vf $subtitleFilter -shortest -c:v libx264 -preset veryfast -crf 21 -c:a aac -b:a 128k -movflags +faststart "HOAConnect-demo-video.mp4"
  if ($LASTEXITCODE -ne 0) {
    throw "FFmpeg failed while combining the final video"
  }
}
finally {
  Pop-Location
}

Write-Host "Video created:"
Write-Host $outputPath
& $FfprobePath -v error -show_entries format=duration,size -of default=noprint_wrappers=1:nokey=0 $outputPath
