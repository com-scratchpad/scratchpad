use serde_json::json;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

#[tauri::command]
pub fn save(app: AppHandle, content: String) {
    println!("Saving content: {}", content);
    //let store = app.store("store.json").expect("Issue with tauri store..");
    //store.set("content", json!({ "value": content }));
    //store.close_resource();
}
