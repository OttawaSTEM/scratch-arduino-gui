cd ../scratch-arduino-blocks
$scracth_arduino_blocks_version = (Get-Content -Raw -Path package.json | ConvertFrom-Json).version
Write-Host $scracth_arduino_blocks_version
cd ../scratch-arduino-gui
npm i --package-lock-only scratch-arduino-blocks@$scracth_arduino_blocks_version

cd ../scratch-arduino-l10n
$scracth_arduino_l10n_version = (Get-Content -Raw -Path package.json | ConvertFrom-Json).version
Write-Host $scracth_arduino_l10n_version
cd ../scratch-arduino-gui
npm i --package-lock-only scratch-arduino-l10n@$scracth_arduino_l10n_version

cd ../scratch-arduino-vm
$scracth_arduino_vm_version = (Get-Content -Raw -Path package.json | ConvertFrom-Json).version
Write-Host $scracth_arduino_vm_version
cd ../scratch-arduino-gui
npm i --package-lock-only scratch-arduino-vm@$scracth_arduino_vm_version

git commit -am "update blocks l10n vm"