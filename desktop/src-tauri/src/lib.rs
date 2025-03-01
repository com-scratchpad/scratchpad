// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod editor;

use std::fs;

use tauri::{AppHandle, Manager};
use titlebar::WebviewWindowExt;

#[tauri::command]
fn create_user_dir(app_handle: AppHandle, dir_name: String) -> Result<String, String> {
    let app_dir = app_handle.path().app_data_dir().unwrap();
    let new_dir_path = app_dir.join(dir_name);

    print!("Testing: {}", new_dir_path.display());

    match fs::create_dir_all(&new_dir_path) {
        Ok(_) => Ok(format!("Directory created at: {}", new_dir_path.display())),
        Err(e) => Err(format!("Failed to create directory: {}", e)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(titlebar::init())
        .invoke_handler(tauri::generate_handler![create_user_dir, editor::save])
        .setup(|app| {
            let main_window = app.get_webview_window("main").unwrap();
            main_window.create_overlay_titlebar().unwrap();

            #[cfg(target_os = "macos")]
            main_window.set_traffic_lights_inset(16.0, 20.0).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
