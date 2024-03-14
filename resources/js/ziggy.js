const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"filament.exports.download":{"uri":"filament\/exports\/{export}\/download","methods":["GET","HEAD"],"parameters":["export"],"bindings":{"export":"id"}},"filament.imports.failed-rows.download":{"uri":"filament\/imports\/{import}\/failed-rows\/download","methods":["GET","HEAD"],"parameters":["import"],"bindings":{"import":"id"}},"filament.admin.auth.login":{"uri":"admin\/login","methods":["GET","HEAD"]},"filament.admin.auth.logout":{"uri":"admin\/logout","methods":["POST"]},"filament.admin.pages.dashboard":{"uri":"admin","methods":["GET","HEAD"]},"filament.admin.resources.contact-requests.index":{"uri":"admin\/contact-requests","methods":["GET","HEAD"]},"filament.admin.resources.contact-requests.create":{"uri":"admin\/contact-requests\/create","methods":["GET","HEAD"]},"filament.admin.resources.contact-requests.edit":{"uri":"admin\/contact-requests\/{record}\/edit","methods":["GET","HEAD"],"parameters":["record"]},"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"livewire.update":{"uri":"livewire\/update","methods":["POST"]},"livewire.upload-file":{"uri":"livewire\/upload-file","methods":["POST"]},"livewire.preview-file":{"uri":"livewire\/preview-file\/{filename}","methods":["GET","HEAD"],"parameters":["filename"]},"ignition.healthCheck":{"uri":"_ignition\/health-check","methods":["GET","HEAD"]},"ignition.executeSolution":{"uri":"_ignition\/execute-solution","methods":["POST"]},"ignition.updateConfig":{"uri":"_ignition\/update-config","methods":["POST"]},"welcome":{"uri":"\/","methods":["GET","HEAD"]},"faq":{"uri":"faq","methods":["GET","HEAD"]},"blog":{"uri":"blog","methods":["GET","HEAD"]},"projects":{"uri":"projects","methods":["GET","HEAD"]},"projects.game":{"uri":"projects\/game","methods":["GET","HEAD"]},"character.store":{"uri":"character","methods":["POST"]},"contact-request.store":{"uri":"contact-request","methods":["POST"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["GET","HEAD"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
