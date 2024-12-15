use serde_json::json;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

#[tauri::command]
pub fn setup(app: AppHandle) {
    //let store = app.store("store.json").expect("Issue with tauri store..");

    //store.set("some-key", json!({ "value": 5 }));

    //let value = store
    //.get("some-key")
    //.expect("Failed to get value from store");
    //println!("{}", value); // {"value":5}

    //store.close_resource();
}
