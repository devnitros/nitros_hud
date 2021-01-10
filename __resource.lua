resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

ui_page "ui.html"

files {
	'nui/*',
	'html/nuiicons/*',
    "ui.html",
	"ui.css",
    "ui.js",
	'html/ss/*.png',
	'html/*.png'

}

client_script {
	'nui.lua',
	'client.lua'
}
